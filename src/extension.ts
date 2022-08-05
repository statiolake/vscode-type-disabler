// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  function register(
    command: string,
    callback: (...args: any[]) => void,
    target?: { dispose(): any }[]
  ): void {
    if (target === undefined) {
      target = context.subscriptions;
    }

    target.push(vscode.commands.registerCommand(command, callback));
  }

  let disposables: vscode.Disposable[] | null;

  register("type-disabler.disableTyping", (args) => {
    if (disposables) {
      return;
    }

    disposables = [];

    register(
      "type",
      (args) => {
        console.log("type: " + JSON.stringify(args));
      },
      disposables
    );

    register(
      "replacePreviousChar",
      (args) => {
        console.log("replacePreviousChar: " + JSON.stringify(args));
      },
      disposables
    );

    // register(
    //   "compositionStart",
    //   (args) => {
    //     console.log("compositionStart: " + JSON.stringify(args));
    //   },
    //   disposables
    // );

    // register(
    //   "compositionEnd",
    //   (args) => {
    //     console.log("compositionEnd: " + JSON.stringify(args));
    //   },
    //   disposables
    // );
  });

  register("type-disabler.enableTyping", (args) => {
    if (!disposables) {
      return;
    }
    disposables.forEach((d) => d.dispose());
    disposables = null;
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
