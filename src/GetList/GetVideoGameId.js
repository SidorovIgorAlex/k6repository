import papaparse from './papaparse.js';
import http from 'k6/http';
import {check} from 'k6';
import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';

const csvData = new SharedArray('another data name', function () {
    return papaparse.parse(open('./data.csv'), { header: true }).data;
});

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
    // const number = csvData[scenario.iterationInTest].videoGameId;
    const number = scenario.iterationInTest;
    const request = http.get(`http://localhost:8080/app/videogames/${number}`);
    check(request, {'status is 200: ' : (r) => r.status == 200})
}