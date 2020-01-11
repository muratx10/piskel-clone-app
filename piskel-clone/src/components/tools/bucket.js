import FramesColor from '../frames-list/frameColor';

export default class Bucket {
  constructor(mainCanvas) {
    this.mainCanvas = mainCanvas;
    this.bucketSelect();
  }

  bucketSelect() {
    this.mainCanvas.addEventListener('mousedown', () => this.bucketDraw());
  }

  bucketDraw() {
    const canvasWidth = this.mainCanvas.width;
    const ctx = this.mainCanvas.getContext('2d');
    const bucketTool = document.getElementById('bucketTool');
    if (bucketTool.classList.contains('chosen')) {
      const primaryColorInput = document.getElementById('primary-color');
      const hex = primaryColorInput.value;

      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, canvasWidth, canvasWidth);

      const canvas = document.querySelectorAll('.frame');
      canvas.forEach((item) => {
        if (item.classList.contains('selected-frame')) {
          const ctxFrame = item.getContext('2d');
          ctxFrame.clearRect(0, 0, item.width, item.height);
          new FramesColor(this.mainCanvas, item);
        }
      });
    } else {
      this.mainCanvas.removeEventListener('mousedown', () => this.bucketDraw());
    }
  }
}
