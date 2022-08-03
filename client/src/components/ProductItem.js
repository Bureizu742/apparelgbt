import react from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY,  } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import { Link } from "react-router-dom";
import { pluralize } from "../utils/helpers"
import path from 'path';
// import { ShoppingCartOutlined } from '@material-ui/icons';

import styled from 'styled-components';


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;


const Image = styled.img`
  height: 75%;
  width: 75%;
  object-fit: cover;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #cfcfc4;
    transform: scale(1.1);
  }
`;

const Prod = styled.div`
  display: inline-block;
  position: relative;
`;


function ProductItems(item) {
  const [state, dispatch] = useStoreContext();
  // const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT);

  // useEffect(() => {
  //   if (data) {
  //     dispatch({
  //       type: UPDATE_PRODUCTS,
  //       products: data.produc,
  //     });
  //     data.products.forEach((product) => {
  //       idbPromise('products', 'put', product);
  //     });
  //   } else if (!loading) {
  //     idbPromise('products', 'get').then((products) => {
  //       dispatch({
  //         type: UPDATE_PRODUCTS,
  //         products: products,
  //       });
  //     });
  //   }
  // }, [data, loading, dispatch]);

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;
  console.log('ID', _id)

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }
  return (
    <>
    <Container>
    <Link to={`/products/${_id}`}>
        <Image
          alt={name}
          src={`${path.join(process.env.PUBLIC_URL, `${image}`)}`} 
          />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
      {/* {loading ? <h2> LOADING ...</h2> : null} */}
    </Container>
    </>
  )
}

export default ProductItems;