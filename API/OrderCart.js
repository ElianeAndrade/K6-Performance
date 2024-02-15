import http from 'k6/http';
import { sleep } from 'k6';

const chave = "homepointTK";
const token = "I+QSleskp9X7LrA6c5hhn3ZQWYPDC6TgKDFiXsoOk5NzMaQB3AQazCZtdpghfXDuVdcr+R0WQsC2BciKJxZwfNOrrDyzV/zr0upzMGqfugE0Y3uJEj6SRkevnaUKgU3du8uloNhDAXuZXzqeRYmrY9HA0ia5LZL+VHuf5JrZGqfGx0pmRAO1jZmaMpaXKtOflrMYgBuzSyYr/ySBWxf+Ug==";

export const options = {
    vus: 10,
    duration: '5s',
    thresholds: { //condições de sucesso
        http_req_failed: ['rate<0.01'], // taxa de erro menor de 1%
        http_req_duration:  ['p(95)<2000'], //95% das requisições precisa ter 2 segundos de duração
    }
};

export default function () {
    let data = {
        "campaign": "LACPF",
        "parameters": {
                "listSku": [
                {
                "sku": "ZZ0214",
                "quantity": 1,
                }
        ],
        "phoneNumber": "(44) 99894-5349",
        "personType": "CPF",
    }
};
    
    let response = http.post('linkAPI', JSON.stringify(data), {
        headers: { 
            'Content-Type': 'application/json', 
            'Chave-Acesso': chave, // Inclua a chave de acesso do cabeçalho
            'homepointTK': token, // Inclua o token de autenticação do cabeçalho
        }
    });


    console.log(response.body);

}

