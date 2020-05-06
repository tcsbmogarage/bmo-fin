'use strict'

var WelcomeHandler = {

    WelcomeIntent() {
        let guest = this.$_;
        
        let ssml = app.Speech[guest.Locale].WelcomeIntent(guest);
        if(guest.New) {
            this.tell(ssml);
        } else {
            this.tell(app.Speech[guest.Help].OfcHelp(guest));
        }
    },

    UserWelcomeIntent() {
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
            this.tell(msg);
        }
    }
};

module.exports = WelcomeHandler;