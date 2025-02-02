class AppComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        // attributes

        const app = this.getAttribute("app") || "example"; // code name (notes, gambletown, etc.)
        const name = this.getAttribute("name") || app; // display name (Notes, gamble town, etc.)
        const type = this.getAttribute("type") || "app"; // how it will be opened (app, openurl, redirect)
        const url = this.getAttribute("url") || `/apps/${app}.html`; // what url to open if type is open or redirect

        const iconUrl = `/src/img/apps/${app}.png`;
        const linkTarget = type == "redirect" ? "_self" : "_blank";

        // elements

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
const content = document.getElementById("content");

function onResize() {
    const bodyBoundingRect = document.body.getBoundingClientRect();
    const svw = bodyBoundingRect.width;
    const svh = bodyBoundingRect.height;

    if (svw / svh > wallpaperFactor) {
        document.body.style.backgroundSize = `${svw}px ${svw / wallpaperFactor}px`;
        document.body.style.backgroundPositionY = `${(svh - svw / wallpaperFactor) / 2}px`;
    } else {
        document.body.style.backgroundSize = `${svh * wallpaperFactor}px ${svh}px`;
        document.body.style.backgroundPositionY = "0px";
    }

    if (content) {
        // magic numbers
        const contentWidth = svw + (svh / 100 * (-6 + 3));
        const appWidth = svh / 100 * (10 + 3);

        const rowAppCount = Math.max(contentWidth / appWidth, 1);

        const wholeRowAppCount = Math.floor(rowAppCount);
        const remainderRowAppCount = rowAppCount - wholeRowAppCount;
        
        const contentOffset = (svh / 100 * 3) + remainderRowAppCount * appWidth / 2;
        content.style.left = `${contentOffset}px`;
    }
}

onresize = onResize;
onResize();

const clock = document.getElementById("clock");

function updateClock() {
    if (clock) {
        const date = new Date();
        clock.textContent = date.toLocaleTimeString();
    }
}

setInterval(updateClock, 1000);
updateClock();