var rq = require('request');

var IHQuote = function (params){
  var query_params = {
    format: params.format || "json",
    max_lines: params.max_lines || null,
    min_lines: params.min_lines || null,
    max_characters: params.max_characters || null,
    min_characters: params.min_characters || null,
    source: params.source || null
  };
  this.host  = "http://www.iheartquotes.com/api/v1/";
  this.format = query_params.format;
  this.query = "";
  for (var k in query_params){
    if (query_params[k] != null) {
      this.query = this.query + "&" + k + "=" + query_params[k];
    };
  };
};

IHQuote.prototype.random = function(cb) {
  rq(this.host + "random?" + this.query, function(error, res, body){
    if (error) {return "error";};
    if (!error && res) {
      cb(JSON.parse(body));
    };
  });
};

//example
//var quote = new IHQuote({max_characters: 100, random: 1, source: "prog_style"}).random(function(res){
//  console.log(res.quote);
//});

module.exports = IHQuote;
