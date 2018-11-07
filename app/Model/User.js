
let MongoDocument = require('./MongoDocument')

module.exports = class User extends MongoDocument {
    constructor (data) {
        super(data);
        this.nome = data.nome;
        this.email = data.email;
        this.senha = data.senha;
        this._id = data._id;
        this.collection = 'usuarios';
    }
    static findOne (_id) {
        return super.findOne(_id, 'usuarios').then((result) => {
            return new User(result);
        });
    }

    static find (query = {}, order = {nome: 1}, limit = 5) {
        return super.find(query, order, limit, 'usuarios').then((result) => {
            return result.map((u) => new User(u))
        });
    }

};