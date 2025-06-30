# Rubik's Cube Simulator (Node.js)

A fully functional Rubik's Cube simulator built in Node.js, supporting realistic face rotations, scrambling, solving (reset), and command-line interaction. Ideal for demonstrating 3D array logic, state management, and algorithmic thinking.

---

## 🚀 Features

- Accurate 3D cube representation using a class-based model
- Manual face rotation logic including adjacent sides
- Scramble functionality with valid random rotations
- Solve functionality (resets to solved state)
- Command-line interface with interactive prompts
- SVG string output for easy visualization integration

---

## 🧩 Cube Layout

The cube is represented with six faces:
- **U**: Up (white)
- **D**: Down (yellow)
- **F**: Front (green)
- **B**: Back (blue)
- **L**: Left (orange)
- **R**: Right (red)

Each face has 9 positions (3x3), flattened into a 54-character string:


---

## 📦 Installation

1. Clone the repository or copy the script
2. Ensure [Node.js](https://nodejs.org/) is installed

```bash
node index.js



=== Initial (Solved) ===
U: wwwwwwwww
R: rrrrrrrrr
F: ggggggggg
D: yyyyyyyyy
L: ooooooooo
B: bbbbbbbbb

Choose an action:
1. Reset Cube
2. Scramble Cube
3. Solve Cube
4. Exit
