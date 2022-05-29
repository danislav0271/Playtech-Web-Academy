import Robot from './robot.js';
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
const audio = new Audio('sounds/chat-sound.mp3');
let currentSlide = 1;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let seconds = 10000;
function showSlide(slideIndex) {
    currentSlide = slideIndex;
    const slides = document.getElementsByClassName('slide');
    if (slideIndex > slides.length) {
        currentSlide = 1;
    }
    if (slideIndex < 1) {
        currentSlide = slides.length;
    }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[currentSlide - 1].style.display = 'block';
    if (slides.length <= 1) {
        prev.disabled = true;
        next.disabled = true;
    }
    if (slides.length > 1) {
        prev.disabled = false;
        next.disabled = false;
    }
    const messagesBox = document.querySelectorAll(".messages");
    messagesBox.forEach(m => {
        m.scrollTop = -m.scrollHeight;
    });
    clearInterval(interval);
    interval = setInterval(function () {
        nextSlide();
    }, seconds);
}
let interval = setInterval(function () {
    nextSlide();
}, seconds);
function nextSlide() {
    showSlide(currentSlide += 1);
}
function previousSlide() {
    showSlide(currentSlide -= 1);
}
robotPhrase.disabled = true;
robotType.value = "";
var Type;
(function (Type) {
    Type[Type["Male"] = 0] = "Male";
    Type[Type["Female"] = 1] = "Female";
})(Type || (Type = {}));
const robotList = [];
let messages = [];
for (let index = 0; index < localStorage.length; index++) {
    const robot = JSON.parse(localStorage.getItem(`slide-${index + 1}`));
    const name = robot.Name();
    const type = robot.Type();
    const color = robot.Color();
    const phrase = robot.Phrase();
    const jump = robot.Jump();
    const talk = robot.Talk();
    const blink = robot.Blink();
    robotList.push(robot);
    createRobotSection(name, type, color, phrase, jump, talk, blink);
}
function onCheckboxChange() {
    const checkbox = form.querySelector("input[name='talk']");
    robotPhrase.disabled = !checkbox.checked;
}
robotName.addEventListener("focusout", error);
robotType.addEventListener("focusout", error);
robotPhrase.addEventListener("focusout", error);
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
        const robot = new Robot(robotName.value, robotType.value, color.value, robotPhrase.value, canJump.checked, canTalk.checked, canBlink.checked);
        robotList.push(robot);
        console.log(robot);
        localStorage.setItem(`slide-${robotList.length}`, JSON.stringify(robot));
        createRobotSection(robot.Name(), robot.Type(), robot.Color(), robot.Phrase(), robot.Jump(), robot.Talk(), robot.Blink());
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
function createRobotSection(n, type, color, phrase, jump, talk, blink) {
    const sections = document.querySelectorAll(".factory-section");
    const section = document.createElement("div");
    section.className = "factory-section";
    section.classList.add("slide");
    section.id = `slide-${sections.length + 1}`;
    const header = document.createElement("h2");
    header.textContent = `${type} Robot`;
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "content-wrapper";
    const robotContainer = document.createElement("div");
    robotContainer.className = "robot-container";
    robotContainer.classList.toggle(type === "Male" ? "male" : "female");
    if (jump == true) {
        robotContainer.classList.toggle("can-jump");
    }
    if (talk == true) {
        robotContainer.classList.toggle("can-talk");
    }
    if (blink == true) {
        robotContainer.classList.toggle("can-blink");
    }
    const head = document.createElement("div");
    head.className = "head";
    const leftEye = document.createElement("div");
    leftEye.className = "left-eye";
    const rightEye = document.createElement("div");
    rightEye.className = "right-eye";
    const mouth = document.createElement("div");
    mouth.className = "mouth";
    head.appendChild(leftEye);
    head.appendChild(rightEye);
    head.appendChild(mouth);
    const leftHand = document.createElement("div");
    leftHand.className = "left-hand";
    const rightHand = document.createElement("div");
    rightHand.className = "right-hand";
    const leftLeg = document.createElement("div");
    leftLeg.className = "left-leg";
    const rightLeg = document.createElement("div");
    rightLeg.className = "right-leg";
    const body = document.createElement("div");
    body.className = "body";
    body.style.backgroundColor = color;
    const name = document.createElement("p");
    name.className = "robot-name";
    name.textContent = n;
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.classList.add("bubble-bottom-left");
    bubble.textContent = phrase;
    robotContainer.appendChild(head);
    robotContainer.appendChild(leftHand);
    robotContainer.appendChild(rightHand);
    robotContainer.appendChild(leftLeg);
    robotContainer.appendChild(rightLeg);
    robotContainer.appendChild(body);
    robotContainer.appendChild(name);
    robotContainer.appendChild(bubble);
    const content = document.createElement("div");
    content.className = "content";
    const sendMessage = document.createElement("div");
    sendMessage.className = "send-message";
    const l = document.createElement("label");
    l.textContent = "Send Message:";
    const i = document.createElement("input");
    i.type = "text";
    i.placeholder = "write message here";
    const b = document.createElement("button");
    b.innerHTML = "Send";
    sendMessage.appendChild(l);
    sendMessage.appendChild(i);
    sendMessage.appendChild(b);
    const receivedMessages = document.createElement("div");
    receivedMessages.className = "received-messages";
    const h = document.createElement("div");
    h.className = "header";
    const p = document.createElement("p");
    p.className = "header-last-message";
    p.textContent = "Last messages";
    h.appendChild(p);
    const messages = document.createElement("div");
    messages.className = "messages";
    receivedMessages.appendChild(h);
    receivedMessages.appendChild(messages);
    content.appendChild(sendMessage);
    content.appendChild(receivedMessages);
    contentWrapper.appendChild(robotContainer);
    contentWrapper.appendChild(content);
    section.appendChild(header);
    section.appendChild(contentWrapper);
    const buttons = document.querySelector(".buttons");
    buttons.style.display = "inline-block";
    buttons.before(section);
    GetSection(section.id);
    showSlide(currentSlide = sections.length + 1);
}
function ClearRobots() {
    localStorage.clear();
    robotList.splice(0, robotList.length);
    const sections = document.querySelectorAll(".factory-section");
    sections.forEach(section => {
        section.remove();
    });
    const buttons = document.querySelector(".buttons");
    buttons.style.display = "none";
}
function GetSection(id) {
    const sect = document.querySelector(`#${id}`);
    const button = sect.querySelector("button");
    button.onclick = function () { ShowCreatedMessage(sect); };
}
function CreateMessage(sect) {
    const text = sect.querySelector("input");
    const name = sect.querySelector(".robot-name");
    const color = sect.querySelector(".body");
    if (text.value) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        const nameP = document.createElement("p");
        nameP.className = "name";
        nameP.textContent = name.textContent;
        nameP.style.color = color.style.backgroundColor;
        const dateP = document.createElement("p");
        dateP.className = "date";
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const day = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const fullDate = document.createElement("span");
        fullDate.textContent = `${day}.${month}.${year}`;
        if (minutes <= 9) {
            dateP.textContent = `${hours}:0${minutes}`;
        }
        else {
            dateP.textContent = `${hours}:${minutes}`;
        }
        dateP.append(fullDate);
        const textP = document.createElement("p");
        textP.className = "text";
        textP.textContent = text.value;
        messageDiv.appendChild(nameP);
        messageDiv.appendChild(dateP);
        messageDiv.appendChild(textP);
        const message = { Name: name.textContent, Color: color.style.backgroundColor, Text: text.value, Date: dateP.textContent };
        messages.push(message);
        return messageDiv;
    }
    else {
        text.focus();
    }
}
function ShowCreatedMessage(sect) {
    let sections = document.querySelectorAll(".slide");
    for (let index = 1; index < sections.length + 1; index++) {
        const section = document.querySelector(`#slide-${index}`);
        const messageBox = section.querySelector(".messages");
        const message = CreateMessage(sect);
        if (message) {
            messageBox.prepend(message);
            messageBox.scrollTop = -messageBox.scrollHeight;
            audio.play();
        }
    }
    const text = sect.querySelector("input");
    text.value = "";
}
function ShowCreatedRobots(event) {
    const robotsFound = document.querySelector(".robots-found");
    const container = document.querySelector(".robot-table");
    const oldTables = container.querySelectorAll("table");
    let newRobotList = robotList;
    if (robotName.value) {
        newRobotList = robotList.filter(robot => robot.Name() === robotName.value);
    }
    if (newRobotList.length <= 0) {
        robotsFound.textContent = "No robots created yet";
        if (oldTables.length >= 1) {
            oldTables[0].remove();
        }
    }
    else {
        if (oldTables.length >= 1) {
            oldTables[0].remove();
        }
        const robotTable = document.createElement("table");
        const trHead = document.createElement("tr");
        const thName = document.createElement("th");
        thName.textContent = "Name";
        const thType = document.createElement("th");
        thType.textContent = "Type";
        const thColor = document.createElement("th");
        thColor.textContent = "Color";
        const thOptions = document.createElement("th");
        thOptions.textContent = "Options";
        trHead.appendChild(thName);
        trHead.appendChild(thType);
        trHead.appendChild(thColor);
        trHead.appendChild(thOptions);
        robotTable.appendChild(trHead);
        container.appendChild(robotTable);
        robotsFound.textContent = `${newRobotList.length} robots found`;
        newRobotList.forEach(item => {
            const tr = document.createElement("tr");
            const name = document.createElement("td");
            const nameLink = document.createElement("a");
            nameLink.textContent = item.Name();
            let index = robotList.indexOf(item);
            index++;
            nameLink.onclick = function () { showSlide(index); };
            name.appendChild(nameLink);
            const type = document.createElement("td");
            type.textContent = item.Type();
            const color = document.createElement("td");
            const colorBlock = document.createElement("div");
            colorBlock.className = "color";
            colorBlock.style.background = `${item.Color()}`;
            color.appendChild(colorBlock);
            const options = document.createElement("td");
            const optionsText = [];
            if (item.Jump()) {
                optionsText.push("can jump");
            }
            if (item.Talk()) {
                optionsText.push("can talk");
            }
            if (item.Blink()) {
                optionsText.push("can blink");
            }
            options.textContent = optionsText.join(", ");
            tr.appendChild(name);
            tr.appendChild(type);
            tr.appendChild(color);
            tr.appendChild(options);
            robotTable.appendChild(tr);
        });
    }
    event.preventDefault();
}
