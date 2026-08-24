/* ======================================
   PREMIUM BIRTHDAY WEBSITE
====================================== */


/* ======================================
   LOADER
====================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList.add("hide");

    }, 1000);

    createStars();
    createGallery();

});


/* ======================================
   STARS
====================================== */

function createStars() {

    const stars =
        document.getElementById("stars");

    for (let i = 0; i < 100; i++) {

        const star =
            document.createElement("div");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "vw";

        star.style.top =
            Math.random() * 100 + "vh";

        star.style.animationDelay =
            Math.random() * 3 + "s";

        stars.appendChild(star);

    }

}


/* ======================================
   GALLERY
====================================== */

const gallery =
    document.getElementById("gallery");

const galleryWrapper =
    document.getElementById("galleryWrapper");

let currentImage = 0;

const images = [];


/*
   IMPORTANT:
   All gallery images are in root folder.
   Example:
   tareq-rayhan1.jpg
   tareq-rayhan2.jpg
   ...
   tareq-rayhan30.jpg
*/

for (let i = 1; i <= 30; i++) {

    images.push(
        `tareq-rayhan${i}.jpg`
    );

}


/* ======================================
   CREATE GALLERY
====================================== */

function createGallery() {

    images.forEach((src, index) => {

        const card =
            document.createElement("div");

        card.className = "memory";

        const image =
            document.createElement("img");

        image.src = src;

        image.alt =
            `Tareq and Rayhan memory ${index + 1}`;

        image.loading = "lazy";


        image.onerror = () => {

            console.error(
                "Gallery image not found:",
                src
            );

            card.style.display = "none";

        };


        card.appendChild(image);


        card.addEventListener("click", () => {

            currentImage = index;

            openViewer();

        });


        gallery.appendChild(card);

    });

}


/* ======================================
   OPEN GALLERY
====================================== */

