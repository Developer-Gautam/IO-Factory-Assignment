
const blockHeight = [0,4,0,0,0,6,0,6,4,0];
const width = 50;
const height = 50;
const gap = 5;

// compute the maximum height of the blocks
const maxHeight = Math.max(...blockHeight);

// compute the total width of the SVG
const totalWidth = blockHeight.length * (width + gap) + gap;

// create the SVG element
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", totalWidth);
svg.setAttribute("height", maxHeight + 50); // add some padding for labels

// add the blocks to the SVG
let x = gap;
for (let i = 0; i < blockHeight.length; i++) {
  const block = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  block.setAttribute("x", x);
  block.setAttribute("y", maxHeight - blockHeight[i]);
  block.setAttribute("width", width);
  block.setAttribute("height", blockHeight[i]);
  block.setAttribute("fill", "grey");
  svg.appendChild(block);
  x += width + gap;
}

// compute the units of water stored
let totalWater = 0;
for (let i = 1; i < blockHeight.length - 1; i++) {
  const left = Math.max(...blockHeight.slice(0, i));
  const right = Math.max(...blockHeight.slice(i + 1));
  const water = Math.max(Math.min(left, right) - blockHeight[i], 0);
  totalWater += water;
  const waterBlock = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  waterBlock.setAttribute("x", i * (width + gap) + gap);
  waterBlock.setAttribute("y", maxHeight - blockHeight[i] - water);
  waterBlock.setAttribute("width", width);
  waterBlock.setAttribute("height", water);
  waterBlock.setAttribute("fill", "blue");
  svg.appendChild(waterBlock);
}

// add the text labels
const unitsLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
unitsLabel.setAttribute("x", totalWidth / 2);
unitsLabel.setAttribute("y", maxHeight + 40);
unitsLabel.setAttribute("text-anchor", "middle");
unitsLabel.setAttribute("font-size", "20");
unitsLabel.textContent = `${totalWater} Units of Water`;
svg.appendChild(unitsLabel);

const heightLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
heightLabel.setAttribute("x", totalWidth / 2);
heightLabel.setAttribute("y", maxHeight + 70);
heightLabel.setAttribute("text-anchor", "middle");
heightLabel.setAttribute("font-size", "20");
heightLabel.textContent = `Block Height: ${blockHeight}`;
svg.appendChild(heightLabel);

// append the SVG to the document
document.body.appendChild(svg);
