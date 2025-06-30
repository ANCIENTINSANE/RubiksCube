# 🧊 Rubik's Cube Simulator (React)

A visually interactive Rubik's Cube simulator built using **React**. It supports realistic face rotations, full scrambling with valid cube logic, and state resets. Ideal for demonstrating face rotation mechanics, array manipulation, and UI development using React.

---

## 🚀 Features

- ✅ Accurate cube representation using a 2D net layout
- 🔄 Realistic face rotation logic affecting adjacent sides
- 🎲 Scramble functionality with valid random face turns
- 🧹 Reset (solve) functionality to return cube to solved state
- 🖱️ Button-based UI (Reset, Scramble, Solve)
- 🎨 SVG-style color display for each face
- 🔡 Cube state string for exporting or debugging

---

## 🧩 Cube Layout

The cube consists of 6 faces:

- **U**: Up (white)
- **D**: Down (yellow)
- **F**: Front (green)
- **B**: Back (blue)
- **L**: Left (orange)
- **R**: Right (red)

Each face is a 3×3 grid represented in a standard cube net:

[U]
[L] [F] [R] [B]
[D]

---

## 🛠️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Install & Run

```bash
https://github.com/ANCIENTINSANE/RubiksCube.git
cd rubikscube
npm install
npm start
The app will open in your browser at http://localhost:5173/.

🧪 Usage
From the UI, you can:

Reset Cube – restore the cube to solved state.

Scramble Cube – randomly rotate each face like a real cube.

Solve Cube – same as reset (currently no solving algorithm).

📁 File Structure

src/
│
├── RubiksCubeComponent.jsx   # Main cube logic and UI
├── App.js                    # Root app wrapper
├── index.js                  # ReactDOM entry point
└── ...
🎨 Technology Stack
React – Component-based UI library

JavaScript – Cube logic and rotation algorithms

HTML/CSS – Visual cube rendering

💡 Learning Highlights
3D simulation logic via 2D arrays

Rotation matrix indexing and logic

State management and side-effect updates in React

Clean user interface integrated with cube logic

📌 To-Do / Future Features
Add per-face rotation buttons (e.g., F, F′, R, R′, etc.)

Support for keyboard shortcuts

Move history + undo functionality

3D visualization with WebGL (Three.js or Babylon.js)

Real cube solving algorithm (e.g., Kociemba’s algorithm)

📜 License
MIT License

Feel free to fork, contribute, or integrate it into your own apps!

✨ Maintainer
[Mahesh Surendra Kumar Mattaparthi]
github.com/ANCIENTINANE