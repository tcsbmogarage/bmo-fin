'use strict';

module.exports = function(Transaction) {


    //Private functions

    Transaction._run = function(query, cb) {
        var response = [];
        try {

            query.get().then(snapshot => {
                if (snapshot.exists) {
                    let completeItem = snapshot.data();
                    completeItem.id = snapshot.id;
                    response.push(completeItem);
                } else {
                    snapshot.forEach(item => {
                        let completeItem = item.data();
                        completeItem.id = item.id;
                        response.push(completeItem);
                    });
                }
            }).then(() => cb(null, response)).catch(err => cb(err))

        } catch(e) {

            console.error(e);
        }
    }

    //Public remote functions

    //Get Last 5 Transactions

    Transaction.getLastNTransactions = function(accountNumber, numberOfTrans, cb){
        
        try {
                let condition = {
                    where: {
                            User_Account_Number: accountNumber
                           },
                    order: 'Transaction_Time DESC',
                    limit: numberOfTrans
                };
                console.debug(condition); //debug
                Transaction.find(condition, function(err, res){
                    if(!err) {
                        let result = res;
                        cb(null, result);
                    } else {
                        cb(null, err);
                    }
                });
            } catch(e) {

                console.error(e);
            }
        }   


        //Enqiury summation of debit transactions on date

    Transaction.enqSumOnDate = function(transactionStatus, accountNumber, transStartDate, transEndDate, cb){
        
        try {
                console.debug("StartDate: %s", transStartDate);
                console.debug("EndDate: %s", transEndDate);

                let dtToDate = new Date(transStartDate);
                let dtFromDate = new Date();

                if(transEndDate == '0') {

                    dtFromDate = new Date(transStartDate);
                    dtFromDate.setDate(dtFromDate.getDate()+1);
                } else {

                    dtFromDate = new Date(transEndDate);
                }

                let condition = {
                    where: {
                            direct: 1,
                            User_Account_Number: accountNumber,
                            Transaction_Status: transactionStatus,
                            StartAt: {
                                Transaction_Time: dtToDate
                            },
                            EndAt: {
                                Transaction_Time: dtFromDate
                            }
                           },
                    orderByAttr: 'Transaction_Time',
                    orderBy: 'DESC',
                    limit: 100
                };
                console.debug(condition); //debug

                Transaction.find(condition, function(err, query){
                    if(!err) {
                        query = query.where("User_Account_Number", "==", condition.where.User_Account_Number);
                        query = query.where("Transaction_Status", "==", condition.where.Transaction_Status);
                        query = query.where("Transaction_Time", ">=", condition.where.StartAt.Transaction_Time);
                        query = query.where("Transaction_Time", "<", condition.where.EndAt.Transaction_Time);

                        query = query.orderBy(condition.orderByAttr, condition.orderBy);
                        query = query.limit(condition.limit);
                        
                        Transaction._run(query, cb);
                    } else {

                        console.error(err);
                        cb(null, err);
                    }
                });
            } catch(e) {

                console.error(e);
            }
        }

    //Remoted Methods

    Transaction.remoteMethod('getLastNTransactions',{
        accepts: [{arg: 'Account_Number', type: 'string', required: true},
                 {arg: 'Number_Of_Transactions', type: 'string', default: '5'}],
        returns: {type: 'array', root: true},
        http: {path: '/getLastNTransactions', verb: 'get'}
    });

    Transaction.remoteMethod('enqSumOnDate',{
        accepts: [
                  {arg: 'Transaction_Status', type: 'string', default: 'Debit'},
                  {arg: 'Account_Number', type: 'string', required: true},
                  {arg: 'Transaction_Start_Date', type: 'string', required: true},
                  {arg: 'Transaction_End_Date', type: 'string', default: '0'}
                 ],
        returns: {type: 'array', root: true},
        http: {path: '/enqSumDebitOnDate', verb: 'get'}
    });

    Transaction.remoteMethod('enqSumOnDate',{
        accepts: [
                  {arg: 'Transaction_Status', type: 'string', default: 'Credit'},
                  {arg: 'Account_Number', type: 'string', required: true},
                  {arg: 'Transaction_Start_Date', type: 'string', required: true},
                  {arg: 'Transaction_End_Date', type: 'string', default: '0'}
                 ],
        returns: {type: 'array', root: true},
        http: {path: '/enqSumCreditOnDate', verb: 'get'}
    });

    Transaction.remoteMethod('enqSumOnDate',{
        accepts: [
                  {arg: 'Transaction_Status', type: 'string', default: 'Debit'},
                  {arg: 'Account_Number', type: 'string', required: true},
                  {arg: 'Transaction_Start_Date', type: 'string', required: true},
                  {arg: 'Transaction_End_Date', type: 'string', required: true}
                 ],
        returns: {type: 'array', root: true},
        http: {path: '/enqSumDebitBtwDates', verb: 'get'}
    });

    Transaction.remoteMethod('enqSumOnDate',{
        accepts: [
                  {arg: 'Transaction_Status', type: 'string', default: 'Credit'},
                  {arg: 'Account_Number', type: 'string', required: true},
                  {arg: 'Transaction_Start_Date', type: 'string', required: true},
                  {arg: 'Transaction_End_Date', type: 'string', required: true}
                 ],
        returns: {type: 'array', root: true},
        http: {path: '/enqSumCreditBtwDates', verb: 'get'}
    });

};
