export default class Pen {
  constructor(mainCanvas) {
    this.isMouseDown = false;
    this.mainCanvas = mainCanvas;
    this.paintingCanvas();
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
    const ctx = this.mainCanvas.getContext('2d');
    const penTool = document.getElementById('penTool');
    if (penTool.classList.contains('chosen')) {
      const chosenLine = document.querySelector('.chosen-line');
      const line = getComputedStyle(chosenLine).width.slice(0, -2);

      const primaryColorInput = document.getElementById('primary-color');
      const primaryColor = primaryColorInput.value;

      ctx.lineWidth = line;

      if (this.isMouseDown) {
        const canvasWidth = this.mainCanvas.width;
        const realCanvasSize = getComputedStyle(this.mainCanvas).width.slice(0, -2);
        const pixelWidth = realCanvasSize / canvasWidth;
        const penX = Math.floor(e.offsetX / pixelWidth);
        const penY = Math.floor(e.offsetY / pixelWidth);
        ctx.fillStyle = primaryColor;
        ctx.fillRect(penX, penY, line / 7, line / 7);
      }
    }

    this.mainCanvas.removeEventListener('mousemove', () => this.penDraw());
  }
}
