import http from 'http';
import fs from 'fs';
import chalk from 'chalk';
import requests from 'requests';
import { log } from 'console';
const port = 5000;

const homeFile = fs.readFileSync('home.html', 'utf-8');

const replaceVal = function(tempVal, orgval) {
    let temperature = tempVal.replace('{%tempval%}', (orgval.main.temp).toFixed(2));
    temperature = temperature.replace('{%tempmin%}', (orgval.main.temp_min).toFixed(2));
    temperature = temperature.replace('{%tempmax%}', (orgval.main.temp_max).toFixed(2));
    temperature = temperature.replace('{%location%}', orgval.name);
    temperature = temperature.replace('{%country%}', orgval.sys.country);
    temperature = temperature.replace('{%tempStatus%}', orgval.weather[0].main);
    return temperature;
  };
  
const server = http.createServer((req, res) => {
  if (req.url == '/') {
    requests('https://api.openweathermap.org/data/2.5/weather?q=panjim,IN&APPID=bec5b3634233faab8a0119e47773c15a')
      .on('data', (chunk) => {
        const objData = JSON.parse(chunk);
        const arrData = [objData];
        console.log(arrData);
        const realTimeData = arrData.map((val) => replaceVal(homeFile,val)).join('');
        res.write(realTimeData);
      })
      .on('end', (err) => {
        if (err) return console.log('connection closed due to errors', err);
        res.end();
      });
  }
});

server.listen(port, () => {
  console.log(chalk.bgGreen(`Server listening on port ${port}`));
});
