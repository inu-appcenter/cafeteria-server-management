import config from '../../config';
import request from 'graphql-request';

class Repository {

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async getAllCafeteria() {
        return this._doRequest(`
        allCafeteria {
            id
            name
            display_name
            support_menu
            support_discount
            support_notification
        }
        `)
    }

    async _doRequest(query) {
        return (await request(this.endpoint, query)).data;
    }
}

const repository = new Repository(config.server.endpoint);

export default repository;