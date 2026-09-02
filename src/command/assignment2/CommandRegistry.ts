import {Command} from "./Command";

export class CommandRegistry {

    constructor(
        private readonly commands: Map<string, Command>
    ) {}

    public getCommand(
        option: string
    ): Command | undefined {

        return this.commands.get(option);
    }
}