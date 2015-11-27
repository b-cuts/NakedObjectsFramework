﻿/// <reference path="nakedobjects.gemini.services.urlmanager.ts" />

module NakedObjects.Angular.Gemini {

    export abstract class Command {

        constructor(protected urlManager: IUrlManager,
            protected nglocation: ng.ILocationService,
            protected vm: CiceroViewModel,
            protected commandFactory: ICommandFactory,
            protected context: IContext) {
        }

        public fullCommand: string;
        public helpText: string;
        protected minArguments: number;
        protected maxArguments: number;

        abstract execute(args: string): void;

        public checkIsAvailableInCurrentContext(): void {
            if (!this.isAvailableInCurrentContext()) {
                throw new Error("The command: " + this.fullCommand + " is not available in the current context");
            }
        }

        public abstract isAvailableInCurrentContext(): boolean;
        
        //Helper methods follow
        protected clearInput(): void {
            this.vm.input = "";
        }

        protected setOutput(text: string): void {
            this.vm.output = text;
        }

        protected appendAsNewLineToOutput(text: string): void {
            this.vm.output.concat("/n" + text);
        }

        protected newPath(path: string): void {
            this.nglocation.path(path).search({});
        }

        public checkMatch(matchText: string): void {
            if (this.fullCommand.indexOf(matchText) != 0) {
                if (matchText.indexOf(this.fullCommand) == 0) {
                    throw new Error("The command " + this.fullCommand + " must be followed by a space");
                } else {
                    throw new Error("No such command: " + matchText);
                }
            }
        }

        public checkNumberOfArguments(argString: string): void {
            if (argString == null) {
                if (this.minArguments == 0) return;
                throw new Error("No arguments provided.");
            }
            const args = argString.split(",");
            if (args.length < this.minArguments || args.length > this.maxArguments) {
                throw new Error("Wrong number of arguments provided.");
            }
        }

        //argNo starts from 0.
        //If argument does not parse correctly, message will be passed to UI
        //and command aborted.
        //Always returns argument trimmed and as lower case
        protected argumentAsString(args: string, argNo: number, optional: boolean = false): string {
            if (args == null) return null;
            if (!optional && args.split(",").length < argNo + 1) {
                throw new Error("Too few arguments provided");
            }
            var arg = args.split(",")[argNo].trim();
            if (!optional && (arg == null || arg == "")) {
                throw new Error("Required argument number " + (argNo + 1).toString + " is empty");
            }
            return arg.trim().toLowerCase();
        }

        //argNo starts from 0.
        protected argumentAsNumber(args: string, argNo: number, optional: boolean = false): number {
            const arg = this.argumentAsString(args, argNo, optional);
            const number = parseInt(arg);
            if (number == NaN) {
                throw new Error("Argument number " + +(argNo + 1).toString + + " must be a number");
            }
            return number;
        }

        protected getContextDescription(): string {
            //todo
            return null;
        }
    }

    export class Action extends Command {

        public fullCommand = "action";
        public helpText = "Open an action from a Main Menu, or object actions menu. " +
        "Normally takes one argument: the name, or partial name, of the action." +
        "If the partial name matches more than one action, a list of matches is returned," +
        "but none opened. If no argument is provided, a full list of available action names is returned";
        protected minArguments = 0;
        protected maxArguments = 1;

        public isAvailableInCurrentContext(): boolean {
            return !this.urlManager.isActionOpen() && !this.urlManager.isEdit();
        }

        execute(args: string): void {
            const name = this.argumentAsString(args, 1);
            if (this.urlManager.isObject) {
                //get object from context

            }
            this.setOutput("Action command invoked"); //todo: temporary
        };

    }
    export class Back extends Command {

        public fullCommand = "back";
        public helpText = "Move back to the previous context";
        protected minArguments = 0;
        protected maxArguments = 0;

        public isAvailableInCurrentContext(): boolean {
            return true;
        }

        execute(args: string): void {
            this.setOutput("Back command invoked"); //todo: temporary
        };
    }
    export class Cancel extends Command {

        public fullCommand = "cancel";
        public helpText = "Leave the current activity (action, or object edit), incomplete." +
        ". Does not take any arguments";;
        protected minArguments = 0;
        protected maxArguments = 0;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isActionOpen() || this.urlManager.isEdit();
        }

