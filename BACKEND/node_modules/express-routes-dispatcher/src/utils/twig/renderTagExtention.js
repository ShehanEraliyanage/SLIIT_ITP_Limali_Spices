import path from 'path';

const PROP_NAME_TEMPLATE = 'template';

export default function (Twig) {
    const isTemplateKey = ({ key, type } = {}) => (
        type === Twig.expression.type.operator.binary &&
        key === PROP_NAME_TEMPLATE
    );

    Twig.exports.extendTag({
        type: 'render',
        regex: /^render\s+(.+?)(?:\s|$)(?:with\s+([\S\s]+?))?(?:\s|$)$/,
        next: [],
        open: true,
        compile(token) {
            const { match: [, expression, withContext], ...restToken } = token;
            const { stack } = Twig.expression.compile.call(this, {
                type: Twig.expression.type.expression,
                value: expression.trim(),
            });
            const { stack: withStack } = Twig.expression.compile.call(this, {
                type: Twig.expression.type.expression,
                value: withContext.trim(),
            });

            return {
                ...restToken,
                stack,
                withStack,
            };
        },
        parse(token, context, chain) {
            const { stack, withStack: withStackWithTemplate } = token;
            const controller = Twig.expression.parse.apply(this, [stack, context]);
            const withStack = withStackWithTemplate.reduce((result, item, index, array) => {
                if (isTemplateKey(item) || (index > 0 && isTemplateKey(array[index - 1]))) {
                    return result;
                }

                return [
                    ...result,
                    item,
                ];
            }, []);
            const templateStack = withStackWithTemplate.find((item, index, array) => {
                if (index === 0) {
                    return false;
                }

                return isTemplateKey(array[index - 1]);
            });
            const innerContext = Twig.ChildContext(context);

            let promise;

            if (typeof withStack !== 'undefined') {
                promise = Twig.expression.parseAsync.call(this, withStack, context)
                    .then((withContext) => {
                        Twig.lib.extend(innerContext, withContext);
                    });
            } else {
                promise = Twig.Promise.resolve();
            }

            return promise
                .then(() => Twig.expression.parseAsync.call(this, templateStack, context))
                .then((file) => {
                    /* eslint-disable global-require, import/no-dynamic-require */
                    const { _keys, ...restContext } = {
                        ...innerContext,
                        ...require(path.resolve(path.parse(this.path).dir, controller))(),
                    };
                    /* eslint-enable */

                    if (file instanceof Twig.Template) {
                        return file.renderAsync(restContext);
                    }

                    try {
                        return this.importFile(file).renderAsync(restContext);
                    } catch (error) {
                        throw error;
                    }
                })
                .then((output) => ({
                    chain,
                    output,
                }));
        },
    });
}
