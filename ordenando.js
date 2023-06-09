function swap(array, index1, index2) {
  let aux = array[index1];
  array[index1] = array[index2];
  array[index2] = aux;

  return array;
}

function selectedValue() {
  let select = document.getElementById("select");
  if (value === "bubbleSort") {
    bubble_sort();
  } else if (value === "selectionSort") {
    selection_sort();
  } else if (value === "quickSort") {
    quick_sort();
  }
}

function shuffle(array, qtdChanges) {
  for (let i = 0; i < qtdChanges; i++) {
    let index1 = Math.floor(Math.random() * array.length);
    let index2 = Math.floor(Math.random() * array.length);

    swap(array, index1, index2);
  }

  return array;
}

function bubble_sort(array) {
  let changes = 0;
  let sorted = false;

  while (!sorted) {
    sorted = true;

    for (let i = 0; i < array.length - 1; i++) {
      if (array[i + 1] < array[i]) {
        swap(array, i, i + 1);
        changes++;
        sorted = false;
      }
    }
  }

  return { array, changes };
}

function selection_sort(array) {
  let changes = 0;

  for (let i = 0; i < array.length; i++) {
    let min = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }

    if (i !== min) {
      swap(array, i, min);
      changes++;
    }
  }

  return { array, changes };
}

function quick_sort(array) {
  let changes = 0;

  function recursive(array, index1, index2) {
    if (index1 < index2) {
      let partitionIndex = partition(array, index1, index2);

      recursive(array, index1, partitionIndex - 1);
      recursive(array, partitionIndex + 1, index2);
    }
  }

  recursive(array, 0, array.length - 1);

  return { array, changes };
}

function partition(array, index1, index2) {
  let pivot = array[index2];
  let i = index1 - 1;

  for (let j = index1; j < index2; j++) {
    if (array[j] <= pivot) {
      i++;
      swap(array, i, j);
    }
  }

  swap(array, i + 1, index2);

  return i + 1;
}

function addValue() {
  const value = document.getElementById("value");
  const list = document.getElementById("valueResults");

  let node = document.createElement("li");
  let textNode = document.createTextNode(value.value);

  node.appendChild(textNode);
  list.appendChild(node);
  value.value = "";
}

function orderValue() {
  const list = document.getElementById("valueResults");
  let listArray = Array.from(list.children);

  let numberArray = listArray.map((item) => {
    return parseInt(item.innerHTML);
  });

  numberArray.sort((a, b) => {
    return a - b;
  });

  list.innerHTML = numberArray
    .map((item) => {
      return `<li>${item}</li>`;
    })
    .join("");
}

function mixValue() {
  const list = document.getElementById("valueResults");
  let listArray = Array.from(list.children);

  let numberArray = listArray.map((item) => {
    return parseInt(item.innerHTML);
  });

  let shuffledArray = shuffle(numberArray, 10);

    list.innerHTML = shuffledArray
    .map((item) => {
        return `<li>${item}</li>`;
        }
    )
    .join("");
}
