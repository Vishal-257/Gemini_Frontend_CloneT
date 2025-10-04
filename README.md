# React + TypeScript + Vite
# Gemini Frontend Clone

A frontend clone of Gemini built using React, TypeScript, Tailwind CSS, Axios, and TestSprite. It supports features like login, signup, chat rooms, etc.

## Features

- User signup and login  
- Chat rooms (private / group)  
- Real-time messaging (or simulation)  
- Profile editing  
- Responsive UI layout  
- Error handling, form validation  
- Test / debug utilities via TestSprite  

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React + TypeScript |
| Styling | Tailwind CSS |
| HTTP client | Axios |
| Testing / Debugging | TestSprite |
| Build / Bundler | Vite |
| Linter / Format | ESLint, Prettier (if used) |

---

## Project Structure

/
├── public/ # Static public assets, index.html
├── src/
│ ├── components/ # Reusable React components
│ ├── pages/ # Page / view level components
│ ├── services/ # API / Axios service files
│ ├── contexts/ # React Context providers (auth, chat, etc.)
│ ├── hooks/ # Custom React hooks
│ ├── utils/ # Utility functions/helpers
│ ├── assets/ # Images, icons, etc.
│ ├── App.tsx # Root app component
│ └── main.tsx # Entry point
├── .eslintrc.js / eslint.config.js # Linting config
├── tailwind.config.cjs # Tailwind CSS config
├── postcss.config.cjs # PostCSS config
├── tsconfig.json / tsconfig.* # TypeScript configs
├── vite.config.ts # Vite build config
├── package.json # Dependencies & scripts
└── README.md # Project overview (this file)

### Prerequisites

- Node.js (v16+ recommended)  
- npm or yarn  

### Installation

1. Clone this repo:  
   ```bash
   git clone https://github.com/Vishal-257/Gemini_Frontend_CloneT.git
   cd Gemini_Frontend_CloneT
2. Dependencies
   ```
   npm install
    yarn install
3. Run
   ```
   npm run dev
   yarn dev
4. Test
   ```
    npm run test
    yarn test


