import { useState, useEffect, useRef } from 'react';
import MatrixSection from './MatrixSection';
import * as casinoService from '../../services/casinoService';
import HeaderSection from '../header/HeaderSection';
import { newWinningColumns, imageMatrix } from '../../utils/matrix';

const SimulationSection: React.FC = () => {
    const [matrix, setMatrix] = useState<string[][]>([
        ['/img/grapes.png', '/img/apple.png', '/img/pear.png'],
        ['/img/cherry.png', '/img/bar.png', '/img/grapes.png'],
        ['/img/bar.png', '/img/pear.png', '/img/apple.png']
    ]);

    const depositInputRef = useRef<HTMLInputElement>(null);
    const withdrawInputRef = useRef<HTMLInputElement>(null);
    const [simBalance, setSimBalance] = useState<number>(100);
    const [simBet, setSimBet] = useState(1);
    const [totalWinnings, setTotalWinnings] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [simCount, setSimCount] = useState(3);
    const [netResult, setNetResult] = useState<number>(0);
    const [simRTP, setSimRTP] = useState<number>(0);
    const [WinningColumns, setWinningColumns] = useState<Array<{ row: number; col: number }>>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [depositValue, setDepositValue] = useState<number>(0);
    const [withdrawValue, setWithdrawValue] = useState<number>(0);

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        try {
            const response = await casinoService.getBalance();
            setSimBalance(response.simBalance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const fetchSimRTP = async () => {
        try {
            const response = await casinoService.getRTP();
            setSimRTP(response.simRTP);
        } catch (error) {
            console.error('Error fetching Sim RTP:', error);
        }
    };

    const runSimulation = async () => {
        if (simBalance < simCount * simBet) {
            setErrorMessage('Insufficient balance!');
            return;
        }

        if (isNaN(simCount) || simCount <= 0) {
            setErrorMessage('The simulation count must be number above 0!');
            return;
        }

        if (isNaN(simBet) || simBet <= 0) {
            setErrorMessage('The simulation bet must be number above 0!');
            return;
        }
        setErrorMessage('');
        setIsSpinning(true);
        try {
            const response = await casinoService.postSim(simCount, simBet);
            const { totalwinningsFromSpin: newWinnings, simMatrix: newMatrix } = response;

            const totalBet = simCount * simBet;
            const matrix = imageMatrix(newMatrix);
            const simWinningColumns = newWinningColumns(newMatrix);

            setTimeout(() => {
                setMatrix(matrix);
                setWinningColumns(simWinningColumns);
                setSimBalance(prevBalance => prevBalance - totalBet + newWinnings);
                setTotalWinnings(newWinnings);
                setNetResult(response.netResult);
                setIsSpinning(false);
                fetchSimRTP();
            }, 1000);

        } catch (error) {
            console.error('Error running simulation:', error);
        }
    };

    const onDeposit = async () => {
        setErrorMessage('');

        if (isNaN(depositValue) || depositValue <= 0) {
            setErrorMessage('The deposit amount must be number above 0!');
            return;
        }

        try {
            const response = await casinoService.postDeposit(depositValue, 'sim');
            const { simWalletBalance: balance } = response;
            setSimBalance(balance);
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

        if (withdrawValue > simBalance) {
            setErrorMessage('The withdraw amount must be less than or equal to your balance!');
            return;
        }

        try {
            const response = await casinoService.postWithdraw(withdrawValue, 'sim');
            const { simWalletBalance: balance } = response;
            setSimBalance(balance);
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
                <h1 className="text-4xl font-bold mb-2">Simulation</h1>
                <div className="border-4 border-yellow-300 rounded-[25px] p-2 shadow-[1px_-1px_20px_20px_#21211f]">
                    <div className="mt-2 pt-4">

                        <div className="grid grid-cols-3 mb-4">
                            <MatrixSection matrix={matrix} isSpinning={isSpinning} winningRows={WinningColumns} />
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="mr-2 text-white">Number of spins:</label>
                            <input
                                type="number"
                                value={simCount}
                                onChange={(e) => setSimCount(Math.max(1, parseInt(e.target.value)))}
                                className="w-20 p-1 bg-gray-800 border border-gray-500 rounded text-white"
                            />
                            <label className="mr-2 text-white">Bet:</label>
                            <input
                                type="number"
                                value={simBet}
                                onChange={(e) => setSimBet(Math.max(1, parseInt(e.target.value)))}
                                className="w-20 p-1 bg-gray-800 border border-gray-500 rounded text-white"
                            />
                            <button
                                onClick={runSimulation}
                                className="ml-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            >
                                Run Simulation
                            </button>
                        </div>


                        <div className="bg-gradient-to-b from-black/80 to-transparent p-4 rounded-lg mb-4">
                            <p className="text-white">Simulation Balance: {simBalance}</p>
                            <p className="text-white">Total Winnings: {totalWinnings}</p>
                            <p className="text-white">Net Result: {netResult}</p>
                            <p className="text-white">
                                Average Return: {((totalWinnings / (simCount * simBet)) * 100).toFixed(2)}%
                            </p>
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
                            {/* Error and Winning Messages */}
                            {errorMessage && (
                                <div className="mt-2 text-center text-red-500 font-semibold bg-gradient-to-r from-white to-[#9c8b8bad] p-2 rounded">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="mt-4 border-t pt-2 bg-gradient-to-b from-white via-gray-100 to-[#86888a] p-2 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-black">Overall Return to Player (RTP)</h2>
                        <p className="text-xl text-black">Current Sim RTP: {simRTP}%</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SimulationSection;
