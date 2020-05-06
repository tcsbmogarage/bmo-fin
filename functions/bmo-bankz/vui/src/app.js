'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');


//App Zone Begins
var Template = require('./app/Template');
const Auth0 = require('./app/Auth0');
const BmoBankz = require('./app/BmoBankz');
//App Zone End

global.app = new App();

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
    app.Speech[locale] = Template.Load(locale);
});

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------


 app.setHandler(
    require('./handlers/App.handler'),
    require('./handlers/Welcome.handler'),
    require('./handlers/Notification.handler'),
    require('./handlers/Tour.handler')
    );
module.exports.app = app;