import * as vscode from "vscode";
import { RobotSikuliEditorProvider } from "./robotSikuliEditor";

export function activate(context: vscode.ExtensionContext) {

  const contentProvider = new RobotSikuliEditorProvider()

  context.subscriptions.push(
    vscode.commands.registerCommand('robotSikuli.openPreview', () => {
      contentProvider.initPReview()
    })
  );
}

export function deactivate() { }