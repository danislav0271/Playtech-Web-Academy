"use strict";
function ShowCreatedRobots(event) {
    const robotsFound = document.querySelector(".robots-found");
    const container = document.querySelector(".robot-table");
    const oldTables = container.querySelectorAll("table");
    let newRobotList = robotList;
    if (robotName.value) {
        newRobotList = robotList.filter(robot => robot.Name === robotName.value);
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
            nameLink.textContent = item.Name;
            let index = robotList.indexOf(item);
            index++;
            nameLink.onclick = function () { showSlide(index); };
            name.appendChild(nameLink);
            const type = document.createElement("td");
            type.textContent = item.Type === 0 ? "Male" : "Female";
            const color = document.createElement("td");
            const colorBlock = document.createElement("div");
            colorBlock.className = "color";
            colorBlock.style.background = `${item.Color}`;
            color.appendChild(colorBlock);
            const options = document.createElement("td");
            const optionsText = [];
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
