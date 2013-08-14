var config = {};


config.wanted_timelimit = 33; //Put wanted minutes here
config.timelimit = config.wanted_timelimit*60*1000;

//Put Your Imgur and Twitter Credentials
config.cid = 'Put Your Imgur ClientID here';
config.consumer_key = 'Put Your Consumer Key Here';
config.consumer_secret = 'Put Your Consumer Secret Here';
config.access_token_key = 'Put Your Access Token Key Here';
config.access_token_secret = 'Put Your Consumer Key Here';

//Booru Host
config.booru = 'http://konachan.com';

module.exports = config;

