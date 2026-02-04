'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './PuzzleGame.module.css';

// Helper function to check if a puzzle configuration is solvable
const isSolvable = (puzzle) => {
    const flatPuzzle = puzzle.flat().filter(num => num !== 0);
    let inversions = 0;

    for (let i = 0; i < flatPuzzle.length; i++) {
        for (let j = i + 1; j < flatPuzzle.length; j++) {
            if (flatPuzzle[i] > flatPuzzle[j]) {
                inversions++;
            }
        }
    }

    // For 3x3 puzzle, solvable if inversions is even
    return inversions % 2 === 0;
};

// Generate a solvable shuffled puzzle
const generatePuzzle = () => {
    let puzzle;
    do {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        // Fisher-Yates shuffle
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        puzzle = [
            numbers.slice(0, 3),
            numbers.slice(3, 6),
            numbers.slice(6, 9)
        ];
    } while (!isSolvable(puzzle));

    return puzzle;
};

// Check if puzzle is solved
const isPuzzleSolved = (puzzle) => {
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    const flat = puzzle.flat();
    return expected.every((val, idx) => val === flat[idx]);
};

// Find empty tile position
const findEmptyTile = (puzzle) => {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (puzzle[row][col] === 0) {
                return { row, col };
            }
        }
    }
    return null;
};

// Check if a tile can move
const canMove = (puzzle, row, col) => {
    const empty = findEmptyTile(puzzle);
    if (!empty) return false;

    // Check if tile is adjacent to empty space
    return (
        (Math.abs(row - empty.row) === 1 && col === empty.col) ||
        (Math.abs(col - empty.col) === 1 && row === empty.row)
    );
};

