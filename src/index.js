import "./style.css";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

function init() {
  const content = document.getElementById("content");
  content.innerHTML = `<h1>CONTENT</h1>`;
}

init();
