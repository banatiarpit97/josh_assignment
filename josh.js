$("#myCarousel").carousel({ interval: 10000, pause: "hover" });

let modal;
let imageModalActive = false;
let videoModalActive = false;
let currentIndex;
let all_images = [
    {
        title:"HTML",
        src:"./images required in html/html.jpeg"
    },
    {
        title: "CSS",
        src: "./images required in html/css.png"
    },
    {
        title: "Javascript",
        src: "./images required in html/js.png"
    },
    {
        title: "Angular",
        src: "./images required in html/angular.jpeg"
    },
];
let all_videos = [
    {
        title: "Learn HTML",
        src: "https://www.youtube.com/embed/UB1O30fR-EE"
    },
    {
        title: "Learn CSS",
        src: "https://www.youtube.com/embed/yfoY53QXEnI"
    },
    {
        title: "Learn Javascript",
        src: "https://www.youtube.com/embed/vEROU2XtPR8"
    },
    {
        title: "Learn Angular",
        src: "https://www.youtube.com/embed/z4JUm0Bq9AM"
    },
];

document.querySelectorAll(".thumbnail-img").forEach((img) => {
    img.addEventListener('click', function(e) {
        imageModalActive = true;
        imageModalActive = true;
        setImageAndTitle(this.getAttribute('src'), this.getAttribute('alt'));
        $("#image-modal").modal("show");
        currentIndex = getCurrentImageIndex();
    })
})

document.querySelectorAll(".close").forEach((close) => {
    close.addEventListener('click', () => {
        if(imageModalActive){
            $("#image-modal").modal("hide");            
            imageModalActive = false;
        }
        else if(videoModalActive) {
            document.querySelector("#video-modal #selected-video").setAttribute('src', "");
            $("#video-modal").modal("hide");            
            videoModalActive = false;
        }  
    });
});


document.querySelectorAll(".next").forEach((next) => {
    next.addEventListener('click', () => {
        currentIndex++;
        if (imageModalActive) {
            setImageAndTitle(all_images[(currentIndex) % all_images.length].src, all_images[(currentIndex) % all_images.length].title);
        }
        if (videoModalActive) {
            setVideoAndTitle(all_videos[(currentIndex) % all_videos.length].src, all_videos[(currentIndex) % all_videos.length].title);    
        }
    })
});

document.querySelectorAll(".previous").forEach((prev) => {
    prev.addEventListener('click', () => {
        if (currentIndex == 0){
            currentIndex = 4;
        }
        currentIndex--;
        if (imageModalActive) {
            setImageAndTitle(all_images[currentIndex].src, all_images[currentIndex].title);
        }
        if (videoModalActive) {
            setVideoAndTitle(all_videos[currentIndex].src, all_videos[currentIndex].title);
        }
    });
});

document.querySelectorAll(".video-container").forEach((container) => {
    container.addEventListener('click', function () {
        imageModalActive = false;
        videoModalActive = true;
        setVideoAndTitle(this.children[0].getAttribute('src'), this.children[0].getAttribute('data-title'))
        $("#video-modal").modal("show");
        currentIndex = getCurrentVideoIndex();
    })
})

function getCurrentImageIndex(){
    let currentIndex;
    let currentImg = document.querySelector("#image-modal #selected-image").getAttribute('src');
    all_images.forEach((element, idx) => {
        if (element.src == currentImg) {
            currentIndex = idx;
            return;
        }
    });
    return currentIndex;
}

function getCurrentVideoIndex() {
    let currentIndex;
    let currentVideo = document.querySelector("#video-modal #selected-video").getAttribute('src');
    all_videos.forEach((element, idx) => {
        if (element.src == currentVideo) {
            currentIndex = idx;
            return;
        }
    });
    return currentIndex;
}

function setImageAndTitle(image, title){
    document.querySelector("#image-modal #selected-image").setAttribute('src', image);
    document.querySelector("#image-modal #image-title").innerHTML = title;
}

function setVideoAndTitle(video, title) {
    document.querySelector("#video-modal #selected-video").setAttribute('src', video);
    document.querySelector("#video-modal #video-title").innerHTML = title;
}