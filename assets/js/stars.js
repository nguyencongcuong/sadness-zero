const starSm = document.getElementById("starSm");
const starXs = document.getElementById("starXs");
const starXxs = document.getElementById("starXxs");
const starSmArr = [];
const starXsArr = [];
const starXxsArr = [];

creatingStars(starSm, starSmArr, 80, "6px", "6px");
creatingStars(starXs, starXsArr, 60, "3px", "3px");
creatingStars(starXxs, starXxsArr, 40, "0.5px", "0.5px");
positioningStars(starSmArr);
positioningStars(starXsArr);
positioningStars(starXxsArr);


//  HÀM: Tạo số lượng x các vì sao
function creatingStars(parentElement, array, num, $w, $h) {
    for (let i = 0; i < num; i++) {
        const span = document.createElement("span");
        span.className = "star";
        span.style.width = $w;
        span.style.height = $h;
        parentElement.appendChild(span);
        array.push(span);
    }
}
//  HÀM: Chọn bất kỳ 1 .star nào và điều chỉnh property left một cách random
function positioningStars(array) {
    for (let i = 0; i < array.length; i++) {
        let randomLeft = Math.floor(Math.random() * (100 - 0) + 0);
        let randomTop = Math.floor(Math.random() * (500 - 100) + 100);
        array[i].style.left = `${randomLeft}%`;
        array[i].style.top = `${randomTop}%`;
        
    }
}
