bp-pre-puppeteer-node (SD HTMLRender)
===========================

Google, Facebook, Twitter, Bing, and Yahoo are constantly trying to view your website.. but they were unable to execute JavaScript. That's why we built SD HTMLRender. SD HTMLRender is perfect for AngularJS SEO, EmberJS SEO, BackboneJS SEO, and any other JavaScript frameworks.

This middleware intercepts requests to your Node.js website from crawlers, and then makes a call to puppeteer plugin to get the static HTML instead of the JavaScript on the page.

This lib requires at least Node v6.4.0, but the examples use async/await which is only supported in Node v7.6.0 or greater.

via npm:

    $ npm install bp-pre-puppeteer-node --save

And when you set up your express app, add:

```js
app.use(require('bp-pre-puppeteer-node'));


## License

The MIT License (MIT)

Copyright (c) 2018 Brijesh Pant &lt;brijeshp.sdei@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
