import './screens/appScreen/app.scss';
import SelectTools from './screens/appScreen/main';

import penIcon from './screens/appScreen/assets/pen.png';
import eraserIcon from './screens/appScreen/assets/eraser.png';
import pipetteIcon from './screens/appScreen/assets/pipette.png';
import strokeIcon from './screens/appScreen/assets/stroke.png';
import rectIcon from './screens/appScreen/assets/rect.png';
import circleIcon from './screens/appScreen/assets/circle.png';
import handIcon from './screens/appScreen/assets/hand.png';
import reflectIcon from './screens/appScreen/assets/reflect.png';
import rotateIcon from './screens/appScreen/assets/rotate.png';
import bucketIcon from './screens/appScreen/assets/bucket.png';
import clearIcon from './screens/appScreen/assets/brush.png';
import rotateColorIcon from './screens/appScreen/assets/rotate-col.png';
import keyboardIcon from './screens/appScreen/assets/keyboard.png';
import mirrorPic from './screens/appScreen/assets/mirror.png';


document.getElementById('pen').src = penIcon;
document.getElementById('mirror').src = mirrorPic;
document.getElementById('eraser').src = eraserIcon;
document.getElementById('pipette').src = pipetteIcon;
document.getElementById('stroke').src = strokeIcon;
document.getElementById('rect').src = rectIcon;
document.getElementById('circle').src = circleIcon;
document.getElementById('move').src = handIcon;
document.getElementById('bucket').src = bucketIcon;
document.getElementById('clear').src = clearIcon;
document.getElementById('rotate-color').src = rotateColorIcon;
document.getElementById('flip').src = reflectIcon;
document.getElementById('rotate').src = rotateIcon;
document.getElementById('keyboard-tool').src = keyboardIcon;

// eslint-disable-next-line no-unused-vars
const APP = new SelectTools();
