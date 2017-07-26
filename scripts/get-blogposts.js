const axios = require('axios');
const d3TimeFormat = require('d3-time-format');
const fs = require('fs');
const path = require('path');

const output = path.resolve(__dirname, '..', 'src', 'data', 'blogposts.json');

const dateFormatter = d3TimeFormat.timeFormat('%d %B %Y');

const result = [];

const getExcerpt = (text) => {
  if (text !== '') {
    return text.split(' ').splice(0,25).join(' ') + '…';
  }
  return '…';
}

axios.get('https://blog.webkid.io/content.json')
  .then(function (response) {
    response.data.forEach(entry => {
      result.push({
        title: entry.title,
        link: entry.permalink,
        date: dateFormatter(new Date(entry.date)),
        text: getExcerpt(entry.text),
        image: `${entry.permalink}${entry.image}`,
        thumbnail: `${entry.permalink}${entry.thumbnail}`
      })
    });

    fs.writeFile(output, JSON.stringify(result), err => {
      if (err) {
        throw err;
      }

      console.log('blogposts written to:', output);
    });
  })

  .catch(function (error) {
    console.log(error);
  });
