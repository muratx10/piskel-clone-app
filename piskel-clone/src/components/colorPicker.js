export default class ColorPicker {
  constructor(e, mainCanvas) {
    this.mainCanvas = mainCanvas;
    this.e = e;
    this.picker();
  }

  picker() {
    const ctx = this.mainCanvas.getContext('2d');
    const primaryColorInput = document.getElementById('primary-color');
    const canvasWidth = this.mainCanvas.width;
    const realCanvasSize = getComputedStyle(this.mainCanvas).width.slice(0, -2);
    const pixelWidth = realCanvasSize / canvasWidth;
    const x = Math.floor(this.e.offsetX / pixelWidth);
    const y = Math.floor(this.e.offsetY / pixelWidth);

    const pixel = ctx.getImageData(x, y, 1, 1);
    const { data } = pixel;

    const firstColorPart = (`0${parseInt(data[0], 10).toString(16)}`).slice(-2);
    const secondColorPart = (`0${parseInt(data[1], 10).toString(16)}`).slice(-2);
    const thirdColorPart = (`0${parseInt(data[2], 10).toString(16)}`).slice(-2);
    const hexMark = '#';

    const b = `${hexMark}${firstColorPart}${secondColorPart}${thirdColorPart}`;

    primaryColorInput.value = b;
  }
}
