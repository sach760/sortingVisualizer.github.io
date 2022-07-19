var container = document.getElementById("array");
var sortBtnOn = true;

// Function to generate the array of blocks
function generateArray() {
  var size = Number(document.querySelector(".size").value);

  if (sortBtnOn == false) return;
  var blocks = document.querySelectorAll(".block");
  while (container.firstChild) container.removeChild(container.firstChild);

  blockWidth = 30;

  container.style.width = `${blockWidth * size}px`;

  for (var i = 0; i < size; i++) {
    // Return a value from 1 to 100 (both inclusive)
    var value = Math.ceil(Math.random() * 100);
    console.log(value);

    // Creating element div
    // console.log(value);
    var array_ele = document.createElement("div");

    // Adding class 'block' to div
    array_ele.classList.add("block");

    // Adding style to div
    array_ele.style.height = `${value * 3}px`;
    array_ele.style.width = `${blockWidth - 2}px`;
    array_ele.style.transform = `translate(${i * blockWidth}px)`;

    // Creating label element for displaying
    // size of particular block
    var array_ele_label = document.createElement("label");
    array_ele_label.classList.add("block_id");
    array_ele_label.innerText = value;

    // Appending created elements to index.html
    array_ele.appendChild(array_ele_label);
    container.appendChild(array_ele);
  }
}

// Promise to swap two blocks
function swap(k, l) {
  return new Promise((resolve) => {
    var blocks = document.querySelectorAll(".block");

    blocks[k].style.backgroundColor = "#C7493A";
    blocks[l].style.backgroundColor = "#C7493A";

    // For exchanging styles of two blocks
    setTimeout(() => {
      var tempHt = blocks[k].style.height;
      var tempTxt = blocks[k].childNodes[0].innerHTML;

      blocks[k].style.height = blocks[l].style.height;
      blocks[k].childNodes[0].innerHTML = blocks[l].childNodes[0].innerHTML;

      blocks[l].style.height = tempHt;
      blocks[l].childNodes[0].innerHTML = tempTxt;

      blocks[k].style.backgroundColor = "white";
      blocks[l].style.backgroundColor = "white";
      resolve();
    }, 250);
  });
}

// Asynchronous BubbleSort function
async function BubbleSort(delay = 100) {
  var blocks = document.querySelectorAll(".block");

  // BubbleSort Algorithm
  for (var i = 0; i < blocks.length; i += 1) {
    for (var j = 0; j < blocks.length - i - 1; j += 1) {
      // To change background-color of the
      // blocks to be compared
      blocks[j].style.backgroundColor = "#C7493A";
      blocks[j + 1].style.backgroundColor = "#C7493A";

      // To wait for .1 sec
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      console.log("run");
      var value1 = Number(blocks[j].childNodes[0].innerHTML);
      var value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

      // To compare value of two blocks
      if (value1 > value2) {
        await swap(j, j + 1);
        blocks = document.querySelectorAll(".block");
      }
      console.log(blocks[j].childNodes[0].innerHTML);
      // Changing the color to the previous one
      blocks[j].style.backgroundColor = "white";
      blocks[j + 1].style.backgroundColor = "white";
    }

    //changing the color of greatest element
    //found in the above traversal
    blocks[blocks.length - i - 1].style.backgroundColor = "#689775";
  }
}

//
async function selectionSort(delay = 100) {
  var blocks = document.querySelectorAll(".block");

  // SelectionSort Algorithm
  for (var i = 0; i < blocks.length; i += 1) {
    console.log("starting of new j loop");

    var minIndex = i;
    var minValue = Number(blocks[minIndex].childNodes[0].innerHTML);
    blocks[minIndex].style.backgroundColor = "#AD8174";
    for (var j = i + 1; j < blocks.length; j += 1) {
      console.log(j);
      blocks[j].style.backgroundColor = "#2F4E6F";

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      var currValue = Number(blocks[j].childNodes[0].innerHTML);

      if (currValue < minValue) {
        blocks[minIndex].style.backgroundColor = "white";
        minIndex = j;
        minValue = Number(blocks[minIndex].childNodes[0].innerHTML);
        blocks[minIndex].style.backgroundColor = "#AD8174";
      } else blocks[j].style.backgroundColor = "white";
    }

    if (i != minIndex) {
      await swap(i, minIndex);
    }

    for (var k = 0; k < blocks.length; k++) {
      console.log(Number(blocks[k].childNodes[0].innerHTML));
    }

    blocks[i].style.backgroundColor = "#689775";
  }
}

