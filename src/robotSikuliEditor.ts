import * as vscode from 'vscode';
import { getImgNames, getOs } from './utils';

export class RobotSikuliEditorProvider {
    private readonly context: vscode.ExtensionContext

    constructor(context: vscode.ExtensionContext) {
        this.context = context
    }

    initPreview(editor: vscode.TextEditor) {
        const panel = vscode.window.createWebviewPanel(
            'robotSikuli.openPreview',
            'Robot Sikuli Preview',
            vscode.ViewColumn.Two,
            {
                enableScripts: true
            }
        );

        panel.webview.html = this.getWebviewContent(panel.webview);


        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
            this.updateWebview(panel, editor);
        });

        panel.onDidDispose(() => {
            changeDocumentSubscription.dispose();
        });

        this.updateWebview(panel, editor);
    }

    private updateWebview(panel: vscode.WebviewPanel, editor: vscode.TextEditor) {
        const text = editor.document.getText()
        const lines = text.split(/\r?\n/);

        let html = ""
        for (let line of lines) {
            if (line.length === 0) line = " "

            if (line.includes("F Click In")) {
                html += this.clickIn(line, editor.document.uri.fsPath)
            } else {
                html += `<p>${line}</p>`
            }
        }

        panel.webview.postMessage({
            type: 'update',
            html
        });
    }

    private clickIn(line: string, path: string) {
        const folder = path.slice(0, path.lastIndexOf('/'))
        const imgs = getImgNames(line)

        return `
                <div class="highlight">
                    <p>${line.trim()}</p>
                    <div class="div-clickIn">
                        <img src="https://file+.vscode-resource.vscode-cdn.net${folder}/${getOs()}/${imgs[0]}" />
                        <img src="https://file+.vscode-resource.vscode-cdn.net${folder}/${getOs()}/${imgs[1]}" />
                    </div>
                </div>`
    }


    private getWebviewContent(webview: vscode.Webview): string {
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
            this.context.extensionUri, 'media', 'webview.js'));

        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(
            this.context.extensionUri, 'media', 'reset.css'));

        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(
            this.context.extensionUri, 'media', 'vscode.css'));

        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(
            this.context.extensionUri, 'media', 'editor.css'));


        return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Robot Sikuli</title>

                <link href="${styleResetUri}" rel="stylesheet" />
				<link href="${styleVSCodeUri}" rel="stylesheet" />
				<link href="${styleMainUri}" rel="stylesheet" />
			</head>

			<body>
                <div id="main" />
                <script src="${scriptUri}"></script>
			</body> 
			</html>`;
    }
}
