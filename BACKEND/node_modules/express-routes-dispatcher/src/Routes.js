import path from 'path';

import Route from './Route';
import normalizeURI from './utils/normalizeURI';

export default class Routes {
    constructor(routes, options = {}) {
        this.options = options;

        this.init(routes);
    }

    init(routes) {
        const { baseDir, debug } = this.options;

        this.routes = Routes.normalize(routes, baseDir);

        if (debug) {
            this.routes.__routes__ = new Route({ // eslint-disable-line no-underscore-dangle
                baseDir,
                controller: () => this.routes,
                name: '__routes__',
                path: '/__routes__/',
            });
        }
    }

    getByName(name) {
        return this.routes[name];
    }

    walk(cb) {
        const { routes } = this;

        return Object.keys(routes)
            .forEach((name) => cb.call(this, routes[name], name));
    }
}

Routes.normalize = (routes, baseDir = '', basePrefix = '') => {
    switch (typeof routes) {
        case 'object':
            return Object.keys(routes)
                .reduce((result, name) => {
                    const route = routes[name];
                    const { prefix, resource } = route;

                    if (resource) {
                        const subRoutes = require(path.resolve(baseDir, resource)); // eslint-disable-line global-require, import/no-dynamic-require, max-len

                        return {
                            ...result,
                            ...Routes.normalize(
                                subRoutes,
                                path.resolve(baseDir, path.dirname(resource)),
                                normalizeURI(basePrefix, prefix),
                            ),
                        };
                    }

                    return {
                        ...result,
                        [name]: new Route({
                            ...route,
                            baseDir,
                            name,
                            path: normalizeURI(basePrefix, route.path),
                        }),
                    };
                }, {});

        default:
            throw new TypeError('Unexpected type of routes.');
    }
};
