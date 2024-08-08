if (window.matchMedia) {
    const htmlIcon = $("htmlIcon");

    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
        htmlIcon.src = "img/html-dark.png";

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', event => {
        htmlIcon.src = event.matches ? "img/html-dark.png" : "img/html.png";
    });
}