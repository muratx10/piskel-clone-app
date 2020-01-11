import FramesRender from '../frames-list/frameRender';

export default class Rotate {
  constructor(mainCanvas) {
    this.mainCanvas = mainCanvas;
    this.rotateSelect();
  }

  rotateSelect() {
    const rotateTool = document.getElementById('rotateTool');
    rotateTool.addEventListener('mousedown', () => this.drawRotate());
  }

  drawRotate() {
    const ctx = this.mainCanvas.getContext('2d');
    let mainCanvasImageURL = this.mainCanvas.toDataURL('image/png');
    const img = new Image(640, 640);
    img.src = mainCanvasImageURL;

    ctx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    ctx.save();
    ctx.translate(this.mainCanvas.width / 2, this.mainCanvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.drawImage(img, -this.mainCanvas.width / 2, -this.mainCanvas.height / 2);
    ctx.restore();

    mainCanvasImageURL = this.mainCanvas.toDataURL('image/png');
    img.src = mainCanvasImageURL;

    const canvas = document.querySelectorAll('.frame');
    canvas.forEach((item) => {
      if (item.classList.contains('selected-frame')) {
        const ctxFrame = item.getContext('2d');
        ctxFrame.clearRect(0, 0, item.width, item.height);
        new FramesRender(this.mainCanvas, item);
      }
    });
  }
}
