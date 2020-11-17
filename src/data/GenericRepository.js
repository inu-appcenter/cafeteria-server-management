import config from '../../config';
import request from 'graphql-request';

class GenericRepository {

    constructor() {
        this.endpoint = config.server.endpoint;
    }

    async query(taskName, queryName, type) {
        const query = `
            query ${taskName}{
                ${queryName} {
                    ${type.fields().map((field) => field.name).join('\n')}
                }
            }            
        `;

        console.log(`자자 쿼리 날립니다! 이름은 ${taskName}, 리소스는 ${queryName}!`);

        const response = await this._doRequest(query);
        const rawResult = response[queryName];

        console.log(`결과 도착~!~! ${queryName}의 결과가 ${rawResult.length}개 왔네요!`);

        return rawResult.map((raw) => new type(raw));
    }

    async mutate(taskName, queryName, variables) {
        const query = `
            mutation ${taskName}(${variables.map((v) => `$${v.name}: ${v.type}`).join(', ')}) {
                ${queryName}(${variables.map((v) => `${v.name}: $${v.name}`).join(', ')})
            }
        `;

        console.log(`자자 뮤테이션 쿼리 날립니다! 이름은 ${taskName}, 리소스는 ${queryName}!`);

        const queryVariables = {};
        for (const v of variables) {
            queryVariables[v.name] = v.value;
        }

        const response = await this._doRequest(query, queryVariables);
        const rawResult = response[queryName];

        console.log(`결과 도착~!~! 변경된 row의 수가 ${rawResult}개라네요!`);

        const succeeded = this._decodeMutationResult(rawResult);
        console.log(succeeded ? '뮤테이션 성공~!' : '뮤테이션 실패!!');

        return succeeded;
    }

    async _doRequest(query, variables) {
        return await request(this.endpoint, query, variables)
    }

    _decodeMutationResult(result) {
        return (result === 1); // 1 means success
    }
}

export default GenericRepository;