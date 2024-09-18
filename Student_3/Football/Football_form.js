//If the javascript document is not ready then html and css code will run so to avoid that 
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready)
}
else {
  ready();
}

function ready() {
  const nicknameInput = document.querySelector('input[type="text"]');
  const submitBtn = document.querySelector('.button');


  submitBtn.addEventListener('click', (event) => {    //prevents the default behavior of submitting the form and retrieves the value of an input element with the type "text"
    event.preventDefault(); 
    
    const nickname = nicknameInput.value.trim();

    localStorage.setItem("name", nickname);

    if (nickname === '') {
      alert('Please enter a nickname.');      //If nothing entered alert message pops
      nicknameInput.focus(); 
    } else {
      window.location.href='Football_instructions.html';
    }
  });
}