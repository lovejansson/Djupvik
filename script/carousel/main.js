import { createThumbnails, createControlButtons, createLiveRegion } from "./domHandler.js";

const carousel = document.querySelector("#carousel");
const slides = document.querySelectorAll(".carousel-slide");
const slider = document.querySelector("#carousel-slider");
let prevImgIdx, currentThumb, images, nextBtn, prevBtn, thumbnails, liveRegion, currentImgIdx = 0;

function main() {
    let buttons = createControlButtons();
    prevBtn = buttons[0];
    nextBtn = buttons[1];

    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);

    images = ["djupviks_hamn.jpg", "fiskebodar.jpg", "skeppssättning.jpg", "karlsö_utsikt.jpg"];

    liveRegion = createLiveRegion();
    carousel.appendChild(liveRegion);

    thumbnails = createThumbnails(images);
    currentThumb = thumbnails.children[0].children[0];
    currentThumb.classList.add("carousel-thumbnail-active");
    carousel.appendChild(thumbnails);

    addEventListeners()
}

function addEventListeners() {
    nextBtn.addEventListener("click", () => {
        prevImgIdx = currentImgIdx;
        if (3 === currentImgIdx) {
            currentImgIdx = 0

        } else {
            currentImgIdx++;
        }

        changeImage()
    });


    prevBtn.addEventListener("click", () => {
        prevImgIdx = currentImgIdx;
        if (0 === currentImgIdx) {
            currentImgIdx = 3

        } else {
            currentImgIdx--;
        }

        changeImage()
    });

    prevBtn.addEventListener("mousedown", event => { event.preventDefault() });
    nextBtn.addEventListener("mousedown", event => { event.preventDefault() });

    for (const thumb of thumbnails.children) {
        thumb.firstChild.addEventListener("click", changeImageThumb);
    }
}

function changeImageThumb(event) {
    let src;
    prevImgIdx = currentImgIdx;

    /*
        different targets depending on if the user presses enter or clicks
        the thumbnail!
    */
    if (event.target.type === "button") {
        src = event.target.children[0].children[2].attributes.src.textContent;

    } else {
        src = event.target.attributes.src.textContent;
    }

    let i = src.lastIndexOf("/");
    let imgName = src.slice(i + 1);
    let idx = images.indexOf(imgName);

    if (idx != currentImgIdx) {
        currentImgIdx = idx;
        changeImage();
    }
}

function changeImage() {

    /* 
    changes current shown image in the slide, adds the previous image 
    as background for fade in effect 
    */

    if (window.innerWidth <= 699) {
        slider.style.background = `url(../images/mobile/${images[prevImgIdx]}) `;
    } else {
        slider.style.background = `url(../images/desktop/${images[prevImgIdx]}) `;

    }

    slider.style.backgroundSize = "cover";

    let newThumb = thumbnails.children[currentImgIdx].children[0];

    currentThumb.classList.remove("carousel-thumbnail-active");
    currentThumb = newThumb;
    currentThumb.classList.add("carousel-thumbnail-active");

    slides[prevImgIdx].classList.add("hidden");
    slides[currentImgIdx].classList.remove("hidden");

    liveRegion.textContent = `Image ${currentImgIdx+1} of ${slides.length} ${["djupviks hamn","fiskebodar","skepssättning","Utsikt till stora Karlsö"][currentImgIdx]}`
}

main();