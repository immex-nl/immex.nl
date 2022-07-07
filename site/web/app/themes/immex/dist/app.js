/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@roots/bud-server/lib/cjs/client/bridge.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n/* eslint-disable no-console */\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.setOptionsAndConnect = exports.useCustomOverlay = exports.subscribe = exports.subscribeAll = void 0;\nvar options = {\n    path: '/__bud/hmr',\n    timeout: 20 * 1000,\n    overlay: true,\n    reload: false,\n    log: true,\n    warn: true,\n    name: '',\n    autoConnect: true,\n    overlayStyles: {},\n    overlayWarnings: false,\n    ansiColors: {},\n};\n//@ts-ignore\nif (false) { var overrides, querystring; }\nif (typeof window === 'undefined') {\n    // do nothing\n}\nelse if (typeof window.EventSource === 'undefined') {\n    console.warn(\"webpack-hot-middleware's client requires EventSource to work. \" +\n        'You should include a polyfill if you want to support this browser: ' +\n        'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools');\n}\nelse {\n    if (options.autoConnect) {\n        connect();\n    }\n}\nfunction setOverrides(overrides) {\n    if (overrides.autoConnect)\n        options.autoConnect = overrides.autoConnect == 'true';\n    if (overrides.path)\n        options.path = overrides.path;\n    if (overrides.timeout)\n        options.timeout = overrides.timeout;\n    if (overrides.overlay)\n        options.overlay = overrides.overlay !== 'false';\n    if (overrides.reload)\n        options.reload = overrides.reload !== 'false';\n    if (overrides.noInfo && overrides.noInfo !== 'false') {\n        options.log = false;\n    }\n    if (overrides.name) {\n        options.name = overrides.name;\n    }\n    if (overrides.quiet && overrides.quiet !== 'false') {\n        options.log = false;\n        options.warn = false;\n    }\n    if (overrides.dynamicPublicPath) {\n        // @ts-ignore\n        options.path = __webpack_require__.p + options.path;\n    }\n    if (overrides.ansiColors)\n        options.ansiColors = JSON.parse(overrides.ansiColors);\n    if (overrides.overlayStyles)\n        options.overlayStyles = JSON.parse(overrides.overlayStyles);\n    if (overrides.overlayWarnings) {\n        options.overlayWarnings = overrides.overlayWarnings == 'true';\n    }\n}\nfunction EventSourceWrapper() {\n    var source;\n    var lastActivity = new Date();\n    var listeners = [];\n    init();\n    var timer = setInterval(function () {\n        // @ts-ignore\n        if (new Date() - lastActivity > options.timeout) {\n            handleDisconnect();\n        }\n    }, options.timeout / 2);\n    function init() {\n        source = new window.EventSource(options.path);\n        source.onopen = handleOnline;\n        source.onerror = handleDisconnect;\n        source.onmessage = handleMessage;\n    }\n    function handleOnline() {\n        if (options.log)\n            console.log('[HMR] connected');\n        lastActivity = new Date();\n    }\n    function handleMessage(event) {\n        lastActivity = new Date();\n        for (var i = 0; i < listeners.length; i++) {\n            listeners[i](event);\n        }\n    }\n    function handleDisconnect() {\n        clearInterval(timer);\n        source.close();\n        setTimeout(init, options.timeout);\n    }\n    return {\n        addMessageListener: function (fn) {\n            listeners.push(fn);\n        },\n    };\n}\nfunction getEventSourceWrapper() {\n    // @ts-ignore\n    if (!window.__whmEventSourceWrapper) {\n        // @ts-ignore\n        window.__whmEventSourceWrapper = {};\n    }\n    // @ts-ignore\n    if (!window.__whmEventSourceWrapper[options.path]) {\n        // cache the wrapper for other entries loaded on\n        // the same page with the same options.path\n        // @ts-ignore\n        window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();\n    }\n    // @ts-ignore\n    return window.__whmEventSourceWrapper[options.path];\n}\nfunction connect() {\n    getEventSourceWrapper().addMessageListener(handleMessage);\n    function handleMessage(event) {\n        if (event.data == '\\uD83D\\uDC93') {\n            return;\n        }\n        try {\n            processMessage(JSON.parse(event.data));\n        }\n        catch (ex) {\n            if (options.warn) {\n                console.warn('Invalid HMR message: ' + event.data + '\\n' + ex);\n            }\n        }\n    }\n}\n// the reporter needs to be a singleton on the page\n// in case the client is being used by multiple bundles\n// we only want to report once.\n// all the errors will go to all clients\nvar singletonKey = '__webpack_hot_middleware_reporter__';\nvar reporter;\nif (typeof window !== 'undefined') {\n    if (!window[singletonKey]) {\n        window[singletonKey] = createReporter();\n    }\n    reporter = window[singletonKey];\n}\nfunction createReporter() {\n    var strip = __webpack_require__(\"./node_modules/@roots/bud-server/node_modules/strip-ansi/index.js\");\n    var overlay;\n    var styles = {\n        errors: 'color: #ff0000;',\n        warnings: 'color: #999933;',\n    };\n    var previousProblems = null;\n    function log(type, obj) {\n        var newProblems = obj[type]\n            .map(function (problem) {\n            var isNested = typeof problem === 'object';\n            var message = isNested ? problem.message : problem;\n            return strip(message);\n        })\n            .join('\\n');\n        if (previousProblems == newProblems) {\n            return;\n        }\n        else {\n            previousProblems = newProblems;\n        }\n        var style = styles[type];\n        var name = obj.name ? \"'\" + obj.name + \"' \" : '';\n        var title = '[HMR] bundle ' + name + 'has ' + obj[type].length + ' ' + type;\n        // NOTE: console.warn or console.error will print the stack trace\n        // which isn't helpful here, so using console.log to escape it.\n        if (console.group && console.groupEnd) {\n            console.group('%c' + title, style);\n            console.log('%c' + newProblems, style);\n            console.groupEnd();\n        }\n        else {\n            console.log('%c' + title + '\\n\\t%c' + newProblems.replace(/\\n/g, '\\n\\t'), style + 'font-weight: bold;', style + 'font-weight: normal;');\n        }\n    }\n    return {\n        cleanProblemsCache: function () {\n            previousProblems = null;\n        },\n        problems: function (type, obj) {\n            if (options.warn) {\n                log(type, obj);\n            }\n            if (overlay) {\n                if (options.overlayWarnings || type === 'errors') {\n                    overlay.showProblems(type, obj[type]);\n                    return false;\n                }\n                overlay.clear();\n            }\n            return true;\n        },\n        success: function () {\n            if (overlay)\n                overlay.clear();\n        },\n        useCustomOverlay: function (customOverlay) {\n            overlay = customOverlay;\n        },\n    };\n}\nvar processUpdate = __webpack_require__(\"./node_modules/@roots/bud-server/lib/cjs/client/process-update.js\");\nvar customHandler;\nvar subscribeAllHandler;\nfunction processMessage(obj) {\n    switch (obj.action) {\n        case 'building':\n            if (options.log) {\n                console.log('[HMR] bundle ' +\n                    (obj.name ? \"'\" + obj.name + \"' \" : '') +\n                    'rebuilding');\n            }\n            break;\n        case 'built':\n            if (options.log) {\n                console.log('[HMR] bundle ' +\n                    (obj.name ? \"'\" + obj.name + \"' \" : '') +\n                    'rebuilt in ' +\n                    obj.time +\n                    'ms');\n            }\n        // fall through\n        case 'sync':\n            if (obj.name && options.name && obj.name !== options.name) {\n                return;\n            }\n            var applyUpdate = true;\n            if (obj.errors.length > 0) {\n                if (reporter)\n                    reporter.problems('errors', obj);\n                applyUpdate = false;\n            }\n            else if (obj.warnings.length > 0) {\n                if (reporter) {\n                    var overlayShown = reporter.problems('warnings', obj);\n                    applyUpdate = overlayShown;\n                }\n            }\n            else {\n                if (reporter) {\n                    reporter.cleanProblemsCache();\n                    reporter.success();\n                }\n            }\n            if (applyUpdate) {\n                processUpdate(obj.hash, obj.modules, options);\n            }\n            break;\n        default:\n            if (customHandler) {\n                customHandler(obj);\n            }\n    }\n    if (subscribeAllHandler) {\n        subscribeAllHandler(obj);\n    }\n}\nfunction subscribeAll(handler) {\n    subscribeAllHandler = handler;\n}\nexports.subscribeAll = subscribeAll;\nfunction subscribe(handler) {\n    customHandler = handler;\n}\nexports.subscribe = subscribe;\nfunction useCustomOverlay(customOverlay) {\n    if (reporter)\n        reporter.useCustomOverlay(customOverlay);\n}\nexports.useCustomOverlay = useCustomOverlay;\nfunction setOptionsAndConnect(overrides) {\n    setOverrides(overrides);\n    connect();\n}\nexports.setOptionsAndConnect = setOptionsAndConnect;\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/lib/cjs/client/bridge.js?");

