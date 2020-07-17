import * as mdb from 'mdb-ui-kit';
// import { doc } from 'prettier';
document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('select');
  const containerShoppingList = document.querySelector('.container-shoppingList');
  const quantityProductLabel = document.querySelector('label[for="quantityProductLabel"]');
  const counter = document.querySelector('select').options;
  const categoryArray = ['warzywa', 'owoce', 'nabiał', 'pieczywo', 'artykuł-higieniczne', 'napoje'];
  categoryArray.map((category) => {
    const newCategory = document.createElement('option');
    newCategory.innerHTML = category;
    const newCategoryList = document.createElement('ul');
    newCategoryList.classList.add(category);
    const allReturn = [
      select.appendChild(newCategory),
      containerShoppingList.appendChild(newCategoryList),
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
  const addProduct = (event) => {
    event.preventDefault();
    const product = document.querySelector('#product');
    const quantityProduct = document.querySelector('#quantityProduct');
    const chooseCategory = [...counter].find((option) => option.selected === true).innerHTML;
    const shoppingList = document.querySelector(`.${chooseCategory}`);
    const newProduct = document.createElement('li');
    newProduct.innerHTML = `${product.value} ${quantityProductLabel.innerHTML}${quantityProduct.value}`;
    return shoppingList.appendChild(newProduct);
  };
  document.querySelector('form').addEventListener('submit', addProduct);
});

export default {
  mdb,
};
