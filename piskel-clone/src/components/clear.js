export default class Clear {
  constructor(mainCanvas) {
    this.mainCanvas = mainCanvas;
    this.clearSelect();
  }

  clearSelect() {
    this.mainCanvas.addEventListener('mousedown', () => this.clear());
  }

  clear() {
    const ctx = this.mainCanvas.getContext('2d');
    const canvasWidth = this.mainCanvas.width;
    const clearTool = document.getElementById('clearTool');

    if (clearTool.classList.contains('chosen')) {
      ctx.clearRect(0, 0, canvasWidth, canvasWidth);
    } else {
      this.mainCanvas.removeEventListener('mousedown', () => this.clear());
    }
  }
}
