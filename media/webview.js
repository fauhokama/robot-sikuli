// @ts-check

// @ts-ignore
const vscode = acquireVsCodeApi();

window.addEventListener("message", (event) => {
  const message = event.data;
  switch (message.type) {
    case "update":
      const tag = document.getElementById("tag");

      const div = document.createElement("div");
      const lines = message.text.split(/\r?\n/);
      for (let line of lines) {
        if (line.includes(".png")) {
          div.appendChild(document.createTextNode(line + "\n"));
          const image = div.appendChild(document.createElement("img"));
          image.setAttribute(
            "src",
            "https://user-images.githubusercontent.com/109971/52649782-cf0d2880-2e9d-11e9-9dd0-e77296884359.png"
          );
          div.appendChild(document.createTextNode("\n"));
        } else {
          div.appendChild(document.createTextNode(line + "\n"));
        }
      }

      if (tag) {
        tag.innerHTML = "";
        tag.appendChild(div);
      }
      return;
  }
});
