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

var konaChan = function () {
	var site = 'http://konachan.com/post.json';
	var img_link;
	request(site, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			data = JSON.parse(body);
			img = data[0].sample_url;
			uploadFile(img);
		} else if (error) {console.log(timeStamp()+' '+err)};
	});
};

var uploadFile = function (file_link) {
	imgur.upload(file_link,function(err,res){
		if (err) {console.log(timeStamp()+' '+err)};
		if (res.status !== 200) {console.log(res)};
    	if (!err && res.status == 200) {updateStat(res.data.link)};
	});
}

var updateStat = function (img_link) {
	twit.updateStatus(img_link,
    function (err, data) {
    	if (err) {console.log(timeStamp()+' '+err)} else {
		console.log(timeStamp()+' '+'Uploaded file '+img_link)};
    }
  );
}

var timeStamp = function () {
	date = new Date();
	time = date.getHours()+':'+ date.getMinutes()+':'+date.getSeconds();
	return time;
};

konaChan();
setInterval(function() {
	konaChan();
}, config.timelimit); 

console.log(timeStamp()+' '+'Starting upload in 33 minutes');
