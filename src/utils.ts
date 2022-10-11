export const getOs = () => {
    if (process.platform === "darwin") {
        return "Darwin"
    }
}

export const getImgNames = (line: string) => {
    const parts = line.split(/(\s+)/);
    const results = [];
    for (let part of parts) {
        if (part.endsWith(".png")) results.push(part);
    }
    return results;
}