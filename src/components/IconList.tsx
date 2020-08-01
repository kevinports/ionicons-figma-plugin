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

  const handleArrowUp = () => {
    if (cursorY === 0) {
      onCursorFocusChange(false);
      setCursorX(0);
    }
    setCursorY(y => clamp(y - 1, -1, rows));
  }

  const handleArrowDown = () => {
    if (cursorY === -1) onCursorFocusChange(true);
    setCursorY(y => clamp(y + 1, 0, rows));
  }

  const handleArrowLeft = () => {
    if (cursorY === -1) return;
    if (cursorX - 1 <= 0)  {
      setCursorY(y => clamp(y - 1, 0, rows));
      setCursorX(columns);
    } else {
      setCursorX(x => x - 1);
    }
  }

  const handleArrowRight = () => {
    if (cursorY == -1) return;
    if (cursorX + 1 > columns)  {
      setCursorY(y => clamp(y + 1, 0, rows));
      setCursorX(1);
    } else {
      setCursorX(x => x + 1);
    }
  }

  const handleKeyDown = debounce((ev) => {
    switch (ev.key) {
      case 'ArrowUp':
        ev.preventDefault();
        ev.stopPropagation();
        handleArrowUp();
        break;
      case 'ArrowDown':
        ev.preventDefault();
        ev.stopPropagation();
        handleArrowDown();
        break;
      case 'ArrowLeft':
        ev.preventDefault();
        ev.stopPropagation();
        handleArrowLeft();
        break;
      case 'ArrowRight':
        ev.preventDefault();
        ev.stopPropagation();
        handleArrowRight();
        break;
    }
  }, 4);

  useEffect(() => {
    setCursorX(0);
    setCursorY(-1);
    onCursorFocusChange(false);
  }, [query])

  useEffect(() => {
    if (doCursorFocus === false) {
      setCursorX(0);
      setCursorY(-1);
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

  return (
    <>
      {icons.length
        ? <div className="IconList" ref={listElement}>
            {icons.map((icon: IconData, index) => {
              const cursorPosition = (cursorY < 0) ? -1 : (cursorX + (cursorY * columns));
              console.log
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