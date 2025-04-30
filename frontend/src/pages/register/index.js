import React, { useState } from 'react';
import './styles.css';
import '../../global.css';
import { Link, useNavigate } from 'react-router-dom'; 
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [rua, setRua] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const navigate = useNavigate();



    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            telefone,
            rua,
            city,
            uf,
        };

        if (!name || !email || !whatsapp || !city || !uf) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const response = await api.post('ong', data);

            alert(`Seu ID de acesso é ${response.data.id}. 
                Por favor, anote e guarde em segurança, ele será necessário para logar futuramente.`);

            navigate('/'); // Use navigate() instead of history.push()
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    // Return the JSX for the component
    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img className='logo' src={logoImg} alt='Be the hero logo' />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ong</p>
                    <div className='cadastro'>
                        <img width="15" height="15" src="https://img.icons8.com/metro/26/back.png" alt="back" />
                        <Link className='linkando' to="/">Voltar</Link>
                    </div>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Nome da ONG'></input>

                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type='email' placeholder='Email'></input>

                    <input
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                        placeholder='Telefone'></input>

                    <input
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        placeholder='Whatsapp'></input>

                    <input
                        value={rua}
                        onChange={e => setRua(e.target.value)}
                        placeholder='Rua'></input>

                    <div className='input-group'>
                        <input
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder='Cidade'></input>

                        <input
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            placeholder='UF' style={{ width: '80px' }}></input>
                    </div>
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
