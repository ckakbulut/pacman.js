class Ghost {
    constructor(
        x,
        y,
        width,
        height,
        speed,
        imageX,
        imageY,
        imageWidth,
        imageHeight,
        range
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.imageX = imageX;
        this.imageY = imageY;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.range = range; // The range of movement for the ghost
        this.randomTargetIndex = parseInt(Math.random() * 4);
        //this.target = randomTargetsForGhosts[this.randomTargetIndex];
        setInterval(() => {
            this.changeRandomDirection();
        }, 1000);
    }

    isInRange() {
        let xDistance = Math.abs(pacmanFrames.getMapX() - this.getMapX());
        let yDistance = Math.abs(pacmanFrames.getMapY() - this.getMapY());
        if (
            Math.sqrt(xDistance * xDistance + yDistance * yDistance) <=
            this.range
        ) {
            return true;
        }
        return false;
    }

    changeRandomDirection() {
        let addition = 1;
        this.randomTargetIndex += addition;
        this.randomTargetIndex = this.randomTargetINdex % 4;
    }

    moveProcess() {
        if (this.isInRange()) {
            this.target = pacman;
        } else {
            this.target = randomTargetsForGhosts[this.randomTargetIndex];
        }
        this.changeDirectionIfPossible();
        this.moveForward();
        if (this.checkWallCollision()) {
            this.moveBackward();
            return;
        }
    }

    moveForward() {
        switch (this.direction) {
            case 0: // UP
                this.y -= this.speed;
                break;
            case 1: // DOWN
                this.y += this.speed;
                break;
            case 2: // LEFT
                this.x -= this.speed;
                break;
            case 3: // RIGHT
                this.x += this.speed;
                break;
        }
    }

    moveBackward() {
        switch (this.direction) {
            case 0: // UP
                this.y += this.speed;
                break;
            case 1: // DOWN
                this.y -= this.speed;
                break;
            case 2: // LEFT
                this.x += this.speed;
                break;
            case 3: // RIGHT
                this.x -= this.speed;
                break;
        }
    }

    checkWallCollision() {
        let isCollided = false;
        if (
            map[parseInt(this.y / oneBlockSize)][
                parseInt(this.x / oneBlockSize)
            ] === 1 ||
            map[parseInt(this.y / oneBlockSize)][
                parseInt((this.x + this.width) / oneBlockSize)
            ] === 1 ||
            map[parseInt((this.y + this.height) / oneBlockSize)][
                parseInt(this.x / oneBlockSize)
            ] === 1 ||
            map[parseInt((this.y + this.height) / oneBlockSize)][
                parseInt((this.x + this.width) / oneBlockSize)
            ] === 1
        ) {
            isCollided = true;
        }
        return isCollided;
    }

    changeDirectionIfPossible() {}

    draw() {
        canvasContext.save();
        canvasContext.drawImage(
            ghostFrames,
            this.imageX,
            this.imageY,
            this.imageWidth,
            this.imageHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
        canvasContext.restore();
        canvasContext.beginPath();
        canvasContext.strokeStyle = "red";
        canvasContext.arc(
            this.x + oneBlockSize / 2,
            this.y + oneBlockSize / 2,
            this.range * oneBlockSize,
            0,
            Math.PI * 2
        );
        canvasContext.stroke();
    }
}

const updateGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].moveProcess();
    }
};

const drawGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].draw();
    }
};
