const audio = new Audio('sounds/chat-sound.mp3');

let messages: Message[] = [];

const messagesLocal = JSON.parse(localStorage.getItem(`messages`) as string);
if (messagesLocal != null) {
  for (let i = 0; i < messagesLocal.length; i++) {
    const name: string = messagesLocal[i]._Name;
    const color: string = messagesLocal[i]._Color;
    const text: string = messagesLocal[i]._Text;
    const date: string[] = messagesLocal[i]._Date;
  
    const message = new Message(name, color, text, [date[0], date[1]]);
    messages.push(message);
  }
}

function ShowAllMessages(m: Message[]) {
    let messages1 = document.querySelector(".messages") as HTMLDivElement;
    if (messages1 != null) {
        messages1.innerHTML = "";
    }
    
    m.forEach((message) => {
        let sections = document.querySelectorAll(".slide");
      
        for (let index = 1; index < sections.length + 1; index++) {
          const date: string[] = message.Date();
          const hours: number = parseInt(date[0]);
          const day: number = parseInt(date[1]);
          const hoursNow:number = new Date().getHours();
          const today: number = new Date().getDate();
          if (hoursNow - hours >= 5 || today - day >= 1) {
            continue;
          }
    
          const section = document.querySelector(`#slide-${index}`) as HTMLDivElement;
          const messageBox = section.querySelector(".messages") as HTMLDivElement;
    
          const newMessage = CreateMessage(message);
      
          messageBox.prepend(newMessage);
      
          messageBox.scrollTop = -messageBox.scrollHeight;
        }
    })
}

window.onload = function() {
    ShowAllMessages(messages);
}

function ShowLastMessages(event: Event) {
    ShowAllMessages(messages);
    event.preventDefault();
}
function ShowFirstMessages(event: Event) {
    let reversedMessages: Message[] = messages.reverse();
    ShowAllMessages(reversedMessages);
    messages.reverse();
    event.preventDefault();
}


function CreateMessage(message: Message) {

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
  
  function ShowCreatedMessage(sect: HTMLDivElement) {
    let sections = document.querySelectorAll(".slide");
    const name = sect.querySelector(".robot-name") as HTMLParagraphElement;
    const text = sect.querySelector("input") as HTMLInputElement;
    const color = sect.querySelector(".body") as HTMLDivElement;
    const hours: number = new Date().getHours();
    const minutes: number = new Date().getMinutes();
    const day: number = new Date().getDate();
    const month: number = new Date().getMonth();
    const year: number = new Date().getFullYear();
    const fullDate: string = `${day}.${month}.${year}`;
    const hoursMinutes: string = minutes <= 9 ? `${hours}:0${minutes}` : `${hours}:${minutes}`;
  
    const message = new Message(name.textContent, color.style.backgroundColor, text.value, [hoursMinutes, fullDate]);
  
    messages.push(message);
  
    localStorage.setItem("messages", JSON.stringify(messages));
  
    for (let index = 1; index < sections.length + 1; index++) {
      const section = document.querySelector(`#slide-${index}`) as HTMLDivElement;
      const messageBox = section.querySelector(".messages") as HTMLDivElement;
  
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