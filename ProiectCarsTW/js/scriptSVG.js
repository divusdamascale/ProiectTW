const svg = document.getElementById("mySvg");
const xmlns = "http://www.w3.org/2000/svg";
const centerX = 40;
const centerY = 25;
const radius = 20;
const wheelThickness = 7;
const spokeCount = 8;

function drawWheel() {
  svg.innerHTML = "";

  // Desenarea roții
  const wheel = document.createElementNS(xmlns, "circle");
  wheel.setAttribute("cx", centerX);
  wheel.setAttribute("cy", centerY);
  wheel.setAttribute("r", radius);
  wheel.setAttribute("stroke", "limegreen");
  wheel.setAttribute("stroke-width", wheelThickness);
  wheel.setAttribute("fill", "none");
  svg.appendChild(wheel);

  // Desenarea spițelor
  const angle = (2 * Math.PI) / spokeCount;
  for (let i = 0; i < spokeCount; i++) {
    const spokeX = centerX + Math.cos(i * angle) * radius;
    const spokeY = centerY + Math.sin(i * angle) * radius;

    const spoke = document.createElementNS(xmlns, "line");
    spoke.setAttribute("x1", centerX);
    spoke.setAttribute("y1", centerY);
    spoke.setAttribute("x2", spokeX);
    spoke.setAttribute("y2", spokeY);
    spoke.setAttribute("stroke", "limegreen");
    spoke.setAttribute("stroke-width", 3);
    svg.appendChild(spoke);
  }
}

drawWheel();