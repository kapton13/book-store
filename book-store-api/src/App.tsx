import React, { useEffect, useState } from 'react';
import BookstoreList from './components/BookstoreList/BookstoreList';
import styles from './App.module.css';
import axios from 'axios';

interface Book {
    id: string;
    type: string;
    attributes: {
        name: string;
        copiesSold: number;
    };
}

interface Store {
    id: string;
    type: string;
    attributes: {
        name: string;
        website: string;
        rating: number;
        storeImage: string;
        establishmentDate: string;
    };
    relationships: {
        books?: {
            data: { id: string; type: string }[];
        };
    };
    books?: Book[];
}

interface ResponseData {
    data: Store[];
    included: Book[];
}

const BookStoreApp: React.FC = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<ResponseData>('http://localhost:3000/stores');
                const { data, included } = response.data;

                const storesWithBooks = data.map(store => {
                    const books = store.relationships.books?.data || [];
                    const bookDetails: Book[] = books
                        .map(bookRef => included.find(item => item.type === 'books' && item.id === bookRef.id))
                        .filter((book): book is Book => !!book) // Убираем undefined
                        .sort((a, b) => b.attributes.copiesSold - a.attributes.copiesSold)
                        .slice(0, 2);

                    return { ...store, books: bookDetails };
                });

                setStores(storesWithBooks);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <BookstoreList stores={stores} />
        </div>
    );
};

export default BookStoreApp;