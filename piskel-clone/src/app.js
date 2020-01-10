import './screens/appScreen/app.scss';
import SelectTools from './screens/appScreen/main';

import penIcon from './screens/appScreen/assets/pen.png';
import eraserIcon from './screens/appScreen/assets/eraser.png';
import pipetteIcon from './screens/appScreen/assets/pipette.png';
import strokeIcon from './screens/appScreen/assets/stroke.png';
import mirrorIcon from './screens/appScreen/assets/mirror.png';
import rectIcon from './screens/appScreen/assets/rect.png';
import circleIcon from './screens/appScreen/assets/circle.png';
import handIcon from './screens/appScreen/assets/hand.png';
import paintPxIcon from './screens/appScreen/assets/paint-px.png';
import lightenIcon from './screens/appScreen/assets/lighten.png';
import darkenIcon from './screens/appScreen/assets/delighten.png';
import reflectIcon from './screens/appScreen/assets/reflect.png';
import rotateIcon from './screens/appScreen/assets/rotate.png';
import bucketIcon from './screens/appScreen/assets/bucket.png';
import clearIcon from './screens/appScreen/assets/brush.png';
import dithIcon from './screens/appScreen/assets/grid.png';
import rotateColorIcon from './screens/appScreen/assets/rotate-col.png';
import keyboardIcon from './screens/appScreen/assets/keyboard.png';


document.getElementById('pen').src = penIcon;
document.getElementById('eraser').src = eraserIcon;
document.getElementById('pipette').src = pipetteIcon;
document.getElementById('stroke').src = strokeIcon;
document.getElementById('mirror').src = mirrorIcon;
document.getElementById('rect').src = rectIcon;
document.getElementById('circle').src = circleIcon;
document.getElementById('move').src = handIcon;
document.getElementById('lighten').src = lightenIcon;
document.getElementById('darken').src = darkenIcon;
document.getElementById('paintPx').src = paintPxIcon;
document.getElementById('bucket').src = bucketIcon;
document.getElementById('dith').src = dithIcon;
document.getElementById('clear').src = clearIcon;
document.getElementById('rotate-color').src = rotateColorIcon;
document.getElementById('reflect').src = reflectIcon;
document.getElementById('rotate').src = rotateIcon;
document.getElementById('keyboard-tool').src = keyboardIcon;

const APP = new SelectTools();
