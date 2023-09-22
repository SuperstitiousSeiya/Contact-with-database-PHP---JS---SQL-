let selectID; 


// //

// Event listeners

// //

const newContact = editModalEl.querySelector('[name="contactNumber"]');
const phoneNumber = formEl.querySelector("#floatingContact");

newContact.addEventListener("input", (e) => {
  let inputValue = event.target.value;
  let numericValue = inputValue.replace(/\D/g, "");
  event.target.value = numericValue;
}); 


phoneNumber.addEventListener("input", (e) => {
  var inputValue = event.target.value;
  var numericValue = inputValue.replace(/\D/g, "");
  event.target.value = numericValue;
});


// handlers

//

// handle edit
function handleEdit(e) {
  const selectedID = e.parentNode.parentNode.dataset.id;
  const foundContact = contactList.find((contact) => contact.id == selectedID);

  editModalEl.dataset.id = selectedID; // Set the selectedID as a data attribute
  editModalEl.querySelectorAll("input").forEach((input) => {
    const name = input.getAttribute("name");

    switch (name) {
      case "firstname":
        input.value = foundContact.firstname;
        break;
      case "lastname":
        input.value = foundContact.lastname;
        break;
      case "email":
        input.value = foundContact.email_address;
        break;
      case "contactNumber":
        input.value = foundContact.contact_number;
        break;
      default:
        break;
    }
  });
}

//

// Functions //

//

function modalCloser(formEl) {
  let SubmitBtn = formEl.querySelector("[type=submit]");
  SubmitBtn.setAttribute("data-bs-dismiss", "modal");
  SubmitBtn.setAttribute("aria-label", "Close");
  SubmitBtn.click();
  SubmitBtn.setAttribute("data-bs-dismiss", "");
  SubmitBtn.setAttribute("aria-label", "");
}


// highlight edit row in table
// function highlightRow(id) {
//   tableEl.querySelectorAll(".contact").forEach((row) => {
//     if (row.dataset.id == id) {
//       row.classList.add("highlighted");
//       setTimeout(function () {
//         row.classList.remove("highlighted");
//       }, 2000);
//     }
//   });
// }


// clearElement
function clearElement(element) {
  element.remove();
}


// render contacts
function renderContacts() {
  let contactEle = document.querySelectorAll(".contact");
  contactEle.forEach((contact) => {
    clearElement(contact);
  });

  contactList.forEach((contact) => {
    let contactEle = document.createElement("tr");
    contactEle.classList.add("contact");
    contactEle.setAttribute("data-id", contact.id);

    contactEle.innerHTML = `<td class="last-name">${contact.lastname}</td>
<td class="first-name">${contact.firstname}</td>
<td class="email">${contact.email_address}</td>
<td class="contact-number">+63${contact.contact_number}</td>
<td class="functions">
  <button id="edit"  data-bs-toggle="modal" data-bs-target="#editModalForm" class="btn btn-secondary" onclick="handleEdit(this)">Edit</button>
  <i class="bi bi-trash" onclick="handleDelete(this)" id="${contact.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg></i>
</td>
`;
    tableEl.querySelector("tbody").appendChild(contactEle);
  });

  localStorage.setItem(CONTACT_ITEM_KEY, JSON.stringify(contactList));


}

render();