import { MainApplication } from "./application/MainApplication";
import { ConsoleUI } from "./ui/ConsoleUI";

const ui = new ConsoleUI();

const application = MainApplication.getInstance(ui);

application.run();
