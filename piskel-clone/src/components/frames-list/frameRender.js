import Animation from '../animation/animation';

export default class FramesRender {
  constructor(mainCanvas, canvas) {
    this.mainCanvas = mainCanvas;
    this.canvas = canvas;
    this.frameRender();
  }

  // adding a real image to a frame

  frameRender() {
    const ctx = this.canvas.getContext('2d');

    const img = new Image(64, 64);
    const mainCanvasImageURL = this.mainCanvas.toDataURL('image/png');
    img.src = mainCanvasImageURL;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

    const speed = document.getElementById('speedAnimation');
    const speedValue = speed.value;
    new Animation(speedValue);
  }
}
