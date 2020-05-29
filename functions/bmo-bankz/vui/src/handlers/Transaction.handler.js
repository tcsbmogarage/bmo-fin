
var TransactionHandler = {
    
    user: '',
    list: [],
    details: {},
    getUserDetails: function() {
        this.user = this.$user.$data;
        return this.user;
    },
    async getTransactionDetails(list) {
        this.details = { Amount: 0 };
        let counter = 1;
        await list.forEach(element => {
            this.details.Amount += parseFloat(element.Amount.replace('$', ''))
            this.details.Number_Of_Transactions = counter++;
            this.details.Transaction_Status = element.Transaction_Status;
        });
        
        return this.details;
    },
    getInputByDS(ctx, param) {

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
                            if(param === 'StartPeriod')
                                result = ctx.$inputs[param].key;
                            else
                               
                                if(ctx.$inputs[param].key.length > 0)
                                    result = ctx.$inputs[param].key.split('T')[0];
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
    isSlotFilled(ctx, inName) {

        let result = false;
        let startDate = this.getInputByDS(ctx, "StartDate");
        let period = this.getInputByDS(ctx, "StartPeriod");
        var expr = /[A-Za-z]/;

        let user = this.getUserDetails();

        //Alexa time format
        if(ctx.isAlexaSkill()) {

            if(startDate.match(expr) || startDate.length < 10) {

                period = app._GetStartEndDate(this);
            }
        }

        let inType = (inName.includes('BtwDates') || typeof period === "object") ? "BtwDates" : "OnDate";
        switch(inType) {

            case "OnDate":
                            if(startDate.length == 0) {

                                ctx.$speech = ctx.$reprompt = app.Speech[user.Locale].Transactions_Help({Type: 'Validation', Scenario: 'MissingDate'});
                                this.ask(ctx.$speech, ctx.$reprompt);
                            } else if(startDate.length > 0) {

                                //One year duration validation
                                if(this.isInDuration(startDate)) {
                    
                                    result = true;
                                } else {
                    
                                    ctx.$speech = ctx.$reprompt = app.Speech[user.Locale].Transactions_Help({Type: 'Validation', Scenario: 'InvalidDatePeriod', Input: startDate});
                                    this.ask(ctx.$speech, ctx.$reprompt);
                                }
                            }
                            break;
            case "BtwDates":
                            var input = {};
                            if(typeof period === "object") {

                                input = period;
                            } else {

                                input.startDate = startDate;
                                input.endDate = this.getInputByDS(ctx, "EndDate");
                            }

                            if(input.startDate.length == 0 || input.endDate.length == 0) {

                                ctx.$speech = ctx.$reprompt = app.Speech[user.Locale].Transactions_Help({Type: 'Validation', Scenario: 'MissingDate'});
                                this.ask(ctx.$speech, ctx.$reprompt);
                            } else {

                                if(this.isInDuration(input.startDate) && this.isInDuration(input.endDate)) {
                    
                                    result = true;
                                } else {
                    
                                    ctx.$speech = ctx.$reprompt = app.Speech[user.Locale].Transactions_Help({Type: 'Validation', Scenario: 'InvalidDatePeriod', Input: input.endDate});
                                    this.ask(ctx.$speech, ctx.$reprompt);
                                }
                            }
                            break;
        }
        
        return result;
    },
    isInDuration(dateStr) {

        let cDate = new Date();
        let lyDate = new Date();
        lyDate.setFullYear(lyDate.getFullYear() - 1);
        let sDate = new Date(dateStr);
        console.debug("CurrentDate: " + cDate.toISOString());
        console.debug("LastYearDate: " + lyDate.toISOString());
        console.debug("StartDate: " + sDate.toISOString());
        return (sDate <= cDate && sDate >= lyDate);
    },
    async GetTransactionList() {
        try{
            var input = {};
            let user = this.getUserDetails();
            input.list = this.list = this.user.lastList;
            input.Reprompt_Message = false;

            this.$speech = app.Speech[user.Locale].GetTransactionList(input);
            input.Reprompt_Message = true;
            this.$reprompt = app.Speech[user.Locale].GetTransactionList(input);

            this.followUpState('UserWelcomeIntentState').ask(this.$speech, this.$reprompt);
        } catch(e){

            console.error(e);
        }
    },
    async Query(fnName, transStatus, mEndDate, callback) {

        try {
            let user = this.getUserDetails();
            let accountNumber = user.Detail.Login.Account_Number;
            let startDate = this.getInputByDS(this, 'StartDate');
            let endDate = 0;
            var expr = /[A-Za-z]/;

            console.debug('---->' ); //debug
            console.debug(this.$inputs);
            console.debug(startDate);

            if(mEndDate === true)
                endDate = this.$inputs.EndDate.value;

            //this-week/month commands
            if(startDate.match(expr) || startDate.length < 10) {

                var modDate;
                if(startDate.length === 0)
                    modDate = this.getInputByDS(this, 'StartPeriod');
                else
                    modDate = app._GetStartEndDate(this);

                startDate = modDate.startDate;
                endDate = modDate.endDate;
                
                //View accpeting only 0 if that is blank
                if(typeof endDate === "undefined")
                    endDate = 0;
            }

            //Reconcile date order
            if(mEndDate && startDate > endDate) { 

                let tmpDate = startDate;
                startDate = endDate;
                endDate = tmpDate;
            } 

            let routingIntentState = 'TransactionIntentState';
            let trans = {};

            //Validation
            if(typeof startDate === "undefined" || (mEndDate === true && (endDate === 0 || typeof endDate === "undefined"))) {

                this.$reprompt = this.$speech = app.Speech['help']._YIFW({ Emotion: 'Joy'});
                this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
            } else {

                if(app.IsAlive) {

                    let apiPath = app._GetIntentApiPath(fnName);
                    
                    //BMO-Bankz get debit transactions by date
                    var pEnqSumDebitOnDate = app.BmoBankz.connect('GET', apiPath, {
                        headers: {
                        'Transaction_Status': transStatus,
                        'Account_Number': accountNumber,
                        'Transaction_Start_Date': startDate,
                        'Transaction_End_Date': endDate
                        }
                    });
                    this.$user.$data.lastList = trans.list = await pEnqSumDebitOnDate.then(function(result){ return result; },
                        function(err){ 
                            console.error(err);
                        }
                    );
                } else {

                    trans = app.Mock[fnName];
                    this.$user.$data.lastList = trans.list;
                }

                if(trans.list.length <= 0 || trans.list.length > 6) {

                    routingIntentState = 'UserWelcomeIntent';
                }

                trans.Details = await this.getTransactionDetails(trans.list);
                trans.Details.Start_Date = startDate;
                trans.Details.End_Date = endDate;
                trans.Details.Transaction_Status = transStatus;
                trans.routingIntentState = routingIntentState;
                callback(trans);
            }
        } catch(e) {

            console.error(e);
        }
    },
    async Transactions_enqSumDebitOnDateIntent() {
        try {

            if(this.isSlotFilled(this, arguments.callee.name)) {
                await this.Query(arguments.callee.name, 'Debit', false, (trans) => {

                    this.$speech = app.Speech[this.user.Locale].Transactions_QueryOnDate(trans.Details);
                    trans.Details.Reprompt_Message = true;
                    this.$reprompt = app.Speech[this.user.Locale].Transactions_QueryOnDate(trans.Details);
                    
                    this.followUpState(trans.routingIntentState).ask(this.$speech, this.$reprompt);
                });
             }

        } catch(e) {

            console.error(e);
        }
    },
    async Transactions_enqSumCreditOnDateIntent() {
        try {

            if(this.isSlotFilled(this, arguments.callee.name)) {
                await this.Query(arguments.callee.name, 'Credit', false, (trans) => {
                
                    this.$speech = app.Speech[this.user.Locale].Transactions_QueryOnDate(trans.Details);
                    trans.Details.Reprompt_Message = true;
                    this.$reprompt = app.Speech[this.user.Locale].Transactions_QueryOnDate(trans.Details);
                    
                    this.followUpState(trans.routingIntentState).ask(this.$speech, this.$reprompt);
                });
            }

        } catch(e) {

            console.error(e);
        }
    },
    async Transactions_enqSumDebitBtwDatesIntent() {
        try {

            let fnName = arguments.callee.name;
            let endDateCond = (typeof this.$inputs.EndDate.value === "undefined");
            
            if(endDateCond) {

                await this.Transactions_enqSumDebitOnDateIntent();
            } else {
                
                await this.Query(fnName, 'Debit', true, (trans) => {
            
                    this.$speech = app.Speech[this.user.Locale].Transactions_QueryBtwDate(trans.Details);
                    trans.Details.Reprompt_Message = true;
                    this.$reprompt = app.Speech[this.user.Locale].Transactions_QueryBtwDate(trans.Details);
                    
                    this.followUpState(trans.routingIntentState).ask(this.$speech, this.$reprompt);
                });
            }

        } catch(e) {

            console.error(e);
        }
    },
    async Transactions_enqSumCreditBtwDatesIntent() {
        try {

            await this.Query(arguments.callee.name, 'Credit', true, (trans) => {
                
                this.$speech = app.Speech[this.user.Locale].Transactions_QueryBtwDate(trans.Details);
                trans.Details.Reprompt_Message = true;
                this.$reprompt = app.Speech[this.user.Locale].Transactions_QueryBtwDate(trans.Details);

                this.followUpState(trans.routingIntentState).ask(this.$speech, this.$reprompt);
        });

        } catch(e) {

            console.error(e);
        }
    },
    async Transactions_getLastNTransactionsIntent() {

        try{

            let user = this.getUserDetails();
            let accountNumber = user.Detail.Login.Account_Number;
            let trans = {};

            if(app.IsAlive) {

                let apiPath = app._GetIntentApiPath(arguments.callee.name);
                
                //BMO-Bankz Last N Transactions
                var pLastNTransactions = app.BmoBankz.connect('GET', apiPath, {
                    headers: {
                    'Account_Number': accountNumber,
                    'Number_Of_Transactions': 5
                    }
                });
                trans.list = await pLastNTransactions.then(function(result){ return result; },
                    function(err){ 
                        console.error(err);
                    }
                );
            } else {

                trans = app.Mock.Transactions_getLastNTransactionsIntent;
            }

            this.$speech = app.Speech[user.Locale].GetTransactionList(trans);
            trans.Reprompt_Message = true;
            this.$reprompt = app.Speech[user.Locale].GetTransactionList(trans);

            this.followUpState('UserWelcomeIntent').ask(this.$speech, this.$reprompt);
        } catch(e) {

            console.error(e);
        }
    },
    TransactionIntentState: {

        YesIntent() {

            this.GetTransactionList();
        },
        NoIntent() { 

            this.$reprompt = this.$speech = app.Speech['help']._ATE({ Emotion: 'Sad'});
            this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
        },
        Unhandled() {

            this.$reprompt = this.$speech = app.Speech['help'].Help({ Type: 'ConfirmYesNo'});
            this.followUpState('TransactionIntentState').ask(this.$speech, this.$reprompt);
        }
    }
};

module.exports = TransactionHandler;