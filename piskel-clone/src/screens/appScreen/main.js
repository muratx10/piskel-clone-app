import Pen from '../../components/pen';
import Stroke from '../../components/stroke';
import Eraser from '../../components/eraser';
import Rectangle from '../../components/rectangle';
import Circle from '../../components/circle';
import Clear from '../../components/clear';
import Bucket from '../../components/bucket';
import ColorPicker from '../../components/colorPicker';

const mainCanvas = document.getElementById('main-canvas');

mainCanvas.width = 64;
mainCanvas.height = 64;

const allFrames = document.querySelectorAll('.frame');
allFrames.forEach((item, i) => {
  allFrames[i].width = 64;
  allFrames[i].height = 64;
});

export default class SelectTools {
  constructor() {
    this.selectTool();
    SelectTools.lineWidth();
  }

  selectTool() {
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
  }

  pen() {
    const penTool = document.getElementById('penTool');
    mainCanvas.addEventListener('mouseenter', () => {
      if (penTool.classList.contains('chosen')) {
        new Pen(mainCanvas);
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
