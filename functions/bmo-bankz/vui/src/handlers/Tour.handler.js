'use strict'

var TourHandler = {

    StartTourIntent() {
        let session = this.getSessionAttributes();
        console.log(app.Speech);
        console.log(this.$user.$data);
        let user = this.$user.$data;
        let loginUser = user.Oauth;
        let loginUserDetail = user.Detail;
        let msg = "";

       if(loginUser.Is_Tour_Completed) {
            this.tell('You tour already completed');
        } else {
            msg = app.Speech[user.Locale].StartTourIntent(loginUserDetail);
            this.$speech.addText(msg);
            this.$user.$data.Detail.Is_Tour_Completed = true;

            this.tell(msg);
        }
    },
    TourIntentState: {
        YesIntent() {
            this.StartTourIntent();
        },
        NoIntent() {
            this.tell("Ok, All your's");
        },
        Unhandled() {
            this.tell("OMG, I will take care");
        }
    }
};

module.exports = TourHandler;