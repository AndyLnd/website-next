const fs = require('fs');
const m2j = require('markdown-to-json');
const path = require('path');

const projectPath = path.resolve(__dirname, 'projects');
const outputPath = path.resolve(__dirname, 'projects.json');

const projects = fs.readdirSync(projectPath).map(name => path.resolve(__dirname, 'projects', name));
const projectData = JSON.parse(m2j.parse(projects, { width: 0 }));


const cleanData = Object.keys(projectData).map(key => {
  return projectData[key];
});

fs.writeFile(outputPath, JSON.stringify(cleanData), err => {
  if (err) {
    throw err;
  }

  console.log('successfully wrote projects data');
});

