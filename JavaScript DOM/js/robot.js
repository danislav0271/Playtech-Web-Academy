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

form.addEventListener("submit", createRobot);

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

function createRobotSection(){
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

  element.after(clone);

  const buttons = document.querySelector(".buttons");
  buttons.style.display = "inline-block";

  showSlide(currentSlide);
}