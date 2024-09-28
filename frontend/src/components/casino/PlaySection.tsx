import { useState, useEffect, useRef } from 'react';
import MatrixSection from './MatrixSection';
import HeaderSection from '../header/HeaderSection';
import FooterSection from '../footer/FooterSection';
import { newWinningColumns,  imageMatrix } from '../../utils/matrix';
import * as casinoService from '../../services/casinoService';


/**
 * A React functional component that simulates a slot machine game.
 * It handles user input for betting, depositing, and withdrawing, and updates the game state accordingly.
 * The component also displays the game's current state, including the matrix, winnings, balance, and RTP.
 *
 * @return {JSX.Element} The JSX element representing the slot machine game.
 */
const SlotMachine: React.FC = () => {
    const [matrix, setMatrix] = useState<string[][]>([
        ['/img/grapes.png', '/img/apple.png', '/img/pear.png'],
        ['/img/cherry.png', '/img/bar.png', '/img/grapes.png'],
        ['/img/bar.png', '/img/pear.png', '/img/apple.png']
    ]);

    const depositInputRef = useRef<HTMLInputElement>(null);
    const withdrawInputRef = useRef<HTMLInputElement>(null);
    const [playBalance, setPlayBalance] = useState<number>(100);
    const [playBet, setPlayBet] = useState<number>(1);
    const [winnings, setWinnings] = useState<number>(0);
    const [winningsFromSpin, setWinningsFromSpin] = useState<number>(0);
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [playRTP, setPlayRTP] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [WinningColumns, setWinningColumns] = useState<Array<{ row: number; col: number }>>([]);
    const [depositValue, setDepositValue] = useState<number>(0);
    const [withdrawValue, setWithdrawValue] = useState<number>(0);

    useEffect(() => {
        fetchPlayRTP();
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        try {
            const response = await casinoService.getBalance();
            setPlayBalance(response.playBalance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const fetchPlayRTP = async () => {
        try {
            const response = await casinoService.getRTP();
            setPlayRTP(response.playRTP);
        } catch (error) {
            console.error('Error fetching Play RTP:', error);
        }
    };

    const spin = async () => {
        setErrorMessage('');
        if (playBalance < playBet) {
            setErrorMessage('Insufficient balance!');
            return;
        }

        if (isNaN(playBet) || playBet <= 0) {
            setErrorMessage('The simulation count must be number above 0!');
            return;
        }

        setIsSpinning(true);
        setWinnings(0);
        setWinningColumns([]);

        try {
            const response = await casinoService.postPlay(playBet);
            const { matrix: newMatrix, winnings: newWinnings } = response;
            const matrix = imageMatrix(newMatrix);
            const playWinningColumns = newWinningColumns(newMatrix);
            
            setTimeout(() => {
                setMatrix(matrix);
                setPlayBalance(prevBalance => prevBalance - playBet + newWinnings);
                setWinnings(prevWinnnings => prevWinnnings + newWinnings);
                setWinningsFromSpin(prevTotalWinnings => prevTotalWinnings + newWinnings);
                setWinningColumns(playWinningColumns);
                setIsSpinning(false);
                fetchPlayRTP();
            }, 1000);

        } catch (error) {
            console.error('Error spinning:', error);
            setIsSpinning(false);
        }
    };

    const onDeposit = async () => {
        const maxDeposit = 1000000;
        setErrorMessage('');

        if (isNaN(depositValue) || depositValue <= 0) {
            setErrorMessage('The deposit amount must be number above 0!');
            return;
        }

        if (depositValue > maxDeposit) {
            setErrorMessage('The deposit amount must be less than or equal to $1,000,000!');
            return;
        }

        try {
            const response = await casinoService.postDeposit(depositValue, 'play');
            const { walletBalance: balance } = response;
            setPlayBalance(balance);
            setDepositValue(0);
            
            if (depositInputRef.current) {
                depositInputRef.current.value = '';
            }
            
        } catch (error) {  
            console.error('Error depositing:', error);
        }

    }

    const onWithdraw = async () => {
        setErrorMessage('');
    
        if (isNaN(withdrawValue) || withdrawValue <= 0) {
            setErrorMessage('The withdraw amount must be number above 0!');
            return;
        }

        if (withdrawValue > playBalance) {
            setErrorMessage('The withdraw amount must be less than or equal to your balance!');
            return;
        }
        
        try {
            const response = await casinoService.postWithdraw(withdrawValue, 'play');
            const { walletBalance: balance } = response;
            setPlayBalance(balance);
            setWithdrawValue(0);

            if (withdrawInputRef.current) {
                withdrawInputRef.current.value = '';
            }

        } catch (error) {
            console.error('Error withdrawing:', error);
        }
    }

    return (
        <>
            <HeaderSection />
            <div
                className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/img/casino.jpg')`
                }}
            >
                <h1 className="text-4xl font-bold mb-2">Play</h1>
                <div className="border-4 border-yellow-300 rounded-[25px] p-2 shadow-[1px_-1px_20px_20px_#21211f]">
                    <div className="grid grid-cols-3">
                        <MatrixSection matrix={matrix} isSpinning={isSpinning} winningRows={WinningColumns} />
                    </div>
                    {/* Unified Box for Bet, Winnings, and Balance */}
                    {winnings > 0 && (
                        <div className="mt-2 text-center text-xl font-bold text-green-500">
                            You won {winnings}!
                        </div>
                    )}
                    <div className="bg-gradient-to-b from-black/80 to-black/50 p-2 rounded-lg shadow-lg text-white mb-4">
                        <div className="flex justify-between items-center text-sm">
                            <div>
                                <label className="mr-2">Bet:</label>
                                <input
                                    type="number"
                                    value={playBet}
                                    onChange={(e) => setPlayBet(Math.max(1, parseInt(e.target.value)))}
                                    className="w-16 p-1 bg-gray-800 border border-gray-500 rounded text-white"
                                />
                            </div>
                            <div>
                                <span className="text-sm font-bold">Winnings: {winningsFromSpin}</span>
                            </div>
                            <div>
                                <span className="text-sm font-bold">Balance: {playBalance}</span>
                            </div>
                        </div>
                    </div>
                    {/* Spin Button */}
                    <div className="flex justify-center mb-2 space-x-4">
                        <div >
                            <input
                                ref={depositInputRef}
                                type="number"
                                onChange={(e) => setDepositValue(parseFloat(e.target.value) || 0)}
                                className="w-16 p-1 bg-gray-800 border border-gray-500 rounded text-white"
                            />
                            <button
                                onClick={onDeposit}
                                className="mt-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-green-600"
                            >
                                Deposit
                            </button>
                        </div>
                        <div
                            onClick={spin}
                            className={`w-12 h-12 flex items-center justify-center bg-slate-200 rounded-full shadow-lg hover:cursor-pointer hover:shadow-xl hover:bg-slate-300 hover:scale-105 mg-2 ${isSpinning ? 'disabled:bg-gray-400' : ''}`}
                        >
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24"
                                className="text-slate-500 font-bold" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.48,3.43A9.09,9.09,0,0,1,18.3,5.55V2.35h1.64v6.5h-6.5V7.21H17.7a7.46,7.46,0,1,0,1.47,8.65l1.46.73A9.11,9.11,0,1,1,12.48,3.43Z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <input
                                ref={withdrawInputRef}
                                type="number"
                                onChange={(e) => setWithdrawValue(parseFloat(e.target.value) || 0)}
                                className="w-16 p-1 bg-gray-800 border border-gray-500 rounded text-white"
                            />
                            <button
                                onClick={onWithdraw}
                                className="mt-2 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                            >
                                Withdraw
                            </button>
                        </div>
                    </div>
                    {/* Error and Winning Messages */}
                    {errorMessage && (
                        <div className="mt-2 text-center text-red-500 font-semibold bg-gradient-to-r from-white to-[#9c8b8bad] p-2 rounded">
                            {errorMessage}
                        </div>
                    )}

                    {/* RTP Section */}
                    <div className="mt-4 border-t pt-2 bg-gradient-to-b from-white via-gray-100 to-[#86888a] p-2 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-2">Overall Return to Player (RTP)</h2>
                        <p className="text-lg font-bold">Current Play RTP: {playRTP}%</p>
                    </div>
                </div>
            </div>
            <FooterSection />
        </>
    );
};

export default SlotMachine;
