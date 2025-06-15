import React from 'react';
import styles from './Pagination.module.css';

function Pagination({ info, page, setPage }) {
    const { prev, next, pages } = info

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => setPage(1)}
                disabled={page === 1}
            >
                Primeira
            </button>
            <button
                onClick={() => setPage(prev ? page - 1 : page)}
                disabled={!prev}
            >
                Anterior
            </button>
            <span className={styles.pageInfo}>
                Página {page} de {pages}
            </span>
            <button
                onClick={() => setPage(next ? page + 1 : page)}
                disabled={!next}
            >
                Próxima
            </button>
            <button
                onClick={() => setPage(pages)}
                disabled={page === pages}
            >
                Última
            </button>
        </div>
    )
}

export default Pagination