const Model = require('../db/model.js');
module.exports =  new class UsersModel extends Model {

    constructor(){
        super('users');
    }

}