// @ts-check

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
            "http://bobbyhadz.com/images/blog/javascript-show-div-on-select-option/banner.webp"
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
