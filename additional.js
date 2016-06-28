function decideWhich(year, graph) {
  var arr = {};
  arr["nodes"] = [];
  arr["links"] = [];
  graph.forEach(function (d) {
    if (d.Year == year) {
    arr.nodes.push({ "name": d.Origin});
    arr.nodes.push({ "name": d['Country / territory of asylum/residence']});
    arr.links.push({ "source": d.Origin,
    "target": d['Country / territory of asylum/residence'],
    "value": +d['Refugees (incl. refugee-like situations)'] });
  }
  });
// return only the distinct / unique nodes
arr.nodes = d3.keys(d3.nest().key(function (d) { return d.name; }).map(arr.nodes));
// loop through each link replacing the text with its index from node
arr.links.forEach(function (d, i) {
  arr.links[i].source = arr.nodes.indexOf(arr.links[i].source);
  arr.links[i].target = arr.nodes.indexOf(arr.links[i].target);
});
//now loop through each nodes to make nodes an array of objects
// rather than an array of strings
arr.nodes.forEach(function (d, i) {
  arr.nodes[i] = { "name": d };
});
return arr;
}