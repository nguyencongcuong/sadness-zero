document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submitBtn").addEventListener("click", function (event) {
        event.preventDefault();

        healingProcess();
        outro();

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