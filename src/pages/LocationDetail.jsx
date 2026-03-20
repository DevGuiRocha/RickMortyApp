import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchLocationsById } from "../api/Locations";
import { fetchCharacterByIds } from "../api/Characters";
import styles from './LocationDetail.module.css';

export default function LocationDetail() {
    useLayoutEffect(() => window.scrollTo(0, 0), []);

    const { id } = useParams();
    const navigate = useNavigate();

    const [location, setLocation] = useState(null);
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await fetchLocationsById(id);
                setLocation(data);
                
                if (data.residents.length > 0) {
                    const residentIds = data.residents.map((url) => url.split('/').pop());
                    const residentsData = await fetchCharacterByIds(residentIds);
                    setResidents(Array.isArray(residentsData) ? residentsData : [residentsData]);
                } else {
                    setResidents([]);
                }
                
                setError(null);
            } catch {
                setError('Não foi possível carregar os detalhes da localidade consultada.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) return <p className={styles.loading}>Carregando...</p>
    if (error) return <p className={styles.error}>{error}</p>
    if (!location) return null;

    return (
        <div className={styles.container}>
            <button
                className={styles.backButton}
                onClick={() => navigate(-1)}
            >
                ← Voltar
            </button>

            <h1 className={styles.title}>{location.name}</h1>

            <div className={styles.detail}>
                <div className={styles.info}>
                    <p>
                        <strong>Tipo:</strong> {location.type}
                    </p>
                    <p>
                        <strong>Dimensão:</strong> {location.dimension}
                    </p>
                    <p>
                        <strong>Residentes:</strong> {location.residents.length}
                    </p>
                </div>
            </div>

            {residents.length > 0 ? (
                <div className={styles.residents}>
                    <h2>Residentes desta localidade</h2>
                    <div className={styles.residentGrid}>
                        {residents.map((char) => (
                            <Link 
                                to={`/characters/${char.id}`} 
                                key={char.id}
                                className={styles.residentCard}
                            >
                                <img 
                                    src={char.image} 
                                    alt={char.name}
                                    className={styles.residentImage}
                                />
                                <div className={styles.residentInfo}>
                                    <h3 className={styles.residentName}>{char.name}</h3>
                                    <p className={styles.residentStatus}>{char.status}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.noResidents}>
                    <p>Nenhum residente conhecido nesta localidade.</p>
                </div>
            )}
        </div>
    );
}
