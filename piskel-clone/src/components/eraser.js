export default class Eraser {
  constructor(mainCanvas) {
    this.isMouseDown = false;
    this.mainCanvas = mainCanvas;
    this.eraserCanvas();
  }

  eraserCanvas() {
    this.mainCanvas.addEventListener('mousedown', () => {
      this.isMouseDown = true;
    });

    this.mainCanvas.addEventListener('mousemove', (e) => this.eraserDraw(e));

    document.body.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });
  }

  eraserDraw(e) {
    const ctx = this.mainCanvas.getContext('2d');
    const eraserTool = document.getElementById('eraserTool');
    if (eraserTool.classList.contains('chosen')) {
      const chosenLine = document.querySelector('.chosen-line');
      const line = getComputedStyle(chosenLine).width.slice(0, -2);

      if (this.isMouseDown) {
        const canvasWidth = this.mainCanvas.width;
        const realCanvasSize = getComputedStyle(this.mainCanvas).width.slice(0, -2);
        const pixelWidth = realCanvasSize / canvasWidth;
        const penX = Math.floor(e.offsetX / pixelWidth);
        const penY = Math.floor(e.offsetY / pixelWidth);
        ctx.clearRect(penX, penY, line / 7, line / 7);
      }

      ctx.globalCompositeOperation = 'source-over';
      this.mainCanvas.removeEventListener('mousemove', () => this.eraserDraw());
    }
  }
}
