var GRID_SIZE = 10
var gameGrid = null;
var forbiddenCells = [];

function initGame() {
  forbiddenCells = [];
  gameGrid = buildGrid();
  drawGrid();
}

/**
 * Function to render the game
 */
function drawGrid() {
  var htmlGrid = document.getElementById('grid');
  htmlGrid.innerHTML = null;
  gameGrid.forEach(cell => {
    htmlGrid.appendChild(cell);
  })
}

/**
 * Add .path CSS class to the path's cells if there is a solution
 */
function buildPath() {
  const path = getSolutionPath();
  if(path) {
    path.forEach(setCellInPath);
  }
}

/**
 * Add .forbidden CSS class to forbidden cells
 */
function buildForbiddenCells() {
  forbiddenCells.forEach(setCellForbidden)
}

/**
 * Creates a new array of divs representing grid's cells
 */
function buildGrid() {
  var grid = new Array(GRID_SIZE * GRID_SIZE).fill(null);
  grid = grid.map((_, index) => buildCell(index));
  return grid;
}

/**
 * Creates a div HTML node with cell style and onClick event
 * @param {Number} index the index of the cell in the array holding the grid
 */
function buildCell(index) {
  var cell = document.createElement('div');
  if(index === 0) {
    cell.innerHTML = '🤖';
  } else if(index === GRID_SIZE * GRID_SIZE - 1) {
    cell.innerHTML = '🏁';
  }
  cell.classList.add('cell');
  cell.addEventListener('click', function() {
    handleCellClicked(index);
  })
  return cell;
}

/**
 * Styles a cell as part of the path
 * @param {Number} index the index of the cell in the array holding the grid
 */
function setCellInPath(index) {
  gameGrid[index].classList.add('path');
}

/**
 * Styles a cell as forbidden in the path
 * @param {Number} index the index of the cell in the array holding the grid
 */
function setCellForbidden(index) {
  gameGrid[index].classList.add('forbidden');
}

/**
 * Handle when a cell is clicked to toggle its state (forbidden / not forbidden)
 * @param {Number} cellIndex the index of the cell in the array holding the grid
 */
function handleCellClicked(cellIndex) {
  if(cellIndex === 0 || cellIndex === GRID_SIZE * GRID_SIZE - 1) {
    return;
  }

  forbiddenCellIndex = forbiddenCells.indexOf(cellIndex);
  
  // If this cell is already forbidden
  if (forbiddenCellIndex !== -1) {
    forbiddenCells = removeAt(forbiddenCells, forbiddenCellIndex)
  } else {
    forbiddenCells.push(cellIndex);
  }

  // Clear previous path
  gameGrid = buildGrid();

  // Build & Draw result
  buildForbiddenCells();
  buildPath();
  drawGrid();
}

/**
 * Function that uses RobotInAGrid Object to find the solution path
 */
function getSolutionPath() {
  const forbidenCoords = forbiddenCells.map(getCoordFromIndex);
  const solutionPathCoords = new RobotInAGrid(GRID_SIZE, GRID_SIZE, forbidenCoords).findPath();
  if(solutionPathCoords) {
    const solutionPathIndexes = solutionPathCoords.map(getIndexFromCoord);
    return solutionPathIndexes;
  } 

  return null;
}

/**
 * Helpers
 */

function getCoordFromIndex(index) {
  const x = index % GRID_SIZE;
  const y = Math.floor(index / GRID_SIZE);
  return [x, y];
}

function getIndexFromCoord(coord) {
  const [x, y] = coord;
  return y * GRID_SIZE + x;
}

function removeAt(arr, index) {
  const before = arr.slice(0, index);
  const after = arr.slice(index+1);
  return [].concat(before, after)
}