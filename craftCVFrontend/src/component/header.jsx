import { Link } from "react-router-dom";
import { HiOutlineDocumentCheck } from 'react-icons/hi2';

function Header() {
    return (
            <header>
                <div className="logo">
                    <h1>
                        <HiOutlineDocumentCheck className="icons"/>
                        craftCV
                    </h1>
                </div>
                <nav>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                </nav>
            </header>
    );
}

export default Header;