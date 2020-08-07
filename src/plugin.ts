import { Message } from './declarations';

figma.showUI(__html__);
figma.ui.resize(320, 600);

figma.ui.onmessage = (msg:Message) => {

  if (msg.type === 'insert') {
    const { iconName, svg } = msg.data;

    const node = figma.createNodeFromSvg(svg);
    node.name = `ionicon-${iconName}`;

    const selection = figma.currentPage.selection[0];

    if (selection?.type === "GROUP" || selection?.type === "FRAME") {
      selection.insertChild(0,node);
    }

    else if (selection?.parent.type === "GROUP" || selection?.parent.type === "FRAME") {
      selection.parent.insertChild(0, node);
    }

    else {
      node.x = figma.viewport.center.x
      node.y = figma.viewport.center.y
      figma.currentPage.insertChild(0, node);
    }

    figma.currentPage.selection = [node];
  }

  if (msg.type === 'dropInsert') {
    const { iconName, svg, dropPosition, windowSize, offset } = msg.data;

    const node = figma.createNodeFromSvg(svg);
    node.name = `ionicon-${iconName}`;

    const bounds = figma.viewport.bounds;
    const zoom = figma.viewport.zoom;
    const hasUI = Math.round(bounds.width * zoom) !== windowSize.width;
    const leftPaneWidth = windowSize.width - bounds.width * zoom - 240;

    const xFromCanvas = hasUI ? dropPosition.clientX - leftPaneWidth : dropPosition.clientX;
    const yFromCanvas = hasUI ? dropPosition.clientY - 40 : dropPosition.clientY;

    figma.currentPage.appendChild(node);

    node.x = bounds.x + xFromCanvas / zoom - offset.x;
    node.y = bounds.y + yFromCanvas / zoom - offset.y;

    figma.currentPage.selection = [node];
  }

};