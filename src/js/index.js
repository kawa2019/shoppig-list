import * as mdb from 'mdb-ui-kit';
import addingOptionCategory from './addingOptionCategory';
import addingEventRemProduct from './addingEventRemProduct';

document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('select');
  const allProductList = localStorage.getItem('allProductList');
  const oneBigshoppingList = document.querySelector('.container-shoppingList');
  const quantityProductLabel = document.querySelector('label[for="quantityProductLabel"]');
  const categoryArray = ['warzywa', 'owoce', 'nabiał', 'pieczywo', 'artykuł-higieniczne', 'napoje'];

  //  create options of select element, category of shopping list
  addingOptionCategory(categoryArray, select, oneBigshoppingList);

  // fn to change kind of counter item or weight
  const kindOfCounter = () => {
    if (select.options[0].selected || select.options[1].selected) {
      return (quantityProductLabel.innerText = 'ciężar w kg:');
    }
    return (quantityProductLabel.innerText = 'sztuk:');
  };
  //  adding event on select element to change kind of counter
  select.addEventListener('change', kindOfCounter);

  //  prevent override of oneBigshoppingList.innerHTML when localestorage is empty or undefined
  if (allProductList) {
    oneBigshoppingList.innerHTML = `${allProductList}`;
  }
  // state of allProductArray from locale storage loading on start
  const beginStateAllProductArray = () => {
    if (localStorage.getItem('arrayOfRepeatProduct')) {
      return JSON.parse(localStorage.getItem('arrayOfRepeatProduct'));
    }
    return [];
  };
  let allProductArray = [...beginStateAllProductArray()];
  let counterWeight = localStorage.getItem('counterWeight')
    ? Number(localStorage.getItem('counterWeight'))
    : 0;
  let counterTimes = localStorage.getItem('counterTimes')
    ? Number(localStorage.getItem('counterTimes'))
    : 0;
  // fn event on remove btn
  const removeProductFn = (removeBtn) => {
    // changing counter
    const counterAllProduct = document.querySelector('.counter');
    const allProduct = document.querySelectorAll('.one-product');
    counterAllProduct.innerText = `Wszystkie produkty: ${allProduct.length - 1}`;
    const counterAllTimes = document.querySelector('h6');

    // removing product
    const parentBtn = removeBtn.parentElement;
    const removeName = parentBtn.innerText.slice(
      0,
      parentBtn.innerText.indexOf(
        parentBtn.innerText.includes('ciężar w kg:') ? ' ciężar w kg:' : ' sztuk:'
      )
    );

    if (parentBtn.innerText.slice(removeName.length + 1, removeName.length + 2) === 'c') {
      counterWeight -= Number(
        parentBtn.innerText.slice(
          removeName.length +
            (parentBtn.innerText.includes('ciężar w kg:') && ' ciężar w kg:'.length),
          parentBtn.innerText.length - 1
        )
      );
      localStorage.setItem('counterWeight', counterWeight);
    } else {
      counterTimes -= Number(
        parentBtn.innerText.slice(
          removeName.length + (parentBtn.innerText.includes(' sztuk:') && ' sztuk:'.length),
          parentBtn.innerText.length - 1
        )
      );
      localStorage.setItem('counterTimes', counterTimes);
    }
    counterAllTimes.innerText = `Razem sztuk: ${counterTimes} waga: ${counterWeight} `;
    allProductArray = allProductArray.filter((productName) => productName !== removeName);
    const allReturn = [
      parentBtn.parentElement.removeChild(parentBtn),
      localStorage.setItem('allProductList', oneBigshoppingList.innerHTML),
      localStorage.setItem('arrayOfRepeatProduct', JSON.stringify(allProductArray)),
    ];
    return allReturn.map((reTurn) => reTurn);
  };
  // // again adding event on removeProduct element
  addingEventRemProduct(removeProductFn);

  // making fn for form event
  const addProduct = (event) => {
    event.preventDefault();
    const product = document.querySelector('#product').value;
    allProductArray.push(product);
    const error = document.querySelector('.error');
    localStorage.setItem('arrayOfRepeatProduct', JSON.stringify(allProductArray));
    const arrayOfRepeatProduct = JSON.parse(localStorage.getItem('arrayOfRepeatProduct'));
    const quantityProduct = document.querySelector('#quantityProduct');

    const chooseCategory = [...select.options].find((option) => option.selected === true).innerText;

    const repeatProduct = arrayOfRepeatProduct.filter((item) => item === product);

    if (!(repeatProduct.length >= 2)) {
      const shoppingList = document.querySelector(`.${chooseCategory}`);
      const counterAllProduct = document.querySelector('.counter');
      const counterAllTimes = document.querySelector('h6');
      const allProduct = document.querySelectorAll('.one-product');
      // podstawiam do zmiennej dla countera quantityProduct.value
      if (quantityProductLabel.innerText === 'ciężar w kg:') {
        counterWeight += Number(quantityProduct.value);
        localStorage.setItem('counterWeight', counterWeight);
      } else {
        counterTimes += Number(quantityProduct.value);
        localStorage.setItem('counterTimes', counterTimes);
      }
      const newProduct = document.createElement('li');
      newProduct.classList.add('one-product');
      newProduct.innerHTML = `${product} ${quantityProductLabel.innerText}${quantityProduct.value}`;
      const removeProduct = document.createElement('span');
      removeProduct.innerHTML = 'x';
      removeProduct.classList.add('removeProduct');
      removeProduct.addEventListener(
        'click',
        () => {
          return removeProductFn(removeProduct);
        },
        false
      );
      newProduct.appendChild(removeProduct);
      if (error) {
        error.parentNode.removeChild(error);
      }
      counterAllProduct.innerText = `Wszystkie produkty: ${allProduct.length + 1}`;
      counterAllTimes.innerText = `Razem sztuk: ${counterTimes} waga: ${counterWeight} `;
      const allReturn = [
        shoppingList.appendChild(newProduct),
        localStorage.setItem('allProductList', oneBigshoppingList.innerHTML),
      ];
      return allReturn.map((reTurn) => reTurn);
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
