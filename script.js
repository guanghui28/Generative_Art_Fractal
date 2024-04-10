window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //setting
    ctx.strokeStyle = "gold";
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(0,0,0,0.7)";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    //effect
    const size =
        canvas.width < canvas.height
            ? this.canvas.width * 0.25
            : this.canvas.height * 0.25;
    const maxLevel = 4;
    const branches = 2;

    let lineWidth = 15;
    let sides = 5;
    let spread = 0.5;
    let scale = 0.5;
    let color = `hsl(150, 100%, 50%)`;

    function drawBranch(level) {
        if (level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();
        for (let i = 0; i < branches; i++) {
            ctx.save();
            ctx.translate(size - (size / branches) * i, 0);
            ctx.scale(scale, scale);

            ctx.save();
            ctx.rotate(spread);
            drawBranch(level + 1);
            ctx.restore();

            ctx.save();
            ctx.rotate(-spread);
            drawBranch(level + 1);
            ctx.restore();

            ctx.restore();
        }
    }
    function drawFractal() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.translate(canvas.width / 2, canvas.height / 2);

        for (let i = 0; i < sides; i++) {
            drawBranch(0);
            ctx.rotate((Math.PI * 2) / sides);
        }
        ctx.restore();
    }
    drawFractal();

    function randomizeFractal() {
        lineWidth = Math.floor(Math.random() * 20 + 10);
        sides = Math.floor(Math.random() * 7 + 2);
        spread = Math.random() * 2.9 + 0.1;
        scale = Math.random() * 0.2 + 0.4;
        color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
        randomizeButton.style.backgroundColor = color;
    }

    // controls
    const slider_spread = document.getElementById("spread");
    const label_spread = document.querySelector('label[for="spread"]');
    const slider_sides = document.getElementById("sides");
    const label_sides = document.querySelector('label[for="sides"]');

    function updateSliders() {
        slider_spread.value = spread;
        label_spread.textContent = `Spread: ${(1 * spread).toFixed(1)}`;
        slider_sides.value = sides;
        label_sides.textContent = `Sides: ${sides}`;
    }
    function resetFractal() {
        lineWidth = 15;
        sides = 5;
        spread = 0.5;
        scale = 0.5;
        color = `hsl(150, 100%, 50%)`;
        randomizeButton.style.backgroundColor = color;
    }
    slider_spread.addEventListener("change", (e) => {
        spread = e.target.value;
        updateSliders();
        drawFractal();
    });
    slider_sides.addEventListener("change", (e) => {
        sides = e.target.value;
        updateSliders();
        drawFractal();
    });

    resetButton.addEventListener("click", () => {
        resetFractal();
        updateSliders();
        drawFractal();
    });
    randomizeButton.addEventListener("click", () => {
        randomizeFractal();
        updateSliders();
        drawFractal();
    });
});
