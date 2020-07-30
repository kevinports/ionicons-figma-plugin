import React, { useRef, useEffect } from 'react';
import { Message } from '../declarations';

interface props {
  name: string;
  type: string;
  isSelected: boolean;
}

export const Icon: React.SFC<props> = ({ name, isSelected }) => {
  const el = useRef(null);

  const serialize = () => {
    const srcDim = 512;
    const targetDim = 24;
    const strokeWidth = 1.25;

    const symbol = document.querySelector(`#${name}`);
    const paths = symbol.querySelectorAll("path");
    const circles = symbol.querySelectorAll("circle");
    const ellipses = symbol.querySelectorAll("ellipse");
    const rects = symbol.querySelectorAll("rect");
    const lines = symbol.querySelectorAll("line");

    symbol.setAttribute('width', `${targetDim}`);
    symbol.setAttribute('height', `${targetDim}`);

    [...paths, ...circles, ...ellipses, ...rects, ...lines].forEach(node => {
      if (node.classList.contains('ionicon-fill-none')) {
        node.setAttribute("fill", "none");
        node.setAttribute("stroke-width", `${strokeWidth * (srcDim / targetDim)}`);
        node.setAttribute("stroke", "#000");
      }
    });

    const symbolStr = symbol.outerHTML;
    return symbolStr.replace(/symbol/g,"svg");
  }

  const handleSelect = () => {
    const serialized = serialize();
    const message: Message = {
      type: 'insert',
      data: {
        iconName: name,
        serialized
      }
    }
    // console.log(serialized)
    parent.postMessage({ pluginMessage: message }, '*');
  }

  let offsetX = 0;
	let offsetY = 0;
  const handleDragStart = (ev) => {
    // Getting the offset position (The position of the cursor relative to the top-left corner of item being dragged)
    offsetX = ev.offsetX;
		offsetY = ev.offsetY;
  }

  const handleDragEnd = (ev) => {
    const serialized = serialize();
    // Don't proceed if the item was dropped inside the plugin window.
		if (ev.view.length === 0) return;

		// Getting the position of the cursor relative to the top-left corner of the browser page (Where the hamburger icon is)
		const dropPosition = {
			clientX: ev.clientX,
			clientY: ev.clientY
		};

		// Getting the size of the app/browser window.
		const windowSize = {
			width: window.outerWidth,
			height: window.outerHeight
		};

		// These are the offsets set from the dragstart event.
		const offset = {
			x: offsetX,
			y: offsetY
		};

    const message: Message = {
      type: 'dropInsert',
      data: {
        iconName: name,
        serialized,
        dropPosition,
        windowSize,
        offset
      }
    }

    window.parent.postMessage({ pluginMessage: message }, '*');
  }

  const handleKeyup = (ev) => {
    if (ev.key === 'Enter' && isSelected) {
      handleSelect();
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', (handleKeyup));
    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [isSelected]);

  useEffect(() => {
    el.current.addEventListener('dragstart', handleDragStart);
    el.current.addEventListener('dragend', handleDragEnd);
    return () => {
      el.current.removeEventListener('dragstart', handleDragStart);
      el.current.removeEventListener('dragend', handleDragEnd);
    };
  })

  return (
    <div className={`Icon${isSelected ? ' is-selected' : ''}`}>
      <div className="Icon-handler" ref={el} onDoubleClick={handleSelect} draggable="true">
        <svg>
          <use xlinkHref={`#${name}`}/>
        </svg>
      </div>
    </div>
  );
}

