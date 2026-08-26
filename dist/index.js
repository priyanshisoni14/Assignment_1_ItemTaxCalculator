"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const Item_1 = require("./Item");
const TaxCalculator_1 = require("./TaxCalculator");
const InputParser_1 = require("./InputParser");
const inputParser = new InputParser_1.InputParser();
const taxCalculator = new TaxCalculator_1.TaxCalculator();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}
function displayItemResult(item) {
    const taxPerUnit = taxCalculator.calculateTaxPerUnit(item);
    const finalPricePerUnit = taxCalculator.calculateFinalPricePerUnit(item);
    const totalItemCost = item.getItemCost();
    const totalTax = taxCalculator.calculateTotalTax(item);
    const totalFinalPrice = taxCalculator.calculateTotalFinalPrice(item);
    console.log("\n----------------------------------------");
    console.log(`Item Name          : ${item.name}`);
    console.log(`Item Price         : ₹${item.price.toFixed(2)}`);
    console.log(`Quantity           : ${item.quantity}`);
    console.log(`Item Type          : ${item.type}`);
    console.log(`Sales Tax / Unit   : ₹${taxPerUnit.toFixed(2)}`);
    console.log(`Final Price / Unit : ₹${finalPricePerUnit.toFixed(2)}`);
    console.log(`Total Item Cost    : ₹${totalItemCost.toFixed(2)}`);
    console.log(`Total Tax          : ₹${totalTax.toFixed(2)}`);
    console.log(`Total Final Price  : ₹${totalFinalPrice.toFixed(2)}`);
    console.log("----------------------------------------");
}
function createItem(parsedInput) {
    return new Item_1.Item(parsedInput.name, parsedInput.price ?? 0, parsedInput.quantity ?? 0, parsedInput.type);
}
async function processItem(args) {
    try {
        const parsedInput = inputParser.parse(args);
        const item = createItem(parsedInput);
        displayItemResult(item);
        return item;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`\nError: ${error.message}`);
        }
        else {
            console.error("\nAn unexpected error occurred.");
        }
        return null;
    }
}
async function main() {
    const commandLineArgs = process.argv.slice(2);
    if (commandLineArgs.length === 0) {
        console.error("Error: Please provide item details.");
        rl.close();
        return;
    }
    let totalItemCost = 0;
    let totalTax = 0;
    let totalFinalPrice = 0;
    const firstItem = await processItem(commandLineArgs);
    if (firstItem) {
        totalItemCost +=
            firstItem.getItemCost();
        totalTax +=
            taxCalculator.calculateTotalTax(firstItem);
        totalFinalPrice +=
            taxCalculator.calculateTotalFinalPrice(firstItem);
    }
    while (true) {
        const answer = (await askQuestion("\nDo you want to enter details of any other item (y/n): "))
            .trim()
            .toLowerCase();
        if (answer === "n") {
            break;
        }
        if (answer !== "y") {
            console.log("Invalid input. Please enter y or n.");
            continue;
        }
        const itemInput = await askQuestion("Enter item details: ");
        const args = itemInput.trim().split(/\s+/);
        const item = await processItem(args);
        if (item) {
            totalItemCost +=
                item.getItemCost();
            totalTax +=
                taxCalculator.calculateTotalTax(item);
            totalFinalPrice +=
                taxCalculator.calculateTotalFinalPrice(item);
        }
    }
    console.log("\n========================================");
    console.log(`Overall Total Item Cost : ₹${totalItemCost.toFixed(2)}`);
    console.log(`Overall Total Tax       : ₹${totalTax.toFixed(2)}`);
    console.log(`Overall Total Price     : ₹${totalFinalPrice.toFixed(2)}`);
    console.log("========================================");
    console.log("\nApplication terminated.");
    rl.close();
}
main();
