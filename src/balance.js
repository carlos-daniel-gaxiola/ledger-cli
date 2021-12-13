
const Balance = (array_transactions,arg) => {
    
    var sprintf = require("sprintf-js").sprintf;
    
    // const parser = require("./parser");
    // array_transactions = parser(file);
    //  console.log(JSON.stringify(array_transactions));

    var movs = [];
    var mov = [];
    var balanceContent = {}
    
    
    for (transaction in array_transactions) {
        var movements = (array_transactions[transaction]["movements"].length);
        
        for (var i=0; i<movements; i++) {
            var amount = array_transactions[transaction]["movements"][i]["amount"]; 
            var curr = array_transactions[transaction]["movements"][i]["currency"];        
            var desc = array_transactions[transaction]["movements"][i]["description"];

            if (balanceContent.hasOwnProperty(desc)) {
                balanceContent[desc][0] += amount
            } else {
                balanceContent[desc] = [amount, curr]
            }
        }
        
    }

    copybalanceContent = {}
    
    

    if (arg.length > 0) {
        for(var a in arg) {
            keys = Object.keys(balanceContent);
            for (var k in keys) {        
                if(keys[k].includes(arg[a])) {
                    copybalanceContent[keys[k]] = balanceContent[keys[k]]
                    //delete balanceContent[keys[k]];
                } 
            }
        }
    } else {
        copybalanceContent = balanceContent;
    }
     
 
    keys = Object.keys(copybalanceContent);
    

    var sumas = {}
    var tipoDeMoneda;
    
    for (var i in keys) {
        tipoDeMoneda = balanceContent[keys[i]][1]
        if (sumas.hasOwnProperty(tipoDeMoneda)){
            sumas[tipoDeMoneda] += copybalanceContent[keys[i]][0]
        } else {
            sumas[tipoDeMoneda] = copybalanceContent[keys[i]][0]
        }
    }  
    


    for (var i in keys){
        var cantidad = `${copybalanceContent[keys[i]][1] } ${ copybalanceContent[keys[i]][0]}`;
        console.log(sprintf("%20s %5s",  cantidad, keys[i])); 
    };
    console.log('--------------------')
    
    for (var key in sumas) {
        if (sumas.hasOwnProperty(key)) {           
            console.log(sprintf("%20s %5s",key, sumas[key]));
        }
    }
}

module.exports = Balance;