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

  const handleKeyUp = (ev) => {
    if (ev.key === 'Escape') {
      handleClear();
    }
  }

  return (
    <div className="SearchBar">
      <svg className="SearchBar-search" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M11.1034 7.05172C11.1034 9.01329 9.51329 10.6034 7.55172 10.6034C5.59016 10.6034 4 9.01329 4 7.05172C4 5.09016 5.59016 3.5 7.55172 3.5C9.51329 3.5 11.1034 5.09016 11.1034 7.05172ZM10.3972 10.6046C9.61787 11.2296 8.62846 11.6034 7.55172 11.6034C5.03788 11.6034 3 9.56557 3 7.05172C3 4.53788 5.03788 2.5 7.55172 2.5C10.0656 2.5 12.1034 4.53788 12.1034 7.05172C12.1034 8.12858 11.7295 9.1181 11.1044 9.8975L14.3535 13.1467L13.6464 13.8538L10.3972 10.6046Z" fill="black" fillOpacity="0.8"/>
      </svg>

      <input
        type="text"
        placeholder="Search"
        ref={inputElement}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyUp={handleKeyUp}/>

      <svg
        className={`Searchbar-close${ (value.length) ? ' is-active' : ''}`}
        onClick={handleClear}
        width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.00002 5.29295L10.6465 0.646484L11.3536 1.35359L6.70713 6.00006L11.3536 10.6465L10.6465 11.3536L6.00002 6.70716L1.35359 11.3536L0.646484 10.6465L5.29291 6.00006L0.646486 1.35367L1.35359 0.64656L6.00002 5.29295Z"/>
      </svg>

    </div>
  )
}