import { Link } from "react-router-dom";
import LogoSrc from "../../assets/Logo.png";
import { pathPage } from "../../routes/path";

export default function Logo() {
  return (
    <Link to={pathPage.root}>
      <div className="NavBarStyle">
        <div className="barsection">
          <img src={LogoSrc} className="Logo" alt="" />
        </div>
      </div>
    </Link>
  );
}
