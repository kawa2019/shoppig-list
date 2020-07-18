import * as mdb from 'mdb-ui-kit';

document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('select');
  const oneBigshoppingList = document.querySelector('.container-shoppingList');
  const quantityProductLabel = document.querySelector('label[for="quantityProductLabel"]');
  const counter = document.querySelector('select').options;
  const categoryArray = ['warzywa', 'owoce', 'nabiał', 'pieczywo', 'artykuł-higieniczne', 'napoje'];
  categoryArray.map((category) => {
    const newCategory = document.createElement('option');
    newCategory.innerHTML = category;
    const newCategoryList = document.createElement('ul');
    newCategoryList.classList.add(category, 'one-category');
    newCategoryList.innerHTML = category;
    const allReturn = [
      select.appendChild(newCategory),
      oneBigshoppingList.appendChild(newCategoryList),
    ];
    return allReturn.map((reTurn) => reTurn);
  });
  const kindOfCounter = () => {
    if (counter[0].selected || counter[1].selected) {
      return (quantityProductLabel.innerHTML = 'ciężar w kg:');
    }

    return (quantityProductLabel.innerHTML = 'sztuk:');
  };
  select.addEventListener('change', kindOfCounter);
  const allProductArray = [];
  const addProduct = (event) => {
    event.preventDefault();
    const product = document.querySelector('#product').value;
    const quantityProduct = document.querySelector('#quantityProduct');
    const chooseCategory = [...counter].find((option) => option.selected === true).innerHTML;
    const repeatProduct = allProductArray.find((item) => item === product);
    allProductArray.push(product);
    if (!repeatProduct) {
      const shoppingList = document.querySelector(`.${chooseCategory}`);
      const newProduct = document.createElement('li');
      const error = document.querySelector('.error');
      newProduct.classList.add('one-product');
      newProduct.innerHTML = `${product} ${quantityProductLabel.innerHTML}${quantityProduct.value}`;
      if (error !== null) {
        error.parentNode.removeChild(error);
      }
      return shoppingList.appendChild(newProduct);
    }
    const newError = document.createElement('p');
    newError.classList.add('error');
    newError.style.color = '#f00';
    newError.innerHTML = 'produkt się powtarza';
    return quantityProduct.parentElement.insertBefore(
      newError,
      quantityProduct.parentElement.children[6]
    );
  };
  document.querySelector('form').addEventListener('submit', addProduct);
});

export default {
  mdb,
};
