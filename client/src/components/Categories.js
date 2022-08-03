import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../utils/actions';
import { QUERY_CATEGORIES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import styled from 'styled-components';
// import { categories } from '../data';
// import CatItems from './CatItems';
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex; 
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

function Categories() {
  const [state, dispatch] = useStoreContext();
  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <Container>
      <h2>Cateogries</h2>
      {categories.map((item) => (
        <button
        key={item.id}
        onClick={() => {
          handleClick(item._id);
        }}>
          {item.name}
        </button> 
        
      ))}
    </Container>
  );
};

export default Categories