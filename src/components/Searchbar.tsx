import React, { useState, useRef, useEffect } from 'react';

interface props {
  onValueChange: Function;
  onInputFocusChange: Function;
  doInputFocus: boolean;
}

export const SearchBar: React.SFC<props> = ({ onValueChange, onInputFocusChange, doInputFocus }) => {
  const inputElement = useRef(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (doInputFocus) {
      inputElement.current.focus();
    } else {
      inputElement.current.blur();
    }
  }, [doInputFocus]);

  const handleChange = (ev) => {
    const val = ev.target.value;
    setValue(val);
    onValueChange(val);
  }

  const handleClear = () => {
    const val = '';
    inputElement.current.value = val;
    setValue(val);
    onValueChange(val);
  }

  const handleFocus = (ev) => {
    ev.preventDefault();
    onInputFocusChange(true);
  }

  const handleBlur = (ev) => {
    ev.preventDefault();
    onInputFocusChange(false);
  }

  return (
    <div className="SearchBar">
      <svg className="SearchBar-search">
        <use xlinkHref='#search-outline'/>
      </svg>

      <input
        type="text"
        placeholder="Search icons..."
        ref={inputElement}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}/>

      <svg
        className={`Searchbar-close${ (value.length) ? ' is-active' : ''}`}
        onClick={handleClear}>
        <use xlinkHref='#close-outline'/>
      </svg>
    </div>
  )
}