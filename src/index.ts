import * as readline from "readline";
import { Item, ItemType } from "./Item";
import { TaxCalculator } from "./TaxCalculator";
import { InputParser, ParsedInput } from "./InputParser";

const inputParser = new InputParser();
const taxCalculator = new TaxCalculator();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

function displayItemResult(item: Item): void {

    const taxPerUnit =
        taxCalculator.calculateTaxPerUnit(item);

    const finalPricePerUnit =
        taxCalculator.calculateFinalPricePerUnit(item);

    const totalItemCost =
        item.getItemCost();

    const totalTax =
        taxCalculator.calculateTotalTax(item);

    const totalFinalPrice =
        taxCalculator.calculateTotalFinalPrice(item);

    console.log("\n----------------------------------------");

    console.log(`Item Name          : ${item.name}`);
    console.log(`Item Price         : ₹${item.price.toFixed(2)}`);
    console.log(`Quantity           : ${item.quantity}`);
    console.log(`Item Type          : ${item.type}`);

    console.log(
        `Sales Tax / Unit   : ₹${taxPerUnit.toFixed(2)}`
    );

    console.log(
        `Final Price / Unit : ₹${finalPricePerUnit.toFixed(2)}`
    );

    console.log(
        `Total Item Cost    : ₹${totalItemCost.toFixed(2)}`
    );

    console.log(
        `Total Tax          : ₹${totalTax.toFixed(2)}`
    );

    console.log(
        `Total Final Price  : ₹${totalFinalPrice.toFixed(2)}`
    );

    console.log("----------------------------------------");
}

function createItem(parsedInput: ParsedInput): Item {

    return new Item(
        parsedInput.name,
        parsedInput.price ?? 0,
        parsedInput.quantity ?? 0,
        parsedInput.type
    );
}

async function processItem(args: string[]): Promise<Item | null> {

    try {

        const parsedInput =
            inputParser.parse(args);

        const item =
            createItem(parsedInput);

        displayItemResult(item);

        return item;

    } catch (error) {

        if (error instanceof Error) {
            console.error(`\nError: ${error.message}`);
        } else {
            console.error(
                "\nAn unexpected error occurred."
            );
        }

        return null;
    }
}

async function main(): Promise<void> {

    const commandLineArgs =
        process.argv.slice(2);

    if (commandLineArgs.length === 0) {

        console.error(
            "Error: Please provide item details."
        );

        rl.close();
        return;
    }

    let totalItemCost = 0;
    let totalTax = 0;
    let totalFinalPrice = 0;

    const firstItem =
        await processItem(commandLineArgs);

    if (firstItem) {

        totalItemCost +=
            firstItem.getItemCost();

        totalTax +=
            taxCalculator.calculateTotalTax(firstItem);

        totalFinalPrice +=
            taxCalculator.calculateTotalFinalPrice(
                firstItem
            );
    }

    while (true) {

        const answer = (
            await askQuestion(
                "\nDo you want to enter details of any other item (y/n): "
            )
        )
            .trim()
            .toLowerCase();

        if (answer === "n") {
            break;
        }

        if (answer !== "y") {

            console.log(
                "Invalid input. Please enter y or n."
            );

            continue;
        }

        const itemInput =
            await askQuestion(
                "Enter item details: "
            );

        const args =
            itemInput.trim().split(/\s+/);

        const item =
            await processItem(args);

        if (item) {

            totalItemCost +=
                item.getItemCost();

            totalTax +=
                taxCalculator.calculateTotalTax(item);

            totalFinalPrice +=
                taxCalculator.calculateTotalFinalPrice(
                    item
                );
        }
    }

    console.log("\n========================================");

    console.log(
        `Overall Total Item Cost : ₹${totalItemCost.toFixed(2)}`
    );

    console.log(
        `Overall Total Tax       : ₹${totalTax.toFixed(2)}`
    );

    console.log(
        `Overall Total Price     : ₹${totalFinalPrice.toFixed(2)}`
    );

    console.log("========================================");

    console.log("\nApplication terminated.");

    rl.close();
}

main();