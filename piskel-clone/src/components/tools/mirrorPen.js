import FramesRender from '../frames-list/frameRender';

export default class MirrorPen {
  constructor(mainCanvas) {
    this.isMouseDown = false;
    this.mainCanvas = mainCanvas;
    this.mirrorCanvas();
  }

  mirrorCanvas() {
    this.mainCanvas.addEventListener('mousedown', () => {
      this.isMouseDown = true;
    });

    this.mainCanvas.addEventListener('mousemove', (e) => this.mirrorDraw(e));

    this.mainCanvas.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });
  }

  mirrorDraw(e) {
    const ctx = this.mainCanvas.getContext('2d');
    const mirrorTool = document.getElementById('mirrorTool');
    if (mirrorTool.classList.contains('chosen')) {
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
        const penZ = canvasWidth - penX - (line / 7);

        ctx.fillStyle = primaryColor;
        ctx.fillRect(penX, penY, line / 7, line / 7);

        ctx.fillStyle = primaryColor;
        ctx.fillRect(penZ, penY, line / 7, line / 7);

        const canvas = document.querySelectorAll('.frame');
        canvas.forEach((item) => {
          if (item.classList.contains('selected-frame')) {
            new FramesRender(this.mainCanvas, item);
          }
        });
      }
    }

    this.mainCanvas.removeEventListener('mousemove', () => this.mirrorDraw());
  }
}
