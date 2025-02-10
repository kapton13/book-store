import React from 'react';
import BookstoreCard from '../BookstoreCard/BookstoreCard';
import styles from './BookstoreList.module.css';

const BookstoreList = ({ stores }) => {
    return (
        <div className={styles.listContainer}>
            {stores.map(store => (
                <BookstoreCard key={store.id} store={store} />
            ))}
        </div>
    );
};

export default BookstoreList;