const lineByLine = require('n-readlines');

var sprintf=require("sprintf-js").sprintf;

const RGX_DATE = /\d{4}\/\d{1,2}\/\d{1,2}/;
const RGX_DESCRIPTION = /[^\d{4}\/\d{1,2}\/\d{1,2}]+/;
const RGX_ACCOUNT_NAME = /[^\-?\$?\d+\.?\d+$]+/;
const RGX_AMOUNTTEST = /(\s\-?\$\-?\d+.*)|(\s\-?\d+.* \w{2,3})/g;

var contador = 0;
var negcurrency;

var movement = {};
var transaccion = {}
var array_transactions = []

const parser = (file) => {
    
    const liner = new lineByLine(file);
    let line;
  
    while (line = liner.next()) {
        line = line.toString('ascii');
        
        if  (line.startsWith(";")) {
            
        }

        else if (line.match(RGX_DATE)){
            if (JSON.stringify(transaccion)!='{}') {
                array_transactions.push(transaccion);
            } 
            transaccion = { movements: []}
            
            var date= (line.match(RGX_DATE).toString());
            transaccion['date'] = date;
        
            var description = (line.match(RGX_DESCRIPTION).toString().trim());
            transaccion['description'] = description; 

            

            
        } else if (line.match(RGX_ACCOUNT_NAME)) {
            movement['description'] = line.match(RGX_ACCOUNT_NAME).toString().trim();
            if (line.match(RGX_AMOUNTTEST)) {
                var cantidad = line.match(RGX_AMOUNTTEST).toString().trim();
                if (cantidad.startsWith('$')|| cantidad.startsWith('-$')) {
                    cantidad = cantidad.replace('$','');
                    var monto = parseFloat(cantidad);
                    var currency = '$';
                } else {
                    cantidad = cantidad.split(' ');
                    var monto = parseFloat(cantidad[0]);
                    var currency = cantidad[1];
                }
                contador += monto;
                negcurrency = currency;
                
                movement['amount'] = monto;
                movement['currency'] = currency;
                account = {}
            } else {
                movement['amount'] = -contador;
                movement['currency'] = negcurrency;
                account = {}
                contador = 0;
            }
            transaccion['movements'].push(movement);
            movement = {}
        }     
    }
    array_transactions.push(transaccion);
    
     // console.log(sprintf("%5j",array_transactions));

     return array_transactions;

    
}

module.exports = parser;