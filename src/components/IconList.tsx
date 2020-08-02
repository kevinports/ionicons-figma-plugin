import React, { useEffect, useState, useRef } from 'react';
import { IconData } from '../declarations';
import { Icon } from './Icon';
import { clamp, debounce } from '../util';

interface props {
  icons: IconData[];
  query: string;
  doCursorFocus: boolean;
  onCursorFocusChange: Function;
}

export const IconList: React.SFC<props> = ({icons, query, doCursorFocus, onCursorFocusChange}) => {
  const listElement = useRef(null);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(-1);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);

  let cursorPosition;

  const calcCursorPositon = () => {
    const newPosition = (cursorY < 0) ? -1 : (cursorX + (cursorY * columns));
    return clamp(newPosition, -1, icons.length - 1);
  }

  const clampY = (y) => {
    return clamp(y, -1, rows - 1);
  }

  const handleArrowUp = () => {
    if (cursorY === 0) {
      onCursorFocusChange(false);
      setCursorX(0);
    }
    setCursorY(y => clampY(y - 1));
  }

  const handleArrowDown = () => {
    if (cursorY === -1)  {
      onCursorFocusChange(true);
    }
    setCursorY(y => clampY(y + 1));
  }

  const handleArrowLeft = () => {
    if (cursorY === -1 || cursorPosition === 0) {
      return;
    }
    else if (cursorX - 1 < 0)  {
      setCursorY(y => clampY(y - 1));
      setCursorX(columns - 1);
    }
    else {
      setCursorX(x => x - 1);
    }
  }

  const handleArrowRight = () => {
    if (cursorY == -1 || cursorPosition === icons.length -1) {
      return;
    }
    else if (cursorX + 1 >= columns)  {
      setCursorY(y => clampY(y + 1));
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
  }, 4);

  const resetCursor = () => {
    setCursorX(0);
    setCursorY(-1);
  }

  useEffect(() => {
    onCursorFocusChange(false);
    resetCursor();
  }, [query])

  useEffect(() => {
    if (doCursorFocus === false) {
      resetCursor();
    }
  }, [doCursorFocus])

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

  cursorPosition = calcCursorPositon();

  return (
    <>
      {icons.length
        ? <div className="IconList" ref={listElement}>
            {icons.map((icon: IconData, index) => {
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