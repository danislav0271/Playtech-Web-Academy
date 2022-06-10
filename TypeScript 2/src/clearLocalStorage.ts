function ClearRobots(): void {
    localStorage.clear();
  
    robotList.splice(0, robotList.length);
    chatManager.Messages = [];
  
    const sections = document.querySelectorAll(".factory-section") as NodeListOf<HTMLDivElement>;
    sections.forEach(section => {
      section.remove();
    })
  
    const buttons = document.querySelector(".buttons") as HTMLDivElement;
    buttons.style.display = "none";
}