import React from 'react';
import styles from './AdFilter.module.css';

const AdFilter = ({ filter, setFilter }) => {
    return (
        <div className={styles.adFilter}>
            <input
                className={styles.adFilter__input}
                placeholder="Search"
                value={filter.query}
                onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            />
            <select
                className={styles.adFilter__select}
                value={filter.sort}
                onChange={(event) => setFilter({ ...filter, sort: event.target.value })}
            >
                <option disabled value="">
                    Sort By
                </option>
                <option key="created_at" value="created_at">
                    Newest First
                </option>
                <option key="price" value="price">
                    Cheapest First
                </option>
                <option key="title" value="title">
                    Headline
                </option>
            </select>
        </div>
    );
};

export default AdFilter;
