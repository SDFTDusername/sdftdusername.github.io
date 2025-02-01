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
        // magic numbers
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