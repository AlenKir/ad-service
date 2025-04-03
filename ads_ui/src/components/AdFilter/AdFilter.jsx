import React from 'react';

const AdFilter = ({filter, setFilter}) => {
    return (
        <div>
            <input
                placeholder="Search"
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <select
                value={filter.sort}
                onChange={event => setFilter({ ...filter, sort: event.target.value })}
            >
                <option disabled value="">Sort By</option>
                <option key="title" value="title">Sort By Title</option>
                <option key="body" value="body">Sort By Body</option>
            </select>
        </div>
    );
};

export default AdFilter;