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

export const processSvg = (svg: string) => {
  const srcDim = 512;
  const targetDim = 24;

  const targetStrokeWidth = 1.25;
  const calcStrokeWidth = (targetStrokeWidth * (srcDim / targetDim)).toFixed(2).toString();

  const parsedSvg = new DOMParser()
    .parseFromString(svg, 'image/svg+xml')
    .querySelector('svg');

  parsedSvg.setAttribute('height', `${targetDim}px`);
  parsedSvg.setAttribute('width', `${targetDim}px`);

  const walker = walkTree(parsedSvg);
  let res;
  while (!(res = walker.next()).done) {
    const node = res.value;
    if (node.hasAttribute('stroke-width')) {
      parsedSvg.setAttribute('stroke-width', `${calcStrokeWidth}px`);
    }
  }

  return new XMLSerializer().serializeToString(parsedSvg);
}

function* walkTree(node) {
	yield node;
	let children = node.children;
	if (children) {
		for (let child of children) {
			yield* walkTree(child);
		}
	}
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