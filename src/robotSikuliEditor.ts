import * as vscode from 'vscode';

export class RobotSikuliEditorProvider implements vscode.CustomTextEditorProvider {

    private static readonly viewType = 'fauhokama.robotSikuli';

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new RobotSikuliEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(RobotSikuliEditorProvider.viewType, provider);
        return providerRegistration;
    }

    constructor(
        private readonly context: vscode.ExtensionContext
    ) { }

    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ): Promise<void> {

        webviewPanel.webview.options = {
            enableScripts: true,
        };
        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

        function updateWebview() {
            webviewPanel.webview.postMessage({
                type: 'update',
                text: document.getText(),
            });
        }

        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
            updateWebview();
        });

        // Make sure we get rid of the listener when our editor is closed.
        webviewPanel.onDidDispose(() => {
            changeDocumentSubscription.dispose();
        });

        // Receive message from the webview.
        webviewPanel.webview.onDidReceiveMessage(e => { });

        updateWebview();
    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
            this.context.extensionUri, 'src', 'webview.js'));

        return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Robot Sikuli</title>

                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap" rel="stylesheet">
			</head>

			<body>
                <div id="tag"> </div>
			</body> 
            <style>
            body {
                white-space: pre-wrap;
                font-family: 'Fira Mono', monospace;
            }
            img {
                max-width: 100px;
                margin-left: 30px;
            }
            </style>
            <script src="${scriptUri}"></script>
			</html>`;
    }
}
