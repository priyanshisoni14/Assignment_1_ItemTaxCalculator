import { Application }
    from "../src/application/assignment1/Application";

import { ConsoleUI }
    from "../src/ui/ConsoleUI";


jest.mock(
    "../src/ui/ConsoleUI",
    () => ({
        ConsoleUI: jest.fn()
    })
);


describe("Application", () => {

    const originalArgv =
        process.argv;

    let mockUI:
        jest.Mocked<ConsoleUI>;


    beforeEach(() => {

        Application.resetInstance();

        mockUI = {
            askQuestion: jest.fn(),
            displayMessage: jest.fn(),
            displayError: jest.fn(),
            displayTable: jest.fn(),
            close: jest.fn()
        } as unknown as jest.Mocked<ConsoleUI>;

        (
            ConsoleUI as jest.MockedClass<
                typeof ConsoleUI
            >
        ).mockImplementation(
            () => mockUI
        );

        jest.spyOn(console, "log")
            .mockImplementation(() => {});

        jest.spyOn(console, "error")
            .mockImplementation(() => {});
    });


    afterEach(() => {

        process.argv =
            originalArgv;

        jest.restoreAllMocks();

        jest.clearAllMocks();
    });


    it(
        "should read item details from command line",
        async () => {

            process.argv = [
                "node",
                "index.ts",
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
                .mockResolvedValueOnce("n");

            const application =
                Application.getInstance();

            await application.run();

            expect(mockUI.askQuestion)
                .toHaveBeenCalledWith(
                    "\nDo you want to enter details of any other item (y/n): "
                );

            expect(mockUI.close)
                .toHaveBeenCalled();
        }
    );


    it(
        "should add another item",
        async () => {

            process.argv = [
                "node",
                "index.ts",
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
                .mockResolvedValueOnce("y")
                .mockResolvedValueOnce(
                    "-name Pencil -price 50 -quantity 3 -type raw"
                )
                .mockResolvedValueOnce("n");

            const application =
                Application.getInstance();

            await application.run();

            expect(mockUI.askQuestion)
                .toHaveBeenCalledTimes(3);

            expect(mockUI.close)
                .toHaveBeenCalled();
        }
    );


    it(
        "should handle invalid yes/no input",
        async () => {

            process.argv = [
                "node",
                "index.ts",
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
                .mockResolvedValueOnce("abc")
                .mockResolvedValueOnce("n");

            const application =
                Application.getInstance();

            await application.run();

            expect(mockUI.displayMessage)
                .toHaveBeenCalledWith(
                    "Invalid input. Please enter y or n."
                );
        }
    );


    it(
        "should handle missing command-line arguments",
        async () => {

            process.argv = [
                "node",
                "index.ts"
            ];

            const application =
                Application.getInstance();

            await application.run();

            expect(mockUI.displayError)
                .toHaveBeenCalledWith(
                    "Please provide item details."
                );

            expect(mockUI.close)
                .toHaveBeenCalled();
        }
    );
});