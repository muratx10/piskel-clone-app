export default class ExportGIF {
  constructor() {
    this.addEventListeners();
  }

  addEventListeners() {
    const saveGif = document.getElementById('save-gif');
    saveGif.addEventListener('click', this.getGif);
  }

  getGif() {
    let gifUrl;
    // eslint-disable-next-line no-undef
    const gif = new GIF({
      workers: 2,
      quality: 10,
      background: '#c9bdbd',
      transparent: '0xc9bdbd',
    });

    const allFrames = document.querySelectorAll('.frame');

    allFrames.forEach((item) => {
      const speed = 1000 / document.getElementById('speedAnimation').value;
      gif.addFrame(item, { delay: `${speed}` });
    });

    gif.on('finished', (blob) => {
      gifUrl = URL.createObjectURL(blob);

      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('href', `${gifUrl}`);
      downloadLink.setAttribute('download', 'piskel-gif');

      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);

      downloadLink.click();

      document.body.removeChild(downloadLink);
    });

    gif.render();
  }
}
