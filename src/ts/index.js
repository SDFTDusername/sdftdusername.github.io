"use strict";
class AppComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const appName = this.getAttribute("app");
        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = "/src/css/style.css";
        const container = document.createElement("div");
        container.className = "app-container";
        container.appendChild(style);
        const image = document.createElement("img");
        image.src = `/src/img/apps/${appName}.png`;
        image.className = "app-icon";
        const link = document.createElement("a");
        link.href = this.getAttribute("href") || `/${appName}.html`;
        link.target = this.getAttribute("target") || "_self";
        link.className = "app-link";
        link.appendChild(image);
        const text = document.createElement("tr");
        text.textContent = this.getAttribute("app-name") || appName;
        text.className = "app-text";
        container.appendChild(link);
        container.appendChild(text);
        shadow.appendChild(container);
    }
}
customElements.define("app-component", AppComponent);
