var Botkit = require('../lib/Botkit.js');


if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

if (!process.env.mashapeAPIToken) {
	console.log('Error: Specify Mashape API Token in environment');
	process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

var butts = ["Butt. Butt! BUTTS! :full_moon:", "Sir MixALot peaked too early.","I am Butticus. No, I am Butticus, etc.  also butts.", "Knock knock. Who's there.  Butts.","uh....butts.","Why. so. buttsersious?","You know what looks like a butt?  Everything.","Why ask why? Try butt dry.","Today I consider myself to be the luckiest butt in the whole entire world."];
controller.hears(['butt','rear','ass','arse','behind','tush','badonkadonk','caboose','junk in the trunk'],['direct_message','direct_mention','mention','ambient'],function(bot,message){
	if (message.text.startsWith('/')==false || message.text.split(" ") > 1){
		var noButtQuoteResult = sendRequestSync(uri, options);
		var noButtObject = JSON.parse(JSON.stringify(noButtQuoteResult));
		var noButtBody = JSON.parse(noButtObject.response.body);
		var noButtQuote = noButtBody.quote;
		var buttQuoteText = getButtText(noButtQuote)
		var newButtQuote = replaceButtText(noButtQuote,buttQuoteText);
		bot.reply(message,newButtQuote);
	}
});	

//occasionally trigger on but
controller.hears(['but'],['direct_message','direct_mention','mention','ambient'],function(bot,message){
	if (message.text.startsWith('/')==false || message.text.split(" ") > 1){
		if (Math.floor(Math.random()*20)+1<3){
			var noButtQuoteResult = sendRequestSync(uri, options);
			var noButtObject = JSON.parse(JSON.stringify(noButtQuoteResult));
			var noButtBody = JSON.parse(noButtObject.response.body);
			var noButtQuote = noButtBody.quote;
			var buttQuoteText = getButtText(noButtQuote)
			var newButtQuote = replaceButtText(noButtQuote,buttQuoteText);
			bot.reply(message,newButtQuote);
		}		
	}
});

controller.hears(['what what','what? what'],['ambient'],function(bot,message) {
    bot.reply(message,"I said... What? What? (In the Butt)");
});
	
controller.hears(['hello','hi'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Hello Butt.");
});

var getRandArrayValue = function(arrayValues) {
	//http://stackoverflow.com/a/3419982
	   return arrayValues[Math.floor(Math.random() * arrayValues.length)];
};

var getButtText = function(message){
	var neverButtText = ["the","his","her","this","that","each","every","one","any","your","its","their","which","whose","what"]
	var messageArray = message.split(" ");
	var i = messageArray.length;
	while(i--){
		if(messageArray[i].length<4){
			messageArray.splice(i,1);			
		}else {
		    var x = neverButtText.length;
			while(x--){
				if(messageArray[i]==neverButtText[x]){
					messageArray.splice(i,1);
					break;
				};
			};
		};
	};	
	return String(getRandArrayValue(messageArray));
};

var replaceButtText = function(textButt,butt){
	endButt = [["s","butts"],["'s","butt's"],["ball","butt-ball"],["?","butt?"],["!","butt!"],[",","butt,"]]
	
	//http://stackoverflow.com/a/542260	
	var regexButt = new RegExp(butt,"ig");
	textButt = textButt.replace(regexButt,"butt");	
	return textButt;
};

controller.on('ambient',function(bot,message){	
	if (message.text.startsWith('/')==false && message.text.split(" ").length > 1 && message.text.startsWith(':')==false && Math.floor(Math.random() * 20 ) + 1 == 1)
	{
		var buttText = getButtText(message.text);
		if (buttText.length >=4)
		{
			buttMessage = replaceButtText(message.text,buttText);
			bot.reply(message,buttMessage);			
		}	
	}	
});



var uri = 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous';
var options = {
	method: 'GET',
	headers: { "X-Mashape-Key":process.env.mashapeAPIToken }
};
//shamelessly stolen.
function sendRequestSync(uri, requestOptions) {
    var request = require('request');
    //var RequestResult = require('./RequestResult.js');
    var deasync = require('deasync');
    if (!uri || uri.length < 0) {
        throw Error("sendRequestSync: Missing URI.");
    }    
    if (!('headers' in requestOptions && 'X-Mashape-Key' in requestOptions['headers'])) {
        throw Error("sendRequestSync: Missing X-Mashape-Key header.");
    }   
    var result;
    var isDone = false;    
    request(uri, requestOptions, function (error, response, body) {
        result = new RequestResult(error, response, body);        
        isDone = true;
    });
    deasync.loopWhile(function () { return !isDone; });    
    return result;
};
function RequestResult(reqError, reqResponse, reqBody) {
    this.error = reqError;
    this.response = reqResponse;
    this.body = reqBody;    
};
