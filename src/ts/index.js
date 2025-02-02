"use strict";
class AppComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const app = this.getAttribute("app") || "example";
        const name = this.getAttribute("name") || app;
        const type = this.getAttribute("type") || "app";
        const url = this.getAttribute("url") || `/apps/${app}.html`;
        const iconUrl = `/src/img/apps/${app}.png`;
        const linkTarget = type == "redirect" ? "_self" : "_blank";
        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = "/src/css/style.css";
        const container = document.createElement("div");
        container.className = "app-container";
        container.appendChild(style);
        const image = document.createElement("img");
        image.src = iconUrl;
        image.className = "app-icon";
        switch (type) {
            case "app": {
                console.warn("App type is not implemented yet.");
                container.appendChild(image);
                break;
            }
            case "openurl":
            case "redirect": {
                const link = document.createElement("a");
                link.href = url;
                link.target = linkTarget;
                link.className = "app-link";
                container.appendChild(link);
                link.appendChild(image);
                break;
            }
            default: {
                console.warn(`Unknown type: ${type}`);
                break;
            }
        }
        const text = document.createElement("tr");
        text.textContent = name;
        text.className = "app-text";
        container.appendChild(text);
        shadow.appendChild(container);
    }
}
customElements.define("app-comp", AppComponent);
const wallpaperFactor = 1920 / 1080;
const wallpaper = document.getElementById("wallpaper");
const content = document.getElementById("content");
function onResize() {
    if (wallpaper) {
        if (innerWidth / innerHeight > wallpaperFactor)
            wallpaper.style.backgroundSize = `${innerWidth + 4}px ${innerWidth / wallpaperFactor + 4}px`;
        else
            wallpaper.style.backgroundSize = `${innerHeight * wallpaperFactor + 4}px ${innerHeight + 4}px`;
    }
    if (content) {
        const contentWidth = innerWidth + (innerHeight / 100 * (-6 + 3));
        const appWidth = innerHeight / 100 * (10 + 3);
        const rowAppCount = Math.max(contentWidth / appWidth, 1);
        const wholeRowAppCount = Math.floor(rowAppCount);
        const remainderRowAppCount = rowAppCount - wholeRowAppCount;
        const contentOffset = (innerHeight / 100 * 3) + remainderRowAppCount * appWidth / 2;
        content.style.left = `${contentOffset}px`;
    }
}
onresize = onResize;
onResize();
const clock = document.getElementById("clock");
function updateTime() {
    if (clock) {
        const date = new Date();
        clock.textContent = date.toLocaleTimeString();
    }
}
setInterval(updateTime, 10);
updateTime();
