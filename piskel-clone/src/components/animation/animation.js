let timerId;

export default class Animation {
  constructor(speedValue) {
    this.speedValue = speedValue;
    this.addEventListeners();
    this.getAnimation();
  }

  addEventListeners() {
    const fullScreen = document.querySelector('.full-screen');
    fullScreen.addEventListener('click', this.getFullScreen);
  }

  getAnimation() {
    clearInterval(timerId);

    const canvasImageURL = [];
    const allFrames = document.querySelectorAll('.frame');

    allFrames.forEach((item) => {
      const anmationImageURL = item.toDataURL('image/png');
      canvasImageURL.push(anmationImageURL);
    });

    const speed = document.getElementById('speedAnimation');
    let count = 0;

    this.speedValue = speed.value;

    timerId = setInterval(() => {
      const animationCanvas = document.querySelector('.animation-canvas');
      const ctx = animationCanvas.getContext('2d');
      ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);

      if (canvasImageURL.length !== 0) {
        const img = new Image(150, 150);
        img.src = canvasImageURL[count];

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, animationCanvas.width, animationCanvas.height);

        count += 1;
        if (count === canvasImageURL.length) {
          count = 0;
        }
      }

      if (canvasImageURL.length === 0) {
        ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
      }
    }, 1000 / this.speedValue);

    // change animation speed by changing speed input value

    speed.addEventListener('input', () => {
      clearInterval(timerId);
      this.speedValue = speed.value;

      timerId = setInterval(() => {
        const animationCanvas = document.querySelector('.animation-canvas');
        const ctx = animationCanvas.getContext('2d');
        ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);

        if (canvasImageURL.length !== 0) {
          const img = new Image(150, 150);
          img.src = canvasImageURL[count];

          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, 0, 0, animationCanvas.width, animationCanvas.height);

          count += 1;
          if (count === canvasImageURL.length) {
            count = 0;
          }
        }

        if (canvasImageURL.length === 0) {
          ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
        }
      }, 1000 / this.speedValue);
    });
  }

  getFullScreen() {
    const animationCanvas = document.querySelector('.animation-canvas');
    animationCanvas.requestFullscreen();
  }
}
