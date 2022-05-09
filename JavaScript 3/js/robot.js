const form = document.querySelector("form");
const robotPhrase = form.querySelector("textarea#phrase");
const robotType = form.querySelector("select#select-type");
const robotName = form.querySelector("input#name");
const color = form.querySelector("input#color-picker");
const canTalk = form.querySelector("input#talk");
const canJump = form.querySelector("input#jump");
const canBlink = form.querySelector("input#blink");
const typeError = document.querySelector(".error-type");
const nameError = document.querySelector(".error-name");
const phraseError = document.querySelector(".error-phrase");


robotPhrase.disabled = true;
robotType.value = "";

const robotList = [];

function onCheckboxChange() {
  const checkbox = form.querySelector("input[name='talk']");
  robotPhrase.disabled = !checkbox.checked;
}

robotName.addEventListener("focusout", errorName);
function errorName(event) {
  if (!robotName.value) {
    nameError.style.display = "block";
  }
  else {
    nameError.style.display = "none";
  }
};
robotType.addEventListener("focusout", errorType);
function errorType(event) {
  if (!robotType.value) {
    typeError.style.display = "block";
  }
  else {
    typeError.style.display = "none";
  }
};
robotPhrase.addEventListener("focusout", errorType);
function errorType(event) {
  if (canTalk.checked && !robotPhrase.value) {
    phraseError.style.display = "block";
  }
  else {
    phraseError.style.display = "none";
  }
};


function createRobot(event) {
  typeError.style.display = "none";
  nameError.style.display = "none";
  phraseError.style.display = "none";

  if (robotName.value && robotType.value && color.value && (!canTalk.checked || canTalk.checked && robotPhrase.value)) { 
    const robot = {Name: robotName.value, Type: robotType.value, Color: color.value, Phrase: robotPhrase.value, jump: canJump.checked, talk: canTalk.checked, blink: canBlink.checked};
    robotList.push(robot);

    createRobotSection();

    robotName.value = "";
    robotType.value = "";
    robotPhrase.value = "";
    robotPhrase.disabled = true;
    canJump.checked = false;
    canTalk.checked = false;
    canBlink.checked = false;
    color.value = "#e96126";
  } else {
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

function createRobotSection() {
  const sections = document.querySelectorAll(".factory-section");
  const element = document.querySelector("#slide-1");
  const clone = element.cloneNode(true);

  clone.id = `slide-${sections.length+1}`;

  const newRobot = clone.querySelector(".robot-container");
  newRobot.classList.toggle(robotType.value === "Male" ? "male" : "female");
  if (canJump.checked == true) {
    newRobot.classList.toggle("can-jump");
  }
  if (canTalk.checked == true) {
    newRobot.classList.toggle("can-talk");
  }
  if (canBlink.checked == true) {
    newRobot.classList.toggle("can-blink");
  }
  const newRobotName = newRobot.querySelector(".robot-name").innerHTML = robotName.value;
  const newRobotColor = newRobot.querySelector(".body").style.backgroundColor = color.value;
  const newText = clone.querySelector("h2").innerHTML = `${robotType.value} Robot`;
  const newRobotPhrase = newRobot.querySelector(".bubble").innerHTML = robotPhrase.value;

  clone.classList.add("slide");

  element.before(clone);

  const buttons = document.querySelector(".buttons");
  buttons.style.display = "inline-block";

  GetSection(clone.id);

  showSlide(currentSlide);
}

function GetSection(id) {
  const sect = document.querySelector(`#${id}`);
  const button = sect.querySelector("button");
  button.onclick = function() {ShowCreatedMessage(sect)};
}

let messages = [];

function CreateMessage(sect) {
  const text = sect.querySelector("input");
  const name = sect.querySelector(".robot-name").textContent;
  const color = sect.querySelector(".body").style.backgroundColor;
  const date = Date.now();

  const message = {Name: name, Color: color, Text: text, Date: date};
  messages.push(message);

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  
  const nameP = document.createElement("p");
  nameP.className = "name";
  nameP.textContent = name;
  nameP.style.color = color;

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

  console.log(`${hours}:${minutes}`);

  const textP = document.createElement("p");
  textP.className = "text";
  textP.textContent = text.value;

  messageDiv.appendChild(nameP);
  messageDiv.appendChild(dateP);
  messageDiv.appendChild(textP);

  return messageDiv;

}

function ShowCreatedMessage(sect) {
  let sections = document.querySelectorAll(".slide");

  for (let index = 2; index < sections.length + 2; index++) {
    const section = document.querySelector(`#slide-${index}`);
    const messageBox = section.querySelector(".messages");

    messageBox.append(CreateMessage(sect));

    messageBox.scrollTop = messageBox.scrollHeight;
  }

  const text = sect.querySelector("input").value = "";

}

function ShowCreatedRobots(event) {
  const robotsFound = document.querySelector(".robots-found");
  if (robotList.length <= 0) {
    robotsFound.textContent = "No robots created yet";
  }
  else{
    const container = document.querySelector(".robot-table");
    const oldTables = container.querySelectorAll("table");
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

    let newRobotList = robotList;
    if (robotName.value) {
      newRobotList = robotList.filter(robot => robot.Name == robotName.value);
    }

    robotsFound.textContent = `${newRobotList.length} robots found`;

    newRobotList.forEach(item => {
      const tr = document.createElement("tr");

      const name = document.createElement("td");
      const nameLink = document.createElement("a");
      nameLink.textContent = `${item.Name}`;
      let index = robotList.indexOf(item);
      index++;
      nameLink.onclick = function(){ showSlide(index);};
      name.appendChild(nameLink);

      const type = document.createElement("td");
      type.textContent = `${item.Type}`;

      const color = document.createElement("td");
      const colorBlock = document.createElement("div");
      colorBlock.className = "color";
      colorBlock.style.background = `${item.Color}`;
      color.appendChild(colorBlock);

      const options = document.createElement("td");
      const optionsText = [];
      if (item.jump) {
        optionsText.push("can jump");
      }
      if (item.talk) {
        optionsText.push("can talk");
      }
      if (item.blink) {
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