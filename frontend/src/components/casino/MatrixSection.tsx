import { motion } from 'framer-motion';

interface MatrixSectionProps {
    matrix: string[][];
    isSpinning: boolean;
    winningRows: Array<{ row: number; col: number }>; // Add winningRows as a prop
}

/**
 * Renders a matrix section with spinning slots and highlights winning cells.
 *
 * @param {MatrixSectionProps} props - The props object containing the matrix, isSpinning, and winningRows.
 * @param {string[][]} props.matrix - The matrix representing the slots.
 * @param {boolean} props.isSpinning - Indicates whether the slots are spinning.
 * @param {Array<{row: number; col: number}>} props.winningRows - The rows and columns of winning cells.
 * @return {JSX.Element} The rendered matrix section.
 */
const MatrixSection: React.FC<MatrixSectionProps> = ({ matrix, isSpinning, winningRows }) => {

    const isWinningCell = (rowIndex: number, colIndex: number) => {
        return winningRows.some(win => win.row === rowIndex && win.col === colIndex);
    };

    return (
        <>
            {matrix.map((col, colIndex) => (
                <div key={colIndex} className="flex flex-col items-center border-2 border-yellow-300 bg-gradient-to-b from-white via-gray-100 to-[#86888a] rounded-lg p-8 m-5">
                    {col.map((imageSrc, rowIndex) => (
                        <motion.div
                        key={`${colIndex}-${rowIndex}`}
                        className={`w-24 h-24 flex items-center justify-center rounded m-4 overflow-hidden ${
                            isWinningCell(rowIndex, colIndex) ? 'border-4 border-green-500 rounded-[25px]' : ''
                        }`}
                        
                        animate={isSpinning ? { rotateX: 360 } : {}}
                        transition={{ duration: 0.5, repeat: isSpinning ? Infinity : 0 }}
                    >
                        <img 
                            src={imageSrc} 
                            alt={`Slot item ${rowIndex}`} 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    ))}
                </div>
            ))}
        </>
    );
}

export default MatrixSection;