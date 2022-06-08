const form = document.querySelector("form")!;
const robotPhrase = document.querySelector("textarea#phrase") as HTMLTextAreaElement;
const robotType = document.querySelector("select#select-type") as HTMLSelectElement;
const robotName = document.querySelector("input#name") as HTMLInputElement;
const color = document.querySelector("input#color-picker") as HTMLInputElement;
const canTalk = document.querySelector("input#talk") as HTMLInputElement;
const canJump = document.querySelector("input#jump") as HTMLInputElement;
const canBlink = document.querySelector("input#blink") as HTMLInputElement;
const typeError = document.querySelector(".error-type") as HTMLDivElement;
const nameError = document.querySelector(".error-name") as HTMLDivElement;
const phraseError = document.querySelector(".error-phrase") as HTMLDivElement;
robotPhrase.disabled = true;
robotType.value = "";

let robotList: Robot[] = [];


enum Type {
  Male,
  Female,
}


for (let index = 0; index < localStorage.length; index++) {
  const robot = JSON.parse(localStorage.getItem(`slide-${index+1}`) as string);
  if (robot === null) {
    continue;
  }
  const name: string = robot._Name;
  const type: Type = robot._Type;
  const color: string = robot._Color;
  const phrase: string = robot._Phrase;
  const jump: boolean = robot._jump;
  const talk: boolean = robot._talk;
  const blink: boolean = robot._blink;

  const oldRobot = new Robot(name, type, color, phrase, jump, talk, blink);

  robotList.push(oldRobot);

  createRobotSection(name, type, color, phrase, jump, talk, blink);
}



function onCheckboxChange(): void {
  const checkbox = form.querySelector<HTMLInputElement>("input[name='talk']");
  robotPhrase.disabled = !checkbox?.checked;
}

robotName.addEventListener("focusout", error);
robotType.addEventListener("focusout", error);
robotPhrase.addEventListener("focusout", error);

function error(): void {

  nameError.style.display = !robotName.value ? "block" : "none";
  typeError.style.display = !robotType.value ? "block" : "none";
  phraseError.style.display = (canTalk.checked && !robotPhrase.value) ? "block" : "none";

};


function createRobot(event: Event): void {
  typeError.style.display = "none";
  nameError.style.display = "none";
  phraseError.style.display = "none";

  if (robotName.value && robotType.value && color.value && (!canTalk.checked || canTalk.checked && robotPhrase.value)) { 

    let type: Type = robotType.value === "Male" ? Type.Male : Type.Female;

    const robot = new Robot(robotName.value, type, color.value, robotPhrase.value, canJump.checked, canTalk.checked, canBlink.checked);
    robotList.push(robot);
    console.log(robot)
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