/***/ }),

/***/ "./node_modules/@roots/bud-server/lib/cjs/client/index.js?name=bud&bud.overlay=true&bud.indicator=true&path=/__bud/hmr":
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("var __resourceQuery = \"?name=bud&bud.overlay=true&bud.indicator=true&path=/__bud/hmr\";\n/* eslint-disable no-console */\n/* global __resourceQuery */\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\n;\n(async (query) => {\n    const querystring = await Promise.resolve().then(() => __importStar(__webpack_require__(\"./node_modules/querystring/index.js\")));\n    const hmr = await Promise.resolve().then(() => __importStar(__webpack_require__(\"./node_modules/@roots/bud-server/lib/cjs/client/bridge.js\")));\n    const controllers = [];\n    const FALLBACK_OPTS = {\n        ['bud.overlay']: true,\n        ['bud.indicator']: true,\n        autoConnect: false,\n        timeout: 20 * 1000,\n        overlay: false,\n        reload: false,\n        log: false,\n        warn: false,\n        name: '',\n        overlayWarnings: false,\n        path: '/__bud/hmr',\n    };\n    const options = Object.entries(querystring.parse(query.slice(1))).reduce((a, [k, v]) => {\n        if (v === 'true')\n            v = true;\n        if (v === 'false')\n            v = false;\n        return { ...a, [k]: v };\n    }, FALLBACK_OPTS);\n    hmr.setOptionsAndConnect(options);\n    if (options['bud.indicator']) {\n        const controllerModule = await Promise.resolve().then(() => __importStar(__webpack_require__(\"./node_modules/@roots/bud-server/lib/cjs/client/indicator/index.js\")));\n        const controller = await controllerModule.make();\n        controller?.update && controllers.push(controller);\n    }\n    if (options['bud.overlay']) {\n        const controllerModule = await Promise.resolve().then(() => __importStar(__webpack_require__(\"./node_modules/@roots/bud-server/lib/cjs/client/overlay/index.js\")));\n        const controller = await controllerModule.make();\n        controller?.update && controllers.push(controller);\n    }\n    hmr.subscribeAll(payload => {\n        if (!payload)\n            return;\n        console.table(payload);\n        payload.warnings?.map(console.warn);\n        payload.errors?.map(console.error);\n        controllers.map(controller => controller.update(payload));\n        if (payload.action === 'reload')\n            window.location.reload();\n    });\n})(\n// @ts-ignore\n__resourceQuery);\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/lib/cjs/client/index.js?");

