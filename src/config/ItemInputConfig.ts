import {
    InputConfig
} from "./InputConfig";

export const itemInputConfig:
    InputConfig = {

    "-name": {
        required: true
    },

    "-price": {
        required: false,

        validations: [
            {
                validate: (value) =>
                    Number.isFinite(
                        Number(value)
                    ),

                errorMessage:
                    "Price must be a valid number."
            },
            {
                validate: (value) =>
                    Number(value) >= 0,

                errorMessage:
                    "Price cannot be negative."
            }
        ],

        transform: (value) =>
            Number(value)
    },

    "-quantity": {
        required: false,

        validations: [
            {
                validate: (value) =>
                    Number.isFinite(
                        Number(value)
                    ),

                errorMessage:
                    "Quantity must be a valid number."
            },
            {
                validate: (value) =>
                    Number(value) > 0,

                errorMessage:
                    "Quantity must be greater than zero."
            },
            {
                validate: (value) =>
                    Number.isInteger(
                        Number(value)
                    ),

                errorMessage:
                    "Quantity must be a whole number."
            }
        ],

        transform: (value) =>
            Number(value)
    },

    "-type": {
        required: true,

        validations: [
            {
                validate: (value) =>
                    [
                        "raw",
                        "manufactured",
                        "imported"
                    ].includes(
                        value.toLowerCase()
                    ),

                errorMessage:
                    "Invalid item type. Valid types are raw, manufactured, imported."
            }
        ],

        transform: (value) =>
            value.toLowerCase()
    }
};