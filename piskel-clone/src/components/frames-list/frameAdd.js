import wasteBin from '../../screens/appScreen/assets/waste-bin.png';
import copyImg from '../../screens/appScreen/assets/copy.png';
import Animation from '../animation/animation';
import FramesColor from './frameColor';

const framesContainer = document.querySelector('.frames-wrapper');

export default class FramesAdd {
  constructor(mainCanvas) {
    this.mainCanvas = mainCanvas;
    this.addFrame();
    this.addEventListeners();
  }

  addEventListeners() {
    framesContainer.addEventListener('click', this.removeFrame);

    framesContainer.addEventListener('click', this.copyFrame);
  }

  addFrame() {
    const newFrameBtn = document.getElementById('new-frame-button');
    newFrameBtn.addEventListener('click', () => {
      const ctxMain = this.mainCanvas.getContext('2d');
      ctxMain.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

      const canvasWrapper = document.createElement('div');
      canvasWrapper.className = 'canvasWrapper';

      const canvas = document.createElement('canvas');
      canvas.className = 'frame';
      canvas.id = 'frame';
      canvas.width = '64';
      canvas.height = '64';
      canvasWrapper.appendChild(canvas);
      framesContainer.appendChild(canvasWrapper);
      canvasWrapper.insertAdjacentHTML('beforeend', `<img class="remove" id="remove" src=${wasteBin}> <img class="copy" src=${copyImg}>`);

      const framesList = document.querySelectorAll('.frame');
      framesList.forEach((item) => {
        if (item.classList.contains('selected-frame')) {
          item.classList.remove('selected-frame');
        }
      });

      canvas.classList.add('selected-frame');
      new FramesColor(this.mainCanvas, canvas);
      this.frameBorderToggle();
    });
  }


  frameBorderToggle() {
    const framesWrapper = document.querySelector('.frames-wrapper');
    framesWrapper.addEventListener('click', () => {
      const framesList = document.querySelectorAll('.frame');
      framesList.forEach((item) => {
        if (window.event.target === item) {
          framesList.forEach((elem) => {
            elem.classList.remove('selected-frame');
          });
        }
      });
    });

    framesWrapper.addEventListener('click', () => {
      const framesList = document.querySelectorAll('.frame');
      framesList.forEach((item) => {
        if (window.event.target === item) {
          item.classList.add('selected-frame');

          const ctx = this.mainCanvas.getContext('2d');
          ctx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

          const frameImageURL = item.toDataURL('image/png');

          const img = new Image(64, 64);
          img.src = frameImageURL;
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, 0, 0, this.mainCanvas.width, this.mainCanvas.height);
        }
      });
    });
  }

  removeFrame() {
    const remove = document.querySelectorAll('.remove');

    remove.forEach((item) => {
      if (window.event.target === item) {
        item.parentNode.remove();
      }
    });
    const speed = document.getElementById('speedAnimation');
    const speedValue = speed.value;
    new Animation(speedValue);
  }

  copyFrame() {
    const copy = document.querySelectorAll('.copy');

    copy.forEach((item, i) => {
      if (window.event.target === item) {
        const copiedFrame = item.parentNode;

        const clonedFrame = copiedFrame.cloneNode(true);
        framesContainer.insertBefore(clonedFrame, framesContainer.children[i + 1]);

        // adding image to a new frame

        const newCanvas = clonedFrame.querySelector('.frame');
        const context = newCanvas.getContext('2d');
        const cloningWrapper = item.parentNode;
        const cloningCanvas = cloningWrapper.querySelector('.frame');
        const urlForCopy = cloningCanvas.toDataURL('image/png');

        const imageForCopy = new Image(100, 100);
        imageForCopy.src = urlForCopy;

        context.drawImage(imageForCopy, 0, 0);
      }
    });
    const speed = document.getElementById('speedAnimation');
    const speedValue = speed.value;
    new Animation(speedValue);
  }
}
