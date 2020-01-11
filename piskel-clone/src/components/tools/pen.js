import FramesColor from '../frames-list/frameColor';

export default class Pen {
  constructor(mainCanvas) {
    this.isMouseDown = false;
    this.mainCanvas = mainCanvas;
    this.paintingCanvas();
    this.ctx = mainCanvas.getContext('2d');
  }

  paintingCanvas() {
    this.mainCanvas.addEventListener('mousedown', () => {
      this.isMouseDown = true;
    });

    this.mainCanvas.addEventListener('mousemove', (e) => this.penDraw(e));

    this.mainCanvas.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });
  }

  penDraw(e) {
    const penTool = document.getElementById('penTool');
    if (penTool.classList.contains('chosen')) {
      const chosenLine = document.querySelector('.chosen-line');
      const line = getComputedStyle(chosenLine).width.slice(0, -2);
      const primaryColor = document.getElementById('primary-color').value;
      this.ctx.lineWidth = line;

      if (this.isMouseDown) {
        const canvas = document.querySelectorAll('.frame');
        canvas.forEach((item) => {
          if (item.classList.contains('selected-frame')) {
            new FramesColor(this.mainCanvas, item);
          }
        });

        const canvasWidth = this.mainCanvas.width;
        const realCanvasSize = getComputedStyle(this.mainCanvas).width.slice(0, -2);
        const pixelWidth = realCanvasSize / canvasWidth;
        const penX = Math.floor(e.offsetX / pixelWidth);
        const penY = Math.floor(e.offsetY / pixelWidth);
        this.ctx.fillStyle = primaryColor;
        this.ctx.fillRect(penX, penY, line / 7, line / 7);
      }
    }

    this.mainCanvas.removeEventListener('mousemove', () => this.penDraw());
  }
}
