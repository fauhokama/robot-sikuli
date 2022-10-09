import * as vscode from "vscode";
import { RobotSikuliEditorProvider } from "./robotSikuliEditor";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(RobotSikuliEditorProvider.register(context));
}

export function deactivate() { }
