var DBooru = require("./lib/dbooru");
var IHQuote = require("./lib/quote");

//Add here your code
var donmaise = new DBooru("http://danbooru.donmai.us/", "post/index.json?limit=1");

//If you want to use it with ILQuote
var quote = new IHQuote({max_characters: 115, source: "misc"}).random(function(res){
	donmaise.run(res.quote);
});