        execute(args: string): void {
            if (this.urlManager.isEdit()) {
                this.urlManager.setObjectEdit(false, 1);
                this.setOutput("Edit cancelled"); //todo: temporary
                this.clearInput();
            }
            if (this.urlManager.isActionOpen()) {
                this.urlManager.closeDialog(1);
                this.setOutput("Action cancelled"); //todo: temporary
                this.clearInput();
            }
        };
    }
    export class Clipboard extends Command {

        public fullCommand = "clipboard";
        public helpText = "Reminder of the object reference currently held in the clipboard, if any." +
        ". Does not take any arguments";;
        protected minArguments = 0;
        protected maxArguments = 0;

        public isAvailableInCurrentContext(): boolean {
            return true;
        }

        execute(args: string): void {
            this.setOutput("Clipboard command invoked"); //todo: temporary
        };
    }
    export class Copy extends Command {

        public fullCommand = "copy";
        public helpText = "Copy a reference to an object into the clipboard. If the current context is " +
        "an object and no argument is specified, the object is copiedl; alternatively the name of a property " +
        "that contains an object reference may be specified. If the context is a list view, then the number of the item " +
        "in that list should be specified, and, optionally, if the item is not on the first page of the list, "
        "the page number may be specified as a second argument.";

        protected minArguments = 0;
        protected maxArguments = 2;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isObject() || this.urlManager.isList();
        }

        execute(args: string): void {
            if (this.urlManager.isObject()) {
                if (this.urlManager.isCollectionOpen()) {
                    const item = this.argumentAsNumber(args, 1);
                    this.setOutput("Copy item " + item);
                } else {
                    const arg = this.argumentAsString(args, 1, true);
                    if (arg == null) {
                        this.setOutput("Copy object");
                    } else {
                        this.setOutput("Copy property" + arg);
                    }
                }
            }
            if (this.urlManager.isList()) {
                const item = this.argumentAsNumber(args, 1);
                this.setOutput("Copy item " + item);
            }
        };
    }
    export class Description extends Command {

        public fullCommand = "description";
        public helpText = "Display the name and value of a property or properties on an object being viewed or edited. " +
        "May take one argument: the name of a property, or name-match, for multiple properties." +
        "If the partial name matches more than one property, a list of matching properties is returned. " +
        "If no argument is provided, a full list of properties is returned";
        protected minArguments = 0;
        protected maxArguments = 1;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isObject();
        }

        execute(args: string): void {
            const match = this.argumentAsString(args, 1);
            this.setOutput("Description command invoked with argument: " + match); //todo: temporary
        };
    }
    export class Edit extends Command {

        public fullCommand = "edit";
        public helpText = "Put an object into Edit mode." +
        ". Does not take any arguments";;
        protected minArguments = 0;
        protected maxArguments = 0;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isObject() && !this.urlManager.isEdit();
        }

        execute(args: string): void {
            this.urlManager.setObjectEdit(true, 1);
            this.setOutput("Editing Object"); //todo: temporary
        };
    }
    export class Enter extends Command {

        public fullCommand = "enter";
        public helpText = "Enter a value into a named property on an object that is in edit mode, " +
        "or into a named parameter on an opened action. The enter command takes one argument: the " +
        "name or partial name of the property or paramater. If the partial name is ambigious the " +
        "list of matching properties or parameters will be returned but no value will have been entered.";
        protected minArguments = 1;
        protected maxArguments = 1;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isEdit() || this.urlManager.isActionOpen();
        }

        execute(args: string): void {
            const match = this.argumentAsString(args, 1);
            if (this.urlManager.isEdit()) {
                this.setOutput("Enter command invoked on property: " + match); //todo: temporary
            }
            if (this.urlManager.isActionOpen) {
                this.setOutput("Enter command invoked on parameter: " + match); //todo: temporary
            }
        };

    }
    export class Forward extends Command {

        public fullCommand = "forward";
        public helpText = "Move forward to next context in history (having previously moved back).";
        protected minArguments = 0;
        protected maxArguments = 0;

        public isAvailableInCurrentContext(): boolean {
            return true;
        }
        execute(args: string): void {
            this.setOutput("Forward command invoked"); //todo: temporary
        };
    }
    export class Gemini extends Command {

        public fullCommand = "gemini";
        public helpText = "Switch to the Gemini (graphical) user interface displaying the same context. " +
        ". Does not take any arguments";;
        protected minArguments = 0;
        protected maxArguments = 0;

        public isAvailableInCurrentContext(): boolean {
            return true;
        }
        execute(args: string): void {
            this.newPath("/gemini/home");
        };
    }
    export class Go extends Command {

        public fullCommand = "go";
        public helpText = "Go to an object referenced in a property, or a list." +
        "Go takes one argument.  In the context of an object, that is the name or partial name" +
        "of the property holding the reference. In the context of a list, it is the " +
        "number of the item within the list (starting at 1). ";
        protected minArguments = 1;
        protected maxArguments = 1;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isObject() || this.urlManager.isList();
        }

        execute(args: string): void {
            if (this.urlManager.isObject()) {
                const prop = this.argumentAsString(args, 1);
                this.setOutput("Go to property" + prop + " invoked"); //todo: temporary
            }
            if (this.urlManager.isList()) {
                const item = this.argumentAsNumber(args, 1);
                this.setOutput("Go to list item" + item + " invoked"); //todo: temporary
            }
        };
    }
    export class Help extends Command {

        public fullCommand = "help";
        public helpText = "If no argument specified, help lists the commands available in the current context." +
        "If help is followed by another command word as an argument (or an abbreviation of it), a description of that " +
        "specified Command will be returned.";
        protected minArguments = 0;
        protected maxArguments = 1;

        public isAvailableInCurrentContext(): boolean {
            return true;
        }

        execute(args: string): void {
            var arg = this.argumentAsString(args, 0);
            if (arg == null) {
                this.setOutput(this.commandFactory.allCommandsForCurrentContext());
            } else {
                const c = this.commandFactory.getCommand(arg);
                this.setOutput(c.fullCommand + " command: " + c.helpText);
            }
        };
    }
    export class Home extends Command {

        public fullCommand = "home";
        public helpText = "Return to Home location, where main menus may be accessed. " +
        ". Does not take any arguments";;
        protected minArguments = 0;
        protected maxArguments = 0;

        public isAvailableInCurrentContext(): boolean {
            return true;
        }

        execute(args: string): void {
            this.urlManager.setHome(1);
            this.clearInput();
            this.setOutput("home");
        };
    }
    export class Item extends Command {

        public fullCommand = "item";
        public helpText = "In the context of an opened object collection, or a list view, the item command" +
        "will display one or more of the items. If no arguments are specified, item will list all of the " +
        "the items in the object collection, or the first page of items if in a list view. Alternatively, " +
        "the command may be specified with a starting item number and/or an ending item number, for example " +
        "item 3,5 will display items 3,4, and 5.  In the context of a list view only, Item may have a third " +
        "argument to specify a page number greater than 1. See also the Table command.";
        protected minArguments = 0;
        protected maxArguments = 3;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isCollectionOpen() || this.urlManager.isList();
        }

        execute(args: string): void {
            const startNo = this.argumentAsNumber(args, 1, true);
            const endNo = this.argumentAsNumber(args, 2, true);
            const pageNo = this.argumentAsNumber(args, 3, true);
            if (this.urlManager.isCollectionOpen()) {
                if (pageNo != null) {
                    throw new Error("Item may not have a third argument (page number) in the context of an object collection");
                }
                this.setOutput("Item command invoked on Collection, from " + startNo + " to " + endNo); //todo: temporary

            } else {
                this.setOutput("Item command invoked on List, from " + startNo + " to " + endNo + " page " + pageNo); //todo: temporary
            }
        };

    }
    export class Menu extends Command {

        public fullCommand = "menu";
        public helpText = "From the Home context, Menu opens a named main menu. This " +
        "command normally takes one argument: the name, or partial name, of the menu. " +
        "If the partial name matches more than one menu, a list of matches will be returned " +
        "but no menu will be opened; if no argument is provided a list of all the menus " +
        "will be returned.";
        protected minArguments = 0;
        protected maxArguments = 1;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isHome();
        }

        execute(args: string): void {
            const menuName = this.argumentAsString(args, 0);
            if (menuName == null) {
                //list all menus
                this.context.getMenus()
                    .then((menus: MenusRepresentation) => {
                        const links = menus.value().models;
                        var s = _.reduce(links, (s, t) => { return s + t.title()+"; "; }, "Menus: ");
                        this.setOutput(s);
                    });
            } else {
                //Initially assume exact match
                //this.context.getMenus( 
                this.context.getMenus() //menu must be Id
                    .then((menus: MenusRepresentation) => {
                        const links = menus.value().models;
                        const menuLink = _.find(links, (t) => { return t.title().toLowerCase() == menuName; }, "Menus: ");

                        const menuId = menuLink.rel().parms[0].value;
                        this.urlManager.setMenu(menuId, 1);  //1 = pane 1  Resolving promise
                    }).catch(() => {
                        this.setOutput(menuName+" does not match any menu.");
                    }
                    );
            }
        };
    }
    export class OK extends Command {

        public fullCommand = "ok";
        public helpText = "Invokes an action, assuming that any necessary parameters have already been set up. " +
        ". Does not take any arguments";;
        protected minArguments = 0;
        protected maxArguments = 0;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isActionOpen();
        }

        execute(args: string): void {
            this.setOutput("OK command invoked.");
        };
    }
    export class Open extends Command {

        public fullCommand = "open";
        public helpText = "Opens a view of a specific collection within an object, from which " +
        "individual items may be read using the item command. Open command takes one argument: " +
        "the name, or partial name, of the collection.  If the partial name matches more than one " +
        "collection, the list of matches will be returned, but none will be opened.";
        protected minArguments = 1;
        protected maxArguments = 1;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isObject();
        }

        execute(args: string): void {
            const match = this.argumentAsString(args, 1);
            this.setOutput("Open command invoked with argument: " + match); //todo: temporary
        };

    }
    export class Paste extends Command {

        public fullCommand = "paste";
        public helpText = "Pastes the object reference from the clipboard into a named property on an object that is in edit mode, " +
        "or into a named parameter on an opened action. The paste command takes one argument: the " +
        "name or partial name of the property or paramater. If the partial name is ambigious the " +
        "list of matching properties or parameters will be returned but the reference will not have been pasted.";
        protected minArguments = 1;
        protected maxArguments = 1;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isEdit() || this.urlManager.isActionOpen();
        }

        execute(args: string): void {
            const match = this.argumentAsString(args, 1);
            if (this.urlManager.isEdit()) {
                this.setOutput("Paste command invoked on property: " + match); //todo: temporary
            }
            if (this.urlManager.isActionOpen) {
                this.setOutput("Paste command invoked on parameter: " + match); //todo: temporary
            }
        };

    }
    export class Property extends Command {

        public fullCommand = "property";
        public helpText = "Display the name and value of a property or properties on an object being viewed or edited. " +
        "One optional argument: the partial property name. " +
        "If this matches more than one property, a list of matches is returned. " +
        "If no argument is provided, the full list of properties is returned";
        protected minArguments = 0;
        protected maxArguments = 1;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isObject();
        }

        execute(args: string): void {
            const match = this.argumentAsString(args, 1);
            this.setOutput("Property command invoked with argument: " + match); //todo: temporary
        };

    }
    export class Reload extends Command {

        public fullCommand = "reload";
        public helpText = "In the context of an object or a list, reloads the data from the server" +
        "to ensure it is up to date." + ". Does not take any arguments";;
        protected minArguments = 0;
        protected maxArguments = 0;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isObject() || this.urlManager.isList();
        }

        execute(args: string): void {
            this.setOutput("Reload command invoked");
        };
    }
    export class Root extends Command {

        public fullCommand = "root";
        public helpText = "From within a collection context, the root command returns" +
        " to the 'root' object that owns the collection." +
        ". Does not take any arguments";;
        protected minArguments = 0;
        protected maxArguments = 0;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isCollectionOpen();
        }

        execute(args: string): void {
            this.setOutput("Object command invoked");
        };
    }
    export class Save extends Command {

        public fullCommand = "save";
        public helpText = "Saves the updated properties on an object that is being edited, and returns " +
        "from edit mode to a normal view of that object" +
        ". Does not take any arguments";;
        protected minArguments = 0;
        protected maxArguments = 0;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isEdit();
        }
        execute(args: string): void {
            this.setOutput("Object saved"); //todo: temporary
        };
    }
    export class Select extends Command {
        public fullCommand = "select";
        public helpText = "Select an option from a set of choices for a named property on an object that is in edit mode, " +
        "or for a named parameter on an opened action. The select command takes two arguments: the " +
        "name or partial name of the property or paramater, and the value or partial-match value to be selected." +
        "If either of the partial match arguments is ambiguous, the possible matches will be displayed to " +
        "but no selection will be made. If no second argument is provided, the full set of options will be " +
        "returned but none selected.";
        protected minArguments = 2;
        protected maxArguments = 2;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isEdit() || this.urlManager.isActionOpen();
        }

        execute(args: string): void {
            const name = this.argumentAsString(args, 1);
            const option = this.argumentAsString(args, 2, true);
            if (this.urlManager.isEdit()) {
                this.setOutput("Select command invoked on property: " + name + " for option" + option); //todo: temporary
            }
            if (this.urlManager.isActionOpen) {
                this.setOutput("Select command invoked on parameter: " + name + " for option" + option); //todo: temporary
            }
        };

    }
    export class Table extends Command {
        public fullCommand = "table";
        public helpText = "In the context of a list or an opened object collection, the table command" +
        "switches to table mode. Items then accessed via the item command, will be presented as table rows" +
        ". Does not take any arguments";;
        protected minArguments = 0;
        protected maxArguments = 0;

        isAvailableInCurrentContext(): boolean {
            return this.urlManager.isCollectionOpen() || this.urlManager.isList();
        }

        execute(args: string): void {
            const match = this.argumentAsString(args, 1);
            this.setOutput("Open command invoked with argument: " + match); //todo: temporary
        };

    }
    export class Where extends Command {

        public fullCommand = "where";
        public helpText = "Reminds the user of the current context.  May be invoked just " +
        "by hitting the Enter (Return) key in the empty Command field.";
        protected minArguments = 0;
        protected maxArguments = 0;

        isAvailableInCurrentContext(): boolean {
            return true;
        }

        execute(args: string): void {
            this.setOutput("Where command invoked"); //todo: temporary
        };

    }
    //todo: quit (or logoff)

}