/***/ }),

/***/ "./node_modules/@roots/bud-server/lib/cjs/client/indicator/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.make = void 0;\nconst make = async () => {\n    const { Controller } = await Promise.resolve().then(() => __importStar(__webpack_require__(\"./node_modules/@roots/bud-server/lib/cjs/client/indicator/indicator.controller.js\")));\n    const { Component } = await Promise.resolve().then(() => __importStar(__webpack_require__(\"./node_modules/@roots/bud-server/lib/cjs/client/indicator/indicator.component.js\")));\n    if (customElements.get('bud-activity-indicator'))\n        return;\n    customElements.define('bud-activity-indicator', Component);\n    return new Controller();\n};\nexports.make = make;\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/lib/cjs/client/indicator/index.js?");

/***/ }),

/***/ "./node_modules/@roots/bud-server/lib/cjs/client/indicator/indicator.component.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Component = void 0;\nconst indicator_pulse_1 = __webpack_require__(\"./node_modules/@roots/bud-server/lib/cjs/client/indicator/indicator.pulse.js\");\n/**\n * Indicator web component\n * @public\n */\nclass Component extends HTMLElement {\n    constructor() {\n        super(...arguments);\n        /**\n         * Component name\n         * @public\n         */\n        this.name = `bud-activity-indicator`;\n        /**\n         * Status indicator colors\n         * @public\n         */\n        this.colors = {\n            success: [4, 120, 87],\n            error: [220, 38, 38],\n            warn: [252, 211, 77],\n            pending: [59, 130, 246],\n        };\n    }\n    /**\n     * Get accessor: has errors\n     * @public\n     */\n    get hasErrors() {\n        return this.getAttribute('has-errors') == 'true';\n    }\n    /**\n     * Get accessor: has warnings\n     * @public\n     */\n    get hasWarnings() {\n        return this.getAttribute('has-warnings') == 'true';\n    }\n    /**\n     * Render status indicator\n     * @public\n     */\n    render() {\n        this.classList.add(this.name);\n        this.innerHTML = `\n    <style>\n      .${this.name} {\n        position: fixed;\n        width: 10px;\n        height: 10px;\n        left: 10px;\n        bottom: 10px;\n        z-index: 9998;\n        margin: 10px;\n        padding: 5px;\n        transition: opacity ease 1500ms;\n        pointer-events: none;\n        border-radius: 50%;\n      }\n\n      ${(0, indicator_pulse_1.pulse)(`${this.name}__success`, this.colors.success)}\n      ${(0, indicator_pulse_1.pulse)(`${this.name}__error`, this.colors.error)}\n      ${(0, indicator_pulse_1.pulse)(`${this.name}__warning`, this.colors.warn)}\n      ${(0, indicator_pulse_1.pulse)(`${this.name}__pending`, this.colors.pending)}\n\n      .${this.name}__visible {\n        opacity: 1;\n      }\n\n      .${this.name}__hidden {\n        opacity: 0;\n      }\n    </style>\n    `;\n    }\n    /**\n     * Show status indicator\n     * @public\n     */\n    show() {\n        clearTimeout(this.hideTimeout);\n        this.classList.remove(`${this.name}__hidden`);\n    }\n    /**\n     * Hide status indicator\n     */\n    hide() {\n        this.hideTimeout = setTimeout(() => {\n            this.classList.remove(`${this.name}__error`, `${this.name}__warning`, `${this.name}__success`, `${this.name}__pending`);\n            this.classList.add(`${this.name}__hidden`);\n        }, 2000);\n    }\n    /**\n     * Status is pending\n     * @public\n     */\n    onPending() {\n        this.show();\n        this.classList.remove(`${this.name}__error`, `${this.name}__warning`, `${this.name}__success`);\n        this.classList.add(`${this.name}__pending`);\n        this.hide();\n    }\n    /**\n     * Status is success\n     * @public\n     */\n    onSuccess() {\n        this.show();\n        this.classList.remove(`${this.name}__error`, `${this.name}__warning`, `${this.name}__pending`);\n        this.classList.add(`${this.name}__success`);\n        this.hide();\n    }\n    /**\n     * Status is error\n     * @public\n     */\n    onError() {\n        this.show();\n        this.classList.remove(`${this.name}__warning`, `${this.name}__success`, `${this.name}__pending`);\n        this.classList.add(`${this.name}__error`);\n    }\n    /**\n     * Status is warning\n     * @public\n     */\n    onWarning() {\n        this.show();\n        this.classList.remove(`${this.name}__error`, `${this.name}__success`, `${this.name}__pending`);\n        this.classList.add(`${this.name}__warning`);\n    }\n    /**\n     * Update status\n     * @public\n     */\n    update() {\n        if (this.payload?.errors?.length)\n            return this.onError();\n        if (this.payload?.warnings?.length)\n            return this.onWarning();\n        if (!this.payload?.errors?.length &&\n            !this.payload?.warnings?.length &&\n            this.payload.action == 'built')\n            return this.onSuccess();\n        if (this.payload?.action == 'building' ||\n            this.payload?.action == 'sync')\n            return this.onPending();\n    }\n    static get observedAttributes() {\n        return ['has-errors', 'has-warnings', 'action'];\n    }\n    attributeChangedCallback() {\n        this.update();\n    }\n    connectedCallback() {\n        if (!this.rendered) {\n            this.render();\n            this.rendered = true;\n        }\n    }\n}\nexports.Component = Component;\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/lib/cjs/client/indicator/indicator.component.js?");

