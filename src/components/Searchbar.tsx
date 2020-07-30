import React, { useState, useRef, useEffect } from 'react';

interface props {
  onChange:Function;
}

export const Searchbar: React.SFC<props> = ({ onChange }) => {
  const inputElement = useRef(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  const handleChange = (ev) => {
    const val = ev.target.value;
    setValue(val);
    onChange(val);
  }

  const handleClear = () => {
    const val = '';
    inputElement.current.value = val;
    setValue(val);
    onChange(val);
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
        onChange={handleChange}/>

      <svg
        className={`Searchbar-close${ (value.length) ? ' is-active' : ''}`}
        onClick={handleClear}>
        <use xlinkHref='#close-outline'/>
      </svg>
    </div>
  )
}