JSON based routing for Node.js
==

[![npm version][version-img]][version] [![Dependency Status][dependency-img]][dependency] [![Travis Build Status][travis-img]][travis] [![Appveyor Build Status][appveyor-img]][appveyor] [![bitHound Overall Score][bithound-img]][bithound] [![Codacy Badge][codacy-img]][codacy]

[dependency-img]: https://david-dm.org/ahtohbi4/express-routes-dispatcher.svg
[dependency]: https://david-dm.org/ahtohbi4/express-routes-dispatcher
[version-img]: https://badge.fury.io/js/express-routes-dispatcher.svg
[version]: https://badge.fury.io/js/express-routes-dispatcher
[travis-img]: https://travis-ci.org/ahtohbi4/express-routes-dispatcher.svg?branch=master
[travis]: https://travis-ci.org/ahtohbi4/express-routes-dispatcher
[appveyor-img]: https://ci.appveyor.com/api/projects/status/0xodj7np6jghyuik/branch/master?svg=true
[appveyor]: https://ci.appveyor.com/project/ahtohbi4/express-routes-dispatcher/branch/master
[bithound-img]: https://www.bithound.io/github/ahtohbi4/express-routes-dispatcher/badges/score.svg
[bithound]: https://www.bithound.io/github/ahtohbi4/express-routes-dispatcher
[codacy-img]: https://api.codacy.com/project/badge/grade/480c7aa1737046bfa6d475082847d513
[codacy]: https://www.codacy.com/app/alexandr-post/express-routes-dispatcher

