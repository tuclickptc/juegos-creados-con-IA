const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

let level = 1;
let score = 0;
let obstacles = [];

function createObstacle(type) {
    const obstacle = {
        x: Math.random() * (canvas.width - 50),
        y: Math.random() * (canvas.height - 50),
        width: type === 'big' ? 60 : 30,
        height: type === 'big' ? 60 : 30,
        type
    };
    obstacles.push(obstacle);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function moveObstacles() {
    const speedFactor = level * 2; // Increase speed with level
    obstacles.forEach(obstacle => {
        obstacle.x += Math.random() * speedFactor - speedFactor / 2; // Move horizontally
        obstacle.y += Math.random() * speedFactor - speedFactor / 2; // Move vertically

        // Wrap around the canvas edges
        if (obstacle.x < 0) obstacle.x = canvas.width;
        if (obstacle.x > canvas.width) obstacle.x = 0;
        if (obstacle.y < 0) obstacle.y = canvas.height;
        if (obstacle.y > canvas.height) obstacle.y = 0;
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillText(`Level: ${level}`, 10, 50);
    ctx.fillText(`Score: ${score}`, 10, 80);

    drawObstacles();
}

function update() {
    score += 1;
    if (score % 100 === 0) {
        level += 1;
    }

    // Create a new obstacle every 50 points
    if (score % 50 === 0) {
        createObstacle();
    }

    moveObstacles();
    draw();
    requestAnimationFrame(update);
}

update();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillText(`Level: ${level}`, 10, 50);
    ctx.fillText(`Score: ${score}`, 10, 80);

    // Add game logic here
}

function update() {
    score += 1;
    if (score % 100 === 0) {
        level += 1;
    }
    draw();
    requestAnimationFrame(update);
}

update();
