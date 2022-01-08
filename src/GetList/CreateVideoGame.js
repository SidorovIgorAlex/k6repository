import http from 'k6/http';
import {check} from 'k6';
import {scenario} from 'k6/execution';
import {randomString} from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export const options = {
    scenarios: {
        createVideoGame: {
            executor: 'ramping-arrival-rate',
            startTime: '3s',
            startRate: 10,
            timeUnit: '1s',
            stages: [
                {target: 20, duration: '1m'},
                {target: 20, duration: '1m'},
                {target: 30, duration: '1m'},
                {target: 30, duration: '1m'},
            ],
            preAllocatedVUs: 10,
            maxVUs: 20
        }
    },
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(90) < 200']
    }
};

export default function createVideoGame () {
    const number = scenario.iterationInTest * 100;
    const date = new Date();
    const name = randomString(10);
    const category = randomString(5);
    const rating = randomString(5);
    let dataForCreate = JSON.stringify({
        "id": number,
        "name": name,
        "releaseDate": date,
        "reviewScore": 0,
        "category": category,
        "rating": rating
    })

    const createRequest = http.post(`http://localhost:8080/app/videogames/`, dataForCreate, {
        headers: { 'Content-Type': 'application/json' },
    });
    check(createRequest, {'status is 200: ': (r) => r.status == 200});
    check(createRequest, {'verify body response: ': (r) => r.body.includes('{"status": "Record Added Successfully"}')});
}