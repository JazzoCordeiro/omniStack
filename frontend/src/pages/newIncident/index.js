import React, {useState} from 'react';
import './styles.css';
import '../../global.css';
import logoImg from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';


export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId')
    const navigate = useNavigate();

    async function handleNewIncident(e) {
        e.preventDefault();
    
        const data = {
        title,
        description,
        value
    };
    try {
        await api.post('incidents', data, 
            {
                headers: {
                    Authorization: ongId, 
                }
            }
        ); alert('Caso registrado com sucesso!');
        navigate('/profile');
    }catch(err){
        alert('Erro ao registrar o caso.')
    }
    }


    return (
             <div className='new-incident-container'>
        <div className='content'>
            <section>
                <img className='logo' src={logoImg} alt='Be the hero logo' />

                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                <p>Descreva detalhadamente o caso.</p>
                <div className='cadastro'>
                <img width="15" height="15" src="https://img.icons8.com/metro/26/back.png" alt="back" />
                    <Link className='linkando' to="/profile">Voltar para a tela inicial</Link>
                </div>

 
            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                placeholder='Título do caso'
                value={title}
                onChange={e => setTitle(e.target.value)}
                ></input>
                <textarea 
                placeholder='Descrição do caso'
                value={description}
                onChange={e => setDescription(e.target.value)}
                ></textarea>
                <input 
                placeholder='Valor em reais'
                value={value}
                onChange={e => setValue(e.target.value)}
                ></input>
                <button className='button' type='submit'>Cadastrar</button>
            </form>
        </div>
    </div>
    )}