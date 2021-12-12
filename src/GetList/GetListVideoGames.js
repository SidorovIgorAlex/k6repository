import http from 'k6/http';
import {check} from 'k6';

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

export default function getListVideoGames() {
    const request = http.get('http://localhost:8080/app/videogames');
    check(request, {'status is 200: ' : (r) => r.status == 200})
}