> JSON based MVC routing using [express](http://expressjs.com/) and [twig](https://twig.symfony.com/doc/2.x/) as template engine.

In this implementation, the routing is based on JSON format, which is a map from an URL path to a controller (Controller) for processing the request, apply it to data (Model) and finally to a template for visualization a result (View).

The format is similar to the syntax of [Symfony](https://symfony.com/doc/current/routing.html) YAML based Routing.

1. [Installation](#installation)
1. [Usage](#usage)
1. [Class `Router`](#class-router)
1. [Writing routes](#writing-routes)
1. [Writing controllers](#writing-controllers)
1. [Writing templates](#writing-templates)
1. [Demo](#demo)
1. [Tests](#tests)
1. [License](#license)

Installation
--

```bash
$ npm install express-routes-dispatcher --save
```

or

```bash
$ yarn add express-routes-dispatcher
```

Usage
--

The Router allows you to organize simple and clear MVC-architecture in your Node.js application. Structure of directories can be the next:

```
app/                          // Application root.
 ├─ modules/                  // The directory containing folders of modules.
 │   ├─ Users/                // Module "Users"
 │   │   ├─ controllers/      // Controllers of the module.
 │   │   ├─ models/           // Models of the module.
 │   │   ├─ views/            // Templates such as pages, partials or blocks (BEM) of the module.
 │   │   └─ routing.js        // Routing of the module.
 │   └─ •••                   // Other modules.
 ├─ views/                    // Common templates such as static pages, partials or blocks (BEM).
 ├─ config.js                 // Config file.
 ├─ index.js                  // The entry point of the application.
 └─ routes.js                 // Base routing file. Includes common static pages and routing files of modules.
```

The entry point of the application is `index.js`. It processes all HTTP-requests.

File `routes.js` describes the URLs, controllers for processing requests by this URLs and templates to returning response data by the controller.

See [the example of application](examples/).

Class `Router`
--

The main class allowing to create and to start router of your application.

### Constructor

`new Router(routes, options)` returns instance of the Router.

| Parameter | Type | Default | Description |
| --------- | :--: | :-----: | ----------- |
| `routes` | *Object* | — | **Required.** Object with routes description. |
| `options` | *Object* | — | Additional options. |
| `options.baseDir` | *String* | [\_\_dirname](https://nodejs.org/api/globals.html#globals_dirname) | Base directory to resolve relative paths, such as `publicDir`, `viewsDir` and paths of routes from `routes`. |
| `options.debug` | *Boolean* | `false` | If `true` the additional route [http://localhost:3000/\_\_routes\_\_/](http://localhost:3000/__routes__/) with map of all routes in JSON-format is available. |
| `options.host` | *String* | `'localhost'` | A domain name or IP address of the server. |
| `options.port` | *Number* | `3000` | Port of the server. |
| `options.protocol` | *String* | `'http'` | Protocol to use. |
| `options.publicDir` | *String* | `'public'` | Public directory. |
| `options.publicPath` | *String* | `'/'` | URL prefix to access to the public directory. |
| `options.viewsDir` | *String* | `'views'` | A directory for the application's views. |

```javascript
import Router from 'express-routes-dispatcher';
import routes from 'routes.js';

const router = new Router(routes);
```

### Methods

**`start(cb)`** starts and returns instance of Node.js server. Use this instance to stop server by method `close()`.

Function `cb` will be called after successful starting.

```javascript
const server = router.start(({ host, port, protocol }) => {
    console.log(`Server on ${protocol}://${host}:${port} was started.`);
}); // -> "Server on http://localhost:3000 was started."
```

**`close(cb)`** stops server.

```javascript
const server = router.start();

/* ... */

server.close(({ host, port, protocol }) => {
    console.log(`Server on ${protocol}://${host}:${port} was stoped.`);
}); // -> "Server on http://localhost:3000 was stoped."
```

Writing routes
--

A routes map is an object with routes names as keys and object of routes descriptions as values.

### Formal syntax

```
/* Inline routing description */

{
    <route name>: {
        path: <URL>,

        controller: <a path to the controller function>,
        defaults: {
            _format: <the format of a response>,
            _template: <a path to the template>,
            <pairs 'key-value' to define default values of parameters from the path>,
        },
        methods: <an array of allowed methods for requests>,
        requirements: {
            <pairs 'key-value' to define requirements for values of parameters from the path>,
        },
    },
    ...
}
```

`<route name>` is a string. It should be unique, otherwise, a last declared route with the same name will override earlier ones.

| Parameter | Type | Default | Description |
| --------- | :--: | :-----: | ----------- |
| `path` | *String* | — | **Required.** A pattern of URL path includes dynamic params enclosed in braces. For example, `/user/{id}/`. |
| `controller` | *String* | — | A path to the controller function. |
| `defaults` | *Object* | — | An object containing the following options: |
| `defaults._format` | *String* | `'json'` | The format of the response. |
| `defaults._template` | *String* | — | A path to template. |
| `defaults.<param>` | *Number\|String* | — | Default values of dynamic params from `path`. |
| `methods` | *Array\<String\>* | `['get', 'post']` | An array of allowed methods for requests. Available values you can find [here](http://expressjs.com/en/4x/api.html#routing-methods). |
| `requirements` | *Object* | `{}` | An object containing the following options: |
| `requirements.<param>` | *String* | — | Requirements for dynamic params from `path`. |

```
/* External routing description */

{
    <routes branch name>: {
        resource: <a path to the file of external routing description>,

        prefix: <prefix for parameter 'path' of plugged routes>,
    },
    ...
}
```

`<routes branch name>` is a string. It should be also unique.

| Parameter | Type | Default | Description |
| --------- | :--: | :-----: | ----------- |
| `resource` | *String* | — | **Required.** A path to the file of external routing description. |
| `prefix` | *String* | — | Prefix for parameter 'path' of plugged routes. |

Writing controllers
--

Controller is a function which accepts as a parameter the object [`request`](http://expressjs.com/en/4x/api.html#req) and returns data object. This data will be able in the template.

**Example**

```javascript
/* controller.js */

module.exports = (request) => {
    const { params: { id } } = request;

    return {
        data: {
            id: id,
        },
    };
};
```

```twig
{# index.twig #}

<p>Parameter "id" from URL is {{ data.id }}</p>
```

Writing templates
--

Twig is a powerful template engine. More about it you can read [in official documentation](https://twig.symfony.com/doc/2.x/).

For all templates are available some global variables and functions.

### Twig constants

**`__route`** is an object which contains parameters of the current route.

| Parameter | Type | Description |
| --------- | :----: | ----------- |
| `__route.host` | *String* | Hostname. |
| `__route.name` | *String* | Name of the route. You can use it for example to detect a current item of the menu. |
| `__route.params` | *Object* | Object with parameters geted from the URL. |
| `__route.path` | *String* | The `path` part of the route. |
| `__route.protocol` | *'http'\|'https'* | Protocol. |
| `__route.query` | *Object* | Object with GET-params from the URL. |
| `__route.subdomains` | *Array<String>* | Array of subdomains. |
| `__route.url` | *String* | The whole request URL includes GET-params. |

**Example:**

```twig
{% if (__route.name == 'main') %}
    <span>Main page</span>
{% else %}
    <a href="{{ path('main') }}">Main page</a>
{% endif %}
```

### Twig tags

**`render`** is a tag which can render a controller inside another one.

Syntax:

```twig
{% render <controller> with <params> %}
```

| Parameter | Type | Description |
| --------- | :----: | ----------- |
| `controller` | *String* | **Required.** A path to the controller function. |
| `params` | *Object* | Additional parameters. |
| `options.template` | *String* | **Required.** A path to the template. |

**Example:**

```twig
{# views/index.twig #}

<h1>Page template</h1>

{% render 'controller/partials' with {
    template: 'views/partials.twig',
}) %}
```

```javascript
/* controller/partials.js */

module.exports = () => {
    return {
        data: {
            foo: 'baz',
        },
    };
};
```

```twig
{# views/partials.twig #}

<h2>Partials template</h2>

<p>foo: {{ data.foo }}</p>
```

In final HTML document we will get:

```html
<h1>Page template</h1>

<h2>Partials template</h2>

<p>foo: baz</p>
```

### Twig functions

**`path(name, options)`** is a function returns a generated URL by route name. Accepted parameters:

| Parameter | Type | Description |
| --------- | :----: | ----------- |
| `name` | *String* | **Required.** Name of routing to generate URL. |
| `options` | *Object* | Additional options. |
| `options.hash` | *String* | Fragment, separated from the preceding part by a hash `#`. |
| `options.params` | *Object* | 'Key-value' pairs to define values of parameters for the path. |
| `options.query` | *Object* | 'Key-value' pairs to define values of GET-parameters. |

**Example:**

```javascript
/* routes.js */

module.exports = {
    profile: {
        path: '/users/profile/{id}/',
    },
};
```

```twig
{# views/pages/index.twig #}

<a href="{{ path('profile', {
    hash: 'name',
    params: {
        id: '1a2s564ws',
    },
    query: {
        tab: 'info',
    },
}) }}">My profile</a>
```

In a browser you'll see:

```html
<a href="/users/profile/1a2s564ws/?tab=info#info">My profile</a>
```

Demo
--

You can try it on the example application. To launch:

```bash
$ git clone https://github.com/ahtohbi4/express-routes-dispatcher.git
$ cd express-routes-dispatcher
$ yarn install
$ yarn start
```

Then open [http://localhost:3000](http://localhost:3000) in your favorite browser.

> :warning: The demo application uses [CSS Grid Layout](https://caniuse.com/#feat=css-grid).

Tests
--

```bash
$ git clone https://github.com/ahtohbi4/express-routes-dispatcher.git
$ cd express-routes-dispatcher
$ yarn install
$ yarn test
```

License
--

MIT © Alexander Antonov <alexandr-post@yandex.ru>
