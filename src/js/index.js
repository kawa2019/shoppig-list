import * as mdb from 'mdb-ui-kit';
// import { doc } from 'prettier';
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
      newProduct.classList.add('one-product');
      newProduct.innerHTML = `${product} ${quantityProductLabel.innerHTML}${quantityProduct.value}`;
      return shoppingList.appendChild(newProduct);
    }
    return false;
  };
  document.querySelector('form').addEventListener('submit', addProduct);
});

export default {
  mdb,
};
