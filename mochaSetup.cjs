const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<main class="app"></main>', {
    url: 'http://localhost:3000',
})

global.window = jsdom.window
global.document = jsdom.window.document
global.FormData = jsdom.window.FormData
global.DocumentFragment = window.DocumentFragment