/***/ }),

/***/ "./node_modules/@roots/bud-server/lib/cjs/client/indicator/indicator.controller.js":
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Controller = void 0;\n/**\n * Activity indicator controller\n * @public\n */\nclass Controller {\n    /**\n     * Initialization\n     * @public\n     */\n    constructor() {\n        /**\n         * DOM node\n         * @public\n         */\n        this.node = null;\n        /**\n         * Active WHM payload\n         * @public\n         */\n        this.payload = null;\n        this.node = document.createElement('bud-activity-indicator');\n        document.body && document.body.appendChild(this.node);\n    }\n    /**\n     * Update activity indicator\n     * @public\n     */\n    update(payload) {\n        this.node.payload = payload;\n        this.node.setAttribute('has-warnings', payload.errors?.length);\n        this.node.setAttribute('has-errors', payload.warnings?.length);\n    }\n}\nexports.Controller = Controller;\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/lib/cjs/client/indicator/indicator.controller.js?");

/***/ }),

/***/ "./node_modules/@roots/bud-server/lib/cjs/client/indicator/indicator.pulse.js":
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.pulse = void 0;\n/**\n * CSS animation for reload indicator\n * @public\n */\nconst pulse = (name, color) => `\n  .${name} {\n    transform: scale(1);\n    background: rgba(${color[0]}, ${color[1]}, ${color[2]}, 1);\n    box-shadow: 0 0 0 0 rgba(${color[0]}, ${color[1]}, ${color[2]}, 1);\n    animation: ${name}__pulse 2s infinite;\n  }\n\n  @keyframes ${name}__pulse {\n    0% {\n      transform: scale(0.95);\n      box-shadow: 0 0 0 0 rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.7);\n    }\n\n    70% {\n      transform: scale(1);\n      box-shadow: 0 0 0 10px rgba(${color[0]}, ${color[1]}, ${color[2]}, 0);\n    }\n\n    100% {\n      transform: scale(0.95);\n      box-shadow: 0 0 0 0 rgba(${color[0]}, ${color[1]}, ${color[2]}, 0);\n    }\n  }\n`;\nexports.pulse = pulse;\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/lib/cjs/client/indicator/indicator.pulse.js?");

