'use strict'

var FaqHandler = {
    
    user: '',
    getUserDetails: function() {
        this.user = this.$user.$data;
        return this.user;
    },
    getInput(ctx, param) {

            let result = '';
            if(typeof app.DeviceMaker === "undefined")
                app.DeviceMaker = app._GetDeviceName(ctx);
            
            try {
                switch(app.DeviceMaker) {
                    //Amazon
                    case "alexa":
                            if(ctx.$inputs[param])
                                result = ctx.$inputs[param].value;
                        break;
                    //Google
                    case "google":
                            if(ctx.$inputs[param])
                                result = ctx.$inputs[param].key;
                        break;
                    default:
                }
            } catch(e) {

                console.error(e);
            }
            console.debug(ctx.$inputs);
            console.debug("param: " + param + " Value:" + result);
            return result;
    },
    FaqIntent() {

        let msg = "";

        this.getUserDetails();

        //Compile input
        var input = {};
        input.Type = this.getInput(this, "Type");
        input.Context = this.getInput(this, "Context");

        this.$speech = app.Speech[this.user.Locale].FaqIntent(input);
        this.$reprompt = app.Speech['help']._HCHY({Emotion: 'Default'});
        this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
    },
    FaqIntentState: {

        YesIntent() {
            this.FaqIntent();
        },
        NoIntent() { 
            this.$user.$data.Detail.Is_Tour_Completed = true;
            this.$reprompt = this.$speech = app.Speech['help']._HCHY({ Emotion: 'Sad'});
            this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
        },
        Unhandled() {

            this.$reprompt = this.$speech = app.Speech['help'].Help({ Type: 'ConfirmOkNotOk'});
            this.followUpState('FaqIntentState').ask(this.$speech, this.$reprompt);
        }
    }
};

module.exports = FaqHandler;