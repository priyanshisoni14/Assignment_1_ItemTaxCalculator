import { ConsoleUI } from "../src/ui/ConsoleUI";

type MockUI = jest.Mocked<
    Pick<
        ConsoleUI,
        | "askQuestion"
        | "displayMessage"
        | "displayError"
        | "displayItemDetails"
        | "displayItemSummary"
        | "close"
    >
>;

describe("Application", () => {

    let mockUI: MockUI;

    beforeEach(() => {

        jest.resetModules();

        mockUI = {
            askQuestion: jest.fn(),
            displayMessage: jest.fn(),
            displayError: jest.fn(),
            displayItemDetails: jest.fn(),
            displayItemSummary: jest.fn(),
            close: jest.fn()
        };
    });

    afterEach(() => {

        jest.restoreAllMocks();
    });

    async function runApplication():
        Promise<void> {

        jest.doMock(
            "../src/ui/ConsoleUI",
            () => ({
                ConsoleUI: jest.fn(
                    () => mockUI
                )
            })
        );

        const {
            Application
        } = await import(
            "../src/application/Application"
        );

        const application =
            Application.getInstance();

        await application.run();
    }

    test(
        "should read item details from command line",
        async () => {

            const originalArgv =
                process.argv;

            process.argv = [
                "node",
                "index.js",
                "-name",
                "Pen",
                "-price",
                "100",
                "-quantity",
                "2",
                "-type",
                "raw"
            ];

            mockUI.askQuestion
                .mockResolvedValue(
                    "n"
                );

            await runApplication();

            expect(
                mockUI.displayItemDetails
            ).toHaveBeenCalledTimes(1);

            expect(
                mockUI.displayItemSummary
            ).toHaveBeenCalledTimes(1);

            expect(
                mockUI.close
            ).toHaveBeenCalledTimes(1);

            process.argv =
                originalArgv;
        }
    );

    test(
        "should add another item",
        async () => {

            const originalArgv =
                process.argv;

            process.argv = [
                "node",
                "index.js",
                "-name",
                "Pen",
                "-price",
                "100",
                "-quantity",
                "2",
                "-type",
                "raw"
            ];

            mockUI.askQuestion
                .mockResolvedValueOnce(
                    "y"
                )
                .mockResolvedValueOnce(
                    "-name Book -price 200 -quantity 1 -type imported"
                )
                .mockResolvedValueOnce(
                    "n"
                );

            await runApplication();

            expect(
                mockUI.displayItemDetails
            ).toHaveBeenCalledTimes(2);

            expect(
                mockUI.displayItemSummary
            ).toHaveBeenCalledTimes(1);

            expect(
                mockUI.close
            ).toHaveBeenCalledTimes(1);

            process.argv =
                originalArgv;
        }
    );

    test(
        "should handle invalid yes or no input",
        async () => {

            const originalArgv =
                process.argv;

            process.argv = [
                "node",
                "index.js",
                "-name",
                "Pen",
                "-price",
                "100",
                "-quantity",
                "2",
                "-type",
                "raw"
            ];

            mockUI.askQuestion
                .mockResolvedValueOnce(
                    "invalid"
                )
                .mockResolvedValueOnce(
                    "n"
                );

            await runApplication();

            expect(
                mockUI.displayMessage
            ).toHaveBeenCalledWith(
                "Invalid input. Please enter y or n."
            );

            expect(
                mockUI.displayItemSummary
            ).toHaveBeenCalledTimes(1);

            process.argv =
                originalArgv;
        }
    );

    test(
        "should display an error when no command line arguments are provided",
        async () => {

            const originalArgv =
                process.argv;

            process.argv = [
                "node",
                "index.js"
            ];

            await runApplication();

            expect(
                mockUI.displayError
            ).toHaveBeenCalledWith(
                "Please provide item details."
            );

            expect(
                mockUI.close
            ).toHaveBeenCalledTimes(1);

            process.argv =
                originalArgv;
        }
    );
});