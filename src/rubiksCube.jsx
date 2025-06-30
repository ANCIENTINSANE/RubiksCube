// Rubik's Cube Simulator - React Implementation
import React, { useState } from 'react';

class RubiksCube {
  constructor() {
    this.reset(); // initialize solved state
  }

  // Reset the cube to its solved state
  reset() {
    this.faces = {
      U: Array(9).fill('w'), // Up face (white)
      D: Array(9).fill('y'), // Down face (yellow)
      F: Array(9).fill('g'), // Front face (green)
      B: Array(9).fill('b'), // Back face (blue)
      L: Array(9).fill('o'), // Left face (orange)
      R: Array(9).fill('r'), // Right face (red)
    };
  }

  // Rotate the given face and its adjacent sides
  rotateFace(face, clockwise = true) {
    const rotateIndices = clockwise
      ? [6, 3, 0, 7, 4, 1, 8, 5, 2]
      : [2, 5, 8, 1, 4, 7, 0, 3, 6];
    this.faces[face] = rotateIndices.map(i => this.faces[face][i]);

    const { U, D, F, B, L, R } = this.faces;

    // Helper to rotate edge stickers on surrounding faces
    const rotateEdges = (a, ai, b, bi, c, ci, d, di) => {
      const temp = ai.map(i => a[i]);
      if (clockwise) {
        ai.forEach((_, idx) => { a[ai[idx]] = d[di[idx]]; });
        di.forEach((_, idx) => { d[di[idx]] = c[ci[idx]]; });
        ci.forEach((_, idx) => { c[ci[idx]] = b[bi[idx]]; });
        bi.forEach((_, idx) => { b[bi[idx]] = temp[idx]; });
      } else {
        ai.forEach((_, idx) => { a[ai[idx]] = b[bi[idx]]; });
        bi.forEach((_, idx) => { b[bi[idx]] = c[ci[idx]]; });
        ci.forEach((_, idx) => { c[ci[idx]] = d[di[idx]]; });
        di.forEach((_, idx) => { d[di[idx]] = temp[idx]; });
      }
    };

    // Rotate adjacent edges based on face being turned
    switch (face) {
      case 'F':
        rotateEdges(U, [6,7,8], R, [0,3,6], D, [2,1,0], L, [8,5,2]);
        break;
      case 'B':
        rotateEdges(U, [2,1,0], L, [0,3,6], D, [6,7,8], R, [8,5,2]);
        break;
      case 'U':
        rotateEdges(B, [2,1,0], R, [2,1,0], F, [2,1,0], L, [2,1,0]);
        break;
      case 'D':
        rotateEdges(F, [6,7,8], R, [6,7,8], B, [6,7,8], L, [6,7,8]);
        break;
      case 'L':
        rotateEdges(U, [0,3,6], F, [0,3,6], D, [0,3,6], B, [8,5,2]);
        break;
      case 'R':
        rotateEdges(U, [8,5,2], B, [0,3,6], D, [8,5,2], F, [8,5,2]);
        break;
      default:
        break;
    }
  }

  // Randomly rotate all faces + extras for a thorough scramble
  scramble() {
    const moves = ['U', 'D', 'F', 'B', 'L', 'R'];
    for (let i = 0; i < moves.length; i++) {
      const times = Math.floor(Math.random() * 3) + 1;
      const face = moves[i];
      for (let j = 0; j < times; j++) {
        const clockwise = Math.random() > 0.5;
        this.rotateFace(face, clockwise);
      }
    }
    for (let i = 0; i < 6; i++) {
      const face = moves[Math.floor(Math.random() * moves.length)];
      const clockwise = Math.random() > 0.5;
      this.rotateFace(face, clockwise);
    }
  }

  // Solving resets the cube to solved state
  solve() {
    this.reset();
  }

  // Return cube's state as a string for display
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

// Render the cube as HTML tables
function getCubeSvg(state) {
  const U = state.slice(0, 9);
  const R = state.slice(9, 18);
  const F = state.slice(18, 27);
  const D = state.slice(27, 36);
  const L = state.slice(36, 45);
  const B = state.slice(45, 54);

  const colors = {
    w: '#ffffff', // white
    y: '#ffff00', // yellow
    r: '#ff0000', // red
    o: '#ffa500', // orange
    g: '#28a745', // green
    b: '#007bff'  // blue
  };

  const Cell = ({ color }) => (
    <td style={{ width: 30, height: 30, background: colors[color], border: '1px solid #333', borderRadius: '4px' }}></td>
  );

  const Face = ({ face, label }) => (
    <div style={{ textAlign: 'center', margin: '4px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>{label}</div>
      <table cellSpacing={0} cellPadding={0} style={{ margin: 'auto', boxShadow: '0 0 4px rgba(0,0,0,0.2)' }}>
        <tbody>
          {[0, 3, 6].map(i => (
            <tr key={i}>
              <Cell color={face[i]} />
              <Cell color={face[i + 1]} />
              <Cell color={face[i + 2]} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ fontFamily: 'monospace', padding: '10px', background: '#f8f9fa', borderRadius: '10px' }}>
      <div style={{ textAlign: 'center' }}>
        <Face face={U} label="U" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Face face={L} label="L" />
        <Face face={F} label="F" />
        <Face face={R} label="R" />
        <Face face={B} label="B" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Face face={D} label="D" />
      </div>
    </div>
  );
}

// Main interactive component
const RubiksCubeComponent = () => {
  const [cube, setCube] = useState(new RubiksCube());
  const [stateString, setStateString] = useState(cube.toString());
  const [step, setStep] = useState('Initial (Solved)');

  // Utility to update cube state and label
  const updateCube = (action, stepName) => {
    const newCube = new RubiksCube();
    Object.assign(newCube, cube);
    action(newCube);
    setCube(newCube);
    setStateString(newCube.toString());
    setStep(stepName);
  };

  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      background: '#e9ecef',
      borderRadius: '8px',
      maxWidth: '600px',
      margin: '40px auto',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Rubik's Cube Simulator</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        <strong>Step:</strong> {step}
      </p>
      {getCubeSvg(stateString)}
      <p style={{
        textAlign: 'center',
        marginTop: '10px',
        fontFamily: 'monospace',
        fontSize: '14px'
      }}>
        &lt;svg&gt;{stateString}&lt;/svg&gt;
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px'
      }}>
        <button onClick={() => updateCube(c => c.reset(), 'Cube Reset')} style={buttonStyle}>Reset</button>
        <button onClick={() => updateCube(c => c.scramble(), 'Cube Scrambled')} style={buttonStyle}>Scramble</button>
        <button onClick={() => updateCube(c => c.solve(), 'Cube Solved')} style={buttonStyle}>Solve</button>
      </div>
    </div>
  );
};

// Reusable button styling
const buttonStyle = {
  padding: '10px 16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default RubiksCubeComponent;
