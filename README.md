
Black Kite
=========

Upload an image from boorus to your twitter account with quotes from IHeartQuotes using NodeJS

Installing
-------------

* You can just download the files and put it in your project.
* Copy 'example.env' to '.env'
* Set your Twitter credentials in '.env'
* Optional: set database and image storage's paths
* 'npm install'
* Write some code
* 'node app'

How to
-------------

```javascript
var yandere  = new DBooru("https://yande.re/", "post/index.json?limit=1");
var donmaise = new DBooru("http://danbooru.donmai.us/", "post/index.json?limit=1");

//If you want to use it with ILQuote
var quote = new IHQuote({max_characters: 115, source: "misc"}).random(function(res){
  donmaise.run(res.quote);
});

```


Work in Progress
-----------

* [YandeRe](https://yande.re/) website is supported
* [Danbooru](http://danbooru.donmai.us/) website is supported
* [Konachan](https://konachan.com/) is no longer supported

Why?
-----------

For the Glory

LICENSE
----------

The MIT License (MIT)

Copyright (c) 2013 Peer Rails

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
