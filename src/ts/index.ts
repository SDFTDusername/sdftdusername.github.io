function openApp(app: string) {
    console.log(`Opening app: ${app}`);
}

class AppComponent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        // attributes

        const app = this.getAttribute("app") || "example"; // code name (notes, gambletown, etc.)
        const name = this.getAttribute("name") || app; // display name (Notes, gamble town, etc.)
        const type = this.getAttribute("type") || "none"; // how it will be opened (none, app, openurl, redirecturl)
        const url = this.getAttribute("url") || `/apps/${app}.html`; // what url to open if type is openurl or redirecturl

        const iconUrl = `/src/img/apps/${app}.png`;
        const linkTarget = type == "redirecturl" ? "_self" : "_blank";

        // elements

        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = "/src/css/style.css";

        const container = document.createElement("div");
        container.classList.add("app-container");
        container.appendChild(style);

        const image = document.createElement("img");
        image.src = iconUrl;
        image.classList.add("app-icon");

        switch (type) {
            case "none": {
                container.appendChild(image);
                break;
            }

            case "app": {
                image.classList.add("app-button");
                image.onclick = () => openApp(app);

                container.appendChild(image);
                break;
            }

            case "openurl":
            case "redirecturl": {
                const link = document.createElement("a");
                link.href = url;
                link.target = linkTarget;
                link.classList.add("app-link");

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
        text.classList.add("app-text");
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
    const svs = Math.min(svw, svh);

    if (svw / svh > wallpaperFactor) {
        document.body.style.backgroundSize = `${svw}px ${svw / wallpaperFactor}px`;
        document.body.style.backgroundPositionY = `${(svh - svw / wallpaperFactor) / 2}px`;
    } else {
        document.body.style.backgroundSize = `${svh * wallpaperFactor}px ${svh}px`;
        document.body.style.backgroundPositionY = "0px";
    }

    if (content) {
        // magic numbers
        const contentWidth = svw + (svs / 100 * (-6 + 3));
        const appWidth = svs / 100 * (17.5 + 5);

        const rowAppCount = Math.max(contentWidth / appWidth, 1);

        const wholeRowAppCount = Math.floor(rowAppCount);
        const remainderRowAppCount = rowAppCount - wholeRowAppCount;
        
        const contentOffset = (svs / 100 * 3) + remainderRowAppCount * appWidth / 2;
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