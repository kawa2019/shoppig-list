import * as mdb from 'mdb-ui-kit';

document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('select');
  const allProductList = localStorage.getItem('allProductList');
  const oneBigshoppingList = document.querySelector('.container-shoppingList');
  const quantityProductLabel = document.querySelector('label[for="quantityProductLabel"]');
  const counter = document.querySelector('select').options;
  const counterAllProduct = document.querySelector('h4');
  const categoryArray = ['warzywa', 'owoce', 'nabiał', 'pieczywo', 'artykuł-higieniczne', 'napoje'];
  categoryArray.map((category) => {
    const newCategory = document.createElement('option');
    newCategory.innerText = category;
    const newCategoryList = document.createElement('ul');
    newCategoryList.classList.add(category, 'one-category');
    newCategoryList.innerText = category;
    const allReturn = [
      select.appendChild(newCategory),
      oneBigshoppingList.appendChild(newCategoryList),
    ];
    return allReturn.map((reTurn) => reTurn);
  });
  // const omasta = allProductList.map(product => product)

  const kindOfCounter = () => {
    if (counter[0].selected || counter[1].selected) {
      return (quantityProductLabel.innerText = 'ciężar w kg:');
    }

    return (quantityProductLabel.innerText = 'sztuk:');
  };
  select.addEventListener('change', kindOfCounter);
  const allProductArray = [];
  /// /////////////////////////
  console.log(allProductList);
  oneBigshoppingList.innerHTML = `${allProductList}`;
  [...document.querySelectorAll('.removeProduct')].map((product, index) => {
    return document
      .querySelectorAll('.removeProduct')
      [index].addEventListener('click', function () {
        counterAllProduct.innerHTML = 'Wszystkie produkty: ';
        const parentBtn = this.parentElement;
        return parentBtn.parentElement.removeChild(parentBtn);
      });
  });

  /// ////////////////

  document.querySelector('.one-product');
  const addProduct = (event) => {
    event.preventDefault();

    const error = document.querySelector('.error');
    localStorage.setItem('arrayOfRepeatProduct', JSON.stringify(allProductArray));

    const arrayOfRepeatProduct = JSON.parse(localStorage.getItem('arrayOfRepeatProduct'));
    const product = document.querySelector('#product').value;
    const quantityProduct = document.querySelector('#quantityProduct');
    const chooseCategory = [...counter].find((option) => option.selected === true).innerText;
    const repeatProduct = arrayOfRepeatProduct.find((item) => item === product);
    allProductArray.push(product);
    if (!repeatProduct) {
      const shoppingList = document.querySelector(`.${chooseCategory}`);
      const allProduct = document.querySelectorAll('.one-product');
      const newProduct = document.createElement('li');
      newProduct.classList.add('one-product');
      counterAllProduct.innerText = `Wszystkie produkty: ${allProduct.length + 1}`;
      newProduct.innerHTML = `${product} ${quantityProductLabel.innerText}${quantityProduct.value}`;
      const removeProduct = document.createElement('span');
      removeProduct.innerHTML = 'x';
      removeProduct.classList.add('removeProduct');
      removeProduct.addEventListener('click', () => {
        counterAllProduct.innerHTML = `Wszystkie produkty: ${allProduct.length}`;
        const parentBtn = removeProduct.parentElement;
        return parentBtn.parentElement.removeChild(parentBtn);
      });
      newProduct.appendChild(removeProduct);
      if (error !== null) {
        error.parentNode.removeChild(error);
      }
      shoppingList.appendChild(newProduct);
      const productsTag = oneBigshoppingList.innerHTML;
      localStorage.setItem('allProductList', productsTag);
      return shoppingList.appendChild(newProduct);
    }
    if (!error) {
      const newError = document.createElement('p');
      newError.classList.add('error');
      newError.style.color = '#f00';
      newError.innerText = 'produkt się powtarza';
      return quantityProduct.parentElement.insertBefore(
        newError,
        quantityProduct.parentElement.children[6]
      );
    }
    return false;
  };
  document.querySelector('form').addEventListener('submit', addProduct);
});

export default {
  mdb,
};
