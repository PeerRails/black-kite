var twitter = require('ntwitter'),
	request = require('request'),
	path = require('path'),
	imgur = require('imgur-node-api'),
	config = require('./config');

var twit = new twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});

imgur.setClientID(config.cid);

var Danbooru = function (site_link) {
	this.site_link = site_link;
	this.api_link = '/posts.json';
};

var donmaius = new Danbooru('http://donmai.us');

var parseDanbooru = function (booru) {
	var site = booru.site_link+booru.api_link;
	console.log(timeStamp()+' Uploading from '+booru.site_link);
	var img_link;
	request(site, function (error, response, body){
		if (!error && response.statusCode == 200) {
			data = JSON.parse(body);
			img = data[0].file_url;
			uploadFile(booru.site_link+img,booru.site_link);
		} else if (error) {console.log(timeStamp()+' '+error)};
		if (response.statusCode !== 200) {console.log(timeStamp()+' '+response.statusCode)}
	});
};

var konaChan = function () {
	var site = 'http://konachan.com/post.json';
	console.log(timeStamp()+' Upload from KonaChan.com');
	var img_link;
	request(site, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			data = JSON.parse(body);
			img = data[0].sample_url;
			uploadFile(img, 'http://konachan.com');
		} else if (error) {console.log(timeStamp()+' '+err)};
		if (response.statusCode !== 200) {console.log(timeStamp()+' '+response)};
	});
};

var uploadFile = function (file_link, site_link) {
	imgur.upload(file_link,function(err,res){
		if (err) {console.log(timeStamp()+' '+err)};
		if (res.status !== 200) {console.log(res)};
    	if (!err && res.status == 200) {
    		tweet_post = res.data.link + ' from '+ site_link;
    		twit.updateStatus(tweet_post, function (error, data){
    			if (error) {console.log(timeStamp()+' '+err)} else {
    				console.log(timeStamp()+' '+'Upload file '+res.data.link+' from '+ site_link)
    			}
    		});
    	};
	});
};

var timeStamp = function () {
	date = new Date();
	time = date.getHours()+':'+ date.getMinutes()+':'+date.getSeconds();
	return time;
};

console.log(timeStamp()+' '+'Start upload in 33 minutes');

//konaChan();
parseDanbooru(donmaius);

setInterval(function() {
	konaChan();
}, config.timelimit); 
