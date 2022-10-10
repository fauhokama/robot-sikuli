import * as vscode from 'vscode';

export class RobotSikuliEditorProvider {
    initPReview() {
        // Create and show a new webview
        const panel = vscode.window.createWebviewPanel(
            'robotSikuli.openPreview', // Identifies the type of the webview. Used internally
            'Robot Sikuli Preview', // Title of the panel displayed to the user
            vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
            {} // Webview options. More on these later.
        );
        panel.webview.html = this.getWebviewContent();
    }

    private getWebviewContent() {
        return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cat Coding</title>
      </head>
      <body>
          <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
      </body>
      </html>`;
    }
}
