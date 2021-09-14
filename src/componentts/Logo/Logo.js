import Tilty from "react-tilty";
import brain from "./brain.png";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilty reverse axis="x" scale={1.5} perspective={900} reset={true}>
        <div>
          <img alt="logo" src={brain} />
        </div>
      </Tilty>
    </div>
  );
};

export default Logo;
