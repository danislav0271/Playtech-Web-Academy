"use strict";
function createRobotSection(robot) {
    const sections = document.querySelectorAll(".factory-section");
    const robotType = robot.Type === 0 ? "Male" : "Female";
    const section = document.createElement("div");
    section.className = "factory-section";
    section.classList.add("slide");
    section.id = `slide-${sections.length + 1}`;
    const header = document.createElement("h2");
    header.textContent = `${robotType} Robot`;
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "content-wrapper";
    const robotContainer = document.createElement("div");
    robotContainer.className = "robot-container";
    robotContainer.classList.toggle(robotType === "Male" ? "male" : "female");
    if (robot.Jump == true) {
        robotContainer.classList.toggle("can-jump");
    }
    if (robot.Talk == true) {
        robotContainer.classList.toggle("can-talk");
    }
    if (robot.Blink == true) {
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
    body.style.backgroundColor = robot.Color;
    const name = document.createElement("p");
    name.className = "robot-name";
    name.textContent = robot.Name;
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.classList.add("bubble-bottom-left");
    bubble.textContent = robot.Phrase;
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
    const divMessages = document.createElement("div");
    divMessages.className = "messages";
    receivedMessages.appendChild(h);
    receivedMessages.appendChild(divMessages);
    const b1 = document.createElement("button");
    b1.innerHTML = "Show Last Messages";
    b1.addEventListener("click", () => {
        chatManager.ShowLastMessages();
    }, false);
    const b2 = document.createElement("button");
    b2.innerHTML = "Show First Messages";
    b2.addEventListener("click", () => {
        chatManager.ShowFirstMessages();
    }, false);
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "message-buttons";
    buttonContainer.appendChild(b1);
    buttonContainer.appendChild(b2);
    content.appendChild(sendMessage);
    content.appendChild(receivedMessages);
    content.appendChild(buttonContainer);
    contentWrapper.appendChild(robotContainer);
    contentWrapper.appendChild(content);
    section.appendChild(header);
    section.appendChild(contentWrapper);
    const buttons = document.querySelector(".buttons");
    buttons.style.display = "inline-block";
    buttons.before(section);
    GetSection(section.id);
    showSlide(currentSlide = sections.length + 1);
    chatManager.ShowAllMessages(chatManager.Messages);
}
function GetSection(id) {
    const sect = document.querySelector(`#${id}`);
    const button = sect.querySelector("button");
    button.onclick = function () { chatManager.ShowCreatedMessage(sect); };
}
