import { Link } from "react-router-dom";
import { CartContext } from "../../components/context/CartContext";
import { useContext } from "react";

const Nav = () => {
 const {cartItem} = useContext(CartContext)
  return (
    <>
      <div>
        <h1>GameShop-LOL</h1>
      </div>
      <ul className="menu">
        <li className="menu-item">
          <Link to="/">
            <span>Discover</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/shop">
            <span>Shop</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/cart">
            <span>Cart <span>{cartItem?.length || 0}</span></span>
          </Link>
        </li>
      </ul>
    </>
  );
};
export default Nav;
