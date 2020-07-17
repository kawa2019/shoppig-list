import * as mdb from 'mdb-ui-kit';
// import { doc } from 'prettier';
document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('select');
  const categoryArray = [
    'warzywa',
    'owoce',
    'nabiał',
    'pieczywo',
    'artykuły higieniczne',
    'napoje',
  ];
  categoryArray.map((category) => {
    const newCategory = document.createElement('option');
    newCategory.innerHTML = category;
    return select.appendChild(newCategory);
  });

  const addProduct = (event) => {
    event.preventDefault();
    const numbers = /^[0-9]+$/;
    //
    const quantityProduct = document.querySelector('#quantityProduct');
    if (numbers.test(quantityProduct.value)) {
      console.log('quantityProduct');
      return;
    }
  };
  document.querySelector('form').addEventListener('submit', addProduct);
});

export default {
  mdb,
};
