import Pen from '../../components/tools/pen';
import Stroke from '../../components/tools/stroke';
import Eraser from '../../components/tools/eraser';
import Rectangle from '../../components/tools/rectangle';
import Circle from '../../components/tools/circle';
import Clear from '../../components/tools/clear';
import Bucket from '../../components/tools/bucket';
import ColorPicker from '../../components/tools/colorPicker';
import Move from '../../components/tools/move';
import FramesAdd from '../../components/frames-list/frameAdd';
import Rotate from '../../components/tools/rotate';
import Keyboard from '../../components/tools/keyboard';
import ExportGIF from '../../components/exportGIF';
import Flip from '../../components/tools/flip';
import MirrorPen from '../../components/tools/mirrorPen';

import wasteBin from './assets/waste-bin.png';
import copyImg from './assets/copy.png';
import rotateColor from './assets/rotate-col.png';


const mainCanvas = document.getElementById('main-canvas');

mainCanvas.width = 64;
mainCanvas.height = 64;

const allFrames = document.querySelectorAll('.frame');
allFrames.forEach((item, i) => {
  allFrames[i].width = 64;
  allFrames[i].height = 64;
});

const primaryColor = document.getElementById('primary-color');
primaryColor.value = '#FEFE00';

export default class SelectTools {
  constructor() {
    this.selectTool();
    this.addOtherFrames();
    this.speedValue();
    this.addFirstFrame();
    new Flip(mainCanvas);
  }

  selectTool() {
    this.showCoords();
    const pen = document.getElementById('penTool');
    const line = document.getElementById('line-3');
    line.classList.add('chosen-line');
    pen.classList.add('chosen');
    const tools = document.getElementById('tools');
    const tool = document.querySelectorAll('.tool');
    const toolImg = document.querySelectorAll('.img-tool');
    tools.addEventListener('click', (e) => {
      toolImg.forEach((item, i) => {
        if (tool[i].classList.contains('chosen')) {
          tool[i].classList.remove('chosen');
        } else if (e.target === item) {
          tool[i].classList.add('chosen');
        }
      });
    });
    this.pen();
    this.stroke();
    this.eraser();
    this.rectangle();
    this.circle();
    this.clear();
    this.bucket();
    this.colorPicker();
    this.move();
    this.mirrorPen();
  }

  pen() {
    const penTool = document.getElementById('penTool');
    mainCanvas.addEventListener('mouseenter', () => {
      if (penTool.classList.contains('chosen')) {
        new Pen(mainCanvas);
      }
    });
  }

  mirrorPen() {
    const mirrorTool = document.getElementById('mirrorTool');
    mainCanvas.addEventListener('mouseenter', () => {
      if (mirrorTool.classList.contains('chosen')) {
        new MirrorPen(mainCanvas);
      }
    });
  }

  stroke() {
    const strokeTool = document.getElementById('strokeTool');
    mainCanvas.addEventListener('mouseenter', () => {
      if (strokeTool.classList.contains('chosen')) {
        new Stroke(mainCanvas);
      }
    });
  }

  eraser() {
    const eraserTool = document.getElementById('eraserTool');
    mainCanvas.addEventListener('mouseenter', () => {
      if (eraserTool.classList.contains('chosen')) {
        new Eraser(mainCanvas);
      }
    });
  }

  rectangle() {
    const rectTool = document.getElementById('rectTool');
    mainCanvas.addEventListener('mouseenter', () => {
      if (rectTool.classList.contains('chosen')) {
        new Rectangle(mainCanvas);
      }
    });
  }

  circle() {
    const circleTool = document.getElementById('circleTool');
    mainCanvas.addEventListener('mouseenter', () => {
      if (circleTool.classList.contains('chosen')) {
        new Circle(mainCanvas);
      }
    });
  }

  clear() {
    const clearTool = document.getElementById('clearTool');
    mainCanvas.addEventListener('mouseenter', () => {
      if (clearTool.classList.contains('chosen')) {
        new Clear(mainCanvas);
      }
    });
  }

  bucket() {
    const bucketTool = document.getElementById('bucketTool');
    mainCanvas.addEventListener('mouseenter', () => {
      if (bucketTool.classList.contains('chosen')) {
        new Bucket(mainCanvas);
      }
    });
  }

  colorPicker() {
    const pipetteTool = document.getElementById('pipetteTool');
    mainCanvas.addEventListener('click', (e) => {
      if (pipetteTool.classList.contains('chosen')) {
        new ColorPicker(e, mainCanvas);
      }
    });
  }

  move() {
    const moveTool = document.getElementById('moveTool');
    mainCanvas.addEventListener('mouseenter', () => {
      if (moveTool.classList.contains('chosen')) {
        new Move(mainCanvas);
      }
    });
  }

  colorRotate() {
    const rotateCol = document.getElementById('rotate-color');
    rotateCol.addEventListener('click', () => {
      const primaryColorInput = document.getElementById('primary-color');
      const secondaryColorInput = document.getElementById('secondary-color');

      const bufferColor = secondaryColorInput.value;
      secondaryColorInput.value = primaryColorInput.value;
      primaryColorInput.value = bufferColor;
    });
  }

  addFirstFrame() {
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('remove').src = wasteBin;
      document.getElementById('copy').src = copyImg;
      const selectedFrame = document.getElementById('frame');
      selectedFrame.classList.add('selected-frame');

      document.getElementById('rotate-color').src = rotateColor;
      this.colorRotate();

      SelectTools.lineWidth();
      new Rotate(mainCanvas);
      new Keyboard();
      new ExportGIF();
    });
  }

  addOtherFrames() {
    const newFrameBtn = document.getElementById('new-frame-button');
    newFrameBtn.addEventListener('click', () => {
      new FramesAdd(mainCanvas);
    }, { once: true });
  }

  showCoords() {
    mainCanvas.addEventListener('mousemove', (e) => {
      const canvasWidth = mainCanvas.width;
      const realCanvasSize = getComputedStyle(mainCanvas).width.slice(0, -2);
      const pixelWidth = realCanvasSize / canvasWidth;
      const penX = Math.floor(e.offsetX / pixelWidth);
      const penY = Math.floor(e.offsetY / pixelWidth);

      const coord = document.getElementById('coord');
      coord.innerHTML = ` ${penX}:${penY}`;
    });

    mainCanvas.addEventListener('mouseleave', () => {
      const coord = document.getElementById('coord');
      coord.innerHTML = ' ';
    });
  }

  speedValue() {
    const speed = document.getElementById('speedAnimation');
    function getSpeedValue() {
      const speedValue = speed.value;
      speed.title = `${speedValue}`;
    }
    document.addEventListener('DOMContentLoaded', getSpeedValue);
    speed.addEventListener('input', getSpeedValue);
  }

  static lineWidth() {
    const lineWidthContainer = document.querySelector('.line-width-wrapper');
    const lineWidths = document.querySelectorAll('.line-width');

    lineWidthContainer.addEventListener('click', (e) => {
      lineWidths.forEach((item) => {
        if (e.target.classList.contains('line-width')) {
          item.classList.remove('chosen-line');
        }
      });
      if (e.target.classList.contains('line-width')) {
        e.target.classList.add('chosen-line');
      }
    });
  }
}
