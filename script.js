

let lightBox = function lightBox(){
    lightbox = document.querySelector(".lightbox");
    lightBoxImg = document.querySelector(".lightbox  img");
    lightBoxImg.setAttribute("src", this.getAttribute("src"));
    lightbox.classList.toggle("active");
}


let Pictures = ["/Pictures/IMG_01.jpg","/Pictures/IMG_02.jpg",
"/Pictures/IMG_03.jpg","/Pictures/IMG_04.jpg","/Pictures/IMG_05.jpg",
"Pictures/ANIM_01.gif"];

Gallery = document.querySelector(".gallery");

document.querySelector(".lightbox").addEventListener("click",lightBox);

let i = 0;
for (let picture of Pictures){
    galleryItem = document.createElement("img");
    galleryItem.classList.add("galleryItem");
    galleryItem.setAttribute("src",Pictures[i]);
    galleryItem.setAttribute("style","Margin:5px");
    galleryItem.addEventListener("click",lightBox);
    galleryItem.setAttribute("width", "20%")
    galleryItem.classList.add("thumbnail");
    Gallery.appendChild(galleryItem);
    i ++;
}
