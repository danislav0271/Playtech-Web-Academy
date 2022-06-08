function createRobotSection(n:string, type:Type, color:string, phrase:string, jump:boolean, talk:boolean, blink:boolean): void {
    const sections = document.querySelectorAll(".factory-section") as NodeListOf<HTMLDivElement>;
  
    const robotType = type === 0 ? "Male" : "Female"

    const section: HTMLDivElement = document.createElement("div");
    section.className = "factory-section";
    section.classList.add("slide");
    section.id = `slide-${sections.length+1}`;
  
    const header: HTMLHeadingElement = document.createElement("h2");
    header.textContent = `${robotType} Robot`;
  
    const contentWrapper: HTMLDivElement = document.createElement("div");
    contentWrapper.className = "content-wrapper";
  
    const robotContainer: HTMLDivElement = document.createElement("div");
    robotContainer.className = "robot-container";
  
    robotContainer.classList.toggle(robotType === "Male" ? "male" : "female");
    if (jump == true) {
      robotContainer.classList.toggle("can-jump");
    }
    if (talk== true) {
      robotContainer.classList.toggle("can-talk");
    }
    if (blink == true) {
      robotContainer.classList.toggle("can-blink");
    }
  
    const head: HTMLDivElement = document.createElement("div");
    head.className = "head";
    const leftEye: HTMLDivElement = document.createElement("div");
    leftEye.className = "left-eye";
    const rightEye: HTMLDivElement = document.createElement("div");
    rightEye.className = "right-eye";
    const mouth: HTMLDivElement = document.createElement("div");
    mouth.className = "mouth";
    head.appendChild(leftEye);
    head.appendChild(rightEye);
    head.appendChild(mouth);
  
    const leftHand: HTMLDivElement = document.createElement("div");
    leftHand.className = "left-hand";
    const rightHand: HTMLDivElement = document.createElement("div");
    rightHand.className = "right-hand";
  
    const leftLeg: HTMLDivElement = document.createElement("div");
    leftLeg.className = "left-leg";
    const rightLeg: HTMLDivElement = document.createElement("div");
    rightLeg.className = "right-leg";
  
    const body: HTMLDivElement = document.createElement("div");
    body.className = "body";
    body.style.backgroundColor = color;
  
    const name: HTMLDivElement = document.createElement("p");
    name.className = "robot-name";
    name.textContent = n;
  
    const bubble: HTMLDivElement = document.createElement("div");
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
  
    const content: HTMLDivElement = document.createElement("div");
    content.className = "content";
  
    const sendMessage: HTMLDivElement = document.createElement("div");
    sendMessage.className = "send-message";
    const l: HTMLLabelElement = document.createElement("label");
    l.textContent = "Send Message:";
    const i: HTMLInputElement = document.createElement("input");
    i.type = "text";
    i.placeholder = "write message here";
    const b: HTMLButtonElement = document.createElement("button");
    b.innerHTML = "Send";
    sendMessage.appendChild(l);
    sendMessage.appendChild(i);
    sendMessage.appendChild(b);
  
    const receivedMessages: HTMLDivElement = document.createElement("div");
    receivedMessages.className = "received-messages";
    const h: HTMLDivElement = document.createElement("div");
    h.className = "header";
    const p: HTMLParagraphElement = document.createElement("p");
    p.className = "header-last-message";
    p.textContent = "Last messages";
    h.appendChild(p);
    const divMessages: HTMLDivElement = document.createElement("div");
    divMessages.className = "messages";
    receivedMessages.appendChild(h);
    receivedMessages.appendChild(divMessages);

    const b1: HTMLButtonElement = document.createElement("button");
    b1.innerHTML = "Show Last Messages";
    b1.addEventListener("click", ShowLastMessages);

    const b2: HTMLButtonElement = document.createElement("button");
    b2.innerHTML = "Show First Messages";
    b2.addEventListener("click", ShowFirstMessages);

    const buttonContainer: HTMLDivElement = document.createElement("div");
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
  
    const buttons = document.querySelector(".buttons") as HTMLDivElement;
    buttons.style.display = "inline-block";
  
    buttons.before(section);
  
  
    GetSection(section.id);
  
    showSlide(currentSlide = sections.length + 1);

    ShowAllMessages(messages);
  
  }
  
  
  
  function GetSection(id: string): void {
    const sect = document.querySelector(`#${id}`) as HTMLDivElement;
    const button = sect.querySelector("button") as HTMLButtonElement;
    button.onclick = function() {ShowCreatedMessage(sect)};
  }
  
  