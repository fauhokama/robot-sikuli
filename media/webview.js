// @ts-check

// @ts-ignore
const vscode = acquireVsCodeApi();

window.addEventListener("message", (event) => {
  const message = event.data;
  switch (message.type) {
    case "update":
      const main = document.getElementById("main");
      if (main == null) return;

      // Reset entire html
      main.innerHTML = "";

      const lines = message.text.split(/\r?\n/);
      for (let line of lines) {
        main.appendChild(document.createTextNode(line + "\n"));
        click_in(line, main, message);
        main.appendChild(document.createTextNode("\n"));
      }
      return;
  }
});

const click_in = (line, main, message) => {
  if (line.includes("F Click In")) {
    const folder = getFolder(message.path);
    const imageNames = getImageNames(line);

    const area = main.appendChild(document.createElement("img"));
    const target = main.appendChild(document.createElement("img"));

    area.setAttribute("src", srcImg(folder, imageNames[0]));
    target.setAttribute("src", srcImg(folder, imageNames[1]));
  }
};

const getImageNames = (line) => {
  const parts = line.split(/(\s+)/);
  const results = [];
  for (let part of parts) {
    if (part.endsWith(".png")) results.push(part);
  }
  return results;
};

const getFolder = (filePath) => {
  const path = filePath.split("/");
  path.pop();
  const platform = "Darwin";

  return `${path.join("/")}/${platform}`;
};

const srcImg = (folder, img) => {
  return `https://file+.vscode-resource.vscode-cdn.net${folder}/${img}`;
};
