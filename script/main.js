import { addMenuMobile, removeMenuMobile } from "./menu_mobile.js";

const html = document.querySelector("html");
const p = document.querySelector("p");
let windowSize, fontSize;

function main() {

    /* 
        removing the dotted outline on menu links and logo when clicked because 
        the focus mode isn't needed (page reload) and it looks better.    
    */

    const logo = document.querySelector("#logo");
    const menuLinks = document.querySelectorAll("#menu-link-list a");

    for (const link of menuLinks) {
        link.addEventListener("mousedown", event => { event.preventDefault() });
    }

    logo.addEventListener("mousedown", event => { event.preventDefault() });


    updateCopyrightInfo();

    /*
        the rest adjusts menu-mode according to font-size and viewport width.
    */

    fontSize = 16;
    windowSize = innerWidth / fontSize;
    if (windowSize <= 68.75) {
        addMenuMobile();
    }

    addEventListener("resize", () => {
        adjustMenu();
        windowSize = innerWidth / fontSize;
    });

    let myObserver = new ResizeObserver(() => {
        fontSize = getFontSize();
        adjustMenu();
        windowSize = innerWidth / fontSize;
    });

    myObserver.observe(p)
}

function adjustMenu() {
    if (innerWidth / fontSize <= 68.75 && windowSize > 68.75) {
        addMenuMobile();
    } else if (innerWidth / fontSize > 68.75 && windowSize <= 68.75) {
        removeMenuMobile();
    }
}

function getFontSize() {
    let size = window.getComputedStyle(html);
    size = size.getPropertyValue("font-size");
    size = size.slice(0, -2);
    if (innerWidth < 2500) {
        size = parseInt(size) + size / 10 * 6;

    } else {
        size = parseInt(size) + size / 10 * 4.8;
    }

    return size;
}

function updateCopyrightInfo() {
    let year = (new Date).getFullYear();
    document.querySelector("small").innerHTML = `&copy; ${year} Djupviks hamn`
}

main();