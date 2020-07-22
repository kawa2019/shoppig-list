// again adding event on removeProduct element
export default function (removeProductFn) {
  [...document.querySelectorAll('.removeProduct')].map((product, index) => {
    const removeBtn = document.querySelectorAll('.removeProduct')[index];
    return removeBtn.addEventListener(
      'click',
      () => {
        removeProductFn(removeBtn);
      },
      false
    );
  });
}
