import FramesColor from '../frames-list/frameColor';

export default class Rectangle {
  constructor(mainCanvas) {
    this.isMouseDown = false;
    this.mainCanvas = mainCanvas;
    this.rectCanvas();
  }

  rectCanvas() {
    let lineWidth;
    let penX;
    let penY;
    let mainCanvasImageURL;
    this.mainCanvas.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;

      const chosenLine = document.querySelector('.chosen-line');
      const line = getComputedStyle(chosenLine).width.slice(0, -2);
      lineWidth = line / 7;

      const canvasWidth = this.mainCanvas.width;
      const realCanvasSize = getComputedStyle(this.mainCanvas).width.slice(0, -2);
      const pixelWidth = realCanvasSize / canvasWidth;

      if (lineWidth <= 1 || (lineWidth > 2 && lineWidth <= 3)) {
        penX = Math.floor(e.offsetX / pixelWidth) + 1 / 2;
        penY = Math.floor(e.offsetY / pixelWidth) + 1 / 2;
      } else {
        penX = Math.floor(e.offsetX / pixelWidth);
        penY = Math.floor(e.offsetY / pixelWidth);
      }

      mainCanvasImageURL = this.mainCanvas.toDataURL('image/png');
    });

    this.mainCanvas.addEventListener('mousemove', (e) => this.rectDraw(e, penX, penY, mainCanvasImageURL, lineWidth));

    this.mainCanvas.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });
  }

  rectDraw(e, penX, penY, mainCanvasImageURL, lineWidth) {
    const ctx = this.mainCanvas.getContext('2d');
    const rectTool = document.getElementById('rectTool');
    if (rectTool.classList.contains('chosen')) {
      const primaryColorInput = document.getElementById('primary-color');
      const primaryColor = primaryColorInput.value;

      ctx.lineWidth = lineWidth;

      if (this.isMouseDown) {
        const canvasWidth = this.mainCanvas.width;
        const realCanvasSize = getComputedStyle(this.mainCanvas).width.slice(0, -2);
        const pixelWidth = realCanvasSize / canvasWidth;

        ctx.clearRect(0, 0, canvasWidth, canvasWidth);

        const img = new Image(640, 640);
        img.src = mainCanvasImageURL;

        ctx.drawImage(img, 0, 0, canvasWidth, canvasWidth);

        ctx.strokeStyle = primaryColor;

        let targetX;
        let targetY;
        if (lineWidth <= 1 || (lineWidth > 2 && lineWidth <= 3)) {
          targetX = Math.floor(e.offsetX / pixelWidth) + 1 / 2;
          targetY = Math.floor(e.offsetY / pixelWidth) + 1 / 2;
        } else {
          targetX = Math.floor(e.offsetX / pixelWidth);
          targetY = Math.floor(e.offsetY / pixelWidth);
        }

        ctx.beginPath();
        ctx.moveTo(penX, penY);
        ctx.lineTo(targetX, penY);
        ctx.lineTo(targetX, targetY);
        ctx.lineTo(penX, targetY);
        ctx.closePath();
        ctx.stroke();

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

    this.mainCanvas.removeEventListener('mousemove', () => this.rectDraw());
  }
}
