import {useState} from 'react';
import Board from './Board';
import './Game.css';

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    
    const handleClick = (index) => {
        if(squares[index] || calculateWinner(squares)) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);
    };

    const winner = calculateWinner(squares);

    const handleRestart = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <div className="game">
            <Board squares={squares} onSquareClick={handleClick} />
            <div className="game-info">
                {winner ? `Ganador: ${winner}` : `Siguiente jugador: ${isXNext ? 'X' : 'O'}`}
            </div>
            <button className="reiniciar" onClick={handleRestart}>
            Reiniciar
        </button>
        </div>
    );
};

const calculateWinner = (squares) => {
    if (!squares || squares.length !== 9) {
        console.error('El estado squares no está correctamente inicializado');
        return null;
    }

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i=0; i<lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        } 
    }

    return null;
};

export default Game;
