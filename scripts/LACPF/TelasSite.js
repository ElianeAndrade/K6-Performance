import http from 'k6/http'
import { check, sleep, group } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js"


export function handleSummary(data) {
  return {
    "MetricasTelasSite.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}


export const options = {
    stages: [
        // { duration: '1m', target: 60},
        { duration: '20s', target: 5},
        { duration: '10s', target: 5},
        { duration: '5s', target: 5},
        //{ duration: '3m', target: 300 },

    ],
    thresholds: { //condições de sucesso
        // vai gerar erro se mais de 90% das solicitações levarem mais de 2 segundos para serem concluídas
        http_req_duration: [
            {
                threshold: 'p(90) < 20000',
                abortOnFail: true,
                delayAbortEval: 100
            }
        ]
    }
}

export default function(){
    //Verificar home
    group('Home', function(){

        check(http.get('link'), { "OK": (r) => r.status === 200 });
        sleep(10);
    });

        //Verificar a tela dos produtos : doce leite + caixa lacta
        group('Produtos', function(){
    
            check(http.get('link'), { "OK": (r) => r.status === 200 });
            sleep(10);
      
        })

    
    group('Login', function(){
        const responses = http.batch([
            'https://parceirolacta.com.br/Account/LogOn',
        ]);

        check(responses[0], { "OK": (r) => r.status === 200 } );
        sleep(10);
    });

}

