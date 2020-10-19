import { IconData } from "./declarations";
import iconData from 'ionicons/dist/ionicons.json';
import { getVariant, removeVariant, processSvg } from "./util";

const data: IconData[] = (() => {
  const indexDict = {};
  let uiIconIndex = 0;
  let logoIconIndex = 0;

  iconData.icons.forEach((icon) => {
    if (!icon.name.includes('-outline') && !icon.name.includes('-sharp') && !icon.name.includes('logo-')) {
      indexDict[icon.name] = uiIconIndex;
      uiIconIndex++;
    }
    if (icon.name.includes('logo-')) {
      indexDict[icon.name] = logoIconIndex;
      logoIconIndex++;
    }
  });

  return iconData.icons.map((icon) => {
    const srcSvg = require(`ionicons/dist/svg/${icon.name}.svg`);
    return {
      index: indexDict[removeVariant(icon.name)],
      type: getVariant(icon.name),
      svg: processSvg(srcSvg),
      ...icon
    }
  });
})();

export default data;