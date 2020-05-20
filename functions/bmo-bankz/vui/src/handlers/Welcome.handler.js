'use strict'

var WelcomeHandler = {

    WelcomeIntent() {

        try {
            let guest = this.$_;
            this.$user.$data = guest;
            this.$speech = app.Speech[guest.Locale].WelcomeIntent(guest);
            guest.Reprompt_Message = true;
            this.$reprompt = app.Speech[guest.Locale].WelcomeIntent(guest);
            this.followUpState('GuestIntentState').ask(this.$speech, this.$reprompt);
        } catch(e) {

            console.error(e);
        }
    },

    UserWelcomeIntent() {

        try {
            let session = this.getSessionAttributes();
            let user = this.$user.$data;
            let loginUserDetail = user.Detail;
            let loginMsg = "";

            if(!loginUserDetail.Is_Tour_Completed) {
                if(loginUserDetail.First_Name !== undefined) {
                    loginMsg = app.Speech[user.Locale].UserWelcomeIntent(loginUserDetail);
                    //to get reprompt message
                    loginUserDetail.Reprompt_Message = true;
                    let tourCfrmMsg = app.Speech[user.Locale].UserWelcomeIntent(loginUserDetail);
                    loginUserDetail.Reprompt_Message = false;
                    this.$speech.addText(loginMsg);
                    this.$reprompt.addText(tourCfrmMsg);
                    this.followUpState('TourIntentState').ask(this.$speech, this.$reprompt);
                }
            } else {
                let msg = app.Speech[user.Locale].UserWelcomeIntent(loginUserDetail);
                this.ask(msg);
            }
        } catch(e) {

            console.error(e)
        }
    },
    UserWelcomeIntentState: {
        
    }
};

module.exports = WelcomeHandler;