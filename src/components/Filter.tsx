import React, { useRef } from 'react';
import { FilterType } from '../declarations';

interface props {
  filters: FilterType[];
  activeFilter:string;
  onChange:Function;
}

export const Filter: React.SFC<props> = ({filters, activeFilter, onChange}) => {
  const el = useRef(null);

  return (
    <div className="Filter" ref={el}>
      {filters.map((filter) => (
        <div
          key={filter}
          className={`Filter-item${ (activeFilter === filter) ? ' is-active' : ''}`}
          onClick={() => onChange(filter)}>
          {filter}
        </div>
      ))}
    </div>
  )
}