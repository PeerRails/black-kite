var twitter = require('ntwitter'),
	request = require('request'),
	path = require('path'),
	imgur = require('imgur-node-api');

//Put Your Twitter credentials here
var twit = new twitter({
  consumer_key: 'consumer_key',
  consumer_secret: 'consumer_secretc',
  access_token_key: 'access_token_key',
  access_token_secret: 'access_token_secret'
});
//Put Your imgur Client ID here
imgur.setClientID('ClientID');

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
		request(img_link, function (error, response, body) {
			//:3 Nothing here
		});
    }
  );
}

var timeStamp = function () {
	date = new Date();
	time = date.getHours()+':'+ date.getMinutes()+':'+date.getSeconds();
	return time;
}


setInterval(function() {
	konaChan();
}, 600000);
console.log(timeStamp()+' '+'Starting upload in 10 minutes');
