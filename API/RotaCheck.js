import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import { check, fail, } from 'k6';

export let CheckRegisteredDuration = new Trend('check_registered_duration');
export let CheckRegisteredFailRate = new Rate('check_registered_fail_rate');
export let CheckRegisteredSucessRate = new Rate('check_registered_sucess_rate');
export let CheckRegisteredReqs = new Rate('check_registered_reqs');

export default function () {
    let res = http.post('linkAPI') 

    CheckRegisteredDuration.add(res.timings.duration);
    CheckRegisteredReqs.add(1);
    CheckRegisteredFailRate.add(res.status == 0 || res.status > 399);
    CheckRegisteredSucessRate.add(res.status < 399);

    let durationMsg = 'Max Duration ${1000/1000}s'
    if(!check(res,{
        'max duration' : (r) => r.timings.duration < 1000,})) 
        {
            fail(durationMsg);
        }
}

sleep(1);

//k6 run check.js --vus 5 --duration 60s