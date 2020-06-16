'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

//Extensions
var AmazonDateParser = require('amazon-date-parser');

global.app = new App();

//App Zone Begins
var Template = require('./app/Template');
app.Auth0 = require('./app/Auth0');
app.BmoBankz = require('./app/BmoBankz');
//App Zone End

app.Version = 'v1';

app.IsAlive = false;

if(!app.IsAlive)
    app.Mock = require('../db/mock');

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);

app.Locales = ['help', 'en-us', 'en-ca', 'fr-ca'];
app.Speech = {};
// ------------------------------------------------------------------
// Speech Templates
// ------------------------------------------------------------------

app.Locales.forEach(locale => {
    Template.BasePath = __dirname;
    app.Speech[locale] = Template.Load(locale);
});

// ------------------------------------------------------------------
// APP Global Private Functions
// ------------------------------------------------------------------

/* console.debug = function() {

}; */

app._GetIntentApiPath = function(name) {

    var intentPath = name.replace('_', '/');
    intentPath = intentPath.replace("Intent", "");
    var apiPath = `/api/${app.Version}/${intentPath}`;

    return apiPath;
};

app._GetDeviceName = function(ctx) {

    var regex = /(ALEXA|GOOGLE)/;
    let deviceClues = regex.exec(ctx.$request.getDeviceName());
    let device = deviceClues[0].toLowerCase();

    return device;
};

app._GetRandomInt = function(max) {

    return Math.floor(Math.random() * Math.floor(max));
};

app._GetStartEndDate = function(ctx) {
    
    var result = {};
    let inputs = ctx.$inputs;
    try {
        
        if (ctx.isAlexaSkill()) {
            if(inputs.StartDate) {

                let dateIntervall = new AmazonDateParser(inputs.StartDate.value);
                console.debug(dateIntervall); //debug
                let d = new Date(dateIntervall.startDate);
                d.setDate(d.getDate() + 1);
                result.startDate = d.toISOString().slice(0,10);
                result.endDate = dateIntervall.endDate.toISOString().slice(0,10);
            }
        }
        else { //dialogflow
            
            if(inputs.StartDate)
                result.startDate = new Date(inputs.StartDate.value).toLocaleString('default', { year: 'numeric', month: '2-digit', day: '2-digit' });
            if(inputs.EndDate)
                result.endDate = new Date(inputs.EndDate.value).toLocaleString('default', { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
    } catch(e) {

        console.error(e);
    }
    if(result.startDate === result.endDate)
        result.endDate = 0;
    console.debug(result); //debug
    return result;
};

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

 app.setHandler(
    require('./handlers/App.handler'),
    require('./handlers/UserDetail.handler'),
    require('./handlers/Guest.handler'),
    require('./handlers/Welcome.handler'),
    require('./handlers/Tour.handler'),
    require('./handlers/AccountBalance.handler'),
    require('./handlers/Notification.handler'),
    require('./handlers/Transaction.handler'),
    require('./handlers/CreditCard.handler')
    );
module.exports.app = app;