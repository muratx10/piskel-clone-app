const hexPixel4x4 = [
  ['00BCD4', 'FFEB3B', 'FFEB3B', '00BCD4'],
  ['FFEB3B', 'FFC107', 'FFC107', 'FFEB3B'],
  ['FFEB3B', 'FFC107', 'FFC107', 'FFEB3B'],
  ['00BCD4', 'FFEB3B', 'FFEB3B', '00BCD4'],
];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawPixel(width, height, data, inputType) {
  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height); // clear canvas context before
  // drawing new context

  const concat = (xs, ys) => xs.concat(ys);

  const hexToRGBA = (hexStr) => [
    parseInt(hexStr.substr(0, 2), 16),
    parseInt(hexStr.substr(2, 2), 16),
    parseInt(hexStr.substr(4, 2), 16),
    255,
  ];

  let flattenedRGBAValues = null;
  if (inputType === 'hex') {
    flattenedRGBAValues = data
      .reduce(concat) // flatten array
      .map(hexToRGBA) // convert HEX color to RGBA & return 2d array
      .reduce(concat); // flatten array with RGBA color;
  } else if (inputType === 'rgba') {
    flattenedRGBAValues = data.reduce(concat).reduce(concat);
  } else if (inputType === 'image') {
    const img = new Image(); // create image
    img.src = data; // apply image source
    img.onload = function () {
      ctx.drawImage(img, 0, 0); // when image is loaded, invoke draw
      // method
    };
  }

  const imgData = new ImageData(Uint8ClampedArray.from(flattenedRGBAValues), width, height);
  ctx.putImageData(imgData, 0, 0);
}

// initialize app with 4x4 canvas draw
drawPixel(4, 4, hexPixel4x4, 'hex');
