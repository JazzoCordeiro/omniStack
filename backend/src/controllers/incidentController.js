import connection from "../database/connection.js";

export default {
    async index(req, res){

        const{ page = 1 } = req.query;

//parar contar o número total de incidents
        const [count] = await connection('incidents').count();

//para retornar e limitar o número máximo de incidents por página
        const incidents = await connection('incidents')
//para pegar informações do outro banco de dados
.join('ong', connection.raw('REPLACE(incidents.ong_id, \'"\' , \'\')'), '=', 'ong.id') 
//paginação
        .limit(10)
        .offset((page - 1) * 10)
//especificando que quero todos os dados de incidentes e apenas alguns da tabela ong
        .select(['incidents.*', 
            'ong.name', 
            'ong.email', 
            'ong.whatsapp', 
            'ong.city', 
            'ong.uf']);

//para retornar o número total de incidents.
        res.header('X-Total-Count', count['count(*)']);
        return res.json(incidents);
    },


    async create(req, res) {
        const{ title, description, value } = req.body;
        const ong_id = req.headers.authorization;
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return res.json({ id });
    },
    
    async delete(req, res){
        const{ id } = req.params;
        const ong_id = req.headers.authorization;
  
        const incident = await connection('incidents').where('id', id).select('ong_id').first();
  
        if(incident.ong_id !== ong_id) {
          return res.status(401).json({ error: 'Operação não permitida. '});
        }
        await connection('incidents').where('id', id).delete();
        return res.status(204).send();
      }
};