let client = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId;
let config = require('./config');
let conn = client.connect(config.uri, config.options).then((conn) => {
    // if (conn) return console.log(conn);

    return {
        db: conn.db(config.db),
        close: function () {
            conn.close();
        }
    };
});
conn.catch((err) => {
    throw err;
});
module.exports = class MongoDocument {
    save () {
        if (this._id) {
            return conn.then((conn) => {
                return conn.db.collection(this.collection).updateOne({_id: this._id}, {$set: this});
            });
        }
        return conn.then((conn) => {
            return conn.db.collection(this.collection).insertOne(this);
        });
    }
    savePubli () {
        if (this.id) {
            return conn.then((conn) => {
                return conn.db.collection(this.collection).updateOne({id: this.id}, {$set: this});
            });
        }
        return conn.then((conn) => {
            return conn.db.collection(this.collection).insertOne(this);
        });
    }
    delete () {
        if (this._id) {
            return conn.then((conn) => {
                return conn.db.collection(this.collection).deleteOne({_id: this._id});
            });
        }
        return null;
    }

    

    static findOne (Email, collection) {
        console.log("to no findOne");
        return conn.then((conn) => {
            console.log(Email);
            return conn.db.collection(collection).findOne({email: Email});
        });
    }

    static find (query = {}, sort = {}, limit = 5, collection) {
        return conn.then((conn) => {
            return conn.db.collection(collection).find(query)
                          .sort(sort).limit(limit).toArray();
        });
    }

    static close() {
        conn.then((conn) => {
            conn.close();
        });
    }
};