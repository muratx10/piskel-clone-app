const { log } = console;
const Palette = {
  elements: {
    toolsContainer: document.querySelectorAll('.toolsContainer__item'),
    paintBucket: document.getElementById('paintBucket'),
    colorPicker: document.getElementById('colorPicker'),
    pencil: document.getElementById('pencil'),
    currentColor: document.getElementById('input-color'),
    prevColor: document.querySelector('#prevColor .circleColor'),
    canvas: document.getElementById('canvas'),
    ctx: document.getElementById('canvas').getContext('2d'),
  },
  colors: {
    currentColor: '#FF8F00',
    prevColor: '#000000',
    red: '#FF0000',
    blue: '#00BCD4',
  },
  state: {
    activeTool: null,
  },
  init() {
    this.elements.prevColor.style.background = '#000000';
    this.colors.currentColor = this.elements.currentColor.value.toString();
    this.state.activeTool = this.elements.pencil;
    this.elements.pencil.classList.add('active');
    this.elements.canvas.width = 512;
    this.elements.canvas.height = 512;
    this.inputColorPicker();
    this.eventListeners();
  },
  inputColorPicker() {
    this.elements.currentColor.addEventListener('change', (e) => {
      const picker = document.getElementById('input-color');
      let pickerFlag = 0;
      this.colors.prevColor = this.colors.currentColor;
      this.elements.prevColor.style.background = this.colors.currentColor;
      picker.addEventListener('focus', () => { // set currentColor after we close color window to prevent firing CHANGE event many times & every time changing prevColor
        pickerFlag += 1; // this flag is used to check whether color window is closed or not, because in this case FOCUS event fires twice
        if (pickerFlag > 0) {
          this.colors.currentColor = e.target.value;
        }
      });
    });
  },
  colorPicker(e) {
    if (e.target.id === 'canvas' && this.state.activeTool === 'colorPicker') {
      const color = this.elements.ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
      return this.RGBAtoHEX(color.data).toUpperCase();
    }
  },
  fillBucket() {
    const fillImage = this.elements.ctx.createImageData(this.elements.canvas.width, this.elements.canvas.height);
    const currentColor = this.hexToRGBA(this.colors.currentColor);
    for (let i = 0; i < fillImage.data.length; i += 4) {
      // ImageData.data contains one-dimensional array in the RGBA order
      fillImage.data[i] = currentColor[0]; // RED channel
      fillImage.data[i + 1] = currentColor[1]; // GREEN channel
      fillImage.data[i + 2] = currentColor[2]; // BLUE channel
      fillImage.data[i + 3] = 255; // ALPHA channel
    }
    this.elements.ctx.putImageData(fillImage, 0, 0);
  },
  draw() {
    log('drawing...');
  },
  switchTool(e) {
    const elem = e.target.closest('.toolsContainer__item');
    // if()
    if (elem && elem.id) {
      this.state.activeTool = elem.id;
      this.elements.toolsContainer.forEach((el) => {
        el.classList.remove('active');
      });
      document.getElementById(elem.id).classList.add('active');
    }
  },
  hexToRGBA(hexStr) {
    if(hexStr) {
      const hex = hexStr.replace('#', '');
      return [
        parseInt(hex.substr(0, 2), 16),
        parseInt(hex.substr(2, 2), 16),
        parseInt(hex.substr(4, 2), 16),
        255,
      ];
    }
  },
  /**
   * @return {string}
   */
  RGBAtoHEX(RGBA) {
    if (typeof RGBA === 'string') {
      let hex = '#';
      const rgba = RGBA
        .replace('rgb', '')
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .replace(' ', '')
        .split(',');
      rgba.forEach((i) => {
        if (i.length < 3) {
          hex += 0;
        }
        hex += Number(i).toString(16);
      });
      return hex;
    }
    const rgbStr = Array.from(RGBA);
    rgbStr.pop();
    const result = `rgb(${rgbStr.join(',')})`;
    return this.RGBAtoHEX(result);
  },
  eventListeners() {
    window.addEventListener('mousedown', (e) => {
      const canvasElem = e.target.tagName === 'CANVAS';
      this.switchTool(e);
      if (canvasElem) {
        switch (this.state.activeTool) {
          case 'paintBucket': this.fillBucket();
            break;
          case 'colorPicker':
            this.colors.currentColor = this.colorPicker(e);
            log(this.colors.currentColor);
            break;
          case 'pencil':
            this.draw();
            break;
          default: break;
        }
      }
      const targetID = e.target.id;
      switch (targetID) {
        case 'prevColor':
          this.colors.currentColor = this.RGBAtoHEX(this.elements.prevColor.style.background);
          this.elements.currentColor.value = this.RGBAtoHEX(this.elements.prevColor.style.background);
          break;
        case 'red':
          this.colors.currentColor = '#FF0000';
          this.elements.currentColor.value = '#FF0000';
          break;
        case 'blue':
          this.colors.currentColor = '#0b00d4';
          this.elements.currentColor.value = '#0b00d4';
          break;
        default: break;
      }
    });
  },
};

Palette.init();
