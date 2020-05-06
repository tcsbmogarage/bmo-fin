'use strict'
var AppHandler = {

    async LAUNCH() {
        let redirect = {};
        let token = this.$request.getAccessToken();
        let session = this.$request.session;
        console.log("Launched!");
        this.$_ = {};
        this.$_.Help = "help";
        this.$_.New = session.new;
        //this.$_.Locale = this.$request.request.locale.toLowerCase();//imp
        this.$_.Locale = "en-ca"; //temp
        this.$_.Institution_Name = "Bank of Montreal";
        this.$_.Reprompt_Message = false;
        if(token) {
            //Inital values
            if(!(this && this.$user && this.$user.$data && this.$user.$data.Help)) {
                this.$user.$data = {};
                this.$user.$data.Help = "help";
                this.$user.$data.New = session.new;
                //this.$user.$data.Locale = this.$request.request.locale.toLowerCase(); //imp
                this.$user.$data.Locale = "en-ca";
                this.$user.$data.Reprompt_Message = false;
                //Auth0 User info
                /* var pUserInfo = Auth0.connect('GET', '/userinfo', token);
                this.$user.$data.Oauth = await pUserInfo.then(function(result){ return result; },
                function(err){ return 'Invalid user info recieved, Can you please signin again?'}
                ); */
                //Test purpose
                this.$user.$data.Oauth = {
                    sub: 'auth0|5ea1a7d8ff71150df91bcd33',
                    nickname: 'f1smith',
                    name: 'Frank Smith',
                    picture: 'https://s.gravatar.com/avatar/faa45f4e90e55a86bc52094877e18682?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ff1.png',
                    updated_at: '2020-04-30T18:18:12.824Z',
                    email: 'f1smith@humanus.com',
                    email_verified: false,
                    'https://www.bmo-bankz.com/app_metadata': {},
                    User_Metadata: {
                        Mobile_Number: '9673424303',
                        User_Detail_Id: 'a739a3d0-854d-11ea-8e05-118889dd7ce8'
                    }
                };
                //BMO-Bankz User details
                /* var userDetailPath = `/api/v1/UserDetails/${session.LoginUser.User_Metadata.User_Detail_Id}`;
                var pUserDetail = BmoBankz.connect('GET', userDetailPath, token);
                this.$user.$data.Detail = await pUserDetail.then(function(result){ return result; },
                function(err){ return 'Invalid user detail recieved, Can you please signin again?'}
                ); */
                this.$user.$data.Detail = {"Title":"Mr","First_Name":"Frank","Last_Name":"Smith","Short_Name":"frank","Email":"f1smith@humanus.com","Passcode":"Triple-buffered","Gender":"Male","Occupation":"Pharmacy Business","Address":"83 Mondeo Dr, Scarborough, ON M1P 5B6, Canada","Zipcode":"M1P","Mobile_Number":"702-219-3892","Account_Numbers":[{"Account_Number":"27520014902951","Account_Type":"Saving Account","Card_Number":"5510121234567890","Currency_Type":"CAD","Default":"true","Institution_Name":"BMO Harris Bank"}],"BMO_Mortgage_Loan":"false","BMO_Credit_Cards":[{"Credit_Card_Due_Date":"04/02/2020","Credit_Card_Type":"BMO Prepaid Travel Mastercard","Credit_Card_Number":"5602243883577022",
                "Default":true}],"Other_Bank_Credit_Cards":"false","Average_Flying_Expenses":"$7716.49","id":"a739a3d0-854d-11ea-8e05-118889dd7ce8"};
                
                //Is a new User
                this.$user.$data.Detail.Is_New_User = this.$user.isNew();//imp
                if(this.$user.$data.Detail.Is_New_User)
                    this.$user.$data.Detail.Is_Tour_Completed = false;
                this.$user.$data.Detail.Reprompt_Message = false;
            }
            redirect = "UserWelcomeIntent";
        } else {
            redirect = "WelcomeIntent";
        }
        //this.setSessionAttributes(session);
        return this.toStatelessIntent(redirect);
    },
    NEW_SESSION() {

        console.log('New Session');
    },
    Unhandled() {

        let msg = "Something unhandlable!";
        this.tell(msg);
    },
    ON_ERROR() {

        let msg = "Good bye! something went wrong!";
        this.tell(msg);
    },
    END() {

        let msg = "Good bye! BMO stopped";
        this.tell(msg);
    }
};

module.exports = AppHandler;