'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

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

console.debug = function() {

};

app._GetIntentApiPath = function(name) {

    var intentPath = name.replace('_', '/');
    intentPath = intentPath.replace("Intent", "");
    var apiPath = `/api/${app.Version}/${intentPath}`;

    return apiPath;
};

app._GetRandomInt = function(max) {
    
    return Math.floor(Math.random() * Math.floor(max));
  }

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

 app.setHandler(
    require('./handlers/App.handler'),
    require('./handlers/Welcome.handler'),
    require('./handlers/Notification.handler'),
    require('./handlers/Guest.handler'),
    require('./handlers/Tour.handler'),
    require('./handlers/CreditCard.handler')
    );
module.exports.app = app;