import Pen from '../../components/pen/pen';
import Stroke from '../../components/stroke/stroke';

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
  }

  pen() {
    const penTool = document.getElementById('penTool');
    mainCanvas.addEventListener('mouseenter', (e) => {
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
