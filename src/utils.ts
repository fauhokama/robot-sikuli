import * as vscode from "vscode";


export const getOs = () => {
    const { operativeSystem } = vscode.workspace.getConfiguration('robotSikuli')

    if (operativeSystem) return operativeSystem
    else if (process.platform === "darwin") return "Darwin"
    else if (process.platform === "win32") return "Windows"
}

export const getImgNames = (line: string) => {
    const parts = line.split(/(\s+)/);
    const results = [];
    for (let part of parts) {
        if (part.endsWith(".png")) results.push(part);
    }
    return results;
}