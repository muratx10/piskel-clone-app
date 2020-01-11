import FramesColor from '../frames-list/frameColor';

export default class Flip {
  constructor(mainCanvas) {
    this.mainCanvas = mainCanvas;
    this.flipSelect();
  }

  flipSelect() {
    const reflectTool = document.getElementById('flipTool');
    reflectTool.addEventListener('mousedown', () => this.drawFlip());
  }

  drawFlip() {
    const ctx = this.mainCanvas.getContext('2d');
    let mainCanvasImageURL = this.mainCanvas.toDataURL('image/png');
    const img = new Image(640, 640);
    img.src = mainCanvasImageURL;

    ctx.save();
    ctx.clearRect(0, 0, this.mainCanvas.height, this.mainCanvas.height);
    ctx.scale(-1, 1);
    // eslint-disable-next-line max-len
    ctx.drawImage(img, this.mainCanvas.width * (-1), 0, this.mainCanvas.width, this.mainCanvas.height);
    ctx.restore();
    const canvas = document.querySelectorAll('.frame');
    canvas.forEach((item) => {
      if (item.classList.contains('selected-frame')) {
        const ctxFrame = item.getContext('2d');
        ctxFrame.clearRect(0, 0, item.width, item.height);
        new FramesColor(this.mainCanvas, item);
      }
    });

    mainCanvasImageURL = this.mainCanvas.toDataURL('image/png');
    img.src = mainCanvasImageURL;
  }
}
