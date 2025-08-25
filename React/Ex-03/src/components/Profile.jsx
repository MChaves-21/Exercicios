import './Profile.css';

export default function Profile({ avatar, name, bio, email, phone, github, linkedin, twitter }) {
    return (
        <div className="profile-container">
            <img className="profile-avatar" src={avatar} alt={`Avatar de ${name}`} />
            <h1 className="profile-name">{name}</h1>
            <p className="profile-bio">{bio}</p>
            
            <p><strong>E-mail:</strong> {email}</p>
            <p><strong>Telefone:</strong> {phone}</p>
            <p><strong>GitHub:</strong> <a href={github} target="_blank" rel="noopener noreferrer">Acessar perfil</a></p>
            <p><strong>LinkedIn:</strong> <a href={linkedin} target="_blank" rel="noopener noreferrer">Acessar perfil</a></p>
            <p><strong>Twitter:</strong> <a href={twitter} target="_blank" rel="noopener noreferrer">Acessar perfil</a></p>
        </div>
    );
}
