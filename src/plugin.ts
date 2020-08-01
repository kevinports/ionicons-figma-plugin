import { Message } from './declarations';

figma.showUI(__html__);
figma.ui.resize(320, 600);

figma.ui.onmessage = (msg:Message) => {

  if (msg.type === 'insert') {
    const { iconName, serialized } = msg.data;
    const node = figma.createNodeFromSvg(serialized);
    node.name = `ionicon-${iconName}`;
    const selection = figma.currentPage.selection[0];

    if (selection?.type === "GROUP" || selection?.type === "FRAME") {
      selection.insertChild(0,node);
    }
    else if (selection?.parent.type === "GROUP" || selection?.parent.type === "FRAME") {
      selection.parent.insertChild(0, node);
    }
    else {
      figma.currentPage.insertChild(0, node);
    }

    figma.currentPage.selection = [node];
  }

  if (msg.type === 'dropInsert') {
    const { iconName, serialized, dropPosition, windowSize, offset } = msg.data;
    const node = figma.createNodeFromSvg(serialized);
    node.name = `ionicon-${iconName}`;

    // Getting the position and size of the visible area of the canvas.
    const bounds = figma.viewport.bounds;

    // Getting the zoom level
    const zoom = figma.viewport.zoom;

    // There are two states of the Figma interface: With or without the UI (toolbar + left and right panes)
    // The calculations would be slightly different, depending on whether the UI is shown.
    // So to determine if the UI is shown, we'll be comparing the bounds to the window's width.
    // Math.round is used here because sometimes bounds.width * zoom may return a floating point number very close but not exactly the window width.
    const hasUI = Math.round(bounds.width * zoom) !== windowSize.width;

    // Since the left pane is resizable, we need to get its width by subtracting the right pane and the canvas width from the window width.
    const leftPaneWidth = windowSize.width - bounds.width * zoom - 240;

    // Getting the position of the cursor relative to the top-left corner of the canvas.
    const xFromCanvas = hasUI ? dropPosition.clientX - leftPaneWidth : dropPosition.clientX;
    const yFromCanvas = hasUI ? dropPosition.clientY - 40 : dropPosition.clientY;

    figma.currentPage.appendChild(node);

    // The canvas position of the drop point can be calculated using the following:
    node.x = bounds.x + xFromCanvas / zoom - offset.x;
    node.y = bounds.y + yFromCanvas / zoom - offset.y;

    // Select the rectangle
    figma.currentPage.selection = [node];
  }

};