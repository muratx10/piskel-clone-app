import penIcon from '../../screens/appScreen/assets/pen.png';
import eraserIcon from '../../screens/appScreen/assets/eraser.png';
import pipetteIcon from '../../screens/appScreen/assets/pipette.png';
import strokeIcon from '../../screens/appScreen/assets/stroke.png';
import rectIcon from '../../screens/appScreen/assets/rect.png';
import circleIcon from '../../screens/appScreen/assets/circle.png';
import handIcon from '../../screens/appScreen/assets/hand.png';
import paintPxIcon from '../../screens/appScreen/assets/paint-px.png';
import bucketIcon from '../../screens/appScreen/assets/bucket.png';
import brushIcon from '../../screens/appScreen/assets/brush.png';
import mirrorIcon from '../../screens/appScreen/assets/mirror.png';

document.getElementById('hotkeys-img-pen').src = penIcon;
document.getElementById('hotkeys-img-eraser').src = eraserIcon;
document.getElementById('hotkeys-img-picker').src = pipetteIcon;
document.getElementById('hotkeys-img-stroke').src = strokeIcon;
document.getElementById('hotkeys-img-rectangle').src = rectIcon;
document.getElementById('hotkeys-img-circle').src = circleIcon;
document.getElementById('hotkeys-img-move').src = handIcon;
document.getElementById('hotkeys-img-bucket-px').src = paintPxIcon;
document.getElementById('hotkeys-img-bucket').src = bucketIcon;
document.getElementById('hotkeys-img-clear').src = brushIcon;
document.getElementById('hotkeys-img-mirror').src = mirrorIcon;

export default class Keyboard {
  constructor() {
    this.visibility();
    this.hide();
    this.defaultValues();
    this.eventListeners();
  }

  visibility() {
    const keyboardCall = document.getElementById('keyboard-tool');
    const keyboardPanel = document.getElementById('hotkeys-container');
    keyboardCall.addEventListener('click', () => {
      keyboardPanel.classList.remove('hidden');
    });
  }

  hide() {
    const keyboardClose = document.getElementById('hotkeys-close');
    const keyboardPanel = document.getElementById('hotkeys-container');
    keyboardClose.addEventListener('click', () => {
      keyboardPanel.classList.add('hidden');
    });
  }

  eventListeners() {
    const hotkeyInput = document.querySelectorAll('.hotkey-input');
    const bufferValue = [];
    hotkeyInput.forEach((item) => {
      bufferValue.push(item.value);
    });

    const hotkeyList = document.querySelector('.hotkeys-list');

    hotkeyList.addEventListener('input', () => {
      let newValue;
      hotkeyInput.forEach((item) => {
        if (window.event.target === item) {
          newValue = window.event.target.value;
        }
      });

      let j = 0;
      // eslint-disable-next-line array-callback-return
      Array.from(hotkeyInput).reduce((accum, current) => {
        if (current.value === newValue || current.value === newValue.toUpperCase()) {
          j += 1;
        }
      });

      if (j > 1) {
        window.event.target.value = '';
        window.event.target.placeholder = 'NO!';
      }

      this.defaultKeys();
    });
  }

  defaultValues() {
    document.getElementById('hotkey-pen').value = 'Q';
    document.getElementById('hotkey-mirror').value = 'T';
    document.getElementById('hotkey-eraser').value = 'W';
    document.getElementById('hotkey-picker').value = 'E';
    document.getElementById('hotkey-stroke').value = 'R';
    document.getElementById('hotkey-rectangle').value = 'Y';
    document.getElementById('hotkey-circle').value = 'U';
    document.getElementById('hotkey-move').value = 'I';
    document.getElementById('hotkey-bucket-px').value = 'A';
    document.getElementById('hotkey-bucket').value = 'S';
    document.getElementById('hotkey-clear').value = 'F';

    this.defaultKeys();
  }

  defaultKeys() {
    const hotkeyPen = document.getElementById('hotkey-pen').value;
    const hotkeyMirror = document.getElementById('hotkey-mirror').value;
    const hotkeyEraser = document.getElementById('hotkey-eraser').value;
    const hotkeyPicker = document.getElementById('hotkey-picker').value;
    const hotkeyStroke = document.getElementById('hotkey-stroke').value;
    const hotkeyRectangle = document.getElementById('hotkey-rectangle').value;
    const hotkeyCircle = document.getElementById('hotkey-circle').value;
    const hotkeyMove = document.getElementById('hotkey-move').value;
    const hotkeyBucketPx = document.getElementById('hotkey-bucket-px').value;
    const hotkeyBucket = document.getElementById('hotkey-bucket').value;
    const hotkeyClear = document.getElementById('hotkey-clear').value;

    function keyboardControls(e) {
      const tool = document.querySelectorAll('.tool');
      tool.forEach((item) => {
        if (item.classList.contains('chosen')) {
          item.classList.remove('chosen');
        }
      });

      if (e.key === hotkeyPen || e.key === hotkeyPen.toLowerCase()) {
        document.getElementById('penTool').classList.add('chosen');
      }
      if (e.key === hotkeyMirror || e.key === hotkeyMirror.toLowerCase()) {
        document.getElementById('mirrorTool').classList.add('chosen');
      }
      if (e.key === hotkeyEraser || e.key === hotkeyEraser.toLowerCase()) {
        document.getElementById('eraserTool').classList.add('chosen');
      }
      if (e.key === hotkeyPicker || e.key === hotkeyPicker.toLowerCase()) {
        document.getElementById('pipetteTool').classList.add('chosen');
      }
      if (e.key === hotkeyStroke || e.key === hotkeyStroke.toLowerCase()) {
        document.getElementById('strokeTool').classList.add('chosen');
      }
      if (e.key === hotkeyRectangle || e.key === hotkeyRectangle.toLowerCase()) {
        document.getElementById('rectTool').classList.add('chosen');
      }
      if (e.key === hotkeyCircle || e.key === hotkeyCircle.toLowerCase()) {
        document.getElementById('circleTool').classList.add('chosen');
      }
      if (e.key === hotkeyMove || e.key === hotkeyMove.toLowerCase()) {
        document.getElementById('moveTool').classList.add('chosen');
      }
      if (e.key === hotkeyBucketPx || e.key === hotkeyBucketPx.toLowerCase()) {
        document.getElementById('paintPxTool').classList.add('chosen');
      }
      if (e.key === hotkeyBucket || e.key === hotkeyBucket.toLowerCase()) {
        document.getElementById('bucketTool').classList.add('chosen');
      }
      if (e.key === hotkeyClear || e.key === hotkeyClear.toLowerCase()) {
        document.getElementById('brushTool').classList.add('chosen');
      }
    }
    document.addEventListener('keydown', keyboardControls);
  }
}
