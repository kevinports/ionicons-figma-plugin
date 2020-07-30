import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { IconData, FilterType } from './declarations';
import { Filter, IconList, Searchbar } from './components';
import spriteSVG from '../node_modules/ionicons/dist/ionicons.symbols.svg';
import data from './data';
import './styles/index.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('outline');
  const filters:FilterType[] = ['outline', 'fill', 'sharp', 'logo'];

  const search = query.trim().toLowerCase();
  let results: IconData[] = data.filter(i => i.tags.some((t: any) => t.indexOf(search) > -1))
  results = results.filter(i => i.type === activeFilter);
  results.sort(function(a, b) {
    return a.index - b.index;
  });

  return (
    <div className="App">
      <div className="Control">
        <Filter
          filters={filters}
          activeFilter={activeFilter}
          onChange={(filter:FilterType) => setActiveFilter(filter)} />
        <Searchbar
          onChange={(value:string) => setQuery(value)}/>
      </div>

      <div className="Detail">
        <IconList
          query={query}
          icons={results} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <div dangerouslySetInnerHTML={{__html: spriteSVG}} />,
  document.getElementById('sprite')
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)