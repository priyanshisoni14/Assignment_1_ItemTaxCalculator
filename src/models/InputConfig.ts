export interface ValidationRule {

    validate(
        value: string
    ): boolean;

    errorMessage: string;
}

export interface InputOptionConfig {

    required: boolean;

    validations?: ValidationRule[];

    transform?: (
        value: string
    ) => unknown;
}

export type InputConfig =
    Record<string, InputOptionConfig>;