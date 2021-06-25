const getForm = document.getElementById("form");

getForm.addEventListener("submit", (e) => {
  const name = document.getElementById("add-name");
  if (name) {
    const nameValue = name.value;
    localStorage.setItem("name", nameValue);
    name.className = "disabled";
  }

  e.preventDefault();
});
