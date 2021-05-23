const menu = document.querySelector("#menu");
const links = document.querySelectorAll("#menu-link-list li");
const linksUl = document.querySelector("#menu-link-list");
const nav = document.querySelector("nav");
let menuOpenBtn, menuCloseBtn, firstMenuItem, lastMenuItem;


export function addMenuMobile() {

    /*
    
    this function adds button for opening mobile menu and
    button for closing the menu + appropriate event listeners.
    
    */

    let buttons = createMenuButtons();
    menuOpenBtn = buttons[0];
    menuCloseBtn = buttons[1];

    menuOpenBtn.addEventListener("click", openMenu);
    menuCloseBtn.addEventListener("click", closeMenu);

    nav.insertBefore(menuOpenBtn, menu);
    menu.insertBefore(menuCloseBtn, linksUl);

    firstMenuItem = menuCloseBtn;
    lastMenuItem = links.item(links.length - 1);

    firstMenuItem.addEventListener("keydown", menuFocusLastItem);
    lastMenuItem.addEventListener("keydown", menuFocusFirstItem);

    document.addEventListener("keyup", event => {
        if (27 === event.keyCode) {
            closeMenu();
        }
    });

}


export function removeMenuMobile() {
    firstMenuItem.removeEventListener("keydown", menuFocusLastItem);
    lastMenuItem.removeEventListener("keydown", menuFocusFirstItem);
    menuCloseBtn.removeEventListener("click", closeMenu);
    menuOpenBtn.removeEventListener("click", openMenu);

    nav.removeChild(menuOpenBtn);
    menu.removeChild(menuCloseBtn);
    menu.removeAttribute("style");
}


function createMenuButtons() {
    let menuOpenBtn = document.createElement("button");
    menuOpenBtn.setAttribute("type", "button");
    menuOpenBtn.setAttribute("id", "btn-menu-open");
    menuOpenBtn.setAttribute("aria-label", "Visa huvudnavigeringen");
    menuOpenBtn.setAttribute("aria-expanded", "false");
    menuOpenBtn.setAttribute("aria-controls", "menu-link-list");
    menuOpenBtn.innerHTML = "&#9776;";


    let menuCloseBtn = document.createElement("button");
    menuCloseBtn.setAttribute("type", "button");
    menuCloseBtn.setAttribute("id", "btn-menu-close");
    menuCloseBtn.setAttribute("aria-label", "Dölj huvudnavigeringen");
    menuCloseBtn.innerHTML = "&times;";

    return [menuOpenBtn, menuCloseBtn];
}


function openMenu() {
    menu.style.width = "22.5rem";
    menu.style.visibility = "visible";
    menuOpenBtn.setAttribute("aria-expanded", "true");

    setTimeout(() => { menuCloseBtn.focus() }, 100)
}


function closeMenu() {
    menu.style.width = "0";
    menuOpenBtn.setAttribute("aria-expanded", "false");

    setTimeout(() => { menuOpenBtn.focus() }, 100);
    setTimeout(() => { menu.style.visibility = "hidden" }, 500);
}


function menuFocusFirstItem(event) {
    if ("Tab" === event.key && !event.shiftKey) {
        event.preventDefault();
        firstMenuItem.focus();
    }
}


function menuFocusLastItem(event) {
    if ("Tab" === event.key && event.shiftKey) {
        event.preventDefault();
        lastMenuItem.children[0].focus();
    }
}