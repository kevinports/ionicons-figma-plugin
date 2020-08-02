export const getVariant = (name:string) => {
  const split = name.split('-');
  const suffix = name.includes('logo-') ? 'logo' : split[split.length - 1];

  switch (suffix) {
    case 'outline':
      return 'outline';
    case 'sharp':
      return 'sharp';
    case 'logo':
      return 'logo';
    default:
      return 'fill';
  }
}

export const removeVariant = (name:string) => {
  let res = name;
  ['-outline', '-sharp'].forEach(suffix => {
    res = res.replace(suffix, '');
  });
  return res;
}

export const clamp = (val:number, min:number, max:number) => {
  return val > max ? max : val < min ? min : val;
}

export const debounce = (callback:Function, wait:number) => {
  let timeout = null;
  return (...args) => {
    const next = () => callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  }
}

export const isElementInView: any = (el, view) => {
  let { top, bottom } = el.getBoundingClientRect();
  const { top: vTop, height: vHeight } = view.getBoundingClientRect();

  top = top - vTop;
  bottom = bottom - vTop;

  const isInView = top > 0 && bottom < vHeight;
  const offset = {
    top: top,
    bottom: vHeight - bottom
  }
  return [isInView, offset];
}