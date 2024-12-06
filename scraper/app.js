// scraper/app.js
const axios = require('axios');
const cheerio = require('cheerio');
const sendEmail = require('../email/app.js');  // Corrigido a importação

const scrapeData = async () => {
  try {
    const response = await axios.get('https://www.espn.com.br/nba/classificacao');
    const $ = cheerio.load(response.data);
    
    let rankings = '';
    $('table.Table__TBODY').find('tr').each((i, element) => {
      const team = $(element).find('td').eq(0).text();
      const wins = $(element).find('td').eq(1).text();
      const losses = $(element).find('td').eq(2).text();
      
      if (team && wins && losses) {
        rankings += `#${i + 1} - ${team}: ${wins}W / ${losses}L\n`;
      }
    });

    // Envia o email com as informações coletadas
    sendEmail('Classificação NBA', rankings); 
  } catch (error) {
    console.log('Erro ao fazer o scrape: ', error);
  }
};

scrapeData();