export default function PuzzleGame() {
    const [puzzle, setPuzzle] = useState(() => generatePuzzle());
    const [moves, setMoves] = useState(0);
    const [solved, setSolved] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [dragging, setDragging] = useState(null);
    const [dragOver, setDragOver] = useState(null);

    // Check if puzzle is solved whenever it changes
    useEffect(() => {
        if (isPuzzleSolved(puzzle)) {
            setSolved(true);
        }
    }, [puzzle]);

    // Handle tile click
    const handleTileClick = useCallback((row, col) => {
        if (solved || animating || puzzle[row][col] === 0) return;

        if (canMove(puzzle, row, col)) {
            setAnimating(true);
            const empty = findEmptyTile(puzzle);
            const newPuzzle = puzzle.map(row => [...row]);

            // Swap tiles
            [newPuzzle[row][col], newPuzzle[empty.row][empty.col]] =
                [newPuzzle[empty.row][empty.col], newPuzzle[row][col]];

            setPuzzle(newPuzzle);
            setMoves(m => m + 1);

            // Animation delay
            setTimeout(() => setAnimating(false), 200);
        }
    }, [puzzle, solved, animating]);

    // Drag and drop handlers
    const handleDragStart = useCallback((e, row, col) => {
        if (solved || animating || puzzle[row][col] === 0) {
            e.preventDefault();
            return;
        }

        if (!canMove(puzzle, row, col)) {
            e.preventDefault();
            return;
        }

        setDragging({ row, col, value: puzzle[row][col] });
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', `${row},${col}`);
    }, [puzzle, solved, animating]);

    const handleDragOver = useCallback((e, row, col) => {
        e.preventDefault();

        // Only allow drop on empty tile
        if (puzzle[row][col] === 0 && dragging) {
            e.dataTransfer.dropEffect = 'move';
            setDragOver({ row, col });
        } else {
            e.dataTransfer.dropEffect = 'none';
        }
    }, [puzzle, dragging]);

    const handleDragLeave = useCallback(() => {
        setDragOver(null);
    }, []);

    const handleDrop = useCallback((e, row, col) => {
        e.preventDefault();
        setDragOver(null);

        if (!dragging || puzzle[row][col] !== 0) return;

        const { row: dragRow, col: dragCol } = dragging;

        // Verify the tile can move to this position
        if (canMove(puzzle, dragRow, dragCol)) {
            setAnimating(true);
            const newPuzzle = puzzle.map(row => [...row]);

            // Swap tiles
            [newPuzzle[dragRow][dragCol], newPuzzle[row][col]] =
                [newPuzzle[row][col], newPuzzle[dragRow][dragCol]];

            setPuzzle(newPuzzle);
            setMoves(m => m + 1);

            setTimeout(() => setAnimating(false), 200);
        }

        setDragging(null);
    }, [dragging, puzzle, animating]);

    const handleDragEnd = useCallback(() => {
        setDragging(null);
        setDragOver(null);
    }, []);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (solved || animating) return;

            const empty = findEmptyTile(puzzle);
            if (!empty) return;

            let targetRow = empty.row;
            let targetCol = empty.col;

            switch (e.key) {
                case 'ArrowUp':
                    targetRow = empty.row + 1;
                    break;
                case 'ArrowDown':
                    targetRow = empty.row - 1;
                    break;
                case 'ArrowLeft':
                    targetCol = empty.col + 1;
                    break;
                case 'ArrowRight':
                    targetCol = empty.col - 1;
                    break;
                default:
                    return;
            }

            if (targetRow >= 0 && targetRow < 3 && targetCol >= 0 && targetCol < 3) {
                e.preventDefault();
                handleTileClick(targetRow, targetCol);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [puzzle, solved, animating, handleTileClick]);

    // Restart game
    const handleRestart = () => {
        setPuzzle(generatePuzzle());
        setMoves(0);
        setSolved(false);
        setAnimating(false);
        setDragging(null);
        setDragOver(null);
    };

    return (
        <div className={styles.container}>
            {/* Top Ad Placeholder */}
            <div className={styles.adBanner} id="top-ad-banner">
                <div className={styles.adPlaceholder}>
                    <span>Advertisement</span>
                </div>
            </div>

            {/* Game Content */}
            <div className={styles.gameWrapper}>
                <header className={styles.header}>
                    <h1 className={styles.title}>8-Puzzle Challenge</h1>
                    <p className={styles.description}>
                        Get ready to tackle the 8 puzzle – slide tiles to put the numbers in order, but be prepared for a challenge!
                    </p>
                </header>

                <div className={styles.mainContent}>
                    {/* Game Board - Center */}
                    <div className={styles.gameBoard}>
                        <div className={styles.puzzleGrid}>
                            {puzzle.map((row, rowIndex) =>
                                row.map((tile, colIndex) => {
                                    const isEmpty = tile === 0;
                                    const isMovable = !isEmpty && canMove(puzzle, rowIndex, colIndex);
                                    const isDragging = dragging?.row === rowIndex && dragging?.col === colIndex;
                                    const isDragOver = dragOver?.row === rowIndex && dragOver?.col === colIndex;

                                    return (
                                        <button
                                            key={`${rowIndex}-${colIndex}`}
                                            className={`
                          ${styles.tile} 
                          ${isEmpty ? styles.empty : ''} 
                          ${isMovable && !solved ? styles.movable : ''}
                          ${solved ? styles.solved : ''}
                          ${isDragging ? styles.dragging : ''}
                          ${isDragOver ? styles.dragOver : ''}
                        `}
                                            onClick={() => handleTileClick(rowIndex, colIndex)}
                                            onDragStart={(e) => handleDragStart(e, rowIndex, colIndex)}
                                            onDragOver={(e) => handleDragOver(e, rowIndex, colIndex)}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                                            onDragEnd={handleDragEnd}
                                            draggable={isMovable && !solved && !animating}
                                            disabled={isEmpty || solved || animating}
                                            aria-label={isEmpty ? 'Empty tile' : `Tile ${tile}`}
                                            tabIndex={isEmpty ? -1 : 0}
                                        >
                                            {!isEmpty && tile}
                                        </button>
                                    );
                                })
                            )}
                        </div>

                        {solved && (
                            <div className={styles.winOverlay}>
                                <div className={styles.winMessage}>
                                    <h2>🎉 Puzzle Solved! 🎉</h2>
                                    <p>Completed in {moves} moves</p>
                                    <button
                                        className={styles.playAgainButton}
                                        onClick={handleRestart}
                                    >
                                        Play Again
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Right */}
                    <div className={styles.sidebar}>
                        <div className={styles.sidebarContent}>
                            <div className={styles.gameInfo}>
                                <div className={styles.movesCounter}>
                                    <span className={styles.label}>Moves:</span>
                                    <span className={styles.value}>{moves}</span>
                                </div>
                                <button
                                    className={styles.restartButton}
                                    onClick={handleRestart}
                                    aria-label="Restart game"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                                    </svg>
                                    Shuffle
                                </button>
                            </div>

                            <div className={styles.instructions}>
                                <h3>How to Play</h3>
                                <ul>
                                    <li>Click or tap on tiles adjacent to the empty space to move them</li>
                                    <li>Use arrow keys on keyboard to move tiles</li>
                                    <li>Arrange the numbers from 1 to 8 in order</li>
                                    <li>Try to solve it in the fewest moves possible!</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Sticky Ad Placeholder */}
            <div className={styles.adSticky} id="bottom-ad-sticky">
                <div className={styles.adPlaceholder}>
                    <span>Advertisement</span>
                </div>
            </div>
        </div>
    );
}
