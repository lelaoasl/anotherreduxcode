import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

function Header() {
  const cartItems = useSelector(state => state.cart.cartItems);
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>{cartItems.length}</span>
        </div>
        <MdShoppingBasket size={30} color="#FFF" />
      </Cart>
    </Container>
  );
}

export default Header;