/***/ }),

/***/ "./node_modules/@roots/bud-server/lib/cjs/client/overlay/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.make = void 0;\nconst make = async () => {\n    const { Controller } = await Promise.resolve().then(() => __importStar(__webpack_require__(\"./node_modules/@roots/bud-server/lib/cjs/client/overlay/overlay.controller.js\")));\n    const { Component } = await Promise.resolve().then(() => __importStar(__webpack_require__(\"./node_modules/@roots/bud-server/lib/cjs/client/overlay/overlay.component.js\")));\n    if (customElements.get('bud-error'))\n        return;\n    customElements.define('bud-error', Component);\n    return new Controller();\n};\nexports.make = make;\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/lib/cjs/client/overlay/index.js?");

/***/ }),

/***/ "./node_modules/@roots/bud-server/lib/cjs/client/overlay/overlay.component.js":
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Component = void 0;\n/**\n * Component container\n *\n * @public\n */\nclass Component extends HTMLElement {\n    constructor() {\n        super(...arguments);\n        this.name = `bud-overlay`;\n    }\n    get message() {\n        return this.getAttribute('message');\n    }\n    /**\n     * Render component\n     *\n     * @public\n     */\n    render() {\n        this.rendered = true;\n        this.classList.add(this.name);\n    }\n    setInnerHtml(content) {\n        this.innerHTML = `\n    <style>\n      .${this.name} {\n        display: none;\n        width: 100vw;\n        height: 100vh;\n        overflow-x: hidden;\n        overflow-y: scroll;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        transition: all 0.2s ease-in-out;\n        justify-content: center;\n      }\n      .${this.name}__visible {\n        backdrop-filter: blur(10px);\n        background: rgba(255, 255, 255, 0.75);\n        border-top: 3px solid red;\n        display: flex;\n        align-items: center;\n        align-content: center;\n        flex-direction: column;\n        transition: all 0.2s ease-in-out;\n      }\n      .${this.name} > div {\n        align-items: center;\n        align-content: center;\n        flex-direction: column;\n        padding: 1rem;\n      }\n      .${this.name} > div > * {\n        display: inline-block;\n        width: 100vw;\n        padding: 1rem;\n      }\n      .${this.name} > div > span {\n        font-size: 1.5rem;\n        font-weight: 500;\n      }\n      .${this.name} > div > pre {\n        font-size: 0.8rem;\n        overflow-x: scroll;\n      }\n    </style>\n    ${content ?? ''}\n  `;\n    }\n    static get observedAttributes() {\n        return ['message'];\n    }\n    attributeChangedCallback() {\n        if (this.getAttribute('message')) {\n            document.body.style.overflow = 'hidden';\n            !this.classList.contains(`${this.name}__visible`) &&\n                this.classList.add(`${this.name}__visible`);\n            return this.setInnerHtml(this.getAttribute('message'));\n        }\n        document.body.style.overflow = this.documentBodyStyle.overflow;\n        this.classList.contains(`${this.name}__visible`) &&\n            this.classList.remove(`${this.name}__visible`);\n    }\n    connectedCallback() {\n        this.documentBodyStyle = document.body.style;\n        if (this.rendered)\n            return;\n        this.render();\n    }\n}\nexports.Component = Component;\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/lib/cjs/client/overlay/overlay.component.js?");

/***/ }),

/***/ "./node_modules/@roots/bud-server/lib/cjs/client/overlay/overlay.controller.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Controller = void 0;\nconst strip_ansi_1 = __importDefault(__webpack_require__(\"./node_modules/@roots/bud-server/node_modules/strip-ansi/index.js\"));\n/**\n * Overlay controller\n * @public\n */\nclass Controller {\n    /**\n     * Class constructor\n     * @public\n     */\n    constructor() {\n        this.element = document.createElement('bud-error');\n        document.body && document.body.appendChild(this.element);\n    }\n    /**\n     * Formatted error message\n     * @public\n     */\n    get message() {\n        return this.payload.errors?.reduce((a, c) => `${a}\n        <div>\n          <span>${c?.title ?? 'Compilation error'}</span>\n          <pre>${(0, strip_ansi_1.default)(c?.message) ?? ''}</pre>\n        </div>`, ``);\n    }\n    /**\n     * Update element\n     * @public\n     */\n    update(payload) {\n        this.payload = payload;\n        this.element.setAttribute('message', this.message ?? ``);\n    }\n}\nexports.Controller = Controller;\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/lib/cjs/client/overlay/overlay.controller.js?");

