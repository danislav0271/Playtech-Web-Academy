"use strict";
function ClearRobots() {
    localStorage.clear();
    robotList.splice(0, robotList.length);
    chatManager.Messages = [];
    const sections = document.querySelectorAll(".factory-section");
    sections.forEach(section => {
        section.remove();
    });
    const buttons = document.querySelector(".buttons");
    buttons.style.display = "none";
}
