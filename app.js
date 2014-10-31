var Datastore = require('nedb'),
    dotenv    = require('dotenv'),
    Download  = require('download'),
		fs        = require('fs'),
  	path      = require('path'),
		rq        = require('request'),
		Twitter   = require('node-twitter'),
		IHQuote		= require('./quote');

dotenv.load();
var db = new Datastore({ filename: process.env.IMG_DB || "data/store.db", autoload: true });

var DBooru = function (host, link, db, store) {
	this.host  = host        || "https://yande.re/";
	this.link  = host + link || "https://yande.re/post/index.json?limit=1";
	this.store = store       || process.env.IMG_STORE;
};

DBooru.prototype.save = function (post, callback) {
  db.findOne({md5: post.md5}, function(err, doc){
		if (err) {callback(err)};
		if (!doc) {
			db.insert(post, function(err, newDoc) {
				if (err) {callback(err)};
				if (newDoc) {
					console.log(timeStamp() + "New Image Record was saved.");
					callback(null, newDoc);
				};
			});
		} else if (doc) {
			callback(new Error('Image Record is already at DataBase'));
		};
	});
};

DBooru.prototype.upload = function (file, message, callback) {
	if (!file) {
		callback(new Error("No file was attached!"));
	}	else {
		var tclient = new Twitter.RestClient(
				process.env.CONSUMER_KEY,
				process.env.CONSUMER_SECRET,
				process.env.ACCESS_TOKEN_KEY,
				process.env.ACCESS_TOKEN_SECRET
		);
	  tclient.statusesUpdateWithMedia(
	    {
	        'status': message || "",
	        'media[]': file
	    },
	    function(error, result) {
	      if (error){
			    callback(new Error('Error: ' + (error.code ? error.code + ' ' + error.message : error.message)))
	      };
	      if (result) {
	        callback(null, result);
	      };
	    });
		};
};

DBooru.prototype.get = function (callback) {
	rq(this.link, function(error, res, body){
		if (error) {callback(error);};
		if (!error && res.statusCode == 200) {
			callback(null, JSON.parse(body));
		};
	});
};

DBooru.prototype.download = function (callback) {
	var store = this.store;
	var save  = this.save;
	var host  = this.host;
	this.get(function (err, data){
		if (err) {callback(err)};
		if (data) {
			data[0].host = host;
			data[0].new_name = Date.now().valueOf().toString()+"."+data[0].file_url.split('.').pop();
			data[0].new_path = store;
      save(data[0], function (error, res) {
      	if (error) {callback(error)};
				if (res) {
					if (!/^(f|ht)tps?:\/\//i.test(res.file_url)) {
						res.file_url = host+res.file_url;
					};
					var file = new Download()
							.get(res.file_url)
							.dest(store)
							.rename(Date.now().valueOf().toString()+"."+res.file_url.split('.').pop())
							.run(function (error, files){
								if (error) {callback(error)};
								if (files) {
									callback(null, files[0].path);
								};
							});
				}
      });
		}
	});
};

DBooru.prototype.run = function (message) {
	var upload = this.upload;
	this.download(function (error, path) {
		if (error) {console.log(timeStamp() + error)};
		if (path) {
			console.log(timeStamp() + 'Success! File is downloaded at '+path);
			upload(path, message, function (err, response) {
				if (err) {timeStamp() + console.log(err)};
				if (path) {
					console.log(timeStamp() + 'File Uploaded!');
					};
			});
		};
	});
};

var timeStamp = function () {
	date = new Date();
	time = date.getHours()+':'+ date.getMinutes()+':'+date.getSeconds() + " ";
	return time;
};

//Add here your code
var donmaise = new DBooru("http://danbooru.donmai.us/", "post/index.json?limit=1");

//If you want to use it with ILQuote
var quote = new IHQuote({max_characters: 115, source: "misc"}).random(function(res){
	donmaise.run(res.quote);
});
