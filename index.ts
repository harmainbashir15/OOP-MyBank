#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Interface for Account Number
interface BankAccount{
    accountNumber:number;
    balance:number;
    withdraw(amount:number):void;
    deposit(amount:number):void;
    checkBalance():void
}

//Class for Account Number
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber:number,balance:number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }
    withdraw(amount: number): void {
        if(amount < this.balance){
            this.balance -= amount       
            console.log(chalk.green(`Widthdraw Successful! Your Current Balance is $${this.balance}.`))   
        }
        else{console.log(chalk.red("Insificent Balance."))
            console.log(chalk.yellow(`Your Current Balance is $${this.balance}.`));
            };
    }

    deposit(amount: number): void {
        if(amount > 100 ){
            amount -= 1
            this.balance += amount;           // Update the balance with the amount
            console.log(chalk.bold.green(`Deposit of $${amount} is Succussfully Done! $1 deposit charges is Deduct From Your Deposit.\n Your New Balance is $${this.balance}.`))}

        else if(amount <= 100){
                amount -= 0
                this.balance += amount         // Update the balance with the amount
                console.log(chalk.bold.green(`Deposit of $${amount} is Successfully Done! Your New Balance is $${this.balance}.`));
            }
            }
    checkBalance(): void {
        console.log(chalk.yellow(`Your Balance is $${this.balance}.`));
        }
}
 //  create class for customers
 class Customer{
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    mobileNumber:number;
    account: BankAccount;

    constructor(firstName:string,lastName:string,gender:string,age:number,mobileNumber:number,account:BankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }

}
 // create Bank account
let accounts: BankAccount[] =[
    new BankAccount (1101,1000),
    new BankAccount (1102,1500),
    new BankAccount(1103,2000)
]

//   create Customers
let customers:Customer[] =[
    new Customer ("Ahmed","Raza","Male",28,3001234567,accounts[0]),
    new Customer ("Harmain","Fatima","Female",24,3331244597,accounts[1]),
    new Customer ("Bashir","Ahmed","Male",28,3132034527,accounts[2])
]

 async function accountHolder(){
    do{
    let accountNumber = await inquirer.prompt({
        name:"accountnumber",
        type:"input",
        message:"Enter Your Account Number:"
    })
     let customer = customers.find(customer => customer.account.accountNumber == accountNumber.accountnumber)   

    if(customer){
        console.log(chalk.magenta.bold(`Welcome ${customer.firstName} ${customer.lastName} to Our OOP Bank.`))

        let answer = await inquirer.prompt({
            name:"select",
            type:"list",
            message:"Please Enter Your Operation:",
            choices:["Deposit","Withdraw","Check Balance","Exit"]
        })

        if(answer.select ==="Deposit"){
            let amountDeposit = await inquirer.prompt({
                name:"amount",
                type:"input",
                message:"Enter your Amount To Deposit:"
            })
        customer.account.deposit(amountDeposit.amount)
        }
         else if(answer.select === "Withdraw"){
            let amountWithdraw = await inquirer.prompt({
                name:"amount",
                type:"input",
                message:"Enter your Amount To Withdraw:"
            })
        customer.account.withdraw(amountWithdraw.amount)
        }
        else if(answer.select === "Check Balance"){
            console.log(chalk.yellow(`Your Balance is $${customer.account.balance}`));
            }
        else if(answer.select === "Exit"){
            console.log(chalk.blue("Exiting..."));
            console.log(chalk.magenta("*** Thank You For Using Our Services ***"));
            return;
            }

}
else {console.log(chalk.red("Invalid Account Number"));
}

}while(true);
}
accountHolder()