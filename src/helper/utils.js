const d3Collection = require('d3-collection');

function sortProjects(file) {
  const sortedByDate = file.sort(sortByDate);

  let highLightIndices = [];
  sortedByDate.forEach((proj, i) => {
    if (proj.isHighlight) {
      highLightIndices.push(i)
    }
  });

  highLightIndices.forEach((from, to) => {
    // one highlighted project is followed by 8 none highlighted
    sortedByDate.splice((to * 9), 0, sortedByDate.splice(from, 1)[0]);
  });
  return sortedByDate;
}

function sortByDate(a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
