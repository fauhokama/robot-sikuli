import { existsSync } from "fs";
import { glob } from "glob";
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

export const getImgPath = (imgFolder: string, imgName: string) => {
    const imgPath = `${imgFolder}/${imgName}`
    if (existsSync(imgPath)) return imgPath
    if (existsSync(imgPath.substring(1))) return imgPath // Easy way to solve Windows paths.

    if (vscode.workspace.workspaceFolders !== undefined) {
        let wf = vscode.workspace.workspaceFolders[0].uri.path;

        return `/${glob.sync(`${wf.substring(1)}/Images/${getOs()}/**/${imgName}`)[0]}`;
    }
}