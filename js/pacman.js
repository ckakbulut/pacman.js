class Pacman {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = 3;
        this.nextDirection = 3;
        this.frameCount = 7;
        this.curentFrame = 1;
        //setInterval(() => {
        //this.changeAnimation();
        //}, 100);
    }

    moveProcess() {
        return;
    }
}
