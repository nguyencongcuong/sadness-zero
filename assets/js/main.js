// GLOBAL FUNCTIONS
const randomRange = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);
const delay = ms => new Promise(res => setTimeout(res, ms));
const fetchData = (url, func) => {
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (arr) {
        func(arr);
    });
}
// 1. CREATE ANIMATED STAR BACKGROUND
const starList = num => {

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
const randomizePosition = arr => {
    for (let i = 0; i < arr.length; i++) {
        let top = randomRange(500, 100);
        let left = randomRange(95, 5);
        arr[i].style.top = `${top}%`;
        arr[i].style.left = `${left}%`;
    }
}
randomizePosition(starList(100));

// 2. GENERATE RANDOM PLANET'S NAME
const planetName = (arr) => {
    let index = randomRange(arr.length - 1, 0);
    document.getElementById("submitBtn").innerHTML = `Đặt lên chòm sao ${arr[index].vietnamese} (${arr[index].latin})`;
}
fetchData("./constellation.json", planetName);

// 3. HEALING FLOWS
// 3.1 Intro
// 3.2 Healing process
// 3.3 Outro
const intro = () => {
    section1.style.display = "flex";
    let wait = async () => {
        await delay(3000);
        section1.classList.remove("intro--fadeIn");
        section1.classList.add("intro--fadeOut");
        await delay(3000);
        section1.style.display = "none";
        section2.style.display = "flex";
        section2.classList.add("healing--fadeIn");
    }
    wait();
}
const process = () => {

    // Variables
    let healingWords = document.getElementById("healingWords");
    let spaceStar = document.getElementById("spaceStar");
    let thoughts = document.getElementById("thoughts");
    let sharingField = document.getElementById("sharingField");
    let input = document.getElementById("thoughtsInput");
    let inputValue = "";
    let healingWordList = [
        "Bạn ơi, hãy thư giãn và thả lỏng cơ thể...",
        "hít một hơi thật sâu... rồi sau đó thở ra.",
        "Bầu trời có lúc mưa, lúc đen xì vì bão tố...",
        "nhưng cuối cùng, trời lại quang mây lại tạnh.",
        "Cuộc sống của bạn cũng vậy...",
        "Dù hiện bạn đang buồn thế nào thì nó đều trở về hình hài tốt đẹp vốn dĩ.",
        "Vũ trụ rộng hơn 93 tỷ năm ánh sáng.",
        "Bầu trời mênh mông, nhưng so với vũ trụ lại cực kỳ nhỏ bé.",
        "Trái đất nơi bạn ở, lại còn nhỏ hơn thế nữa.",
        "Những thành phố lớn nhất chỉ như 1 hạt bụi khi so với vũ trụ.",
        "Còn bạn, chỉ cỡ như 1 tế bào.",
        "Nỗi buồn trong bạn nhỏ bé đến nỗi...",
        "Nó có thể tan biến trong không gian một cách dễ dàng..."
    ]

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
        for (let i = 0; i < healingWordList.length; i++) {
            healingWords.innerText = healingWordList[i];
            await delay(timeToWait); // how long each sentence displays on screen
            if (i == healingWordList.length - 1) {
                healingWords.classList.add("healing__words--fadeOut");
                await delay(3000);
                section2.style.display = "none";
            }
        }
    }

    wait();

}
const outro = () => {
    // Execute in order
    let wait = async () => {
        await delay(62000); // Wait for the flow of #section2 to finish
        section3.style.display = "flex";
        section3.classList.add("outro--fadeIn");
        await delay(15000);
        section3.classList.add("outro--fadeOut");
        await delay(4000);
        section3.style.display = "none";
    }
    wait();
}
const audio = () => {

    // Variables
    let music;
    let randomAudioIndex;

    // Fetch audios from API
    fetch("./bg-music.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (audioList) {
            // Choose an random audio file
            randomAudioIndex = randomRange(audioList.length - 1, 0);
            music = new Audio(audioList[randomAudioIndex].url);
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
            console.log("Bạn đang nghe bản nhạc " + audioList[randomAudioIndex].name + " (" + audioList[randomAudioIndex].author + ")");
        });
}

intro();
document.getElementById("submitBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent broswer from reload after click
    audio();
    process();
    outro();
}, false);
