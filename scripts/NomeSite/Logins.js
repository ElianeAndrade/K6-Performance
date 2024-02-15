import { browser } from 'k6/experimental/browser';
import { check } from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js"

//Retorna o resultado no navegador
export function handleSummary(data) {
  return {
    "MetricasLogins.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}


export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      exec: 'TesteLogin',
      vus: 5,
      duration: '10s',
      options: {
        browser: {
          type: 'chromium',
        }
      }
    }
  }
};

export async function TesteLogin() {
  const context = browser.newContext();
  const page = context.newPage();
  const response = http.get('link');

  try {
    await page.goto('link');

    page.locator('input[name="email"]').type('login_atualizar');
    page.locator('input[name="password"]').type('senha_atualizar');

    const submitButton = page.locator('button[id="btnLogin"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    check(response, {
      'Texto "Regulamento" está presente': (r) => r.body.includes('Regulamento'),
    });
  } finally {
    page.close();
  }
}




//Ele adiciona APIs no nível do navegador para interagir com os navegadores e coletar métricas de desempenho