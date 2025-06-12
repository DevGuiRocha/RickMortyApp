import { Link } from 'react-router-dom';

function CharacterCard({ character }) {
    return(
        <Link to={`/character/${character.id}`} className='card'>
            <img src={character.image} alt={character.name} />
            <div className="card-body">
                <h3>{character.name}</h3>
                <p>Status: {character.status}</p>
                <p>Espécie: {character.species}</p>
            </div>
        </Link>
    )
}

export default CharacterCard;