function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const aStarData = {
  id: 'aStar',
  name: 'A* Search (Grid)',
  category: 'Pathfinding',
  defaultInput: {
    gridSize: 5
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let n = parseInt(input.gridSize, 10);
    if (isNaN(n) || n < 3) n = 5;
    if (n > 10) n = 10;
    
    // Create grid: ' ', '█', 'S', 'E'
    let grid = Array(n).fill().map(() => Array(n).fill(' '));
    grid[0][0] = 'S';
    grid[n-1][n-1] = 'E';
    
    // Predetermined walls so it's consistent
    if (n === 5) {
       grid[0][2] = '█'; grid[0][3] = '█';
       grid[1][1] = '█'; 
       grid[2][1] = '█'; grid[2][3] = '█'; grid[2][4] = '█';
       grid[3][3] = '█';
    } else {
        // generic maze-like walls for other sizes
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if ((i !== 0 || j !== 0) && (i !== n-1 || j !== n-1) && ((i*2+j)%3 === 1)) {
                    grid[i][j] = '█';
                }
            }
        }
        grid[n-1][n-2] = ' ';
        grid[n-2][n-1] = ' ';
    }

    const cloneMatrix = (matrix) => matrix.map(row => [...row]);

    const t = (stepId, data) => {
      const tmpl = templates[stepId];
      if (!tmpl) return { explanation: `Step: ${stepId}`, narration: `Step: ${stepId}` };
      return {
        explanation: renderTemplate(tmpl.explanation, data),
        narration: renderTemplate(tmpl.narration, data)
      };
    };

    steps.push({
      state: { matrix: cloneMatrix(grid) },
      activeLines: { cpp: 1, java: 1, python: 1 },
      ...t('init', { n })
    });

    let openList = [];
    let closedList = Array(n).fill().map(() => Array(n).fill(false));
    let cellDetails = Array(n).fill().map(() => Array(n).fill(null));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            cellDetails[i][j] = { f: Infinity, g: Infinity, h: Infinity, parent_i: -1, parent_j: -1 };
        }
    }

    let start_i = 0, start_j = 0;
    let target_i = n-1, target_j = n-1;

    cellDetails[start_i][start_j] = { f: 0, g: 0, h: 0, parent_i: start_i, parent_j: start_j };
    openList.push({ f: 0, i: start_i, j: start_j });

    let activeCells = [];
    let comparingCells = [];
    let pathCells = [];
    let foundDest = false;

    // 8 directions
    const dirs = [
      [-1, 0], [1, 0], [0, -1], [0, 1], // up, down, left, right
      [-1, -1], [-1, 1], [1, -1], [1, 1] // diagonals
    ];

    const isValid = (row, col) => row >= 0 && row < n && col >= 0 && col < n;
    const isUnBlocked = (row, col) => grid[row][col] !== '█';
    const isDestination = (row, col) => row === target_i && col === target_j;
    const calculateHValue = (row, col) => Math.sqrt(Math.pow(row - target_i, 2) + Math.pow(col - target_j, 2));

    while (openList.length > 0) {
      openList.sort((a, b) => a.f - b.f); // Min-heap behavior
      let p = openList.shift();
      let i = p.i;
      let j = p.j;

      closedList[i][j] = true;
      activeCells = [[i, j]];

      steps.push({
        state: { matrix: cloneMatrix(grid), activeCells: [...activeCells] },
        activeLines: { cpp: 2, java: 2, python: 2 },
        ...t('current', { r: i, c: j })
      });

      for (let dir of dirs) {
        let r = i + dir[0];
        let c = j + dir[1];

        if (isValid(r, c)) {
          comparingCells = [[r, c]];
          
          steps.push({
            state: { matrix: cloneMatrix(grid), activeCells: [...activeCells], comparingCells: [...comparingCells] },
            activeLines: { cpp: 3, java: 3, python: 3 },
            ...t('neighbor', { r, c })
          });

          if (isDestination(r, c)) {
            cellDetails[r][c].parent_i = i;
            cellDetails[r][c].parent_j = j;
            foundDest = true;
            
            steps.push({
              state: { matrix: cloneMatrix(grid), activeCells: [...activeCells], comparingCells: [...comparingCells], foundNodeIds: [0] },
              activeLines: { cpp: 4, java: 4, python: 4 },
              ...t('found', {})
            });
            break;
          } else if (!closedList[r][c] && isUnBlocked(r, c)) {
            let gNew = cellDetails[i][j].g + 1.0;
            let hNew = calculateHValue(r, c);
            let fNew = gNew + hNew;

            if (cellDetails[r][c].f === Infinity || cellDetails[r][c].f > fNew) {
              openList.push({ f: fNew, i: r, j: c });
              cellDetails[r][c].f = fNew;
              cellDetails[r][c].g = gNew;
              cellDetails[r][c].h = hNew;
              cellDetails[r][c].parent_i = i;
              cellDetails[r][c].parent_j = j;

              steps.push({
                state: { matrix: cloneMatrix(grid), activeCells: [...activeCells], comparingCells: [...comparingCells] },
                activeLines: { cpp: 5, java: 5, python: 5 },
                ...t('update', {})
              });
            }
          }
        }
      }
      
      if (foundDest) break;
    }

    if (foundDest) {
      let curr_i = target_i;
      let curr_j = target_j;
      
      while (!(cellDetails[curr_i][curr_j].parent_i === curr_i && cellDetails[curr_i][curr_j].parent_j === curr_j)) {
        pathCells.push([curr_i, curr_j]);
        let temp_i = cellDetails[curr_i][curr_j].parent_i;
        let temp_j = cellDetails[curr_i][curr_j].parent_j;
        curr_i = temp_i;
        curr_j = temp_j;
      }
      pathCells.push([curr_i, curr_j]);
      
      steps.push({
        state: { matrix: cloneMatrix(grid), pathCells: [...pathCells] },
        activeLines: { cpp: 6, java: 6, python: 6 },
        ...t('path', {})
      });
    }

    steps.push({
      state: { matrix: cloneMatrix(grid), pathCells: [...pathCells], complete: true },
      activeLines: { cpp: 7, java: 7, python: 7 },
      ...t('complete', {})
    });

    return steps;
  }
};