document
    .getElementById("openGallery")
    .addEventListener("click", () => {

        galleryWrapper.classList.add("show");

        setTimeout(() => {

            galleryWrapper.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 250);

    });


/* ======================================
   IMAGE VIEWER
====================================== */

const viewer =
    document.getElementById("viewer");

const viewerImage =
    document.getElementById("viewerImage");

const viewerCaption =
    document.getElementById("viewerCaption");


function openViewer() {

    viewerImage.src =
        images[currentImage];

    viewerCaption.textContent =
        `MEMORY ${currentImage + 1}  •  TAREQ × RAYHAN`;

    viewer.classList.add("open");

}


/* ======================================
   CLOSE VIEWER
====================================== */

document
    .getElementById("viewerClose")
    .addEventListener(
        "click",
        closeViewer
    );


function closeViewer() {

    viewer.classList.remove("open");

}


/* ======================================
   NEXT IMAGE
====================================== */

document
    .getElementById("nextBtn")
    .addEventListener("click", () => {

        currentImage++;

        if (currentImage >= images.length) {

            currentImage = 0;

        }

        openViewer();

    });


/* ======================================
   PREVIOUS IMAGE
====================================== */

document
    .getElementById("prevBtn")
    .addEventListener("click", () => {

        currentImage--;

        if (currentImage < 0) {

            currentImage =
                images.length - 1;

        }

        openViewer();

    });


/* ======================================
   KEYBOARD
====================================== */

document.addEventListener(
    "keydown",
    event => {

        if (!viewer.classList.contains("open")) {

            return;

        }

        if (event.key === "ArrowRight") {

            document
                .getElementById("nextBtn")
                .click();

        }

        if (event.key === "ArrowLeft") {

            document
                .getElementById("prevBtn")
                .click();

        }

        if (event.key === "Escape") {

            closeViewer();

        }

    }
);


/* ======================================
   THEME
====================================== */

document
    .getElementById("themeBtn")
    .addEventListener("click", () => {

        document.body
            .classList
            .toggle("light");

        const btn =
            document.getElementById("themeBtn");

        if (
            document.body
                .classList
                .contains("light")
        ) {

            btn.textContent = "☾";

        } else {

            btn.textContent = "☀";

        }

    });


/* ======================================
   START STORY
====================================== */

document
    .getElementById("startBtn")
    .addEventListener("click", () => {

        document
            .querySelector(".story-section")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* ======================================
   COUPLE VIEWER
====================================== */

const coupleViewer =
    document.getElementById("coupleViewer");


document
    .getElementById("coupleOpen")
    .addEventListener("click", () => {

        coupleViewer.classList.add("open");

        createConfetti();

    });


document
    .getElementById("coupleClose")
    .addEventListener("click", () => {

        coupleViewer.classList.remove("open");

    });


/* ======================================
   MUSIC PLAYER
====================================== */

const audioButtons =
    document.querySelectorAll("[data-audio]");


audioButtons.forEach(button => {

    button.addEventListener("click", async () => {

        const audioId =
            button.dataset.audio;

        const audio =
            document.getElementById(audioId);


        if (!audio) {

            console.error(
                "Audio element not found:",
                audioId
            );

            return;

        }


        /*
           Stop every other audio
        */

        document
            .querySelectorAll("audio")
            .forEach(otherAudio => {

                if (otherAudio !== audio) {

                    otherAudio.pause();

                    otherAudio.currentTime = 0;

                }

            });


        /*
           Reset all buttons
        */

        document
            .querySelectorAll("[data-audio]")
            .forEach(otherButton => {

                if (otherButton !== button) {

                    if (
                        otherButton.dataset.audio ===
                        "faitaAudio"
                    ) {

                        if (
                            otherButton.classList
                                .contains("music-btn")
                        ) {

                            otherButton.innerHTML =
                                "▶ PLAY FAITA JAY";

                        }

                    } else {

                        if (
                            otherButton.classList
                                .contains("music-btn")
                        ) {

                            otherButton.innerHTML =
                                "▶ PLAY SONG";

                        }

                    }

                }

            });


        /*
           PLAY
        */

        if (audio.paused) {

            try {

                await audio.play();


                /*
                   Faita Jai
                */

                if (
                    audioId === "faitaAudio"
                ) {

                    document
                        .querySelectorAll(
                            `[data-audio="faitaAudio"]`
                        )
                        .forEach(btn => {

                            if (
                                btn.classList
                                    .contains("music-btn")
                            ) {

                                btn.innerHTML =
                                    "❚❚ PAUSE FAITA JAY";

                            }

                        });

                }


                /*
                   Tomake Chai
                */

                else {

                    document
                        .querySelectorAll(
                            `[data-audio="tomakeAudio"]`
                        )
                        .forEach(btn => {

                            if (
                                btn.classList
                                    .contains("music-btn")
                            ) {

                                btn.innerHTML =
                                    "❚❚ PAUSE SONG";

                            }

                        });

                }

            }

            catch (error) {

                console.error(
                    "Audio playback error:",
                    error
                );

                alert(
                    "Song load korte problem hocche. " +
                    "GitHub-e audio file path/name check koro."
                );

            }

        }


        /*
           PAUSE
        */

        else {

            audio.pause();


            if (
                audioId === "faitaAudio"
            ) {

                document
                    .querySelectorAll(
                        `[data-audio="faitaAudio"]`
                    )
                    .forEach(btn => {

                        if (
                            btn.classList
                                .contains("music-btn")
                        ) {

                            btn.innerHTML =
                                "▶ PLAY FAITA JAY";

                        }

                    });

            }

            else {

                document
                    .querySelectorAll(
                        `[data-audio="tomakeAudio"]`
                    )
                    .forEach(btn => {

                        if (
                            btn.classList
                                .contains("music-btn")
                        ) {

                            btn.innerHTML =
                                "▶ PLAY SONG";

                        }

                    });

            }

        }

    });

});


/* ======================================
   AUDIO ENDED
====================================== */

document
    .querySelectorAll("audio")
    .forEach(audio => {

        audio.addEventListener(
            "ended",
            () => {

                if (
                    audio.id === "faitaAudio"
                ) {

                    document
                        .querySelectorAll(
                            `[data-audio="faitaAudio"]`
                        )
                        .forEach(btn => {

                            if (
                                btn.classList
                                    .contains("music-btn")
                            ) {

                                btn.innerHTML =
                                    "▶ PLAY FAITA JAY";

                            }

                        });

                }

                else {

                    document
                        .querySelectorAll(
                            `[data-audio="tomakeAudio"]`
                        )
                        .forEach(btn => {

                            if (
                                btn.classList
                                    .contains("music-btn")
                            ) {

                                btn.innerHTML =
                                    "▶ PLAY SONG";

                            }

                        });

                }

            }
        );

    });


/* ======================================
   FINAL CELEBRATION
====================================== */

document
    .getElementById("celebrateBtn")
    .addEventListener("click", () => {

        createConfetti();

        fireworks();

    });


/* ======================================
   CONFETTI
====================================== */

function createConfetti() {

    const colors = [
        "#bd7cff",
        "#68e7ff",
        "#ffffff",
        "#f3c77a"
    ];


    for (let i = 0; i < 150; i++) {

        const piece =
            document.createElement("div");


        piece.style.position =
            "fixed";

        piece.style.top =
            "-20px";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.width =
            "7px";

        piece.style.height =
            "12px";

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        piece.style.zIndex =
            "500";

        piece.style.pointerEvents =
            "none";


        const duration =
            2 + Math.random() * 4;


        piece.animate(

            [

                {
                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh)
                         rotate(720deg)`,

                    opacity: .2
                }

            ],

            {

                duration:
                    duration * 1000,

                easing:
                    "cubic-bezier(.2,.8,.3,1)"

            }

        );


        document.body.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, duration * 1000);

    }

}


/* ======================================
   FIREWORKS
====================================== */

function fireworks() {

    for (
        let burst = 0;
        burst < 8;
        burst++
    ) {

        setTimeout(() => {

            const x =
                15 + Math.random() * 70;

            const y =
                15 + Math.random() * 50;


            for (
                let i = 0;
                i < 30;
                i++
            ) {

                const spark =
                    document.createElement("div");


                spark.style.position =
                    "fixed";

                spark.style.left =
                    x + "vw";

                spark.style.top =
                    y + "vh";

                spark.style.width =
                    "4px";

                spark.style.height =
                    "4px";

                spark.style.borderRadius =
                    "50%";

                spark.style.background =
                    i % 2 === 0
                        ? "#bd7cff"
                        : "#68e7ff";

                spark.style.zIndex =
                    "600";


                document.body.appendChild(
                    spark
                );


                const angle =
                    Math.PI * 2 * i / 30;

                const distance =
                    60 + Math.random() * 100;


                spark.animate(

                    [

                        {
                            transform:
                                "translate(0,0)",

                            opacity: 1
                        },

                        {

                            transform:
                                `translate(
                                    ${Math.cos(angle) * distance}px,
                                    ${Math.sin(angle) * distance}px
                                )`,

                            opacity: 0

                        }

                    ],

                    {

                        duration: 1000,

                        easing: "ease-out"

                    }

                );


                setTimeout(() => {

                    spark.remove();

                }, 1100);

            }

        }, burst * 350);

    }

}
