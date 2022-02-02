const playSound = (audio) => {
    return new Promise((resolve) => {
        audio.play();
        audio.onended = resolve;
    });
};

const sounds = {
    experience: new Audio("../../sfx/experience.mp3"),
    level: new Audio("../../sfx/level.mp3"),
    failure: new Audio("../../sfx/failure.mp3")
};

export { sounds, playSound };