/***/ }),

/***/ "./node_modules/@roots/bud-server/lib/cjs/client/process-update.js":
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/* eslint-disable no-console */\n/**\n * Based heavily on https://github.com/webpack/webpack/blob/\n *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js\n * Original copyright Tobias Koppers `@sokra` (MIT license)\n */\n/* global window __webpack_hash__ */\nif (false) {}\nvar hmrDocsUrl = 'https://webpack.js.org/concepts/hot-module-replacement/'; // eslint-disable-line max-len\nvar lastHash;\nvar failureStatuses = { abort: 1, fail: 1 };\nfunction upToDate(hash) {\n    if (hash)\n        lastHash = hash;\n    return lastHash == __webpack_require__.h();\n}\nmodule.exports = function (hash, moduleMap, options) {\n    var reload = options.reload;\n    if (!upToDate(hash) && module.hot.status() == 'idle') {\n        if (options.log)\n            console.log('[HMR] Checking for updates on the server...');\n        check();\n    }\n    function check() {\n        var cb = function (err, updatedModules) {\n            if (err)\n                return handleError(err);\n            if (!updatedModules) {\n                if (options.warn) {\n                    console.warn('[HMR] Cannot find update (Full reload needed)');\n                    console.warn('[HMR] (Probably because of restarting the server)');\n                }\n                performReload();\n                return null;\n            }\n            var failedUpdate = false;\n            var applyCallback = function (applyErr, renewedModules) {\n                if (applyErr)\n                    return handleError(applyErr);\n                if (!upToDate())\n                    check();\n                logUpdates(updatedModules, renewedModules);\n                if (failedUpdate) {\n                    performReload();\n                }\n            };\n            var applyOptions = {\n                ignoreUnaccepted: true,\n                ignoreDeclined: true,\n                ignoreErrored: true,\n                onUnaccepted: function (data) {\n                    console.warn('Ignored an update to unaccepted module ' +\n                        data.chain.join(' -> '));\n                    failedUpdate = true;\n                },\n                onDeclined: function (data) {\n                    console.warn('Ignored an update to declined module ' +\n                        data.chain.join(' -> '));\n                    failedUpdate = true;\n                },\n                onErrored: function (data) {\n                    console.error(data.error);\n                    console.warn('Ignored an error while updating module ' +\n                        data.moduleId +\n                        ' (' +\n                        data.type +\n                        ')');\n                    failedUpdate = true;\n                },\n            };\n            var applyResult = module.hot.apply(applyOptions, applyCallback);\n            // webpack 2 promise\n            if (applyResult && applyResult.then) {\n                // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`\n                applyResult.then(function (outdatedModules) {\n                    applyCallback(null, outdatedModules);\n                });\n                applyResult.catch(applyCallback);\n            }\n        };\n        var result = module.hot.check(false, cb);\n        // webpack 2 promise\n        if (result && result.then) {\n            result.then(function (updatedModules) {\n                cb(null, updatedModules);\n            });\n            result.catch(cb);\n        }\n    }\n    function logUpdates(updatedModules, renewedModules) {\n        var unacceptedModules = updatedModules.filter(function (moduleId) {\n            return renewedModules && renewedModules.indexOf(moduleId) < 0;\n        });\n        if (unacceptedModules.length > 0) {\n            if (options.warn) {\n                console.warn(\"[HMR] The following modules couldn't be hot updated: \" +\n                    '(Full reload needed)\\n' +\n                    'This is usually because the modules which have changed ' +\n                    '(and their parents) do not know how to hot reload themselves. ' +\n                    'See ' +\n                    hmrDocsUrl +\n                    ' for more details.');\n                unacceptedModules.forEach(function (moduleId) {\n                    console.warn('[HMR]  - ' + (moduleMap[moduleId] || moduleId));\n                });\n            }\n            performReload();\n            return;\n        }\n        if (options.log) {\n            if (!renewedModules || renewedModules.length === 0) {\n                console.log('[HMR] Nothing hot updated.');\n            }\n            else {\n                console.log('[HMR] Updated modules:');\n                renewedModules.forEach(function (moduleId) {\n                    console.log('[HMR]  - ' + (moduleMap[moduleId] || moduleId));\n                });\n            }\n            if (upToDate()) {\n                console.log('[HMR] App is up to date.');\n            }\n        }\n    }\n    function handleError(err) {\n        if (module.hot.status() in failureStatuses) {\n            if (options.warn) {\n                console.warn('[HMR] Cannot check for update (Full reload needed)');\n                console.warn('[HMR] ' + (err.stack || err.message));\n            }\n            performReload();\n            return;\n        }\n        if (options.warn) {\n            console.warn('[HMR] Update check failed: ' + (err.stack || err.message));\n        }\n    }\n    function performReload() {\n        if (reload) {\n            if (options.warn)\n                console.warn('[HMR] Reloading page');\n            window.location.reload();\n        }\n    }\n};\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/lib/cjs/client/process-update.js?");

