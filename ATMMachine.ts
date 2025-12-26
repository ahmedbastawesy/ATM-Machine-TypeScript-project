import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

async function main() {
  let counter: number = 0;
  let money: number = 10000;
  console.log("Welcome to our ATM Machine");

  // ============================================================================================================
  // User asked for Pin to Enter ATM Machine + Validation in case if entered many times wrong to block the user
  // =============================================================================================================

  const rl = readline.createInterface({ input, output });

  let pin: number = Number(await rl.question("Please enter your Pin Number: "));

  for (let i = 0; i < 3; i++) {
    if (pin !== 1234) {
      console.log("Wrong Entry Please Try again");
      counter = counter + 1;

      if (counter === 3) {
        console.log("Too many entries, please try again after 2 hours");
        rl.close();
        return;
      }

      pin = Number(await rl.question("Please enter your Pin Number: "));
    } else {
      break; // correct pin
    }
  }

  // =====================================
  // Displaying options after correct Pin Entry
  // =====================================

  if (pin === 1234) {
    console.log("Welcome to your Bank Account");
  } else {
    rl.close();
    return;
  }

  // ====================================
  // Entering User Choice + Validation for correct option
  // ====================================

  while (true) {
    console.log("Main Men:");
    console.log("1. Check Balance");
    console.log("2. Withdraw Funds");
    console.log("3. Deposit Funds");
    console.log("4. Exit");

    let choice: number = Number(await rl.question("Please select an option: "));

    while (choice !== 1 && choice !== 2 && choice !== 3 && choice !== 4) {
      console.log("Invalid choice. Please enter 1, 2, 3, or 4.");
      choice = Number(await rl.question("Please select an option: "));
    }

    console.log("Choice entered:", choice);

    // ==========================================
    // Switch case on every option selected by user
    // ==========================================

    switch (choice) {
      // ==========================================
      // Case 1: Checking Balance of the User
      // ==========================================

      case 1:
        console.log("Your balance is $" + money);
        break;

      // ==========================================
      // Case 2: Withdrawing Funds from the Account
      // ==========================================

      case 2: {
        console.log("Withdraw Funds selected");

        let withdrawAmount: number;

        while (true) {
          const amountStrWithdraw = await rl.question(
            "Please enter amount to Withdraw: "
          );
          withdrawAmount = Number(amountStrWithdraw);

          if (Number.isNaN(withdrawAmount) || withdrawAmount <= 0) {
            console.log("Invalid amount. Please enter a positive number.");
            continue;
          }

          if (withdrawAmount > money) {
            console.log(
              "Insufficient funds. Your current balance is $" + money
            );
            continue;
          }

          break; // valid amount and <= balance
        }

        money = money - withdrawAmount;

        console.log("Withdrawing:", withdrawAmount);
        console.log("Your new balance is $" + money);
        break;
      }

      // ==========================================
      // Case 3: Depositing Funds to the Account
      // ==========================================

      case 3: {
        console.log("Deposit Funds selected");

        let depositAmount: number;

        while (true) {
          const amountStr = await rl.question(
            "Please enter amount to deposit: "
          );
          depositAmount = Number(amountStr);

          if (Number.isNaN(depositAmount) || depositAmount <= 0) {
            console.log("Invalid amount. Please enter a positive number.");
            continue;
          }

          break; // valid deposit
        }

        money += depositAmount;

        console.log("Depositing:", depositAmount);
        console.log("Your new balance is $" + money);
        break;
      }

      // ==========================================
      // Case 4: Exiting from the ATM Machine
      // ========================================== 
      case 4:
        console.log("Exiting...");
        console.log("Thanks for using our ATM!");
        rl.close();
        return;
    }

    // ============================
    // Ask user if they want to continue
    // ============================

    let again = (
      await rl.question("Do you want to perform another transaction? (y/n): ")
    )
      .trim()
      .toLowerCase();

    while (again !== "y" && again !== "n") {
      console.log("Invalid input. Please enter y or n.");
      again = (
        await rl.question("Do you want to perform another transaction? (y/n): ")
      )
        .trim()
        .toLowerCase();
    }

    if (again === "n") {
      console.log("Thanks for using our ATM!");
      rl.close();
      return;
    }
    if (again === "y") {
      console.log("Returning to main menu...");
      continue;
    }
  }
}

main().catch(console.error);
