import { Link } from "react-router-dom";
import "./Navbar.scss";
function Navbar() {
  return (
    <>
      <div className="all_navbar">
        <ul className="list_navbar">
          <Link to="/">
            {" "}
            <li>Accueil</li>
          </Link>

          <Link to="/movies">
            {" "}
            <li>Films</li>
          </Link>

          <Link to="/series">
            {" "}
            <li>Série</li>
          </Link>
        </ul>
      </div>
    </>
  );
}
export default Navbar;
