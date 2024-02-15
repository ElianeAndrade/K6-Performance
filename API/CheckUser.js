import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 5,
    duration: '5s',
    thresholds: { //condições de sucesso
        http_req_failed: ['rate<0.01'], // taxa de erro menor de 1%
        http_req_duration:  ['p(95)<2000'], //95% das requisições precisa ter 2 segundos de duração
    }
};

export default function () {
    let data = {
        "culture": "pt-BR",
	        "parameters": {
	            "phoneNumber": "(44) 998945349"
    }
};
    
    let response = http.post('linkdaAPI', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    });

    console.log(response.body);
}


