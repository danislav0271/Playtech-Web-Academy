class ChatManager {
    private _Messages: Message[];

    constructor (messages: Message[]){
        this._Messages = messages;
    }

    get Messages() {
        return this._Messages;
    }
    set Messages(messages: Message[]) {
        this._Messages = messages;
    }

    public CreateMessage(message: Message): HTMLDivElement {
        const messageDiv: HTMLDivElement = document.createElement("div");
        messageDiv.className = "message";
          
        const nameP: HTMLParagraphElement = document.createElement("p");
        nameP.className = "name";
        nameP.textContent = message.Name;
        nameP.style.color = message.Color;
        
        const dateP: HTMLParagraphElement = document.createElement("p");
        dateP.className = "date";
        const date = document.createElement("span");
        date.textContent = message.Date[1];
        dateP.textContent = message.Date[0];
        
        dateP.append(date);
        
        const textP: HTMLParagraphElement = document.createElement("p");
        textP.className = "text";
        textP.textContent = message.Text;
       
        messageDiv.appendChild(nameP);
        messageDiv.appendChild(dateP);
        messageDiv.appendChild(textP);
        
        return messageDiv;
    }

    public GetLocalStorageMessages(): void {
        const messagesLocal: any = JSON.parse(<string>localStorage.getItem(`messages`));
        let newMessagesList = this._Messages;

        if (messagesLocal != null) {
            for (let i = 0; i < messagesLocal.length; i++) {
                const name: string = messagesLocal[i]._Name;
                const color: string = messagesLocal[i]._Color;
                const text: string = messagesLocal[i]._Text;
                const date: string[] = messagesLocal[i]._Date;
            
                const message = new Message(name, color, text, [date[0], date[1]]);
                newMessagesList.push(message);
            }
        }

        this._Messages = newMessagesList;
    }

    public ShowAllMessages(messages: Message[]): void {
        let messages1: NodeListOf<HTMLDivElement> = document.querySelectorAll(".messages");
        messages1.forEach((m) => {
          if (m != null) {
            m.innerHTML = "";
          }
        })
    
        
        messages.forEach((message) => {
            let sections: NodeListOf<HTMLDivElement> = document.querySelectorAll(".slide");
          
            for (let index = 1; index < sections.length + 1; index++) {
              const date: string[] = message.Date;
              const hours: number = parseInt(date[0]);
              const day: number = parseInt(date[1]);
              const hoursNow:number = new Date().getHours();
              const today: number = new Date().getDate();
              if (hoursNow - hours >= 5 || today - day >= 1) {
                continue;
              }
        
              const section = document.querySelector(`#slide-${index}`) as HTMLDivElement;
              const messageBox = section.querySelector(".messages") as HTMLDivElement;
        
              const newMessage: HTMLDivElement = this.CreateMessage(message);
          
              messageBox.prepend(newMessage);
          
              messageBox.scrollTop = -messageBox.scrollHeight;
            }
        })
    }

    public ShowLastMessages(): void {
      this.ShowAllMessages(this._Messages);
    }

    public ShowFirstMessages(): void {
      this._Messages.reverse();
      this.ShowAllMessages(this._Messages);
      this._Messages.reverse();
    }

    public ShowCreatedMessage(sect: HTMLDivElement): void {
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
        
        let newMessages = this._Messages;
        
        newMessages.push(message);

        this._Messages = newMessages;
      
        localStorage.setItem("messages", JSON.stringify(this._Messages));
      
        for (let index = 1; index < sections.length + 1; index++) {
          const section = document.querySelector(`#slide-${index}`) as HTMLDivElement;
          const messageBox = section.querySelector(".messages") as HTMLDivElement;
      
          const newMessage: HTMLDivElement = this.CreateMessage(message);
      
          if (newMessage && text.value) {
            messageBox.prepend(newMessage);
      
            messageBox.scrollTop = -messageBox.scrollHeight;
        
            const audio: HTMLAudioElement = new Audio('sounds/chat-sound.mp3');
            audio.play();
          }
          else {
            text.focus();
          }
        }
      
        text.value = "";
    }
}