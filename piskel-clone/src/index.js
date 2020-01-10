import './screens/startScreen/startScreen.scss';
import './screens/appScreen/app.scss';

import appPic from './screens/startScreen/assets/app-screenshot.png';
import megaman from './screens/startScreen/assets/Megaman.gif';
import SparkSkill from './screens/startScreen/assets/SparkSkill.gif';
import colorPattern from './screens/startScreen/assets/colorPattern.gif';

const screenshot = document.getElementById('screen-img');
screenshot.src = appPic;

const EXAMPLE_1 = document.getElementById('example_1');
EXAMPLE_1.src = colorPattern;

const EXAMPLE_2 = document.getElementById('example_2');
EXAMPLE_2.src = megaman;

const EXAMPLE_3 = document.getElementById('example_3');
EXAMPLE_3.src = SparkSkill;
