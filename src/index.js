const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const fs = require("fs");

function FileExist(current_file) {
    if (current_file) {
        const parser = require("./parser");

        if (current_file == "index.ledger") {

            return array_transactions;
        } else {
            array_transactions = parser(current_file);

            return array_transactions;
        }
    } else {
        console.log("Error: No file");
        return false;
    }
}

rl.question("Enter your command: ", function (command) {
    var commandSplit = command.split("--");
    var commandStr = commandSplit[0].split(" ")
    switch (commandStr[0]) {
        case "register":
            if(commandSplit[1] === "sort"){
                var sort = true
                if (FileExist(commandStr[1])) {
                    const Register = require("./register");
                    Register(array_transactions, sort);
                }
            }
            else if (FileExist(commandStr[1])) {
                const Register = require("./register");
                Register(array_transactions);
            }
            break;
        case "balance":
            var commandBalance = []
            for(var i = 2; i< commandStr.length; i++){
                commandBalance.push(commandStr[i])
            }
            var commandBalanceJoin = commandBalance.join()
            var commandBalanceReplace = commandBalanceJoin.replaceAll(",", " ")
            if (FileExist(commandStr[1])) {
                const Balance = require("./balance");
                Balance(array_transactions, commandBalanceReplace);
            }
            break;
        case "print":
            fs.readFile(commandStr[1], "utf8", (err, data) => {
                if (err) {
                    console.error("This file doesnt exists");
                    return;
                }
                console.log(data);
            });
            break;
        default:
            console.log("This command doesnt exists");
    }
});
