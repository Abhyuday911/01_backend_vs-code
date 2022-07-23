document.querySelector("#newfilei").addEventListener("click", function () {
    document.querySelector("#nfinput").style.display = "initial"
    document.querySelector("#nfinput").focus();
})

document.querySelector("#nfinput").addEventListener("keydown", function (dets) {
    if (dets.key === "Escape") {
        document.querySelector("#nfinput").style.display = "none"
    }
})