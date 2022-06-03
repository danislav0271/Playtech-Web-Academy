"use strict";
const audio = new Audio('sounds/chat-sound.mp3');
let messages = [];
const messagesLocal = JSON.parse(localStorage.getItem(`messages`));
if (messagesLocal != null) {
    for (let i = 0; i < messagesLocal.length; i++) {
        const name = messagesLocal[i]._Name;
        const color = messagesLocal[i]._Color;
        const text = messagesLocal[i]._Text;
        const date = messagesLocal[i]._Date;
        const message = new Message(name, color, text, [date[0], date[1]]);
        messages.push(message);
    }
}
function ShowAllMessages(m) {
    let messages1 = document.querySelectorAll(".messages");
    messages1.forEach((m) => {
        if (m != null) {
            m.innerHTML = "";
        }
    });
    m.forEach((message) => {
        let sections = document.querySelectorAll(".slide");
        for (let index = 1; index < sections.length + 1; index++) {
            const date = message.Date();
            const hours = parseInt(date[0]);
            const day = parseInt(date[1]);
            const hoursNow = new Date().getHours();
            const today = new Date().getDate();
            if (hoursNow - hours >= 5 || today - day >= 1) {
                continue;
            }
            const section = document.querySelector(`#slide-${index}`);
            const messageBox = section.querySelector(".messages");
            const newMessage = CreateMessage(message);
            messageBox.prepend(newMessage);
            messageBox.scrollTop = -messageBox.scrollHeight;
        }
    });
}
window.onload = function () {
    ShowAllMessages(messages);
};
function ShowLastMessages(event) {
    ShowAllMessages(messages);
    event.preventDefault();
}
function ShowFirstMessages(event) {
    messages.reverse();
    ShowAllMessages(messages);
    messages.reverse();
    event.preventDefault();
}
function CreateMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    const nameP = document.createElement("p");
    nameP.className = "name";
    nameP.textContent = message.Name();
    nameP.style.color = message.Color();
    const dateP = document.createElement("p");
    dateP.className = "date";
    const date = document.createElement("span");
    date.textContent = message.Date()[1];
    dateP.textContent = message.Date()[0];
    dateP.append(date);
    const textP = document.createElement("p");
    textP.className = "text";
    textP.textContent = message.Text();
    messageDiv.appendChild(nameP);
    messageDiv.appendChild(dateP);
    messageDiv.appendChild(textP);
    return messageDiv;
}
function ShowCreatedMessage(sect) {
    let sections = document.querySelectorAll(".slide");
    const name = sect.querySelector(".robot-name");
    const text = sect.querySelector("input");
    const color = sect.querySelector(".body");
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const fullDate = `${day}.${month}.${year}`;
    const hoursMinutes = minutes <= 9 ? `${hours}:0${minutes}` : `${hours}:${minutes}`;
    const message = new Message(name.textContent, color.style.backgroundColor, text.value, [hoursMinutes, fullDate]);
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
    for (let index = 1; index < sections.length + 1; index++) {
        const section = document.querySelector(`#slide-${index}`);
        const messageBox = section.querySelector(".messages");
        const newMessage = CreateMessage(message);
        if (newMessage && text.value) {
            messageBox.prepend(newMessage);
            messageBox.scrollTop = -messageBox.scrollHeight;
            audio.play();
        }
        else {
            text.focus();
        }
    }
    text.value = "";
}
