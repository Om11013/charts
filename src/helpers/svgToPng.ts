export const svgToPng = (svg: any, width: number, height: number, padding = 20) => {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      let xml = new XMLSerializer().serializeToString(svg);
      let dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(xml);
      let img = new Image();

      img.onload = () => {
        const targetWidth = width - 2 * padding;
        const targetHeight = height - 2 * padding;

        ctx.drawImage(img, padding, padding, targetWidth, targetHeight);
        let imageData = canvas.toDataURL('image/png', 1.0);
        resolve(imageData);
      };

      img.onerror = () => reject();

      img.src = dataUrl;
    } else {
      reject(new Error('Canvas context not available'));
    }
  });
};
