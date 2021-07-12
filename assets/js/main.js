// Global Declaration
const delay = ms => new Promise(res => setTimeout(res, ms));
let section1 = getID("section1");
let section2 = getID("section2");
let section3 = getID("section3");
let sadThings = [];

// Default Display
section1.style.display = "none";
section2.style.display = "none";
section3.style.display = "none";

// Create & animate a space of stars
positioningStars(creatingStars(500));

// Generate Planet name
fetch("./constellation.json")
.then(function (response) {
    return response.json();
})
.then(function (planetList) {
    let randomPlanetIndex = randomRange(planetList.length - 1, 0);
    let submitBtn = getID("submitBtn");
    submitBtn.innerHTML = `Đặt lên chòm sao<br><b>${planetList[randomPlanetIndex].vietnamese} (${planetList[randomPlanetIndex].latin})</b>`;
});


// Show & hide #section1 (intro)
flowingSection1();

// After click #submitBtn
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submitBtn").addEventListener("click", function (event) {
        event.preventDefault();

        // Show & hide #section2 (healing)
        flowingSection2();

        // Show & hide #section3 (Outro)
        flowingSection3();

        // Save input value to local storage
        const addSad = () => {

            let sad = {
                time: Date.now(),
                text: document.getElementById("thoughtsInput").value
            }

            sadThings.push(sad);
            document.forms[0].reset();

            console.warn("added", {
                sadThings
            });

            // Saving to local storage
            localStorage.setItem("MySadList", JSON.stringify(sadThings));
        }
        addSad();

    }, false);
});


// FUNCTIONS

function flowingSection3() {
    // Execute in order
    let wait = async () => {
        await delay(65000); // Wait for the flow of #section2 to finish
        section3.style.display = "block";
        section3.classList.add("outro--fadeIn");
        await delay(10000);
        section3.classList.add("outro--fadeOut");
        await delay(6000);
        section3.style.display = "none";
    }
    wait();
}

function flowingSection2() {

    // Variables
    let healingWords = getID("healingWords");
    let spaceStar = getID("spaceStar");
    let thoughts = getID("thoughts");
    let sharingField = getID("sharingField");
    let input = getID("thoughtsInput");
    let inputValue = "";
    let healingWordList = [
        "bạn hãy thư giãn và thả lỏng cơ thể",
        "hít thật sâu...",
        "... rồi sau đó thở ra",
        "khi bạn ổn, mọi thứ xung quanh bạn sẽ ổn...",
        "... bạn sẽ nhận ra rằng cuộc sống này đẹp hơn bạn từng nghĩ",
        "và luôn có những niềm vui, những điều tốt đẹp đợi chờ bạn phía trước",
        "vũ trụ của chúng ta rộng hơn 93 tỷ năm ánh sáng",
        "bầu trời rộng lớn mà bạn nhìn thấy mỗi ngày thực ra lại rất nhỏ bé",
        "mặt trời nhỏ hơn thế",
        "và trái đất lại nhỏ nhỏ hơn thế nữa",
        "so với thiên hà, thành phố của chúng ta chỉ như 1 hạt bụi",
        "còn chúng ta chỉ cỡ như 1 tế bào",
        "giờ thì bạn thấy suy nghĩ tiêu cực của mình nhỏ bé cỡ nào rồi chứ?",
        "nó có thể biến mất hoàn toàn trong vũ trụ một cách dễ dàng",
        "vậy đó, hãy tích cực lên vào sống tốt hơn mỗi ngày bạn nhé!"
    ]

    // Play background music
    playLoopAudio();

    // Hide #sharingField
    sharingField.style.display = "none";

    // Get the input value & assign it to #thoughts
    inputValue = input.value;
    thoughts.innerText = inputValue;

    // Based on healingWordList.length, caculate showing time for each healing words in 60s
    let timeToWait = 60000 / healingWordList.length;

    // Execute in order
    let wait = async () => {

        // Make #spaceStar disappear gradually in 60s
        spaceStar.classList.add("healing__star--disappear");

        // While the star is disappearing, displaying healing words in order
        await delay(2000);
        for (let i = 0; i < healingWordList.length; i++) {
            healingWords.innerText = healingWordList[i];
            await delay(timeToWait); // how long each sentence displays on screen
            if (i == healingWordList.length - 1) {
                healingWords.classList.add("healing__words--fadeOut");
            }
        }

        // After 3s, fading out #section 2
        await delay(3000);
        section2.style.display = "none";
    }

    wait();

}

function flowingSection1() {
    section1.style.display = "unset";
    let wait = async () => {
        await delay(5000);
        section1.classList.remove("intro--fadeIn");
        section1.classList.add("intro--fadeOut");
        await delay(5000);
        section1.style.display = "none";
        section2.style.display = "flex";
        section2.classList.add("healing--fadeIn");
    }
    wait();
}

function playLoopAudio() {

    // Variables
    let music;
    let randomAudioIndex;
    let audioName = getID("outroAudioName");

    // Fetch audios from API
    fetch("./bg-music.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (audioList) {

            // Choose an random audio file
            randomAudioIndex = randomRange(audioList.length - 1, 0);
            music = new Audio(audioList[randomAudioIndex].url);

            // Assign the audio name to HTML element
            audioName.innerText = `${audioList[randomAudioIndex].name}`;

            // Loop audio
            if (typeof music.loop == 'boolean') {
                music.loop = true;
            } else {
                music.addEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                }, false);
            }

            // Play audio
            music.play();
            console.log("Bạn đang nghe bản nhạc " + audioList[randomAudioIndex].name + " từ " + audioList[randomAudioIndex].author);
        });
}

function creatingStars(num) {

    // Variables
    let stars = document.getElementById("bg-stars");
    let star;
    let starList = [];
    let size;

    // Creating num star elements: <span class="space__star space__star--xs/space__star--sm/space__star--md"></span>
    for (let i = 0; i < num; i++) {
        star = document.createElement("span");
        size = randomRange(3, 1);
        star.className = "space__star";
        starList.push(star);
        switch (size) {
            case 1:
                star.classList.add("space__star--xs");
                break;
            case 2:
                star.classList.add("space__star--sm");
                break;
            case 3:
                star.classList.add("space__star--md");
                break;
            default:
                break;
        }
        stars.appendChild(star);
    }

    // Return an array of all stars created
    return starList;
}

function positioningStars(starList) {

    for (let i = 0; i < starList.length; i++) {

        let top = randomRange(500, 100);
        let left = randomRange(100, 0);

        starList[i].style.top = `${top}%`;
        starList[i].style.left = `${left}%`;
    }

}

function randomRange(max, min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getID(arg) {
    return document.getElementById(arg);
}