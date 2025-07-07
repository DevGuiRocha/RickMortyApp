import React, {useState, useEffect, useLayoutEffect} from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchCharacterById } from "../api/Characters";
import styles from './CharacterDetail.module.css'

export default function CharacterDetail() {
    useLayoutEffect(() => window.scrollTo(0, 0), []);

    const { id } = useParams();
    const navigate = useNavigate();

    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await fetchCharacterById(id);
                setCharacter(data);
                setError(null);
            } catch (err) {
                setError('Não foi possível carregar os detalhes do personagem consultado.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) return <p className={styles.loading}>Carregando...</p>
    if (error) return <p className={styles.error}>{error}</p>
    if (!character) return null;

    const episodeIds = character.episode.map((url) => url.split('/').pop());

    return (
        <div className={styles.container}>
            <button
                className={styles.backButton}
                onClick={() => navigate(-1)}
            >
                Voltar
            </button>

            <h1 className={styles.title}>{character.name}</h1>

            <div className={styles.detail}>
                <img
                    src={character.image}
                    alt={character.name}
                    className={styles.image}
                />

                <div className={styles.info}>
                    <p><strong>Status:</strong> {character.status}</p>
                    <p><strong>Espécie:</strong> {character.species}</p>
                    {character.type && <p><strong>Tipo:</strong> {character.type}</p>}
                    <p><strong>Gênero:</strong> {character.gender}</p>
                    <p>
                        <strong>Origem:</strong>{' '}
                        <Link to={`/locations/${character.origin.url.split('/').pop()}`}>
                        {character.origin.name}
                        </Link>
                    </p>
                    <p>
                        <strong>Localização:</strong>{' '}
                        <Link to={`/locations/${character.location.url.split('/').pop()}`}>
                        {character.location.name}
                        </Link>
                    </p>
                </div>
            </div>

            <div className={styles.episodes}>
                <h2>Episódios</h2>
                <ul className={styles.episodeList}>
                    {episodeIds.map((epId) => (
                        <li key={epId} className={styles.episodeItem}>
                            <Link to={`/episodes/${epId}`} className={styles.episodeLink}>
                                Episodio {epId}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
