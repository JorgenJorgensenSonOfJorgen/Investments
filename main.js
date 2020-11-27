// Investment Accounts Assignment Start Code

// HTML Variables
let containerEl = document.getElementById("container");
let outputEl = document.getElementById("output");
let goBtnEl = document.getElementById("go");
let menuEl = document.getElementById("menu");

// Global Variable
let accounts = [];
for (n = 1; n <= 200; n ++) {
  accounts.push(Math.random()*5000)
}
let maxAmount = 5000; // account values should be b/t 0 and max

// Display Data
drawArray();

function drawArray() {
  let outputStr = "";
  let divHeight;
  for (let i = 0; i < accounts.length; i++) {
    divHeight = (accounts[i] / maxAmount) * 600; // Scale accounts to fit in array visualizer container
    outputStr += `<div style="height:${divHeight}px"></div>`;
  }
  containerEl.innerHTML = outputStr;
}

// Main Menu & Go Button
goBtnEl.addEventListener("click", mainMenu);

function mainMenu() {
  // Get value of menu select element
  let selection = menuEl.value;

  // Take action based on menu selection
  if (selection === "count-range") {
    countRange();
  } else if (selection === "donor") {
    generousDonor();
  } else if (selection === "hacker") {
    hackerAttack();
  } else if (selection === "stats") {
    investmentStats();
  } else if (selection === "add") {
    addAccount();
  } else if (selection === "remove-low") {
    removeLow();
  } else if (selection === "robin-hood") {
    robinHood();
  }

  // Redraw array to show any changes
  drawArray();
}

// ******************************************************
// MENU SELECTION FUNCTIONS
// ******************************************************
function countRange() {
  // Output the number of accounts with amounts between $2,000 and $4,000, inclusive
  let count = 0
  for (let i = 0; i < accounts.length; i ++) {
    if (accounts[i] >= 2000 && accounts[i] <= 4000) {
      count ++
    }
  }
  outputEl.innerHTML = "Accounts in value range of $2000 - $4000 inclusive: " + count
}

function generousDonor() {
  // A generous donor has decided to give $500 to every investment
  // account that has less than $2000. 
  // Modify the investment account array to apply this donation.
  // Output the total amount of money that was donated.
  let count = 0
  for (let i = 0; i < accounts.length; i ++) {
    if (accounts[i] < 2000) {
      accounts[i] += 500
      count ++
    }
  }
  outputEl.innerHTML = "Generous Donor, Amount Donated $: " + count*500
}

function hackerAttack() {
  // A hacker steals 5% from every account.
  // Modify the investment account array to apply this theft.
  // Output the total amount that was stolen.
  let stolenAmt = 0
  for (let i = 0; i < accounts.length; i ++) {
    stolenAmt += 0.05*accounts[i]
    accounts[i] = 0.95*accounts[i]
  }
  outputEl.innerHTML = "Hacker Attack, Amount stolen (rounded): $" + Math.round(stolenAmt*100)/100
}

function investmentStats() {
  // Output the minimum account amount, the maximum account amount
  // and the average account amount.
  let min = Math.min(...accounts)
  let max = Math.max(...accounts)
  let total = 0
  //if there are no accounts make everything 0
  if (accounts.length == 0) {
    outputEl.innerHTML = "Investment Stats(rounded), Max: $" + 0 +", Min: $" + 0 + " Average: $" + 0
  } else {
    for (let i = 0; i < accounts.length; i ++) {
      total += accounts[i]
    }
    outputEl.innerHTML = "Investment Stats(rounded), Max: $" + Math.round(max*100)/100 +", Min: $" + Math.round(min*100)/100 + " Average: $" + Math.round(100*total/accounts.length)/100;
  }
}

function addAccount() {
  // Prompt for a new account amount and add this to the invesment account
  // array. Output a confirmation that a new account was added with an
  // opening amount of _______.
  //input
  let value = Number(prompt("Account amount")) 
  //get rid of invalid values
  if(value > 5000 || value < 0 || String(value) == "NaN") {
    outputEl.innerHTML = "Invalid account value, account not opened"
  // add account with value
  } else {
  accounts.push(value)
  outputEl.innerHTML = "Account added, Opening: $" +  value;
  }
}

function removeLow() {
  // Remove all accounts that are below $500.
  // Output how many accounts were removed.
  let count = 0
  for (let i = 0; i < accounts.length; i ++){
    if (accounts[i] < 500) {
      accounts.splice(i,1)
      i--
      count ++
    }
  }
  outputEl.innerHTML = "Remove Low Accounts, Accounts removed: " + count
}

function robinHood() {
  // Steal from the rich and give to the poor.
  // Take $400 from every account that has over $4000.
  // Then evenly distribute the total amount taken between all the
  // accounts that have less than $1000.
  // Output how many accounts received money and 
  // how much each account received.
  let richCount = 0
  let poorCount = 0
  let moneyBack = 0
  //find number of rich accounts and number of poor accounts
  for (let i = 0; i < accounts.length; i ++) {
    if (accounts[i]>4000) {
      richCount ++
    } else if (accounts[i]<1000){
      poorCount ++
    }
  //dont take away money if there are no poor people!
  } if (poorCount == 0) {
      outputEl.innerHTML = "Robin Hood, Money recieved: $" + 0 +" for " + 0 + " accounts"
  //proceed with theft
  } else {
    //calculate total money taken/per account
    let moneyPerAcc = richCount*400/poorCount
    //secondary scan to determine how much money needs to be returned
    for (let i = 0; i < accounts.length; i ++) {
      if (accounts[i] < 1000) {
        if (accounts[i] + moneyPerAcc > 5000) {
          moneyBack += accounts[i] + moneyPerAcc - 5000
        }
      }
    }
    //give money to poor accounts
    for (let i = 0; i < accounts.length; i ++) {
      if (accounts[i] < 1000){
        accounts[i] += moneyPerAcc
      //account balance cannot exceed 5000
        if (accounts[i] > 5000) {
          accounts[i] = 5000
        }
      //take money away from rich (and return surplus above 5000)
      } else if (accounts[i]> 4000) {
        accounts[i] -= 400
        accounts[i] += moneyBack/richCount
      }
    }
    outputEl.innerHTML = "Robin Hood, Money recieved: $" + Math.round(moneyPerAcc) +" (before deductions) for " + poorCount + " accounts"
  }
}
