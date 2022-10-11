// @ts-check

// @ts-ignore
const vscode = acquireVsCodeApi();

window.addEventListener("message", (event) => {
  const message = event.data;
  switch (message.type) {
    case "update":
      const main = document.getElementById("main");
      if (main == null) return;
      main.innerHTML = message.html;
  }
});
