# 8-Puzzle Sliding Game 🎮

A beautiful, modern web-based implementation of the classic 8-puzzle sliding game built with Next.js and React.

## 🎯 Game Description

Get ready to tackle the 8 puzzle – slide tiles to put the numbers in order, but be prepared for a challenge!

## ✨ Features

- **Smart Shuffle Algorithm**: Ensures every puzzle is solvable
- **Smooth Animations**: Beautiful tile movements and transitions
- **Responsive Design**: Works perfectly on mobile and desktop
- **Keyboard Support**: Use arrow keys to move tiles
- **Touch Support**: Optimized for mobile devices
- **Move Counter**: Track your progress
- **Win Detection**: Automatic celebration when solved
- **Modern UI**: Glassmorphism design with gradient backgrounds
- **SEO Optimized**: Proper meta tags for search engines
- **Ad-Ready**: Placeholder sections for Google AdSense

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Navigate to the project directory:
```bash
cd /Users/alfawhocodes/Developer/alfawhocodes/games
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎮 How to Play

1. **Click/Tap**: Click or tap on any tile adjacent to the empty space to move it
2. **Keyboard**: Use arrow keys to move tiles (↑ ↓ ← →)
3. **Goal**: Arrange numbers 1-8 in order with the empty space at the bottom right
4. **Shuffle**: Click the "Shuffle" button to start a new game

## 🏗️ Project Structure

```
games/
├── app/
│   ├── components/
│   │   ├── PuzzleGame.js          # Main game component
│   │   └── PuzzleGame.module.css  # Game styles
│   ├── globals.css                # Global styles
│   ├── layout.js                  # Root layout with SEO
│   └── page.js                    # Home page
├── public/                        # Static assets
├── package.json
└── README.md
```

## 🎨 Design Features

- **Gradient Background**: Beautiful purple gradient (667eea → 764ba2)
- **Glassmorphism**: Modern frosted glass effect on UI elements
- **Smooth Animations**: Fade-in, bounce, pulse, and rotation effects
- **Hover Effects**: Interactive feedback on movable tiles
- **Accessibility**: Keyboard navigation and reduced motion support
- **Responsive**: Optimized for all screen sizes

## 📱 Advertisement Integration

The game includes placeholder sections for Google AdSense:

- **Top Banner Ad**: 728x90 banner at the top
- **Bottom Sticky Ad**: Fixed banner at the bottom

To integrate real ads, replace the placeholder divs with your AdSense code:
- `#top-ad-banner`
- `#bottom-ad-sticky`

## 🔧 Technologies Used

- **Next.js 16.1.6**: React framework with App Router
- **React 19**: UI library
- **CSS Modules**: Scoped styling
- **CSS Grid**: Puzzle board layout
- **JavaScript**: Game logic

## 🎯 Game Logic

- **Solvability Check**: Uses inversion counting algorithm
- **Fisher-Yates Shuffle**: Ensures random but solvable configurations
- **Move Validation**: Only allows valid tile movements
- **Win Detection**: Checks puzzle state after each move

## 📊 SEO Features

- Optimized meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card support
- Semantic HTML structure
- Accessible markup

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

**AlfaWhoCodes**

---

Enjoy the challenge! 🎉
