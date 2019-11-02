import React, { useState, useEffect } from 'react';

import { MdAddShoppingCart } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from './styles';

import { addItem } from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

import api from '../../services/api';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }));

      setProducts(data);
    }
    loadProducts();
  }, []);

  const quantity = useSelector(state =>
    state.cart.cartItems.reduce((sumQuantity, product) => {
      sumQuantity[product.id] = product.quantity;

      return sumQuantity;
    }, {})
  );

  const dispatch = useDispatch();

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />

          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => dispatch(addItem(product))}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
              {quantity[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

export default Home;
