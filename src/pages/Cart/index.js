import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete
} from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';

import {
  addItem,
  removeItem,
  clearItemFromCart
} from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

function Cart() {
  const cartItems = useSelector(state =>
    state.cart.cartItems.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.quantity)
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.cartItems.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.quantity;
      }, 0)
    )
  );

  const dispatch = useDispatch();

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cartItems.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => dispatch(removeItem(product))}
                  >
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.quantity} />
                  <button
                    type="button"
                    onClick={() => dispatch(addItem(product))}
                  >
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>

              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button type="button">
                  <MdDelete
                    size={20}
                    color="#7159c1"
                    onClick={() => {
                      dispatch(clearItemFromCart(product));
                    }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

export default Cart;
