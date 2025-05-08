export const dataURLtoFile = (dataurl: any, filename: string) => {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], filename, { type: mime });

    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(file);
    a.download = filename;
    a.click();

    return file;
  };