function Pagination({ info, page, setPage }) {
    return (
        <div>
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={!info.prev}
            >
                Anterior
            </button>
            <span>Página {page} de {info.pages}</span>
            <button
                onClick={() => setPage((prev) => Math.min(prev + 1, info.pages))}
                disabled={!info.next}
            >
                Próxima
            </button>
        </div>
    )
}

export default Pagination