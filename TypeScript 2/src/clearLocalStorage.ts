function ClearRobots() {
    localStorage.clear();
  
    robotList.splice(0, robotList.length);
    messages.splice(0, messages.length);
  
    const sections = document.querySelectorAll(".factory-section") as NodeListOf<HTMLDivElement>;
    sections.forEach(section => {
      section.remove();
    })
  
    const buttons = document.querySelector(".buttons") as HTMLDivElement;
    buttons.style.display = "none";
}