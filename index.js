const { ChatClient } = require("dank-twitch-irc");
var inquirer = require("inquirer");

var questions = [
  {
    type: "input",
    name: "username",
    message: "What's your Twitch username?",
  },
  {
    type: "input",
    name: "oauth_token",
    message:
      "What's your Twitch OAuth token? (Get it from here http://twitchapps.com/tmi/ )",
  },
  {
    type: "input",
    name: "channel",
    message: "What is channel name you'd like to send commands to?",
  },
];

inquirer.prompt(questions).then((answers) => {
  let channel = answers.channel;
  let username = answers.username;
  let password = answers.oauth_token;

  let client = new ChatClient({
    username: username,
    password: password,
  });

  client.join(channel).then(() => {
    console.log(`Connected to ${channel} with his controllerBot...`);
    client.say(channel, `${username} has connected a controller to chat!`);
  });

  var GamePad = require("node-gamepad");
  var controller = new GamePad("ps4/dualshock4");
  controller.connect();

  controller.on("dpadUp:press", () => {
    console.log(`Sending up to ${channel}...`);
    client.say(channel, "up");
  });

  controller.on("dpadDown:press", () => {
    console.log(`Sending down to ${channel}...`);
    client.say(channel, "down");
  });

  controller.on("dpadLeft:press", () => {
    console.log(`Sending left to ${channel}...`);
    client.say(channel, "left");
  });

  controller.on("dpadRight:press", function () {
    console.log(`Sending right to ${channel}...`);
    client.say(channel, "right");
  });

  controller.on("share:press", () => {
    console.log(`Sending select to ${channel}...`);
    client.say(channel, "select");
  });

  controller.on("options:press", () => {
    console.log(`Sending start to ${channel}...`);
    client.say(channel, "start");
  });

  controller.on("x:press", () => {
    console.log(`Sending B to ${channel}...`);
    client.say(channel, "B");
  });

  controller.on("circle:press", () => {
    console.log(`Sending A to ${channel}...`);
    client.say(channel, "A");
  });

  controller.on("square:press", () => {
    console.log(`Sending Y to ${channel}...`);
    client.say(channel, "Y");
  });

  controller.on("triangle:press", () => {
    console.log(`Sending X to ${channel}...`);
    client.say(channel, "X");
  });

  controller.on("r1:press", () => {
    console.log(`Sending RT to ${channel}...`);
    client.say(channel, "RT");
  });

  controller.on("l1:press", () => {
    console.log(`Sending LT to ${channel}...`);
    client.say(channel, "LT");
  });
});