async function insertionSort(delay = 100) {
  var blocks = document.querySelectorAll(".block");
  for (var i = 1; i < blocks.length; i += 1) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, delay)
    );

    var value = Number(blocks[i].childNodes[0].innerHTML);
    var j = i - 1;
    while (j >= 0 && Number(blocks[j].childNodes[0].innerHTML) > value) {
      await swap(j, j + 1);
      j--;
    }
  }
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].style.backgroundColor = "#689775";
  }
}
function helperMerge(k, value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var blocks = document.querySelectorAll(".block");
      blocks[k].style.height = `${3 * value}px`;
      blocks[k].childNodes[0].innerHTML = `${value}`;
      resolve();
    }, 100);
  });
}
async function mergeArray(l, mid, r) {
  var blocks = document.querySelectorAll(".block");
  // console.log(blocks);

  var left = [];
  var right = [];

  for (var i = l; i <= mid; i++) {
    left.push(Number(blocks[i].childNodes[0].innerHTML));
  }

  for (var i = mid + 1; i <= r; i++) {
    right.push(Number(blocks[i].childNodes[0].innerHTML));
  }
  for (var i = l; i <= r; i++) {
    blocks[i].style.backgroundColor = "#689775";
  }
  var i = 0;
  var j = 0;

  var k = l;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      await helperMerge(k, left[i]);
      i += 1;
    } else {
      await helperMerge(k, right[j]);
      j += 1;
    }
    k += 1;
  }
  while (i < left.length) {
    await helperMerge(k, left[i]);
    i++;
    k++;
  }
  while (j < right.length) {
    await helperMerge(k, right[j]);
    j++;
    k++;
  }
  if (!(l == 0 && r == blocks.length - 1))
    for (var i = l; i <= r; i++) {
      blocks[i].style.backgroundColor = "white";
    }
}
async function mergeSort(l, r) {
  if (l >= r) return;

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 100)
  );

  console.log("(" + l + "," + r + ")");
  var mid = parseInt((l + r) / 2);

  await mergeSort(l, mid);
  await mergeSort(mid + 1, r);

  await mergeArray(l, mid, r);
}

async function partition(l, r) {
  var blocks = document.querySelectorAll(".block");

  blocks[r].style.backgroundColor = "#AD8174";
  let pivot_value = parseInt(blocks[r].childNodes[0].innerText);

  let i = l;

  for (let j = l; j < r; ++j) {
    //if current element is smaller tha pivot
    let curr_ele = parseInt(blocks[j].childNodes[0].innerText);

    if (curr_ele < pivot_value) {
      await swap(i, j);
      i++;
    }
  }

  await swap(i, r);
  blocks[i].style.backgroundColor = "#689775";
  return i;
}

async function QuickSort(l, r) {
  var blocks = document.querySelectorAll(".block");

  if (l == r) {
    blocks[l].style.backgroundColor = "#689775";
  }
  if (l < r) {
    let pi = await partition(l, r);

    await QuickSort(l, pi - 1);
    await QuickSort(pi + 1, r);
  }
}

// Calling generatearray function
document
  .querySelector(".generateArrBtn")
  .addEventListener("click", generateArray);
document.querySelector(".sizeBtn").addEventListener("change", generateArray);
var blocks = document.querySelectorAll(".block");

document.querySelector(".sortBtn").addEventListener("click", sortHelper);

async function sortHelper() {
  if (sortBtnOn == false) return;
  var blocks = document.querySelectorAll(".block");
  var selectedOption = Number(document.querySelector(".typeSort").value);
  // console.log(selectedOption);
  sortBtnOn = false;
  if (selectedOption == 1) {
    await BubbleSort();
  } else if (selectedOption == 2) {
    await selectionSort();
  } else if (selectedOption == 3) {
    await insertionSort();
  } else if (selectedOption == 4) {
    await mergeSort(0, blocks.length - 1);
  } else if (selectedOption == 5) {
    await QuickSort(0, blocks.length - 1);
  } else {
    await alert("Please select a sorting algorithm");
  }
  sortBtnOn = true;
}
