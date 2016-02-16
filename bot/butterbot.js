/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
          \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
           \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Send a message with attachments
* Send a message via direct message (instead of in a public channel)

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node demo_bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "Attach"

  The bot will send a message with a multi-field attachment.

  Send: "dm"

  The bot will reply with a direct message.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit is has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var Botkit = require('../lib/Botkit.js');


if (!process.env.token) {
  console.log('Error: Specify token in environment');
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
controller.hears(['butt','butts'],['direct_message','direct_mention','mention','ambient'],function(bot,message){
	if (message.text.startsWith('/')==false || message.text.split(" ") > 1){
		bot.reply(message,getRandArrayValue(butts));
	}
});	
	
controller.hears(['hello','hi'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Hello Butt.");
});

var getRandArrayValue = function(arrayValues) {
	//http://stackoverflow.com/a/3419982
	   return arrayValues[Math.floor(Math.random() * arrayValues.length)];
};

var getButtText = function(message){
	var messageArray = message.text.split(" ");
	return getRandArrayValue(messageArray);
};

var replaceButtText = function(message,butt){
	//http://stackoverflow.com/a/542260
	var textButt = message.text;
	var regexButt = new RegExp(butt,"ig");
	textButt = textButt.replace(regexButt,"butt");	
	return textButt;
};

controller.on('ambient',function(bot,message){	
	buttMessage = message;
	if (buttMessage.text.split(" ").length>1)
	{
		var buttText = getButtText(message);
		if (buttText.length >=4)
		{
			if (Math.floor(Math.random() * 5) + 1 == 1){
				buttMessage = replaceButtText(message,buttText);
				//bot.reply(message,buttText);
				bot.reply(message,buttMessage);
			}
		}	
	}	
});


