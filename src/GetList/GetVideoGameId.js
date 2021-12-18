import http from 'k6/http';
import {check} from 'k6';
import {randomIntBetween} from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

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

export default function getVideoGameId() {
    const number = randomIntBetween(1, 10);
    const request = http.get(`http://localhost:8080/app/videogames/${number}`);
    check(request, {'status is 200: ' : (r) => r.status == 200})
}