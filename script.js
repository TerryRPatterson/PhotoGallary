/*global EXIF $*/
/*eslint no-console: 0*/
let lightBox = function lightBox(event){
    let $lightbox = $(".lightbox");
    let $lightBoxImg = $(".lightbox  img");
    if (event.target.classList.contains("lightbox")){
        $lightbox.toggleClass("active");
        $("img.active").toggleClass("active");
    }
    else if(event.target.classList.contains("galleryItem")){
        let $metadataFrame = $(".metadataFrame");

        $lightBoxImg.attr("src", event.target.getAttribute("src"));
        $lightbox.toggleClass("active");

        event.target.classList.toggle("active");
        // Getting MetaData
        $metadataFrame.text(function(){
            let textContent = "";
            let PictureMetadata = Pictures[event.target.getAttribute("data-id")];
            for (let tag in PictureMetadata){
                textContent += tag + " " + PictureMetadata[tag];
                textContent +="\n";
            }
            return textContent;
        });
    }

};

let getMetaData = function getMetaData(){
    console.log(imagesLoaded + " imagesLoaded");
    if (imagesLoaded === (urls.length - 1)){
        console.log("Get MetaData called.");
        let metadata = {};
        let $pictures = $(".galleryItem");
        $pictures.each(function(index){
            EXIF.getData(this, function () {
                let tags = EXIF.getAllTags(this);
                for (let tag in tags){
                    if (tag !== "thumbnail"){
                        metadata[tag] = tags[tag];
                        console.log(urls[index]);
                        console.log(metadata[tag],tag);
                    }
                }
                Pictures[index] = metadata;
                console.log(metadata);
            });
        });
    }
};
let urls = ["Pictures/IMG_01.jpg","Pictures/IMG_02.jpg",
    "Pictures/IMG_03.jpg","Pictures/IMG_04.jpg","Pictures/IMG_05.jpg",
    "Pictures/ANIM_01.gif"];

let Gallery = document.querySelector(".gallery");



document.querySelector("body").addEventListener("click",lightBox);
let Pictures = [];
let imagesLoaded = 0;
urls.forEach(function(url, index) {
    let galleryItem = document.createElement("img");
    galleryItem.classList.add("galleryItem");
    galleryItem.setAttribute("src",url);
    galleryItem.setAttribute("data-id", index);
    //retrive metadata
    getMetaData(galleryItem,index);
    Gallery.appendChild(galleryItem);
    imagesLoaded ++;
});
console.log(Pictures.length);
$("img").on("load",getMetaData);
