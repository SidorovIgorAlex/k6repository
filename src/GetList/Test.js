import testGetVideoGameId from "./GetVideoGameId.js";
import testGetListVideoGames from "./GetListVideoGames.js";
import testEditVideoGame from "./EditVideoGameId.js";
import testCreateVideoGame from "./CreateVideoGame.js";

export const options = {
    scenarios: {
        testGetVideoGameId: {
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
        },
        testGetListVideoGames: {
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
        },
        testEditVideoGame : {
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
        },
        testCreateVideoGame: {
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
        },
    },
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(90) < 200']
    }
};

export default function () {
    testGetListVideoGames();
    testGetVideoGameId();
    testEditVideoGame();
    testCreateVideoGame();
}