const writeContent = () => {
  let items = document.querySelectorAll("[contenteditable]");
  const data = [];
  items.forEach((item) => {
    let focused = true;
    if (item.className === "editable") {
      let nearestGridItem = item.closest(".grid-item");
      if (!nearestGridItem) return;
      focused = nearestGridItem.classList.contains("focused");
    }
    data.push({
      name: item.id,
      focused: focused,
      data: item.textContent,
    });
  });
  localStorage.setItem("data", JSON.stringify(data));
};

const resetContent = () => {
  let items = document.querySelectorAll("[contenteditable]");
  const data = [];
  items.forEach((item) => {
    data.push({
      name: item.id,
      focused: true,
      data: "",
    });
  });
  localStorage.setItem("data", JSON.stringify(data));
  window.document.location.reload();
};

const controlHandler = (e) => {
  if (
    (e.ctrlKey && e.key === "Escape") ||
    (e.ctrlKey && e.key === "Backspace")
  ) {
    let confirmation = confirm("Are you sure you want to clear all data?");
    if (!confirmation) return;

    let items = document.querySelectorAll("[contenteditable]");
    items.forEach((item) => {
      item.textContent = "";
    });
    resetContent();
  }
  if (e.ctrlKey) {
    let nearestGridItem = e.target.closest(".grid-item");
    if (!nearestGridItem) return;
    if (nearestGridItem.classList.contains("focused")) {
      nearestGridItem.classList.remove("focused");
    } else {
      nearestGridItem.classList.add("focused");
    }
    writeContent();
  }
};

const load = () => {
  document.addEventListener("keydown", controlHandler);
  let data = JSON.parse(localStorage.getItem("data"));
  let items = document.querySelectorAll("[contenteditable]");
  if (!data) {
    data = [];
    items.forEach((item) => {
      data.push({
        name: item.id,
        focused: true,
        data: item.textContent,
      });
    });
    localStorage.setItem("data", JSON.stringify(data));
  }
  items.forEach((index) => {
    index.addEventListener("input", writeContent);
  });
  if (data) {
    data.forEach((item, index) => {
      items[index].textContent = item.data;
      if (item.focused) {
        const gridItem = items[index].closest(".grid-item");
        if (!gridItem) return;
        gridItem.classList.add("focused");
      }
    });
  }
};

window.addEventListener("load", load);
