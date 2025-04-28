import connection from "../database/connection.js";


export default {
    async login(req, res){
        const { id } = req.body;
        const ong = await connection('ong').where('id', id).select('name').first();

        if(!ong) {
            return res.status(400).json({ error: 'Nenhuma ONG cadastrada com este ID' });
        }
        return res.json(ong);
    }
}