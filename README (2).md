# Introduction 
Projeto de teste de carga para o site LACPFJ.

# Getting Started
1. Subir os containers (K6 e Grafana): docker-compose up -d
2. Abrir o dashboard do grafana http://localhost:3000/d/k6/k6-load-testing-results?orgId=1&refresh=5s
3. Para execular o teste e verificar o relatório no dashboard do grafana: k6 run homeSite.js --out influxdb=http://localhost:8086/
4. Executar o teste de exemplo: k6 run homeSite.js
5. Graceful Stop" (parada suave) ocorrerá em 30 segundos. Durante a parada suave, o K6 permite que as VUs concluam suas iterações atuais antes de encerrar, garantindo uma interrupção suave do teste.


Documentação do K6
https://k6.io/docs/


Script para verificar histórico de logins
/*use dbPRW

select FirstAccessDate,LastAccessDate,* from tbParticipant with(nolock) where idCampaign = 'MIPMK' and parDocumentID = '02957553007'
select top 10 * from HistoryLoginParticipant with(nolock) where ParticipantId = 10880086 order by DtTime desc

acessar banco em prod para verificar
*/