import sprites from "./sprites";
import { sounds, playSound } from "./sounds";
import queue from "./utils";

const experienceButton = document.getElementById("experience");
const levelButton = document.getElementById("level");
const dump = document.getElementById("dump");

const canvas = document.getElementById("mascot");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

class Hero {
    constructor() {
        this.level = 1;
        this.experience = 0;
        this.threshold = 5;
        this.current = sprites.kid;
        this.size = {
            width: this.current.instance.naturalWidth / 4,
            height: this.current.instance.naturalHeight / 1
        };
        this.position = { x: 0, y: 0 };
        this.stagger = 10;
        this.tick = 0;
    }

    draw = () => {
        context.drawImage(
            this.current.instance,
            this.current.x * this.size.width,
            this.current.y * this.size.height,
            this.size.width,
            this.size.height,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );

        if (this.level >= 3) {
            this.level = "MAX";
            this.experience = "MAX";
            this.threshold = "MAX";
        }

        dump.innerHTML = `Level: ${ hero.level } | Experience: ${ hero.experience } | Threshold: ${ hero.threshold }`;
    };

    update = () => {
        if (this.tick % this.stagger === 0) {
            this.current.x += 1;

            if (this.current.x >= this.current.frames) {
                this.current.x = 0;
            }
        }

        this.tick += 1;
        this.draw();
    };

    feed = async () => {
        if (this.level === "MAX") {
            await playSound(sounds.failure);
            return;
        }

        this.experience += 1;

        if (this.experience >= this.threshold) {
            await this.levelUp();
            return;
        }

        await playSound(sounds.experience);
    };

    levelUp = async () => {
        if (this.level === "MAX") {
            await playSound(sounds.failure);
            return;
        }

        if (this.current.name === "kid") {
            this.current = sprites.adult;
        } else if (this.current.name === "adult") {
            this.current = sprites.senior;
        }

        this.level += 1;
        this.experience = 0;
        this.threshold = this.level * 5;

        await playSound(sounds.level);
    };
}

const hero = new Hero();

const loop = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    hero.update();
    requestAnimationFrame(loop);
};

loop();

experienceButton.addEventListener("click", () => {
    queue.enqueue(hero.feed);
});

levelButton.addEventListener("click", () => {
    queue.enqueue(hero.levelUp);
});