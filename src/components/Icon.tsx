import React, { useRef, useEffect } from 'react';
import { Message, IconData } from '../declarations';

interface props {
  icon: IconData;
  isSelected: boolean;
  onSelected: Function;
}

export const Icon: React.SFC<props> = ({ icon, isSelected, onSelected }) => {
  const {name, svg} = icon;
  const element = useRef(null);

  const handleSelect = () => {
    const message: Message = {
      type: 'insert',
      data: {
        iconName: name,
        svg
      }
    }

    parent.postMessage({ pluginMessage: message }, '*');
  }

  let offsetX = 0;
	let offsetY = 0;
  const handleDragStart = (ev) => {
    offsetX = ev.offsetX;
		offsetY = ev.offsetY;
  }

  const handleDragEnd = (ev) => {
		if (ev.view.length === 0) return;

		const dropPosition = {
			clientX: ev.clientX,
			clientY: ev.clientY
		};

		const windowSize = {
			width: window.outerWidth,
			height: window.outerHeight
		};

		const offset = {
			x: offsetX,
			y: offsetY
		};

    const message: Message = {
      type: 'dropInsert',
      data: {
        iconName: name,
        svg,
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
    if (isSelected) {
      onSelected(element.current);
    }

    window.addEventListener('keyup', handleKeyup);
    return () => {
      window.removeEventListener('keyup', handleKeyup);
    }
  }, [isSelected]);

  useEffect(() => {
    element.current.addEventListener('dragstart', handleDragStart);
    element.current.addEventListener('dragend', handleDragEnd);
    return () => {
      element.current.removeEventListener('dragstart', handleDragStart);
      element.current.removeEventListener('dragend', handleDragEnd);
    };
  })

  return (
    <div className={`Icon ${isSelected ? ' is-selected' : ''}`}>
      <div
        className="Icon-handler"
        ref={element}
        onDoubleClick={handleSelect}
        draggable="true">
        <div dangerouslySetInnerHTML={{__html: svg}} />
      </div>
    </div>
  );
}

