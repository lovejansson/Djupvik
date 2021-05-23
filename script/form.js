/* This code handles confirmation message on submit*/

const form = document.querySelector("form");

function main() {
    createPopUp();

    form.addEventListener("submit", event => {
        event.preventDefault();
        showPopUp()
    });
}

function createPopUp() {
    let divOverlay = document.createElement("div");
    let divContent = document.createElement("div");
    let content = document.createElement("p");
    let button = document.createElement("button");

    button.setAttribute("id", "btn-pop-up-close");
    button.setAttribute("type", "button");
    button.setAttribute("aria-label", "Stäng pop-up med bekräftelsemeddelande");
    button.innerHTML = "&times;";
    button.addEventListener("click", () => {
        divOverlay.classList.add("hidden");
        form.reset()
    });

    content.innerHTML = "Ditt meddelande har skickats! <br/> <br/>Vi hör av oss så snart vi kan. Vanligtvis inom 1-2 dagar.";
    divContent.setAttribute("id", "pop-up");
    divContent.appendChild(button);
    divContent.appendChild(content);

    divOverlay.classList.add("hidden");
    divOverlay.setAttribute("id", "overlay");
    divOverlay.appendChild(divContent);
    divOverlay.addEventListener("click", (event) => {
        if (event.target.hasAttribute("overlay")) {
            event.classList.add("hidden");
        }

        form.reset();
    });

    form.appendChild(divOverlay);
}

function showPopUp() {
    let divOverlay = document.querySelector("#overlay");
    let closeBtn = document.querySelector("#btn-pop-up-close");

    divOverlay.classList.remove("hidden");
    closeBtn.focus()
}

main();