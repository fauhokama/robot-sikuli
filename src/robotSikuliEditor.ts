import * as vscode from 'vscode';

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

        function updateWebview() {
            panel.webview.postMessage({
                type: 'update',
                text: editor.document.getText(),
                path: editor.document.uri.fsPath
            });
        }

        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
            updateWebview();
        });

        panel.onDidDispose(() => {
            changeDocumentSubscription.dispose();
        });

        updateWebview();
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
                <div id="main"> </div>
                <script src="${scriptUri}"></script>
			</body> 
			</html>`;
    }
}
