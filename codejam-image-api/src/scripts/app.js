/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
import { getCity } from './fetch';
import '../styles/styles.scss';

/* eslint-disable prefer-destructuring */
const Palette = {
  elements: {
    toolsContainer: document.querySelectorAll('.toolsContainer__item'),
    paintBucket: document.getElementById('paintBucket'),
    colorPicker: document.getElementById('colorPicker'),
    pencil: document.getElementById('pencil'),
    currentColor: document.getElementById('input-color'),
    prevColor: document.querySelector('#prevColor .circleColor'),
    canvas: document.getElementById('canvas'),
    ctx: document.getElementById('canvas')
      .getContext('2d'),
    searchForm: document.getElementById('searchForm'),
    searchInput: document.querySelector('.form-control'),
    selectedCity: document.querySelector('.selectedCity'),
    grayscaleBtn: document.getElementById('grayscale'),
  },
  colors: {
    currentColor: '#FF8F00',
    prevColor: '#000000',
    red: '#FF0000',
    blue: '#00BCD4',
  },
  state: {
    activeTool: null,
    colorRGBA: [],
    colorHEX: '',
  },
  canvasParams: {
    width: 512,
    height: 512,
    resolution: 512,
  },
  init() {
    // this.elements.ctx.imageSmoothingEnabled = false;
    // if(localStorage.getItem('colors')) {
    //  const colors = JSON.parse(localStorage.getItem('colors'));
    //   {this.colors} = 
    // } else {
    //   this.elements.prevColor.style.background = '#000000';
    //   this.colors.currentColor = this.elements.currentColor.value.toString();
    // }
    this.state.activeTool = this.elements.pencil.id;
    this.elements.pencil.classList.add('active');

    this.elements.canvas.width = this.canvasParams.width;
    this.elements.canvas.height = this.canvasParams.height;

    this.inputColorPicker();
    this.eventListeners();
    if (localStorage.getItem('canvasImg')) {
      // eslint-disable-next-line no-undef
      const img = new Image();
      img.src = localStorage.getItem('canvasImg');
      img.addEventListener('load', () => {
        this.drawImg(img.src);
      });
    } else {
      this.elements.ctx.rect(0, 0, 512, 512);
      this.elements.ctx.fillStyle = '#FFFFFF';
      this.elements.ctx.fill();
    }
  },
  inputColorPicker() {
    this.elements.currentColor.addEventListener('change', (e) => {
      const picker = document.getElementById('input-color');
      let pickerFlag = 0;
      this.colors.prevColor = this.colors.currentColor;
      this.elements.prevColor.style.background = this.colors.currentColor;
      picker.addEventListener('focus', () => {
        // set currentColor after we close color window to prevent
        // firing CHANGE event many times & every time changing prevColor
        // pickerFlag is used to check whether color window is closed or not,
        // because in this case FOCUS event fires twice
        pickerFlag += 1;
        if (pickerFlag > 0) {
          this.colors.currentColor = e.target.value;
          this.state.colorRGBA = this.hexToRGBA(this.colors.currentColor);
        }
      });
    });
  },
  colorPicker(e) {
    const color = this.elements.ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
    if (e.target.id === 'canvas' && this.state.activeTool === 'colorPicker') {
      this.elements.currentColor.value = this.RGBAtoHEX(color.data);
    }
    return this.RGBAtoHEX(color.data)
      .toUpperCase();
  },
  fillBucket() {
    this.elements.grayscaleBtn.removeAttribute('disabled');
    const fillImage = this.elements.ctx.createImageData(
      this.elements.canvas.width,
      this.elements.canvas.height,
    );
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
  drawPencil(e) {
    this.elements.grayscaleBtn.removeAttribute('disabled');
    let size = 1;
    switch (this.elements.canvas.width) {
      case 512:
        size = 1;
        break;
      case 256:
        size = 2;
        break;
      case 128:
        size = 4;
        break;
      default:
        break;
    }
    const coordsX = Math.trunc(e.offsetX) / size;
    const coordsY = Math.trunc(e.offsetY) / size;
    const imgData = this.elements.ctx.createImageData(1, 1);
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i] = this.state.colorRGBA[0];
      imgData.data[i + 1] = this.state.colorRGBA[1];
      imgData.data[i + 2] = this.state.colorRGBA[2];
      imgData.data[i + 3] = 255;
    }
    this.elements.ctx.putImageData(imgData, coordsX, coordsY);
  },
  drawImg(data) {
    // eslint-disable-next-line no-undef
    this.elements.grayscaleBtn.removeAttribute('disabled');
    this.elements.ctx.clearRect(0, 0, this.elements.canvas.width, this.elements.canvas.height);
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = data;
    img.onload = () => {
      if (img.width > img.height) {
        const dWidth = this.elements.canvas.width;
        const dHeight = (dWidth / img.width) * img.height;
        this.elements.ctx.drawImage(img, 0, (this.elements.canvas.height - dHeight) / 2, dWidth, dHeight);
      } else if (img.height > img.width) {
        const dWidth = (this.elements.canvas.width / img.height) * img.width;
        const dHeight = this.elements.canvas.height;
        this.elements.ctx.drawImage(img, (this.elements.canvas.width - dWidth) / 2, 0, dWidth, dHeight);
      } else {
        this.elements.ctx.drawImage(img, 0, 0, this.elements.canvas.width, this.elements.canvas.height);
      }
    };
  },
  grayscale() {
    // eslint-disable-next-line max-len
    const imageData = this.elements.ctx.getImageData(0, 0, this.elements.canvas.width, this.elements.canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    this.elements.ctx.putImageData(imageData, 0, 0);
  },
  switchTool(e, toolName) {
    const elem = e.target.closest('.toolsContainer__item');
    switch (e.type) {
      case 'mousedown':
        if (elem && this.state.activeTool !== elem.id) {
          if (elem.id) {
            this.state.activeTool = elem.id;
            this.elements.toolsContainer.forEach((el) => {
              el.classList.remove('active');
            });
            document.getElementById(elem.id)
              .classList
              .add('active');
          }
        }
        break;
      case 'keydown':
        this.elements.toolsContainer.forEach((el) => {
          el.classList.remove('active');
        });
        this.state.activeTool = toolName;
        document.getElementById(toolName)
          .classList
          .add('active');
        break;
      default:
        break;
    }
  },
  hexToRGBA(hexStr) {
    let result = [];
    if (hexStr) {
      const hex = hexStr.replace('#', '');
      result = [
        parseInt(hex.substr(0, 2), 16),
        parseInt(hex.substr(2, 2), 16),
        parseInt(hex.substr(4, 2), 16),
        255,
      ];
      this.state.colorRGBA = result;
    }
    return result;
  },
  /**
   * @return {string}
   */
  RGBAtoHEX(RGBA) {
    if (typeof RGBA === 'string') {
      let hex = '#';
      const rgba = RGBA.replace('rgb', '')
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .replace(' ', '')
        .split(',');
      rgba.forEach((i) => {
        if (i < 16) {
          hex += 0;
        }
        hex += Number(i)
          .toString(16);
      });
      this.state.colorHEX = hex;
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
      if (e.target.classList.contains('sideBar__item')) {
        this.canvasParams.resolution = e.target.children[0].value;
        this.elements.canvas.width = this.canvasParams.resolution;
        this.elements.canvas.height = this.canvasParams.resolution;
        this.canvasParams.width = this.canvasParams.resolution;
        this.canvasParams.height = this.canvasParams.resolution;
        if (localStorage.getItem('img')) {
          this.drawImg(localStorage.getItem('img'));
        } else if (localStorage.getItem('canvasImg')) {
          this.drawImg(localStorage.getItem('canvasImg'));
        }
      }
      if (canvasElem) {
        switch (this.state.activeTool) {
          case 'paintBucket':
            this.fillBucket();
            break;
          case 'colorPicker':
            this.colors.currentColor = this.colorPicker(e);
            this.state.colorRGBA = this.hexToRGBA(this.colors.currentColor);
            console.log(this.state);
            break;
          case 'pencil':
            this.drawPencil(e);
            this.state.mousedown = true;
            break;
          default:
            break;
        }
      }
      const targetID = e.target.id;
      switch (targetID) {
        case 'prevColor':
          this.colors.currentColor = this.RGBAtoHEX(
            this.elements.prevColor.style.background,
          );
          this.elements.currentColor.value = this.RGBAtoHEX(
            this.elements.prevColor.style.background,
          );
          this.state.colorRGBA = this.hexToRGBA(this.colors.currentColor);
          break;
        case 'red':
          this.colors.currentColor = '#FF0000';
          this.state.colorRGBA = this.hexToRGBA(this.colors.currentColor);
          this.elements.currentColor.value = '#FF0000';
          break;
        case 'blue':
          this.colors.currentColor = '#0b00d4';
          this.state.colorRGBA = this.hexToRGBA(this.colors.currentColor);
          this.elements.currentColor.value = '#0b00d4';
          break;
        case 'grayscale':
          if (localStorage.getItem('img')) {
            this.grayscale();
            this.elements.grayscaleBtn.setAttribute('disabled', 'true');
          } else if (!localStorage.getItem('img')) {
            // eslint-disable-next-line no-alert
            alert('There is no image to grayscale');
          }
          break;
        default:
          break;
      }
    });
    window.addEventListener('mousemove', (e) => {
      if (this.state.mousedown) {
        this.drawPencil(e);
      }
    });
    window.addEventListener('mouseup', () => {
      this.state.mousedown = false;
    });
    window.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'KeyB':
          this.switchTool(e, 'paintBucket');
          break;
        case 'KeyP':
          this.switchTool(e, 'pencil');
          break;
        case 'KeyC':
          this.switchTool(e, 'colorPicker');
          break;
        default:
          break;
      }
    });
    this.elements.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.state.currentSearchText = this.elements.searchInput.value;
      console.log(this.elements.canvas.width, this.elements.canvas.height);
      getCity(this.state.currentSearchText)
        .then(response => {
          localStorage.setItem('img', response.urls.small);
          this.drawImg(response.urls.small);
          if (response.location.name !== null) {
            this.elements.selectedCity.textContent = response.location.name;
          } else {
            this.elements.selectedCity.textContent = response.alt_description;
          }
        })
        .catch(error => console.log(error));
      this.elements.searchForm.reset();
    });
  },
};

Palette.init();
window.addEventListener('beforeunload', () => {
  const canvasImg = Palette.elements.canvas;
  localStorage.setItem('canvasImg', canvasImg.toDataURL());
  localStorage.removeItem('img');
  const state = {
    activeTool: Palette.state.activeTool,
    colorRGBA: Palette.state.colorRGBA,
    colorHEX: Palette.state.colorHEX,
  };
  const canvasParams = {
    width: Palette.canvasParams.width,
    height: Palette.canvasParams.height,
    resolution: Palette.canvasParams.resolution,
  };
  const colors = {
    currentColor: Palette.colors.currentColor,
    prevColor: Palette.colors.prevColor,
    red: Palette.colors.red,
    blue: Palette.colors.blue,
  };
  localStorage.setItem('state', JSON.stringify(state));
  localStorage.setItem('canvasParams', JSON.stringify(canvasParams));
  localStorage.setItem('colors', JSON.stringify(colors));
});