/***/ }),

/***/ "./node_modules/@roots/bud-server/lib/cjs/client/proxy-click-interceptor.js":
/***/ (function() {

eval("/* eslint-disable no-console */\nconst main = async (proxy = null) => {\n    try {\n        const { headers } = await fetch(window.location.href, { method: 'GET' });\n        proxy = new URL(headers.get('x-bud-proxy-origin')).href;\n    }\n    catch (err) {\n        return console.error(`There was an issue requesting ${window.location.href} (it should be the current page).`, err);\n    }\n    try {\n        setInterval(() => [\n            [document.getElementsByTagName('a'), 'href'],\n            [document.getElementsByTagName('link'), 'href'],\n        ]\n            .map(([elements, attribute]) => [Array.from(elements), attribute])\n            .forEach(([elements, attribute]) => elements\n            .filter(el => el.hasAttribute(attribute))\n            .filter(el => !el.hasAttribute('__bud_processed'))\n            .filter(el => el.getAttribute(attribute).startsWith(proxy))\n            .map(el => {\n            const value = el.getAttribute(attribute);\n            console.info(`replacing ${attribute} on ${el.tagName} with value of ${value}`);\n            el.setAttribute(attribute, value.replace(proxy, '/'));\n            el.setAttribute('__bud_processed', '');\n        })), 1000);\n    }\n    catch (err) {\n        return console.error(`There was a problem replacing hrefs for the proxied server. Exiting script early.`, err);\n    }\n};\n(async () => window.requestAnimationFrame(async function ready() {\n    return document.body\n        ? await main()\n        : window.requestAnimationFrame(ready);\n}))();\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/lib/cjs/client/proxy-click-interceptor.js?");

/***/ }),

/***/ 978:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst domReady = onReady => {\n    window.requestAnimationFrame(function check() {\n        document.body ? onReady() : window.requestAnimationFrame(check);\n    });\n};\nexports[\"default\"] = domReady;\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/sage/lib/cjs/client/dom-ready.js?");

/***/ }),

/***/ 194:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.domReady = void 0;\nconst dom_ready_1 = __importDefault(__webpack_require__(978));\nexports.domReady = dom_ready_1.default;\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/sage/lib/cjs/client/index.js?");

/***/ }),

/***/ "./node_modules/querystring/decode.js":
/***/ (function(module) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\n// If obj.hasOwnProperty has been overridden, then calling\n// obj.hasOwnProperty(prop) will break.\n// See: https://github.com/joyent/node/issues/1707\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\nmodule.exports = function(qs, sep, eq, options) {\n  sep = sep || '&';\n  eq = eq || '=';\n  var obj = {};\n\n  if (typeof qs !== 'string' || qs.length === 0) {\n    return obj;\n  }\n\n  var regexp = /\\+/g;\n  qs = qs.split(sep);\n\n  var maxKeys = 1000;\n  if (options && typeof options.maxKeys === 'number') {\n    maxKeys = options.maxKeys;\n  }\n\n  var len = qs.length;\n  // maxKeys <= 0 means that we should not limit keys count\n  if (maxKeys > 0 && len > maxKeys) {\n    len = maxKeys;\n  }\n\n  for (var i = 0; i < len; ++i) {\n    var x = qs[i].replace(regexp, '%20'),\n        idx = x.indexOf(eq),\n        kstr, vstr, k, v;\n\n    if (idx >= 0) {\n      kstr = x.substr(0, idx);\n      vstr = x.substr(idx + 1);\n    } else {\n      kstr = x;\n      vstr = '';\n    }\n\n    k = decodeURIComponent(kstr);\n    v = decodeURIComponent(vstr);\n\n    if (!hasOwnProperty(obj, k)) {\n      obj[k] = v;\n    } else if (Array.isArray(obj[k])) {\n      obj[k].push(v);\n    } else {\n      obj[k] = [obj[k], v];\n    }\n  }\n\n  return obj;\n};\n\n\n//# sourceURL=webpack://sage/./node_modules/querystring/decode.js?");

/***/ }),

