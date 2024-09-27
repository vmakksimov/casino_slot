import { Link } from "react-router-dom";

const HeaderSection: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-[#605959] to-black text-white p-6 flex justify-center items-center">
            <div className="header-links space-x-6">
                <Link to="/" className="hover:text-gray-300">Home</Link>
                <Link to="/play" className="hover:text-gray-300">Play</Link>
                <Link to="/simulation" className="hover:text-gray-300">Simulation</Link>
            </div>
        </div>
    )
}

export default HeaderSection;
