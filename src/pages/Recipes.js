import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { fetchRecipes } from '../redux/actions';

function Recipes({ location }) {
  const [recipesList, setRecipesList] = useState([]);
  const dispatch = useDispatch();

  const { pathname } = location;
  const type = pathname.replace('/', '');
  const allRecipes = useSelector((state) => state[type].recipes);

  useEffect(() => {
    dispatch(fetchRecipes(type));
  }, [type]);

  useEffect(() => {
    const limit = 12;
    setRecipesList(allRecipes.slice(0, limit));
  }, [allRecipes]);

  const capitalize = (word) => word[0].toUpperCase() + word.substring(1, word.length - 1);

  return (
    <div>
      <div>
        {!recipesList.length
          ? <h1>Carregando...</h1>
          : recipesList.map((recipe, i) => (
            <RecipeCard
              key={ i }
              name={ recipe[`str${capitalize(type)}`] }
              type={ type }
              id={ recipe[`id${capitalize(type)}`] }
              thumb={ recipe[`str${capitalize(type)}Thumb`] }
              index={ i }
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  location: shape({
    pathname: string,
  }).isRequired,
};

export default Recipes;
