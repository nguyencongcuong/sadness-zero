//  TẠO CÁC VÌ SAO
let stars = document.getElementById("bg-stars");
let starSize = ["1px", "3px", "6px"];
let starList = [];
let starXs = [];
let starSm = [];
let starMd = [];

creatingStars(stars, 150);
starList = document.getElementsByClassName("space__star");
positioningStars(starList);

console.log(starXs);
console.log(starSm);
console.log(starMd);

function creatingStars(parentElement, num) {
    for (let i = 0; i < num; i++) {

        const span = document.createElement("span");
        let starWidth;
        let starHeight;
        let randomSize = getRandomInt(4, 1);
        span.className = "space__star";
        switch (randomSize) {
            case 1:
                starWidth = starSize[0];
                starHeight = starSize[0];
                span.classList.add("space__star--xs");
                starXs.push(span);
                break;
            case 2:
                starWidth = starSize[1];
                starHeight = starSize[1];
                span.classList.add("space__star--sm");
                starSm.push(span);
                break;
            case 3:
                starWidth = starSize[2];
                starHeight = starSize[2];
                span.classList.add("space__star--md");
                starMd.push(span);
                break;
            default:
                break;
        }
        span.style.width = starWidth;
        span.style.height = starHeight;
        parentElement.appendChild(span);
    }
}

function positioningStars(array) {
    for (let i = 0; i < array.length; i++) {
        let randomTop = getRandomInt(501, 100);
        let randomLeft = getRandomInt(101, 0);
        array[i].style.top = `${randomTop}%`;
        array[i].style.left = `${randomLeft}%`;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/*  - Nhập input text
    - Lấy giá trị nhập đưa vào vì sao
    - Chờ 3s
    - Flow 1: Vì sao bắt đầu nhỏ dần trong 60s
    - Flow 2: 13 texts lần lượt thay nhau hiển thị đến hết 60s
    - Flow 3: Bắt đầu phát nhạc
*/

const delay = ms => new Promise(res => setTimeout(res, ms));
let section1 = getID("section1");
let section2 = getID("section2");
let section3 = getID("section3");

let sharingField = getID("sharingField");

// SECTION 1
sharingField.style.display = "none";
let sectionFade = async () => {
    await delay(5000);
    section1.classList.remove("intro--fadeIn");
    section1.classList.add("intro--fadeOut");
    await delay(5000);
    sharingField.style.display = "initial";
    section2.style.display = "flex";
    section2.classList.add("healing--fadeIn");
}
sectionFade();

// SECTION 2
let healingWords = getID("healingWords");
let spaceStar = getID("spaceStar");
let spaceStarShape = getID("spaceStarShape");
let thoughts = getID("thoughts");

let inputValue = "";
let submitBtn = getID("submitBtn");
let input = getID("thoughtsInput");
let healingWordsArr = [
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

submitBtn.addEventListener("click", function () {
    inputValue = input.value;
    thoughts.innerText = inputValue;
    sharingField.style.display = "none";
    
    playLoopAudio();

    let timeToWait = 60000 / healingWordsArr.length;
    let wait = async () => {

        spaceStar.classList.add("healing__star--disappear");

        for (let i = 0; i < healingWordsArr.length; i++) {
            healingWords.innerText = healingWordsArr[i];
            await delay(timeToWait);
        }
        await delay(3000);
        section2.classList.add("healing--fadeOut");
        await delay(3000);
        section3.style.display = "block";
        section3.classList.add("outro--fadeIn");
        await delay(10000);
        section3.classList.add("outro--fadeOut");
        await delay(3000);
        section1.style.display = "none";
        section2.style.display = "none";
        section3.style.display = "none";
    }
    wait();
}, false);

//  HÀM:
function getID(arg) {
    return document.getElementById(arg);
}

//  HÀM PLAY & LOOP AUDIO

function playLoopAudio() {
    
    let music;
    let audioName;
    let randomAudioIndex;

    fetch("./bg-music.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let audioAPILength = data.length;
        randomAudioIndex = getRandomInt(audioAPILength, 0);
        music = new Audio(data[randomAudioIndex].url);

        let audioName = getID("outroAudioName");
        audioName.innerText = `${data[randomAudioIndex].name}`;

        if (typeof music.loop == 'boolean') {
            music.loop = true;
        } else {
            music.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
        }
    
        music.play();

        console.log("You'are listening to " + data[randomAudioIndex].name + " by " + data[randomAudioIndex].author);

    });    
}