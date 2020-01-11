import FramesColor from '../frames-list/frameColor';

export default class Move {
  constructor(mainCanvas) {
    this.isMouseDown = false;
    this.mainCanvas = mainCanvas;
    this.moveCanvas();
  }

  moveCanvas() {
    let penX;
    let penY;
    let mainCanvasImageURL;
    this.mainCanvas.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;

      const canvasWidth = this.mainCanvas.width;
      const realCanvasSize = getComputedStyle(this.mainCanvas).width.slice(0, -2);
      const pixelWidth = realCanvasSize / canvasWidth;
      penX = Math.floor(e.offsetX / pixelWidth);
      penY = Math.floor(e.offsetY / pixelWidth);

      mainCanvasImageURL = this.mainCanvas.toDataURL('image/png');
    });

    this.mainCanvas.addEventListener('mousemove', (e) => this.moveDo(e, penX, penY, mainCanvasImageURL));

    document.body.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });
  }

  moveDo(e, penX, penY, mainCanvasImageURL) {
    let lineWidth;
    const ctx = this.mainCanvas.getContext('2d');
    const moveTool = document.getElementById('moveTool');
    if (!moveTool.classList.contains('chosen')) {
      this.mainCanvas.removeEventListener('mousemove', () => this.moveDo());
    }

    ctx.lineWidth = lineWidth;

    if (this.isMouseDown) {
      const canvasWidth = this.mainCanvas.width;
      const realCanvasSize = getComputedStyle(this.mainCanvas).width.slice(0, -2);
      const pixelWidth = realCanvasSize / canvasWidth;

      const img = new Image(640, 640);
      img.src = mainCanvasImageURL;

      const targetX = Math.floor(e.offsetX / pixelWidth);
      const targetY = Math.floor(e.offsetY / pixelWidth);

      const dx = targetX - penX;
      const dy = targetY - penY;

      ctx.clearRect(0, 0, canvasWidth, canvasWidth);
      ctx.drawImage(img, dx, dy, canvasWidth, canvasWidth);

      const canvas = document.querySelectorAll('.frame');
      canvas.forEach((item) => {
        if (item.classList.contains('selected-frame')) {
          const ctxFrame = item.getContext('2d');
          ctxFrame.clearRect(0, 0, item.width, item.height);
          new FramesColor(this.mainCanvas, item);
        }
      });
    }
  }
}
