'use strict'

var AppHandler = {

    async LAUNCH() {
        try {
            let redirect = {};
            let token = this.$request.getAccessToken();
            let session = this.$request.session;

            console.debug("Launched!");
            this.$_ = {};
            this.$_.Help = "help";
            this.$_.New = session.new;
            //this.$_.Locale = this.$request.request.locale.toLowerCase();//imp
            this.$_.Locale = "en-ca"; //temp
            this.$_.Institution_Name = "Bank of Montreal";
            this.$_.Reprompt_Message = false;
            if(token) {
                //Inital values
                if(!(this.$user && this.$user.$data && this.$user.$data.Oauth && this.$user.$data.Oauth.sub)) {
                    this.$user.$data = {};
                    this.$user.$data.Help = "help";
                    this.$user.$data.New = session.new;
                    //this.$user.$data.Locale = this.$request.request.locale.toLowerCase(); //imp
                    this.$user.$data.Locale = "en-ca";
                    this.$user.$data.Reprompt_Message = false;
                    //Auth0 User info
                    if(app.IsAlive) {
                        var pUserInfo = app.Auth0.connect('GET', '/userinfo', token);
                        this.$user.$data.Oauth = await pUserInfo.then(function(result){ return result; },
                        function(err){ return 'Invalid user info recieved, Can you please signin again?'}
                        );
                    } else {
                        //Test purpose
                        this.$user.$data.Oauth = app.Mock.Oauth;
                    }

                    //Token Number
                    this.$user.$data.Oauth.Token = token;
                    
                    //BMO-Bankz User details
                    if(app.IsAlive) {
                    var userDetailPath = `/api/${app.Version}/UserDetails/${this.$user.$data.Oauth.User_Metadata.User_Detail_Id}`;
                        var pUserDetail = app.BmoBankz.connect('GET', userDetailPath);
                        this.$user.$data.Detail = await pUserDetail.then(function(result){ return result; },
                        function(err){ return 'Invalid user detail recieved, Can you please signin again?'}
                        );
                    } else {
                        this.$user.$data.Detail = app.Mock.UserInfo;
                    }
                    //Is a new User
                    this.$user.$data.Detail.Is_New_User = this.$user.isNew();//imp
                    if(this.$user.$data.Detail.Is_New_User)
                        this.$user.$data.Detail.Is_Tour_Completed = false;
                    this.$user.$data.Detail.Reprompt_Message = false;

                    //Current Account Details

                    this.$user.$data.Detail.Login = await this._getCurrentAccountDetail(
                                                            this.$user.$data.Detail, 
                                                            this.$user.$data.Oauth.Login_Card_Number
                                                    );
                }
                redirect = "UserWelcomeIntent";
            } else {
                redirect = "WelcomeIntent";
            }
            //this.setSessionAttributes(session);
            return this.toStatelessIntent(redirect);
        } catch (e) {
            console.error(e);
        }
    },
    NEW_SESSION() {

        console.debug('New Session');
    },
    Unhandled() {
        try {
            let request = this.$request;
            if(request.type === "IntentRequest") {
                console.debug(request.intent);
                this.toIntent(request.intent.name);
            }
        } catch (e) {

            let msg = "Something unhandlable!";
            this.tell(msg);
        }
        
    },
    ON_ERROR() {

        let msg = "Good bye! something went wrong!";
        this.tell(msg);
    },
    END() {

        let msg = "Good bye! BMO stopped";
        this.tell(msg);
    },
    Fallback() {
        
        let msg = app.Speech['help']._ICHU({Emotion: 'Sad', r: app._GetRandomInt(5)});
        this.followUpState('UserWelcomeIntentState').ask(msg);
    },
    async _getCurrentAccountDetail(detail, cardNumber) {

        if(detail.Account_Numbers && cardNumber) {
            var result = {};
            detail.Account_Numbers.forEach(element => {

                if(element.Card_Number == cardNumber) {
                    result = element;
                }
            });
        }
        return result;
    }
};

module.exports = AppHandler;