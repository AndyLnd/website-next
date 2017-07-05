const d3Collection = require('d3-collection');

function sortProjects(file) {
  //const sortedByDate = file.sort(sortByDate);
  let highlightProjects = [];
  let projects = [];
  //separate highlight projects from regular ones
  file.forEach((proj, i) => {
    proj.isHighlight ? highlightProjects.push(proj) : projects.push(proj);
  })

  projects = projects.sort(sortByDate);

  //put projects in right order
  let allProjects = [];
  const gridSize = 8;
  highlightProjects.sort(sortByPosition).forEach((proj, i) => {
    allProjects.push(proj);
    for(let j = 0; j < gridSize; j++){
      allProjects.push(projects[(i * gridSize) + j] || {});
    }
  })
  //add last projects to array
  const projectsInArray = allProjects.length - highlightProjects.length;
  if(projects.length > projectsInArray) {
    allProjects = allProjects.concat(projects.splice(projectsInArray, projects.length - projectsInArray));
  }
  return allProjects;
}

function sortByDate(a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function sortByPosition(a, b) {
    return a.position - b.position;
}

function groupAwards(awards) {
  return d3Collection.nest()
    .key(d => d.year)
    .entries(awards);
}

module.exports = {
  sortProjects,
  groupAwards
}
