// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------
var tokens = require('../tokens.json');

module.exports = {
    logging: true,
 
    intentMap: {
       'AMAZON.StopIntent': 'END',
       'AMAZON.YesIntent': 'YesIntent',
       'AMAZON.NoIntent': 'NoIntent',
       'AMAZON.FallbackIntent': 'Fallback'
    },
 
    db: {
         FileDb: {
             pathToFile: '../db/db.json',
         }
     },

    user: {
        context: true,
     },

    Auth0: {
         Client_Id: "F9IZ7DF3Or6PvcF2dioz9WI1Jit7R6e4",
         Client_Secret: "Vv2_8n8CbC4iszia0f-tT1SvH3Vtz7Mwitzm5xNvFyP1Yk2RNxnpoEBBqgMTA5OW",
         Domain: "bmo-bankz.auth0.com",
         Api_Identifier: "https://bmo-bankz.auth0.com/api/v2/",
         Api_Id: "5e97fb45d030910897280210",
         User_Metadata_Path: "https://www.bmo-bankz.com/user_metadata",
         User_CardNumber_Path: "https://www.bmo-bankz.com/Login_Card_Number",
         Jwt: tokens
     },
    
     Bmobankz: {
         Domain: "us-central1-bmo-bankz.cloudfunctions.net"
     }
 };