import React, { useState, useEffect } from 'react';
import './styles.css';
import '../../global.css';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import desligaImg from '../../assets/desliga.png';
import lixoImg from '../../assets/lixo.png';
import api from '../../services/api';

export default function Profile() {

    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const navigate = useNavigate();


    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        }).catch(err => {
            console.error("Error fetching incidents:", err);
        });
    }, [ongId]);



    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id)); 
        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente');
        }
    }




    function handleLogout() {
        localStorage.clear(); 
        navigate('/',  { replace: true });
    }




    return (
        <div className='profile-container'>
            <header>
                <img className='logo' src={logoImg} alt='Be the hero logo' />
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to='/incidents/new'>Cadastrar novo caso</Link>
                <button className="desligar" type="button" onClick={handleLogout}>
                    <img src={desligaImg} alt="deslogar"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.length === 0 ? (
                    <p>Você ainda não tem casos cadastrados.</p>
                ) : (
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>#{incident.id} - {incident.title}</p>
                            
                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>
    
                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
    
                            <button type='button' onClick={() => handleDeleteIncident(incident.id)}>
                                <img src={lixoImg} alt="deletar" />
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