/***/ "./node_modules/querystring/encode.js":
/***/ (function(module) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar stringifyPrimitive = function(v) {\n  switch (typeof v) {\n    case 'string':\n      return v;\n\n    case 'boolean':\n      return v ? 'true' : 'false';\n\n    case 'number':\n      return isFinite(v) ? v : '';\n\n    default:\n      return '';\n  }\n};\n\nmodule.exports = function(obj, sep, eq, name) {\n  sep = sep || '&';\n  eq = eq || '=';\n  if (obj === null) {\n    obj = undefined;\n  }\n\n  if (typeof obj === 'object') {\n    return Object.keys(obj).map(function(k) {\n      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;\n      if (Array.isArray(obj[k])) {\n        return obj[k].map(function(v) {\n          return ks + encodeURIComponent(stringifyPrimitive(v));\n        }).join(sep);\n      } else {\n        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));\n      }\n    }).filter(Boolean).join(sep);\n\n  }\n\n  if (!name) return '';\n  return encodeURIComponent(stringifyPrimitive(name)) + eq +\n         encodeURIComponent(stringifyPrimitive(obj));\n};\n\n\n//# sourceURL=webpack://sage/./node_modules/querystring/encode.js?");

/***/ }),

/***/ "./node_modules/querystring/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.decode = exports.parse = __webpack_require__(\"./node_modules/querystring/decode.js\");\nexports.encode = exports.stringify = __webpack_require__(\"./node_modules/querystring/encode.js\");\n\n\n//# sourceURL=webpack://sage/./node_modules/querystring/index.js?");

/***/ }),

/***/ "./resources/scripts/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _roots_sage_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(194);\n/* harmony import */ var _roots_sage_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_roots_sage_client__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/**\n * app.main\n */\nconst main = async (err) => {\n  if (err) {\n    // handle hmr errors\n    console.error(err);\n  }\n\n  // application code\n};\n\n/**\n * Initialize\n *\n * @see https://webpack.js.org/api/hot-module-replacement\n */\n(0,_roots_sage_client__WEBPACK_IMPORTED_MODULE_0__.domReady)(main);\nmodule.hot.accept(main);\n\n\n//# sourceURL=webpack://sage/./resources/scripts/app.js?");

/***/ }),

/***/ "./resources/styles/app.scss":
/***/ (function() {

eval("//@import \"~bulma\";\n\n\n//# sourceURL=webpack://sage/./resources/styles/app.scss?");

/***/ }),

/***/ "./node_modules/@roots/bud-server/node_modules/ansi-regex/index.js":
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ansiRegex; }\n/* harmony export */ });\nfunction ansiRegex({onlyFirst = false} = {}) {\n\tconst pattern = [\n\t    '[\\\\u001B\\\\u009B][[\\\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]+)*|[a-zA-Z\\\\d]+(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]*)*)?\\\\u0007)',\n\t\t'(?:(?:\\\\d{1,4}(?:;\\\\d{0,4})*)?[\\\\dA-PR-TZcf-ntqry=><~]))'\n\t].join('|');\n\n\treturn new RegExp(pattern, onlyFirst ? undefined : 'g');\n}\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/node_modules/ansi-regex/index.js?");

/***/ }),

/***/ "./node_modules/@roots/bud-server/node_modules/strip-ansi/index.js":
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ stripAnsi; }\n/* harmony export */ });\n/* harmony import */ var ansi_regex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./node_modules/@roots/bud-server/node_modules/ansi-regex/index.js\");\n\n\nfunction stripAnsi(string) {\n\tif (typeof string !== 'string') {\n\t\tthrow new TypeError(`Expected a \\`string\\`, got \\`${typeof string}\\``);\n\t}\n\n\treturn string.replace((0,ansi_regex__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(), '');\n}\n\n\n//# sourceURL=webpack://sage/./node_modules/@roots/bud-server/node_modules/strip-ansi/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	!function() {
/******/ 		__webpack_require__.hmrF = function() { return "app." + __webpack_require__.h() + ".hot-update.json"; };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "561e1c167a322793ee43"; }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "sage:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	!function() {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "/";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise(function(resolve, reject) {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = function(event) {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatesage"] = function(chunkId, moreModules, runtime) {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then(function(response) {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/@roots/bud-server/lib/cjs/client/index.js?name=bud&bud.overlay=true&bud.indicator=true&path=/__bud/hmr");
/******/ 	__webpack_require__("./node_modules/@roots/bud-server/lib/cjs/client/proxy-click-interceptor.js");
/******/ 	__webpack_require__("./resources/scripts/app.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/styles/app.scss");
/******/ 	
/******/ })()
;