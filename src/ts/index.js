"use strict";
class AppComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const app = this.getAttribute("app") || "example";
        const name = this.getAttribute("name") || app;
        const type = this.getAttribute("type") || "none";
        const url = this.getAttribute("url") || `/apps/${app}.html`;
        const iconUrl = `/src/img/apps/${app}.png`;
        const linkTarget = type == "redirecturl" ? "_self" : "_blank";
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
                image.onclick = () => openApp(url);
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
const wallpaper = document.getElementById("wallpaper");
const screenElement = document.getElementById("screen");
const appList = document.getElementById("app-list");
function onResize() {
    if (screenElement) {
        const bodyBoundingRect = document.body.getBoundingClientRect();
        const bodyWidth = bodyBoundingRect.width;
        const bodyHeight = bodyBoundingRect.height;
        const scaling = Math.min(bodyWidth, bodyHeight);
        const screenBoundingRect = screenElement.getBoundingClientRect();
        const screenWidth = screenBoundingRect.width;
        const screenHeight = screenBoundingRect.height;
        const screenScaling = Math.min(screenWidth, screenHeight);
        if (wallpaper) {
            if (screenWidth / screenHeight > wallpaperFactor)
                wallpaper.style.backgroundSize = `${screenWidth}px ${screenWidth / wallpaperFactor}px`;
            else
                wallpaper.style.backgroundSize = `${screenHeight * wallpaperFactor}px ${screenHeight}px`;
        }
        if (appList) {
            const contentWidth = screenWidth + (screenScaling / 100 * (-6 + 3));
            const appWidth = screenScaling / 100 * (17.5 + 5);
            const rowAppCount = Math.max(contentWidth / appWidth, 1);
            const wholeRowAppCount = Math.floor(rowAppCount);
            const remainderRowAppCount = rowAppCount - wholeRowAppCount;
            const contentOffset = (screenScaling / 100 * 3) + remainderRowAppCount * appWidth / 2;
            appList.style.left = `${contentOffset}px`;
        }
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
const homeButton = document.getElementById("home-button");
let homeButtonPressed = false;
const homebuttonPressSound = new Audio("/src/sounds/homebutton-press.mp3");
const homebuttonReleaseSound = new Audio("/src/sounds/homebutton-release.mp3");
function playSound(sound) {
    const clone = sound.cloneNode(true);
    if (clone instanceof HTMLAudioElement) {
        try {
            clone.addEventListener("ended", () => clone.remove());
            clone.play();
        }
        catch (_a) {
            clone.remove();
        }
    }
}
function vibrate(ms) {
    try {
        navigator.vibrate(ms);
    }
    catch (_a) { }
}
function homeButtonPress(event) {
    if (homeButtonPressed)
        return;
    homeButtonPressed = true;
    event.preventDefault();
    if (homeButton) {
        homeButton.style.filter = "brightness(50%)";
        playSound(homebuttonPressSound);
        vibrate(20);
    }
}
function homeButtonRelease(event) {
    if (!homeButtonPressed)
        return;
    homeButtonPressed = false;
    event.preventDefault();
    if (homeButton) {
        homeButton.style.filter = "";
        playSound(homebuttonReleaseSound);
        vibrate(10);
        if (appIframe instanceof HTMLIFrameElement) {
            appIframe.hidden = true;
            appIframe.removeAttribute("src");
        }
    }
}
if (homeButton) {
    homeButton.addEventListener("mousedown", (event) => {
        homeButtonPress(event);
        const mouseUpEvent = (event) => {
            homeButtonRelease(event);
            document.removeEventListener("mouseup", mouseUpEvent);
        };
        document.addEventListener("mouseup", mouseUpEvent);
    });
    homeButton.ontouchstart = homeButtonPress;
    homeButton.ontouchend = homeButtonRelease;
}
const appIframe = document.getElementById("app-iframe");
function openApp(url) {
    if (appIframe instanceof HTMLIFrameElement) {
        appIframe.src = url;
        appIframe.hidden = false;
    }
}
