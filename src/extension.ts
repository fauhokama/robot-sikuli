import * as vscode from "vscode";
import { RobotSikuliEditorProvider } from "./robotSikuliEditor";

export function activate(context: vscode.ExtensionContext) {

  const contentProvider = new RobotSikuliEditorProvider(context)

  context.subscriptions.push(
    vscode.commands.registerCommand('robotSikuli.openPreview', () => {

      const editor = vscode.window.activeTextEditor
      if (editor) {
        contentProvider.initPreview(editor)
      }
    })
  );
}

export function deactivate() { }