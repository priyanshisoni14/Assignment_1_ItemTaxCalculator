# Item Tax Calculator

A TypeScript-based command-line application that calculates sales tax and final prices for different types of items.

## Technology

- TypeScript
- Node.js
- Jest

## Features

- Accepts item details through command-line arguments.
- Supports `raw`, `manufactured`, and `imported` items.
- Supports multiple items.
- Calculates tax per unit and multiplies it by quantity.
- Validates user input and handles errors.
- Includes automated testing using Jest.

## Input

```text
-name <item name>       Required
-price <price>          Optional
-quantity <quantity>    Optional
-type <type>            Required
```

Valid types:

```text
raw
manufactured
imported
```

Options other than `-name` can be provided in any order.

## Tax Rules

### Raw

```text
12.5% of item price
```

### Manufactured

```text
12.5% of item price
+
2% of (item price + 12.5% tax)
```

### Imported

```text
10% import duty
+
surcharge
```

| Cost after import duty |                       Surcharge |
| ---------------------- | ------------------------------: |
| ≤ ₹100                 |                              ₹5 |
| > ₹100 and ≤ ₹200      |                             ₹10 |
| > ₹200                 | 5% of the applicable final cost |

## Tax Calculation

Tax is calculated per unit first:

```text
Total Tax = Tax Per Unit × Quantity
```

```text
Total Item Cost = Item Price × Quantity
Total Final Price = Final Price Per Unit × Quantity
```

## Installation

```bash
npm install
```

## Build

```bash
npm run build
```

## Run

```bash
node dist/index.js -name Pen -price 100 -quantity 3 -type raw
```

## Testing

Run Jest tests:

```bash
npm test
```

Manual testing was also performed for valid inputs, missing required options, invalid types, invalid price/quantity, different option orders, multiple items, and invalid `y/n` responses.

## Dev Analysis Doc and Testing Analysis

https://docs.google.com/document/d/1CJHKnIM3iIyKD_-C1Z8FGAdzs4e4ToTP6lXCrCovWLU/edit?usp=sharing
