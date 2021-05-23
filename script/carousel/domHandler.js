export function createThumbnails(images) {

    /*
    creates thumbnails which is on format: 
    <ul><li><button><picture></picture</button></li..</ul>
    
    */

    let thumbnails = document.createElement("ul");
    thumbnails.setAttribute("id", "carousel-thumbnails");

    for (let i = 0; i < images.length; i++) {
        let li = document.createElement("li");
        let button = document.createElement("button");

        button.classList.add("btn-carousel-thumbnail");
        button.setAttribute("type", "button");
        button.setAttribute("aria-label", `thumbnail for slide ${i+1} of ${images.length}`);

        let picture = document.createElement("picture");
        picture.innerHTML = `<source media="(max-width: 699px)" srcset="images/thumbnails/mobile/${images[i]}"> 
        <source media="(min-width: 700px)" srcset="images/thumbnails/desktop/${images[i]}">
        <img src="images/thumbnails/desktop/${images[i]}" alt="thumbnail for slide ${i+1} of ${images.length}"
        width="300" height="169">`;


        button.appendChild(picture);
        li.appendChild(button);
        thumbnails.appendChild(li);
    }

    return thumbnails;
}


export function createControlButtons() {
    let nextBtn = document.createElement("button");
    nextBtn.innerHTML = "&#8250;";

    nextBtn.setAttribute("aria-label", "next image");
    nextBtn.setAttribute("type", "button");
    nextBtn.setAttribute("id", "btn-carousel-next");
    nextBtn.setAttribute("aria-controls", "carousel-slide-container");

    let prevBtn = document.createElement("button");
    prevBtn.innerHTML = "&#8249;";
    prevBtn.setAttribute("aria-label", "previous image");
    prevBtn.setAttribute("type", "button");
    prevBtn.setAttribute("id", "btn-carousel-prev");
    prevBtn.setAttribute("aria-controls", "carousel-slide-container");

    return [prevBtn, nextBtn];
}


export function createLiveRegion() {
    let region = document.createElement("div");

    region.setAttribute("aria-live", "polite");
    region.setAttribute("aria-atomic", "true");
    region.setAttribute("id", "liveregion");
    region.classList.add("visually-hidden");

    return region;
}