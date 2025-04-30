import React, { useState } from 'react';
import './styles.css';
import '../../global.css';
import heroesImg from '../../assets/together.png';
import logoImg from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom'; 
import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const navigate = useNavigate(); 

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('session', { id });
           
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            navigate('/profile');
        } catch (err) {
            alert('Falha no login');
        }
    }

    return ( 
        <div className='logon-container'>
            <section className="form">
                <img className='logo' src={logoImg} alt='Be the hero logo' />

                {/* Add onSubmit to handle form submission */}
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        value={id}
                        onChange={e => setId(e.target.value)}
                        placeholder='Sua ID' 
                    />
                    <button className='button' type='submit'>Entrar</button>
                    <div className='cadastro'>
                        <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/enter-2.png" alt="enter-2"/>
                        <Link className='linkando' to="/register">Não tenho cadastro</Link>
                    </div>
                </form>
            </section>
            <img className='hero' src={heroesImg} alt="Um grupo de pessoas construindo o quebra-cabeças de uma casa" />
        </div>
    );
}
