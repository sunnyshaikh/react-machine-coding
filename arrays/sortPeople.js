const names = ["Mary", "John", "Emma"];
const heights = [180, 160, 170];

function sortPeople(names, heights) {
  // combine names and height as array of object
  const combine = names.map((name, i) => ({ name, height: heights[i] }));

  // sort combine array based on heights
  const sorted = combine.sort((a, b) => b.height - a.height);

  // get names from sorted array
  return sorted.map((obj) => obj.name);
}

console.log(sortPeople(names, heights));
