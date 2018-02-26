
let lightBox = function lightBox(event){
    let lightbox = document.querySelector(".lightbox");
    let lightBoxImg = document.querySelector(".lightbox  img");
    if (event.target.classList.contains("lightbox")){
        lightbox.classList.toggle("active");
        document.querySelector("img.active").classList.toggle("active");
    }
    else{
      lightBoxImg.setAttribute("src", this.getAttribute("src"));
      lightbox.classList.toggle("active");
      metadata = document.querySelector(".metadata");
      metadata.style.height = lightBoxImg.height +"px";
      this.classList.toggle("active");
    }

}

let Pictures = ["Pictures/IMG_01.jpg","Pictures/IMG_02.jpg",
"Pictures/IMG_03.jpg","Pictures/IMG_04.jpg","Pictures/IMG_05.jpg",
"Pictures/ANIM_01.gif"];

Gallery = document.querySelector(".gallery");

document.querySelector(".lightbox").addEventListener("click",lightBox);

let i = 0;
for (let picture of Pictures){
    galleryItem = document.createElement("img");
    galleryItem.classList.add("galleryItem");
    galleryItem.setAttribute("src",Pictures[i]);
    galleryItem.addEventListener("click",lightBox);
    Gallery.appendChild(galleryItem);
    i ++;
}
