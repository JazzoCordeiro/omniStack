import crypto from 'crypto';
import connection from '../database/connection.js';


export default {

  async index (req, res) {
    const ong = await connection('ong').select('*')
    return res.json(ong)
},


    async create(req, res) {
        const { name, email, whatsapp, telefone, rua, city, uf } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');

  await connection('ong').insert({
    id, 
    name,
    email,
    whatsapp, 
    telefone, 
    rua, 
    city, 
    uf
  })
  return res.json({id});
    }

};