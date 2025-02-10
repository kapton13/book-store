import React from 'react';
import styles from './BookstoreCard.module.css';

const BookstoreCard = ({ store }) => {
    const { attributes, books } = store;
    const { name, website, rating, storeImage, establishmentDate } = attributes;

    return (
        <div className={styles.card}>
            <img className={styles.image} src={storeImage} alt={name} />
            <h3>{name}</h3>
            <p>⭐ {rating}</p>
            <p>Founded: {new Date(establishmentDate).toLocaleDateString()}</p>
            <a href={website} target="_blank" rel="noopener noreferrer">Visit Store</a>
            <div className={styles.books}>
                {books.length > 0 ? books.map(book => (
                    <p key={book.id}>{book.attributes.name} ({book.attributes.copiesSold} copies)</p>
                )) : <p>No data available</p>}
            </div>
        </div>
    );
};

export default BookstoreCard;