import {
    InputConfig
} from "../config/InputConfig";

export class InputParser {

    constructor(
        private readonly options:
            InputConfig
    ) {}

    parse(
        args: string[]
    ): Record<string, unknown> {

        if (args.length === 0) {
            throw new Error(
                "Please provide item details."
            );
        }

        const input:
            Record<string, string> = {};

        for (
            let index = 0;
            index < args.length;
            index++
        ) {

            const option =
                args[index];

            this.validateOption(option);

            this.ensureOptionIsNotDuplicated(
                input,
                option
            );

            const value =
                this.getRequiredValue(
                    option,
                    args[index + 1]
                );

            input[option] = value;

            index++;
        }

        this.validateRequiredOptions(
            input
        );

        this.validateOptionValues(
            input
        );

        return this.transformInputValues(
            input
        );
    }

    private validateOption(
        option: string
    ): void {

        if (!this.options[option]) {
            throw new Error(
                `Unknown option: ${option}. Valid options are ${Object.keys(
                    this.options
                ).join(", ")}.`
            );
        }
    }

    private ensureOptionIsNotDuplicated(
        input: Record<string, string>,
        option: string
    ): void {

        if (input[option] !== undefined) {
            throw new Error(
                `Duplicate option: ${option}.`
            );
        }
    }

    private getRequiredValue(
        option: string,
        value: string | undefined
    ): string {

        if (
            value === undefined ||
            this.options[value] !== undefined
        ) {
            throw new Error(
                `Value missing for ${option}.`
            );
        }

        const trimmedValue =
            value.trim();

        if (trimmedValue === "") {
            throw new Error(
                `Value for ${option} cannot be empty.`
            );
        }

        return trimmedValue;
    }

    private validateRequiredOptions(
        input: Record<string, string>
    ): void {

        for (
            const [option, config]
            of Object.entries(
                this.options
            )
        ) {

            if (
                config.required &&
                input[option] === undefined
            ) {
                throw new Error(
                    `${option} is required.`
                );
            }
        }
    }

    private validateOptionValues(
        input: Record<string, string>
    ): void {

        for (
            const [option, value]
            of Object.entries(input)
        ) {

            const config =
                this.options[option];

            for (
                const validation
                of config.validations ?? []
            ) {

                if (
                    !validation.validate(value)
                ) {
                    throw new Error(
                        validation.errorMessage
                    );
                }
            }
        }
    }

    private transformInputValues(
        input: Record<string, string>
    ): Record<string, unknown> {

        const transformedInput:
            Record<string, unknown> = {};

        for (
            const [option, value]
            of Object.entries(input)
        ) {

            const config =
                this.options[option];

            transformedInput[option] =
                config.transform
                    ? config.transform(value)
                    : value;
        }

        return transformedInput;
    }
}