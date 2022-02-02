const sprites = {
    kid: {
        name: "kid",
        instance: new Image(),
        x: 0,
        y: 0,
        frames: 4
    },

    adult: {
        name: "adult",
        instance: new Image(),
        x: 0,
        y: 0,
        frames: 4
    },

    senior: {
        name: "senior",
        instance: new Image(),
        x: 0,
        y: 0,
        frames: 4
    }
};

sprites.kid.instance.src = "../../img/kid/idle.png";
sprites.adult.instance.src = "../../img/adult/idle.png";
sprites.senior.instance.src = "../../img/senior/idle.png";

export { sprites as default };