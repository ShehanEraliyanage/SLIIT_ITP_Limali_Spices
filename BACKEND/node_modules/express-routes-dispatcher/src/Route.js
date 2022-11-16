import path from 'path';

import createMetaObject from './utils/createMetaObject';

const schema = {
    name: undefined,
    path: undefined,
};

const DEFAULT_PARAMS = {
    controller: () => null,
    defaults: {},
    methods: [
        'get',
        'post',
    ],
    requirements: {},
};

export default class Route extends createMetaObject(schema) {
    constructor({
        baseDir = '',
        controller = DEFAULT_PARAMS.controller,
        defaults,
        requirements,

        ...params
    } = {}) {
        super({
            ...DEFAULT_PARAMS,
            ...params,

            controller: (typeof controller === 'string') ? require(path.resolve(baseDir, controller)) : controller, // eslint-disable-line global-require, import/no-dynamic-require, max-len
            defaults: {
                ...DEFAULT_PARAMS.defaults,
                ...defaults,
            },
            requirements: {
                ...DEFAULT_PARAMS.requirements,
                ...requirements,
            },
        });

        this.baseDir = baseDir;
    }

    get format() {
        const { defaults: { _format: format }, template } = this;

        if (format) {
            return format;
        }

        if (template) {
            return Route.FORMAT_HTML;
        }

        return Route.FORMAT_JSON;
    }

    get uri() {
        const { path: maskedPath, requirements } = this;

        return maskedPath
            .replace(Route.PATTERN_OF_PARAM, (match, name) => {
                const pattern = requirements[name];

                if (typeof pattern === 'undefined') {
                    return `:${name}`;
                }

                return `:${name}(${pattern})`;
            });
    }

    get template() {
        const { baseDir, defaults: { _template: template } } = this;

        if (!template) {
            return undefined;
        }

        return path.resolve(baseDir, template);
    }

    generateURI({ hash = '', params = {}, query = {} } = {}) {
        const basePath = this.path.replace(
            Route.PATTERN_OF_PARAM,
            (match, paramName) => (params[paramName] || this.defaults[paramName] || ''),
        );
        const queryString = Object.keys(query)
            .filter((name) => (name !== '_keys'))
            .reduceRight((result, name) => {
                const separator = (result === '') ? '?' : '&';

                return `${result}${separator}${name}=${query[name]}`;
            }, '');

        return `${basePath}${queryString}${(hash !== '') ? `#${hash}` : ''}`;
    }
}

Route.FORMAT_HTML = 'html';
Route.FORMAT_JSON = 'json';

Route.PATTERN_OF_PARAM = /\{([^}]+)\}/g;
