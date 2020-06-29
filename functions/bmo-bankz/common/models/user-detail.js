'use strict';

module.exports = function(Userdetail) {

        var app = require('../../server/server');

       //Enqiury summation of debit transactions on date

       Userdetail.payCCBill = function(userDetailId, userAccountNumber, dueAmount, payAmount, dueDate, cardNumber, cardType, dValue, cb){
        
            try {
                
                let input = {};
                input.Credit_Card_Due_Amount = dueAmount;
                input.Credit_Card_Due_Date = dueDate;
                input.Credit_Card_Number = cardNumber;
                input.Credit_Card_Type = cardType;
                input.Default = dValue;

                //Revised pay amount
                input.Credit_Card_Due_Amount = '$' + (parseFloat(dueAmount.replace('$', '')) - parseFloat(payAmount.replace('$', ''))).toFixed(2);

                //Revised due date
                var d = new Date(dueDate);
                d.setMonth(d.getMonth() + 1);
                input.Credit_Card_Due_Date = d.toLocaleDateString('en-US');
                console.debug(input);

                const condition = {
                    where: {
                        direct: 1
                    }
                };

                //Transaction

                var Transaction = app.models.Transaction;
                const sourceAccountName = "pay your credit card outstanding"
                Transaction.createATransaction(userAccountNumber, sourceAccountName, cardNumber, payAmount, "Debit", "", function() {

                    Userdetail.find(condition, function(err, userDetail){

                        if(!err) {
                            const data = { BMO_Credit_Cards: [ input ] };
                            userDetail = userDetail.doc(userDetailId)
                            .update(data)
                            .then(() => cb(null, data))
                            .catch(err => cb(err));

                        } else {

                            console.error(err);
                            cb(err, null)
                        }
                    });
                });

                
            } catch(e) {

                console.error(e);
                cb(e, null);
            }
        }


    Userdetail.remoteMethod('payCCBill',{
        accepts: [
            {arg: 'User_Detail_Id', type: 'string', required: true},
            {arg: 'User_Account_Number', type: 'string', required: true},
            {arg: 'Credit_Card_Due_Amount', type: 'string', required: true},
            {arg: 'Credit_Card_Pay_Amount', type: 'string', required: true},
            {arg: 'Credit_Card_Due_Date', type: 'string', required: true},
            {arg: 'Credit_Card_Number', type: 'string', required: true},
            {arg: 'Credit_Card_Type', type: 'string', required: true},
            {arg: 'Default', type: 'string', default: 'false'}
           ],
        returns: {type: 'object', root: true},
        http: {path: '/payCcBill', verb: 'post'}
    });
};
