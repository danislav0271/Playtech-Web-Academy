function ShowCreatedRobots(event: Event): void {
    const robotsFound = document.querySelector(".robots-found") as HTMLParagraphElement;
    const container = document.querySelector(".robot-table") as HTMLDivElement;
    const oldTables: NodeListOf<HTMLTableElement> = container.querySelectorAll("table");
  
    let newRobotList: Robot[] = robotList;
    if (robotName.value) {
      newRobotList = robotList.filter(robot => robot.Name === robotName.value);
    }
  
    if (newRobotList.length <= 0) {
      robotsFound.textContent = "No robots created yet";
  
      if (oldTables.length >= 1) {
        oldTables[0].remove(); 
      }
  
    }
    else{
  
      if (oldTables.length >= 1) {
        oldTables[0].remove(); 
      }
  
      const robotTable: HTMLTableElement = document.createElement("table");
  
      const trHead: HTMLTableRowElement = document.createElement("tr");
      const thName: HTMLTableCellElement = document.createElement("th");
      thName.textContent = "Name";
      const thType: HTMLTableCellElement = document.createElement("th");
      thType.textContent = "Type";
      const thColor: HTMLTableCellElement = document.createElement("th");
      thColor.textContent = "Color";
      const thOptions: HTMLTableCellElement = document.createElement("th");
      thOptions.textContent = "Options";
  
      trHead.appendChild(thName);
      trHead.appendChild(thType);
      trHead.appendChild(thColor);
      trHead.appendChild(thOptions);
      robotTable.appendChild(trHead);
  
      container.appendChild(robotTable); 
  
  
      robotsFound.textContent = `${newRobotList.length} robots found`;
  
      newRobotList.forEach(item => {
        const tr: HTMLTableRowElement = document.createElement("tr");
  
        const name: HTMLTableCellElement = document.createElement("td");
        const nameLink: HTMLAnchorElement = document.createElement("a");
        nameLink.textContent = item.Name;
        let index: number = robotList.indexOf(item);
        index++;
        nameLink.onclick = function(){ showSlide(index);};
        name.appendChild(nameLink);
  
        const type: HTMLTableCellElement = document.createElement("td");
        type.textContent = item.Type === 0 ? "Male" : "Female";
  
        const color: HTMLTableCellElement = document.createElement("td");
        const colorBlock: HTMLDivElement = document.createElement("div");
        colorBlock.className = "color";
        colorBlock.style.background = `${item.Color}`;
        color.appendChild(colorBlock);
  
        const options: HTMLTableCellElement = document.createElement("td");
        const optionsText: string[] = [];
        if (item.Jump) {
          optionsText.push("can jump");
        }
        if (item.Talk) {
          optionsText.push("can talk");
        }
        if (item.Blink) {
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