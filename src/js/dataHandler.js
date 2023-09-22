const tableEl = document.getElementById("contacts"),
  formEl = document.getElementById("createContactForm");
editModalEl = document.getElementById("edit-modal");
let contactContainer = document.querySelector(".contact-container"),
  contactsEl = document.querySelectorAll(".contact");
trash = document.querySelectorAll(".trash");
const CONTACT_ITEM_KEY = "contacts";

const php = {
  retrieveContact: "../src/php/retrieveContacts.php",
  addContact: "../src/php/addContact.php",
  deleteContact: "../src/php/deleteContact.php",
  editContact: "../src/php/editContact.php",
};

let contactList = []; // Initialize the contactlist array

// retrieve contacts from database
async function getContacts() {
  try {
    const response = await fetch(php.retrieveContact);
    const data = await response.json();
    contactList = data;
    renderContacts();
  } catch (e) {
    console.log("Error 404: Couldn't fetch data from API");
  }
}

// render the getcontacts and render contacts
const render = () => {
  getContacts();
};

//creates data to database
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    firstname: formEl.querySelector("[name=firstname]").value,
    lastname: formEl.querySelector("[name=lastname]").value,
    email_address: formEl.querySelector("[name=email]").value,
    contact_number: formEl.querySelector("[name=contactNumber]").value,
  };

  const res = await action(php.addContact, formData);
  await formValidator(formEl, res);
  if (!res.message == "") return;
  await render();
  const createModalForm = await document.getElementById("createModalForm");
  await modalCloser(formEl);

  await formEl.querySelectorAll("input").forEach((input) => {
    input.value = "";
    input.classList.remove("is-invalid");
    });
  
});

// edit specific row
editModalEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const selectedID = editModalEl.dataset.id;

  const formData = {
    id: selectedID,
    firstname: editModalEl.querySelector("[name=firstname]").value,
    lastname: editModalEl.querySelector("[name=lastname]").value,
    email_address: editModalEl.querySelector("[name=email]").value,
    contact_number: editModalEl.querySelector("[name=contactNumber]").value,
  };

  const res = await action(php.editContact, formData);
  formValidator(editModalEl, res);

  if (!res.message == "") return;
  const editModalForm = document.getElementById("editModalForm");
  editModalEl.querySelectorAll("input").forEach((input) => {
    input.value ="";
    input.classList.remove("is-invalid");
  });
  modalCloser(editModalEl);
  render();
});

// delete specific row

async function handleDelete(e) {
  if (!confirm("Are you sure you want to delete this record?")) return;

  const formData = {
    id: e.parentNode.parentNode.dataset.id,
  };

  const res = await action(php.deleteContact, formData);
  render();
}

// action handler

const action = async (phpFile, formData) => {
  try {
    const response = await fetch(phpFile, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.text();
    const dataJSON = await JSON.parse(data);
    return dataJSON;
  } catch (error) {
    console.error("A problem occurred:", error);
  }
};
