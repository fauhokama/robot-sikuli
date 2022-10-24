import { existsSync } from "fs";
import * as vscode from "vscode";


export const getOs = () => {
    const { operativeSystem } = vscode.workspace.getConfiguration('robotSikuli')

    if (operativeSystem) return operativeSystem
    else if (process.platform === "darwin") return "Darwin"
    else if (process.platform === "win32") return "Windows"
}

export const getImgPath = (line: string, filePath: string) => {
    // folder from file + os
    const folder = filePath.slice(0, filePath.lastIndexOf("/")) + "/" + getOs()

    // Obtain images from line
    const parts = line.split(/(\s+)/);
    const images = [];
    for (let part of parts) {
        if (part.endsWith(".png")) images.push(part);
    }

    const toReturn = []

    for (let image of images) {
        const imgPath = `${folder}/${image}`
        if (existsSync(imgPath)) toReturn.push(imgPath)
        else if (existsSync(imgPath.substring(1))) toReturn.push(imgPath) // Easy way to solve Windows paths.
        // If not found, look for Images/System
        else {
            if (vscode.workspace.workspaceFolders !== undefined) {
                let wf = vscode.workspace.workspaceFolders[0].uri.path;

                toReturn.push(`/${wf.substring(1)}/Images/${getOs()}/${image}`);
            }
        }
    }
    return toReturn
}