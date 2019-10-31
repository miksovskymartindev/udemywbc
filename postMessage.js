// --------------- BASIC SHOWCASE IS DOWN BELOW -------------------//

// if running on node:  run "npm install xmlhttprequest" command and uncomment this
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;   


const emoticons = {
    pig : ":pig:",
    one_hundred : ":100:",
    bug : ":bug:",
    shit : ":shit:",
    radioactive : ":radioactive_sign:",
    biohazard : ":biohazard_sign:",
    warning : ":warning:",
    sun : ":sunny:"
};

class RequestHandler {

    constructor(data, endpoint, async, requestType="POST") {
        this._data = data;
        this._endpoint = endpoint;
        this._async = async;
        this._requestType = requestType;
        this._request = new XMLHttpRequest();
    }


}

class SlackPostData {

    constructor(channel, username, text, icon_emoji=":sun:") {
        this.channel = channel;
        this.username = username;
        this.text = text;
        this.icon_emoji = icon_emoji;
    }
}


class SlackMessageHandler {
    constructor() {
     
    }
}


function sendJSONRequest(data, endpoint, async) {
    var request = new XMLHttpRequest();
    request.open("POST", endpoint, async);
    request.send(JSON.stringify(data))
}

var postData = { 
    channel : null,
    username : null,
    text : null,
    icon_emoji : null
};

var slack = {
    channel : {
        name : "#general",
        endpoint : "https://hooks.slack.com/services/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"       
    },
    messageHeader : {
        testFailed : {
            message : "TEST FAILED \n"+ new Date().toLocaleString(),
            icon : emoticons.shit
        },
        testPassed : {
            message : "TEST PASSED \n"+ new Date().toLocaleString(),
            icon : emoticons.sun
        }
    },
    testResult : {
        keyWordsDetectingFailure : ["error", "failure", "ERROR", "FAILURE"],
    },

    sendMessage : function (message) {
    
        var exists = false;
        
        this.testResult.keyWordsDetectingFailure.forEach((keyWord) => {
            if(message.includes(keyWord)) exists = true;
        });
        
        if(exists) {
            postData.icon_emoji = this.messageHeader.testFailed.icon;
            postData.username = this.messageHeader.testFailed.message;
        } else {
            postData.icon_emoji = this.messageHeader.testPassed.icon;
            postData.username = this.messageHeader.testPassed.message;
        }

        postData.text = message;
        postData.channel = this.channel.name;   
        sendJSONRequest(postData, this.channel.endpoint, true); 
    },

    setEndPoint : function (endpoint) {
        this.channel.endpoint = endpoint;
    },

    setChannel : function (channelName) {
        this.channel.name = channelName;
    },

    setMessageHeaderIfTestFails : function (failMessage, icon=null) {
        this.messageHeader.testFailed.message = failMessage + " " + new Date().toLocaleString();
        icon !== null ? this.messageHeader.testFailed.icon = icon : null;
    },

    setMessageHeaderIfTestPasses : function (passMessage, icon=null) {
        this.messageHeader.testPassed.message = passMessage + " " + new Date().toLocaleString();
        icon !== null ? this.messageHeader.testPassed.icon = icon : null;
    },

    setErrorKeyWords : function () {
        this.testResult.keyWordsDetectingFailure = Array.from(arguments);
    }
};

//----------------------USE CASE------------------------//
/*
// 1) SETTINGS

// 1.1) SLACK endpoint url - found in  Incoming WebHooks configuration
slack.setEndPoint("https://hooks.slack.com/services/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");

// 1.2) SLACK channel where test result should be posted
slack.setChannel("general");

// 1.3) Sets a collection of (case sensitive) strings present in failed tests results - for failed test detecting.
slack.setErrorKeyWords("error", "ERROR", "failure", "404 not found", "fail", "FAIL"); 

// 1.4) Sets HEADER for test-FAILED slack message (there is also posibility to add icon)
slack.setMessageHeaderIfTestFails("HM...Something went wrong!");
slack.setMessageHeaderIfTestFails("HM...Something went wrong!", emoticons.shit);

// 1.5) Sets HEADER for test-PASSED slack message (there is also posibility to add icon)
slack.setMessageHeaderIfTestPasses("Everything is fine");
slack.setMessageHeaderIfTestPasses("Everything is fine", emoticons.sun);


// 2) POSTING A MESSAGE

// 2.1) posting a message with settings from chap. 1

slack.sendMessage("This test will pass");
slack.sendMessage("This is test failure case: some description of error from log & bla bla bla");

// 2.2) posting message to another channel
slack.setChannel("different channel");
slack.sendMessage("blah blah");*/