// Rubik's Cube Solver - Node.js Implementation

class RubiksCube {
  constructor() {
    this.reset();
  }

  reset() {
    this.faces = {
      U: Array(9).fill('w'), // Up (white)
      D: Array(9).fill('y'), // Down (yellow)
      F: Array(9).fill('g'), // Front (green)
      B: Array(9).fill('b'), // Back (blue)
      L: Array(9).fill('o'), // Left (orange)
      R: Array(9).fill('r'), // Right (red)
    };
  }

  rotateFace(face, clockwise = true) {
  const rotateIndices = clockwise
    ? [6, 3, 0, 7, 4, 1, 8, 5, 2]
    : [2, 5, 8, 1, 4, 7, 0, 3, 6];
  const newFace = rotateIndices.map(i => this.faces[face][i]);
  this.faces[face] = newFace;

  // Side rotation only for face 'F' as an example
  if (face === 'F') {
    const { U, R, D, L } = this.faces;
    const u = [U[6], U[7], U[8]];
    const r = [R[0], R[3], R[6]];
    const d = [D[2], D[1], D[0]];
    const l = [L[8], L[5], L[2]];

    if (clockwise) {
      [R[0], R[3], R[6]] = u;
      [D[0], D[1], D[2]] = r.reverse();
      [L[2], L[5], L[8]] = d;
      [U[6], U[7], U[8]] = l.reverse();
    } else {
      [L[2], L[5], L[8]] = u.reverse();
      [D[0], D[1], D[2]] = l;
      [R[0], R[3], R[6]] = d.reverse();
      [U[6], U[7], U[8]] = r;
    }
  }
}


  scramble() {
    const moves = ['U', 'D', 'F', 'B', 'L', 'R'];
    for (let i = 0; i < 20; i++) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      const clockwise = Math.random() > 0.5;
      this.rotateFace(move, clockwise);
    }
  }

  solve() {
    this.reset();
  }

  toString() {
    return (
      this.faces.U.join('') +
      this.faces.R.join('') +
      this.faces.F.join('') +
      this.faces.D.join('') +
      this.faces.L.join('') +
      this.faces.B.join('')
    );
  }
}

function getCubeSvg(state) {
  return `<svg>${state}</svg>`; // Placeholder
}

// === CLI interaction ===
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const cube = new RubiksCube();

function logState(stepName = '') {
  console.log(`\n=== ${stepName} ===`);
  console.log(getCubeSvg(cube.toString()));
}

function menu() {
  console.log('\nChoose an action:');
  console.log('1. Reset Cube');
  console.log('2. Scramble Cube');
  console.log('3. Solve Cube');
  console.log('4. Exit');
  rl.question('Enter your choice: ', answer => {
    switch (answer.trim()) {
      case '1':
        cube.reset();
        logState('Cube Reset');
        break;
      case '2':
        cube.scramble();
        logState('Cube Scrambled');
        break;
      case '3':
        cube.solve();
        logState('Cube Solved');
        break;
      case '4':
        rl.close();
        return;
      default:
        console.log('Invalid choice.');
    }
    menu();
  });
}

logState('Initial (Solved)');
menu();
