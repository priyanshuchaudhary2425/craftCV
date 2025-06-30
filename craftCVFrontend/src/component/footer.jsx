import { FaRegCopyright } from "react-icons/fa";

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer>
            <h3>
                <FaRegCopyright style={{color: "black"}} className="icons"/>
                craftCV {year}
            </h3>
        </footer>
    );
}

export default Footer;