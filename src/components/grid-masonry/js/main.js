function resizeGridItem(item) {
  const gridMasonry = document.getElementsByClassName("grid-masonry")[0];
  const rowHeight = parseInt(
    window.getComputedStyle(gridMasonry).getPropertyValue("grid-auto-rows")
  );
  console.log('rowHeight = ' + rowHeight);
  const rowGap = parseInt(
    window.getComputedStyle(gridMasonry).getPropertyValue("grid-row-gap")
  );
  console.log('rowGap = ' + rowGap);
  const rowSpan = Math.ceil(
    (item.querySelector(".content-masonry").getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
  );
  console.log('height = ' + item.querySelector(".content-masonry").getBoundingClientRect().height);
  console.log('rowSpan = ' + rowSpan);
  item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
  const allItems = document.getElementsByClassName("item-masonry");
  for (x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x]);
  }
}

function resizeInstance(instance) {
  const item = instance.elements[0];
  resizeGridItem(item);
}

window.onload = resizeAllGridItems();
window.addEventListener("resize", resizeAllGridItems);

// const allItems = document.getElementsByClassName("item-masonry");
// for (x = 0; x < allItems.length; x++) {
//   imagesLoaded(allItems[x], resizeInstance);
// }
