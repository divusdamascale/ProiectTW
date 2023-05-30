const spriteElement = document.querySelector('.sprite');
let positionX = 0;
let positionY = 0;
let colCount = 6;
let rowCount = 4;
let width = 96;
let height = 64;
let index = 0;
let interval;

function animateSprite() {
    index++;
    if (index >= colCount * rowCount) {
        index = 0;
    }

    positionX = (index % colCount) * -width;
    positionY = Math.floor(index / colCount) * -height;

    spriteElement.style.backgroundPosition = `${positionX}px ${positionY}px`;
}

function startAnimation() {
    interval = setInterval(animateSprite, 500); // Viteza de 0.5 secunde între cadre
}

function stopAnimation() {
    clearInterval(interval);
}

startAnimation();
