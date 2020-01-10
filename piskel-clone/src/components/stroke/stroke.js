export default class Stroke {
  constructor(mainCanvas) {
    this.isMouseDown = false;
    this.mainCanvas = mainCanvas;
    this.strokeCanvas();
  }

  brezLine(positionX, positionY, targetX, targetY) {
    const chosenLine = document.querySelector('.chosen-line');
    const line = getComputedStyle(chosenLine).width.slice(0, -2);
    const lineWidth = line / 7;
    let dx = targetX - positionX;
    let dy = targetY - positionY;
    const sx = (dx > 0) - (dx < 0);
    const sy = (dy > 0) - (dy < 0);
    dx *= sx; dy *= sy;

    const primaryColorInput = document.getElementById('primary-color');
    const primaryColor = primaryColorInput.value;

    const ctx = this.mainCanvas.getContext('2d');
    ctx.fillStyle = primaryColor;
    ctx.fillRect(positionX, positionY, lineWidth, lineWidth);
    if (!(dx || dy)) return;
    let d = 0;
    let x = positionX;
    let y = positionY;
    let v;
    if (dy < dx) {
      for (v = 0 || (dy << 15) / dx * sy; x ^ targetX; x += sx, d &= 32767) {
        ctx.fillRect(x, y += (d += v) >> 15, lineWidth, lineWidth);
      }
    } else {
      for (v = 0 || (dx << 15) / dy * sx; y ^ targetY; y += sy, d &= 32767) {
        ctx.fillRect(x += (d += v) >> 15, y, lineWidth, lineWidth);
      }
    }
  }

  strokeCanvas() {
    let mainCanvasImageURL;
    let positionX;
    let positionY;

    this.mainCanvas.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
      const canvasWidth = this.mainCanvas.width;
      const realCanvasSize = getComputedStyle(this.mainCanvas).width.slice(0, -2);
      const pixelWidth = realCanvasSize / canvasWidth;
      positionX = Math.floor(e.offsetX / pixelWidth);
      positionY = Math.floor(e.offsetY / pixelWidth);

      mainCanvasImageURL = this.mainCanvas.toDataURL('image/png');
    });

    this.mainCanvas.addEventListener('mousemove', e => this.drawStroke(e, positionX, positionY, mainCanvasImageURL));

    document.body.addEventListener('mouseup', () => {
      this.isMouseDown = false;
      const ctx = this.mainCanvas.getContext('2d');
      ctx.beginPath();
    });
  }

  drawStroke(e, positionX, positionY, mainCanvasImageURL) {
    const strokeTool = document.getElementById('strokeTool');
    if (strokeTool.classList.contains('chosen')) {
      if (this.isMouseDown) {
        const canvasWidth = this.mainCanvas.width;
        const realCanvasSize = getComputedStyle(this.mainCanvas).width.slice(0, -2);
        const pixelWidth = realCanvasSize / canvasWidth;

        const ctx = this.mainCanvas.getContext('2d');
        ctx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        const img = new Image(640, 640);
        img.src = mainCanvasImageURL;

        ctx.drawImage(img, 0, 0, canvasWidth, canvasWidth);

        const targetX = Math.floor(e.offsetX / pixelWidth);
        const targetY = Math.floor(e.offsetY / pixelWidth);

        this.brezLine(positionX, positionY, targetX, targetY);
      }
    }

    this.mainCanvas.removeEventListener('mousemove', () => this.drawStroke());
  }
}
