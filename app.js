var twitter = require('ntwitter'),
	request = require('request'),
	path = require('path'),
	imgur = require('imgur-node-api');

//Your twitter credentials here
var twit = new twitter({
  consumer_key: 'consumer_key',
  consumer_secret: 'consumer_secret',
  access_token_key: 'access_token_key',
  access_token_secret: 'access_token_secret'
});

imgur.setClientID('ClientID'); //Set your ClientID Here

var konaChan = function () {
	site = 'http://konachan.com/post.json';
	var img_link;
	request(site, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			data = JSON.parse(body);			
			img_link = data[0].file_url;
			uploadFile(img_link);
		} else {console.log(err)};
	});
};

var uploadFile = function (file_link) {
	imgur.upload(file_link,function(err,res){
		console.log(res.data)
    	updateStat(res.data.link)
	});
}

var updateStat = function (img_link) {
	twit.updateStatus(img_link,
    function (err, data) {
      console.log(timeStamp()+': '+'Uploaded file '+img_link);
    }
  );
}

var timeStamp = function () {
	date = new Date();
	time = date.getHours()+':'+ date.getMinutes()+':'+date.getSeconds();
	return time;
}


setInterval(function() {konaChan();}, 600000);
console.log(timeStamp()+' : '+'Starting upload in 10 minutes');
