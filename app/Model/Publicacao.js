
let MongoDocument = require('./MongoDocument')

module.exports = class Publicacao extends MongoDocument {
    constructor (data) {
        super(data);
        this.titulo = data.titulo;
        this.texto = data.texto;
        this.date = data.date || new Date();
        this.usuario = data.usuario;
        this._id = data._id;
        this.collection = 'publicacoes';
    }
    static findOne (id) {
        return super.findOne(id, 'publicacoes').then((result) => {
            return new Publicacao(result);
        });
    }

    static find (query = {}, order = {titulo: 1}, limit = 5) {
        return super.find(query, order, limit, 'publicacoes').then((result) => {
            return result.map((u) => new Publicacao(u))
        });
    }

};