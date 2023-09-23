const formValidator = (form, res) => {
  form.querySelectorAll("input").forEach((input) => {
    input.classList.remove("is-invalid");

    if (input.value == "") {
      input.classList.add("is-invalid");
    }

    if(res.message.email_address && input.getAttribute("name")==="email"){
        input.classList.add("is-invalid");
        const feedback =  input.nextSibling.nextSibling.nextSibling.nextSibling;
        feedback.innerHTML = res.message.email_address
        
    }
    

    //Contact number validation

    if(res.message.contact && input.getAttribute("name")==="contactNumber"){
        input.classList.add("is-invalid");
        const feedback =  input.nextSibling.nextSibling.nextSibling.nextSibling;
        feedback.innerHTML = res.message.contact
        console.log(feedback)
    }
    


  });
 
};
