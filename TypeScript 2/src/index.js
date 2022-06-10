"use strict";
const form = document.querySelector("form");
const robotPhrase = document.querySelector("textarea#phrase");
const robotType = document.querySelector("select#select-type");
const robotName = document.querySelector("input#name");
const color = document.querySelector("input#color-picker");
const canTalk = document.querySelector("input#talk");
const canJump = document.querySelector("input#jump");
const canBlink = document.querySelector("input#blink");
const typeError = document.querySelector(".error-type");
const nameError = document.querySelector(".error-name");
const phraseError = document.querySelector(".error-phrase");
robotPhrase.disabled = true;
robotType.value = "";
robotName.addEventListener("focusout", error);
robotType.addEventListener("focusout", error);
robotPhrase.addEventListener("focusout", error);
let robotList = [];
const chatManager = new ChatManager([]);
chatManager.GetLocalStorageMessages();
window.onload = () => {
    chatManager.ShowAllMessages(chatManager.Messages);
};
var Type;
(function (Type) {
    Type[Type["Male"] = 0] = "Male";
    Type[Type["Female"] = 1] = "Female";
})(Type || (Type = {}));
for (let index = 0; index < localStorage.length; index++) {
    const robot = JSON.parse(localStorage.getItem(`slide-${index + 1}`));
    if (robot === null) {
        continue;
    }
    const name = robot._Name;
    const type = robot._Type;
    const color = robot._Color;
    const phrase = robot._Phrase;
    const jump = robot._jump;
    const talk = robot._talk;
    const blink = robot._blink;
    const oldRobot = new Robot(name, type, color, phrase, jump, talk, blink);
    robotList.push(oldRobot);
    createRobotSection(oldRobot);
}
function onCheckboxChange() {
    const checkbox = form.querySelector("input[name='talk']");
    robotPhrase.disabled = !(checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked);
}
function error() {
    nameError.style.display = !robotName.value ? "block" : "none";
    typeError.style.display = !robotType.value ? "block" : "none";
    phraseError.style.display = (canTalk.checked && !robotPhrase.value) ? "block" : "none";
}
;
function createRobot(event) {
    typeError.style.display = "none";
    nameError.style.display = "none";
    phraseError.style.display = "none";
    if (robotName.value && robotType.value && color.value && (!canTalk.checked || canTalk.checked && robotPhrase.value)) {
        let type = robotType.value === "Male" ? Type.Male : Type.Female;
        const robot = new Robot(robotName.value, type, color.value, robotPhrase.value, canJump.checked, canTalk.checked, canBlink.checked);
        robotList.push(robot);
        localStorage.setItem(`slide-${robotList.length}`, JSON.stringify(robot));
        createRobotSection(robot);
        robotName.value = "";
        robotType.value = "";
        robotPhrase.value = "";
        robotPhrase.disabled = true;
        canJump.checked = false;
        canTalk.checked = false;
        canBlink.checked = false;
        color.value = "#e96126";
    }
    else {
        alert("Form is not full.");
        if (!robotType.value) {
            typeError.style.display = "block";
        }
        if (!robotName.value) {
            nameError.style.display = "block";
        }
        if (canTalk.checked && !robotPhrase.value) {
            phraseError.style.display = "block";
        }
    }
    event.preventDefault();
}
