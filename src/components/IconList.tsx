import React, { useEffect, useState, useRef } from 'react';
import { IconData } from '../declarations';
import { Icon } from './Icon';
import { clamp, debounce } from '../util';

interface props {
  icons:IconData[];
  query:string;
}

export const IconList: React.SFC<props> = ({icons, query}) => {
  const listElement = useRef(null);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(-1);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);

  const handleArrowUp = () => {
    setCursorY(y => clamp(y - 1, 0, rows));
  }

  const handleArrowDown = () => {
    setCursorY(y => clamp(y + 1, 0, rows));
  }

  const handleArrowLeft = () => {
    if (cursorX - 1 < 0)  {
      setCursorY(y => clamp(y - 1, 0, rows));
      setCursorX(columns);
    } else {
      setCursorX(x => x - 1);
    }
  }

  const handleArrowRight = () => {
    if (cursorX + 1 > columns)  {
      setCursorY(y => clamp(y + 1, 0, rows));
      setCursorX(0);
    } else {
      setCursorX(x => x + 1);
    }
  }

  const handleKeyDown = debounce((ev) => {
    switch (ev.key) {
      case 'ArrowUp':
        handleArrowUp();
        break;
      case 'ArrowDown':
        handleArrowDown();
        break;
      case 'ArrowLeft':
        handleArrowLeft();
        break;
      case 'ArrowRight':
        handleArrowRight();
        break;
    }
    console.log(cursorX, cursorY, columns)
    console.log((cursorX + (cursorY * columns)))
  }, 4);

  useEffect(() => {
    if (listElement.current) {
      const gridStyles = window.getComputedStyle(listElement.current);
      setRows(gridStyles.gridTemplateRows.split(' ').length);
      setColumns(gridStyles.gridTemplateColumns.split(' ').length);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  return (
    <>
      {icons.length
        ? <div className="IconList" ref={listElement}>
            {icons.map((icon: IconData, index) => {
              const cursorPosition = (cursorY < 0) ? -1 : (cursorX + (cursorY * columns));
              return <Icon
                        isSelected={cursorPosition === index}
                        key={icon.name}
                        name={icon.name}
                        type={icon.type} />
            })}
          </div>
        : <div className="IconList--empty">
            No icons found for "{query}"
          </div>
      }
    </>
  )
}