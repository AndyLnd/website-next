const RssParser = require('rss-parser');
const d3TimeFormat = require('d3-time-format');
const fs = require('fs');
const path = require('path');

const output = path.resolve(__dirname, 'src', 'data', 'blogposts.json');

const dateFormatter = d3TimeFormat.timeFormat('%d %B %Y');

const result = [];

RssParser.parseURL('https://blog.webkid.io/rss.xml', (err, data) => {
  data.feed.entries.forEach(entry => {
    result.push({
      title: entry.title,
      link: entry.link,
      date: dateFormatter(new Date(entry.pubDate)),
      text: entry.contentSnippet,
      link: entry.link
    });
  });

  fs.writeFile(output, JSON.stringify(result), err => {
    if (err) {
      throw err;
    }

    console.log('blogposts written to:', output);
  });
});