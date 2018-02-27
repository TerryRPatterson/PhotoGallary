/*global EXIF*/
let lightBox = function lightBox(event){
    let lightbox = document.querySelector(".lightbox");
    let lightBoxImg = document.querySelector(".lightbox  img");
    if (event.target.classList.contains("lightbox")){
        lightbox.classList.toggle("active");
        document.querySelector("img.active").classList.toggle("active");
    }
    else if(event.target.classList.contains("galleryItem")){
        let metadataFrame = document.querySelector(".metadataFrame");

        lightBoxImg.setAttribute("src", event.target.getAttribute("src"));
        lightbox.classList.toggle("active");

        event.target.classList.toggle("active");
        // Getting MetaData
        metadataFrame.textContent = "";
        let PictureMetadata = Pictures[event.target.getAttribute("id")];
        for (let tag in PictureMetadata){
            metadataFrame.textContent += tag + " " + PictureMetadata[tag];
            metadataFrame.textContent +="\n";
        }
    }

};

let getMetaData = function getMetaData(image,index){
    let metadata = {};
    EXIF.getData(image, function () {
        let tags = EXIF.getAllTags(this);
        for (let tag in tags){
            if (tag !== "thumbnail"){
                metadata[tag] = tags[tag];
                console.log(urls[index]);
                console.log(metadata[tag],tag);
            }
        }
        Pictures[index] = metadata;
        metadataLoaded ++;
        console.log(metadataLoaded);
        if (metadataLoaded === urls.length){
            galleryHolder.forEach(function(tag){

                Gallery.appendChild(tag);
            });
        }
        console.log(metadata);
    });
};
let urls = ["Pictures/IMG_01.jpg","Pictures/IMG_02.jpg",
    "Pictures/IMG_03.jpg","Pictures/IMG_04.jpg","Pictures/IMG_05.jpg",
    "Pictures/ANIM_01.gif"];

let Gallery = document.querySelector(".gallery");
let galleryHolder = [];


document.querySelector("body").addEventListener("click",lightBox);
let Pictures = [];
let metadataLoaded = 0;
urls.forEach(function(url, index) {
    let galleryItem = document.createElement("img");
    galleryItem.classList.add("galleryItem");
    galleryItem.setAttribute("src",url);
    galleryItem.setAttribute("id", index);
    //retrive metadata
    getMetaData(galleryItem,index);

    galleryHolder.push(galleryItem);
});
console.log(Pictures.length);
console.log("Load complete.");
