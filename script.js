
let lightBox = function lightBox(event){
    let lightbox = document.querySelector(".lightbox");
    let lightBoxImg = document.querySelector(".lightbox  img");
    if (event.target.classList.contains("lightbox")){
        lightbox.classList.toggle("active");
        document.querySelector("img.active").classList.toggle("active");
    }
    else if(event.target.classList.contains("galleryItem")){
        metadataFrame = document.querySelector(".metadataFrame");

        lightBoxImg.setAttribute("src", event.target.getAttribute("src"));
        metadataFrame.style.height = lightBoxImg.height +"px";
        lightbox.classList.toggle("active");

        event.target.classList.toggle("active");
        // Getting MetaData
        metadataFrame.textContent = "Avaible MetaData: \n";
        PictureMetadata = Pictures[event.target.getAttribute("id")];
        for (tag in PictureMetadata){
            if (tag === "thumbnail"){
                continue;
            }
            metadataFrame.textContent += tag + " " + PictureMetadata[tag];
            metadataFrame.textContent +="\n"
        }
    }

}

let urls = ["Pictures/IMG_01.jpg","Pictures/IMG_02.jpg",
"Pictures/IMG_03.jpg","Pictures/IMG_04.jpg","Pictures/IMG_05.jpg",
"Pictures/ANIM_01.gif"];

Gallery = document.querySelector(".gallery");


document.querySelector("body").addEventListener("click",lightBox);
let Pictures = [];
for (let i = 0; i < urls.length; i++){
    let metadata = {};
    galleryItem = document.createElement("img");
    galleryItem.classList.add("galleryItem");
    galleryItem.setAttribute("src",urls[i]);
    galleryItem.setAttribute("id", i);
    //retrive metadata
    console.log(galleryItem);
    EXIF.getData(galleryItem, function () {
        let tags = EXIF.getAllTags(this);
        for (tag in tags){
            metadata[tag] = tags[tag];
        }
    });
    Pictures[i] = metadata;
    Gallery.appendChild(galleryItem);
}
