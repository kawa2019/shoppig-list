//  create options of select element, category of shopping list
export default function (categoryArray, select, oneBigshoppingList) {
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
}
