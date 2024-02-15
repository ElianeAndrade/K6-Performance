import http from 'k6/http';
import { browser } from 'k6/experimental/browser';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js"

//Retorna o resultado no navegador
export function handleSummary(data) {
  return {
    "MetricasLogin.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
          timeout: '120s',
        },
      },
    },
  },
  thresholds: {
    checks: ["rate==1.0"]
  }
}

export default async function () {
  const context = browser.newContext();
  const page = context.newPage();
  const response = http.get('link');

  try {
    await page.goto('link');

    page.locator('input[name="email"]').type('eandrade@tecnologiaunica.com.br');
    page.locator('input[name="password"]').type('Teste@123');

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