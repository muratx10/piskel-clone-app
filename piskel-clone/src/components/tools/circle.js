import FramesRender from '../frames-list/frameRender';

export default class Circle {
  constructor(mainCanvas) {
    this.mainCanvas = mainCanvas;
    this.isMouseDown = false;
    this.circleCanvas();
  }

  circleCanvas() {
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
      penX = Math.floor(e.offsetX / pixelWidth);
      penY = Math.floor(e.offsetY / pixelWidth);

      mainCanvasImageURL = this.mainCanvas.toDataURL('image/png');
    });

    this.mainCanvas.addEventListener('mousemove', (e) => this.circleDraw(e, lineWidth, penX, penY, mainCanvasImageURL));

    document.body.addEventListener('mouseup', () => {
      this.isMouseDown = false;

      const canvas = document.querySelectorAll('.frame');
      canvas.forEach((item) => {
        if (item.classList.contains('selected-frame')) {
          new FramesRender(this.mainCanvas, item);
        }
      });
    });
  }

  circleDraw(e, lineWidth, penX, penY, mainCanvasImageURL) {
    const ctx = this.mainCanvas.getContext('2d');
    const circleTool = document.getElementById('circleTool');
    if (circleTool.classList.contains('chosen')) {
      const primaryColorInput = document.getElementById('primary-color');
      const primaryColor = primaryColorInput.value;

      ctx.lineWidth = lineWidth;
      ctx.imageSmoothingEnabled = false;

      if (this.isMouseDown) {
        const canvasWidth = this.mainCanvas.width;
        const realCanvasSize = getComputedStyle(this.mainCanvas).width.slice(0, -2);
        const pixelWidth = realCanvasSize / canvasWidth;

        ctx.clearRect(0, 0, canvasWidth, canvasWidth);

        const img = new Image(640, 640);
        img.src = mainCanvasImageURL;

        ctx.drawImage(img, 0, 0, canvasWidth, canvasWidth);

        ctx.strokeStyle = primaryColor;

        const targetX = Math.floor(e.offsetX / pixelWidth);
        const targetY = Math.floor(e.offsetY / pixelWidth);

        let x;
        let y;
        if (penX > targetX) {
          x = Math.floor(penX + ((targetX - penX) / 2));
        }
        if (penX < targetX) {
          x = Math.floor(penX - ((penX - targetX) / 2));
        }

        if (penY > targetY) {
          y = Math.floor(penY + ((targetY - penY) / 2));
        }
        if (penY < targetY) {
          y = Math.floor(penY - ((penY - targetY) / 2));
        }

        const a = Math.floor(Math.abs(targetX - penX) / 2);
        const b = Math.floor(Math.abs(targetY - penY) / 2);

        ctx.save();
        ctx.beginPath();

        ctx.translate(x, y);

        ctx.scale(a / b, 1);

        ctx.arc(0, 0, b, 0, Math.PI * 2, true);

        ctx.restore();

        ctx.closePath();
        ctx.stroke();
      }
    }
    this.mainCanvas.removeEventListener('mousemove', () => this.circleDraw());
  }
}
