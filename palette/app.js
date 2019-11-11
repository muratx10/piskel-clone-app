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
    currentColor: '#000000',
    prevColor: '#F74141',
    red: '#F74141',
    blue: '#00BCD4',
  },
  state: {
    activeTool: null,

  },
  init() {
    this.elements.prevColor.style.background = '#F74141';
    this.colors.currentColor = this.elements.currentColor.value.toString();
    this.state.activeTool = this.elements.pencil;
    this.pickColor();
    this.eventListeners();
    this.elements.canvas.width = 512;
    this.elements.canvas.height = 512;
  },
  pickColor() {
    this.elements.currentColor.addEventListener('change', (e) => {
      this.colors.prevColor = this.colors.currentColor;
      this.elements.prevColor.style.background = this.colors.currentColor;
      this.colors.currentColor = e.target.value;
    });
  },
  fillBucket() {

  },
  hexToRGBA(hexStr) {
    const hex = hexStr.replace('#', '');
    return [
      parseInt(hex.substr(0, 2), 16),
      parseInt(hex.substr(2, 2), 16),
      parseInt(hex.substr(4, 2), 16),
      255,
    ];
  },
  RGBAtoHEX(RGBA) {
    let hex = '#';
    const rgba = RGBA
      .replace('rgb', '')
      .replace('(', '')
      .replace(')', '')
      .replace(' ', '')
      .replace(' ', '')
      .split(',');
    rgba.forEach((i) => {
      hex += Number(i).toString(16);
    });
    return hex;
  },
  eventListeners() {
    window.addEventListener('mousedown', (e) => {
      if (e.target.closest('.toolsContainer__item')) {
        const elementId = e.target.closest('.toolsContainer__item').id;
        this.state.activeTool = elementId;
        this.elements.toolsContainer.forEach((el) => {
          el.classList.remove('active');
        });
        document.getElementById(elementId).classList.add('active');
      }

      if (e.target.tagName === 'CANVAS' && this.state.activeTool === 'paintBucket') {
        const fillImage = this.elements.ctx.createImageData(this.elements.canvas.width, this.elements.canvas.height);
        const currentColor = this.hexToRGBA(this.colors.currentColor);
        for (let i = 0; i < fillImage.data.length; i += 4) {
          fillImage.data[i + 0] = currentColor[0];
          fillImage.data[i + 1] = currentColor[1];
          fillImage.data[i + 2] = currentColor[2];
          fillImage.data[i + 3] = 255;
        }
        this.elements.ctx.putImageData(fillImage, 0, 0);
      }
      const targetID = e.target.id;
      switch (targetID) {
        case 'prevColor':
          log(this.elements.prevColor.style.background);
          this.colors.currentColor = this.RGBAtoHEX(this.elements.prevColor.style.background);
          this.elements.currentColor.value = this.RGBAtoHEX(this.elements.prevColor.style.background);
          break;
        case 'red':
          this.colors.currentColor = '#d40000';
          this.elements.currentColor.value = '#d40000';
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
