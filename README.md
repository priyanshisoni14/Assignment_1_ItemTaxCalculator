# TypeScript Assignments

This repository contains TypeScript command-line applications developed as part of the assignments.

---

# Assignment 1 – Item Tax Calculator

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

`-name <item name>` — Required  
`-price <price>` — Optional  
`-quantity <quantity>` — Optional  
`-type <type>` — Required

Valid types:

- `raw`
- `manufactured`
- `imported`

Options other than `-name` can be provided in any order.

## Tax Rules

### Raw

12.5% of item price

### Manufactured

12.5% of item price  
+  
2% of `(item price + 12.5% tax)`

### Imported

10% import duty  
+  
surcharge

| Cost after import duty | Surcharge |
|---|---:|
| ≤ ₹100 | ₹5 |
| > ₹100 and ≤ ₹200 | ₹10 |
| > ₹200 | 5% of the applicable final cost |

## Tax Calculation

`Total Tax = Tax Per Unit × Quantity`

`Total Item Cost = Item Price × Quantity`

`Total Final Price = Final Price Per Unit × Quantity`

## Installation

Run:

`npm install`

## Build

Run:

`npm run build`

## Run

Example:

`node dist/index.js -name Pen -price 100 -quantity 3 -type raw`

## Testing

Run Jest tests:

`npm test`

Manual testing was also performed for:

- Valid inputs
- Missing required options
- Invalid types
- Invalid price and quantity
- Different option orders
- Multiple items
- Invalid `y/n` responses

---

# Assignment 2 – Student Information Management System

A TypeScript-based command-line application for managing student information using a menu-driven interface.

## Technology

- TypeScript
- Node.js
- Jest

## Features

- Add student details.
- Display student details.
- Delete students using roll number.
- Save student data to disk.
- Validate student input.
- Maintain students in default sorted order.
- Support sorting by different student fields.
- Prevent duplicate roll numbers.
- Use log-based JSON persistence.
- Includes automated testing using Jest.

## Student Details

Each student contains:

- Full Name
- Age
- Address
- Roll Number
- Courses

## Menu Operations

1. Add Student
2. Display Students
3. Delete Student
4. Save Students
5. Exit

## Project Structure

- `student/` → Student entity and student-related logic
- `command/` → Menu commands
- `repository/` → Student collection and business rules
- `sorter/` → Student sorting
- `persistence/` → File storage and retrieval
- `parser/` → Input parsing and validation
- `config/` → Application and validation configuration
- `ui/` → User interaction

The application is organized by responsibility so that each part of the system has a clear purpose.

## Sorting

Students are maintained in the default order by:

`Full Name → Roll Number`

The application also supports sorting by different fields in ascending or descending order.

## Validation

Input validation is configuration-driven.

`StudentInputConfig` contains the validation rules, while the reusable `InputParser` processes those rules.

The `InputParser` developed in Assignment 1 was reused in Assignment 2 without changing its core logic.

## Persistence

Student data is stored using a log-based JSON file.

Instead of rewriting the complete student collection after every operation, changes are recorded as events such as:

- `insert`
- `delete`

This reduces unnecessary file rewriting and keeps the persistence logic simple.

## Design Patterns and Principles

The project uses patterns only where they solve a real problem:

- **Command Pattern** → Handles menu actions.
- **Repository Pattern** → Manages students and business rules.
- **Singleton Pattern** → Used for the single application instance.
- **Dependency Injection** → Provides dependencies through configuration.
- **Config-driven design** → Manages reusable validation rules.
- **Single Responsibility Principle** → Keeps each class focused on one responsibility.

Patterns such as Factory Method, Builder, Strategy, Observer, Decorator, and Visitor were considered but rejected where they would add unnecessary complexity.

## Installation

Run:

`npm install`

## Build

Run:

`npm run build`

## Run

Run:

`node dist/index.js`

## Testing

Run Jest tests:

`npm test`

Tests cover areas such as:

- Student creation
- Input validation
- Repository operations
- Duplicate roll numbers
- Sorting
- Commands
- Persistence
- Application behavior

---

# Key Learnings

Through both assignments, I learned to focus on solving the actual problem rather than automatically applying design patterns.

- Keep each class focused on one responsibility.
- Prefer simple solutions when they are sufficient.
- Reuse generic infrastructure instead of duplicating logic.
- Separate rules from processing logic using configuration.
- Compare alternatives before choosing a design.
- Consider time complexity without premature optimization.
- Use design patterns only when they solve a real problem.
- Keep business logic, input handling, and persistence separate.

> **Main takeaway:** Good design is not about using more patterns. It is about choosing the simplest solution that solves the actual problem.

---

# Documentation

## Assignment 1

[Development Analysis and Testing Analysis](https://docs.google.com/document/d/1CJHKnIM3iIyKD_-C1Z8FGAdzs4e4ToTP6lXCrCovWLU/edit?usp=sharing)

## Assignment 2

[Development Analysis and Retrospective documentation](https://docs.google.com/document/d/19uIMqOnrATSud013-1By6xTKyXQeVk4uXxSA-VK3j34/edit?pli=1&tab=t.0)
