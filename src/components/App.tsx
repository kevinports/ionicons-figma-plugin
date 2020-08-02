import React, { useState } from 'react';
import { IconData, FilterType } from '../declarations';
import { Filter, IconList, SearchBar } from './index';
import data from '../data';

export const App = () => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('outline');
  const [isInputFocused, setInputFocused] = useState(true);
  const [isListCursorFocused, setListCursorFocused] = useState(false);
  const filters: FilterType[] = ['outline', 'fill', 'sharp', 'logo'];

  const search = query.trim().toLowerCase();
  let results: IconData[] = data.filter(icon => icon.tags.some((tag: any) => tag.indexOf(search) > -1))
  results = results.filter(i => i.type === activeFilter);
  results.sort(function(a, b) {
    return a.index - b.index;
  });

  const handleInputFocusChange = (isFocused) => {
    setInputFocused(isFocused);
    setListCursorFocused(!isFocused);
  }

  const handleListCursorFocusChange = (isFocused) => {
    setListCursorFocused(isFocused);
    setInputFocused(!isFocused);
  }

  return (
    <div className="App">
      <div className="App-control">
        <Filter
          filters={filters}
          activeFilter={activeFilter}
          onChange={(filter:FilterType) => setActiveFilter(filter)} />

        <SearchBar
          doInputFocus={isInputFocused}
          onInputFocusChange={handleInputFocusChange}
          onValueChange={(value:string) => setQuery(value)} />
      </div>

      <div className="App-detail">
        <IconList
          query={query}
          icons={results}
          doCursorFocus={isListCursorFocused}
          onCursorFocusChange={handleListCursorFocusChange} />
      </div>
    </div>
  )
}