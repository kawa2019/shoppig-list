import * as mdb from 'mdb-ui-kit';

document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('select');
  const allProductList = localStorage.getItem('allProductList');
  const oneBigshoppingList = document.querySelector('.container-shoppingList');
  const quantityProductLabel = document.querySelector('label[for="quantityProductLabel"]');
  const counterAllProduct = document.querySelector('h4');
  const categoryArray = ['warzywa', 'owoce', 'nabiał', 'pieczywo', 'artykuł-higieniczne', 'napoje'];
  //  const arrayOfRepeatProductParse=JSON.parse( localStorage.getItem('arrayOfRepeatProduct'))

  //  create options of select element, category of shopping list
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
  if (allProductList !== null) {
    oneBigshoppingList.innerHTML = `${allProductList}`;
  }
  //
  const beginStateAllProductArray = localStorage.getItem('arrayOfRepeatProduct')
    ? JSON.parse(localStorage.getItem('arrayOfRepeatProduct'))
    : [];
  // again adding event on removeProduct element
  [...document.querySelectorAll('.removeProduct')].map((product, index) => {
    const allProductArray = [...beginStateAllProductArray];
    return document
      .querySelectorAll('.removeProduct')
      [index].addEventListener('click', function () {
        counterAllProduct.innerHTML = 'Wszystkie produkty: ';
        const parentBtn = this.parentElement;
        const removeName = parentBtn.innerText.slice(
          0,
          parentBtn.innerText.indexOf(` ${quantityProductLabel.innerText}`)
        );
        const newArrayOfRepeatProduct = allProductArray.filter(
          (productName) => productName !== removeName
        );
        localStorage.setItem('arrayOfRepeatProduct', JSON.stringify(newArrayOfRepeatProduct));

        const allReturn = [
          parentBtn.parentElement.removeChild(parentBtn),
          localStorage.setItem('allProductList', oneBigshoppingList.innerHTML),
        ];
        return allReturn.map((reTurn) => reTurn);
      });
  });

  // making fn for form event
  const addProduct = (event) => {
    event.preventDefault();
    // display locale storage products

    const allProductArray = [...beginStateAllProductArray];
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
        const removeName = parentBtn.innerText.slice(
          0,
          parentBtn.innerText.indexOf(` ${quantityProductLabel.innerText}`)
        );
        const newArrayOfRepeatProduct = allProductArray.filter(
          (productName) => productName !== removeName
        );

        const allReturn = [
          parentBtn.parentElement.removeChild(parentBtn),
          localStorage.setItem('allProductList', oneBigshoppingList.innerHTML),
          localStorage.setItem('arrayOfRepeatProduct', JSON.stringify(newArrayOfRepeatProduct)),
        ];
        return allReturn.map((reTurn) => reTurn);
      });
      newProduct.appendChild(removeProduct);
      if (error !== null) {
        error.parentNode.removeChild(error);
      }
      shoppingList.appendChild(newProduct);
      localStorage.setItem('allProductList', oneBigshoppingList.innerHTML);
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
