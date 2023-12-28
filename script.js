

/*bag container*/

    // const bag = document.querySelector(".fa-bag-shopping");
    // const sidebar = document.querySelector(".sidebar");
    // sidebar.inWindow = 0

    // bag.addEventListener('mouseover',() =>{
    //     if(sidebar.classList.contains('hide'))
    //     sidebar.classList.remove('hide')
        
    // })


    // bag.addEventListener('mouseleave',() =>{
    //     /*if(sidebar.classList.contains('hide'))*/
    //     setTimeout(()=>{
    //     if(sidebar.inWindow===0){
    //         sidebar.classList.add('hide')
    //     }
    //     },500)
        
    // })
    //     sidebar.addEventListener('mouseover',()=>{
    //         sidebar.inWindow=1
    //     })

    //     sidebar.addEventListener('mouseleave',()=>{
    //         sidebar.inWindow=0
    //         sidebar.classList.add('hide')
    //     })

/* wishliste*/
let wishliste = [];

function setup(){
    console.log("window loaded");
    const products = document.querySelectorAll(".add-to-card");
    for(let i=0; i<products.length; i++){
        products[i].onclick = function(e){
            addItem(e);
        }
    }


}

function addItem(e){
    const productId = e.target.getAttribute("id");
    console.log("Product :", productId);
    const productDiv = document.getElementById(productId);

    const wishDiv = document.createElement("div");
    wishDiv.setAttribute("id", "wish" + productId);
    wishDiv.setAttribute("class", "item1");
    wishDiv.innerHTML = productDiv.innerHTML;

    const removeBtn = document.createElement("input");
    removeBtn.setAttribute("type", "button");
    removeBtn.setAttribute("value", "Remove");
    removeBtn.onclick = function() { removeItem(productId)};
    wishDiv.appendChild(removeBtn);

    let aside = document.getElementById("wish-List");
    aside.appendChild(wishDiv);
}

function removeItem(productId){
    const product = document.getElementById("wish" +productId);
    product.remove();
}

window.addEventListener("load", setup);

 /*sticky nav*/

    const nav = document.querySelector("nav");

    window.addEventListener("scroll", function(){
        nav.classList.toggle ("sticky", this.window.scrollY > 0);
    })


    let signinBtn = document.getElementById("signinBtn");
    let signupBtn = document.getElementById("signupBtn");
    let RegisterBtn = document.getElementById("RegisterBtn");
    let field = document.getElementById("field");
    let passwordField = document.getElementById("passwordField");
    let title = document.getElementById("title");

    signinBtn.onclick = function(e){
        e.preventDefault();
        field.style.maxHeight = "0";
        field.style.visibility = "hidden";
        passwordField.style.maxHeight = "0";
        passwordField.style.visibility = "hidden";
        title.innerHTML = "Sign In";
        signupBtn.classList.add("disable");
        signinBtn.classList.remove("disable");
    }

    signupBtn.onclick = function(e){
        e.preventDefault();
        field.style.maxHeight = "60px";
        field.style.visibility = "visible";
        passwordField.style.maxHeight = "60px";
        passwordField.style.visibility = "visible";
        title.innerHTML = "Sign Up";
        signupBtn.classList.remove("disable");
        signinBtn.classList.add("disable");
    }


    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("password2");


    
    const rememberMe = document.getElementById("RememberCheck");
    rememberMe.addEventListener('change', lsRememberMe);

    
    if(localStorage.checkbox && localStorage.checkbox !==""){
        rememberMe.setAttribute("checked", "checked");
        email.value = localStorage.email;
        password.value = localStorage.password;
    }else{
        rememberMe.removeAttribute("checked");
        email.value = "";
        password.value = "";
    }

    function lsRememberMe() {
        
        if (rememberMe.checked && email.value !== "" && password.value !=="") {
          localStorage.email = email.value;
          localStorage.password = password.value;
          localStorage.checkbox = rememberMe.value;
        } else {
          localStorage.email = "";
          localStorage.password = "";
          localStorage.checkbox = "";
        }
      }


    username.addEventListener('input', checkUsername);
    email.addEventListener('input', checkEmail);
    password.addEventListener('input', checkPassword);
    confirmPassword.addEventListener('input', checkConfirmPassword);

    function checkUsername() {
        const usernameValue = username.value.trim();
        const isUsernameVisible = parseInt(getComputedStyle(field).maxHeight) > 0;

        if (isUsernameVisible) {
            if (usernameValue === '') {
                setErrorFor(username, 'Username cannot be blank');
            } else {
                setSuccessFor(username);
            }
        }
    }

    function checkEmail() {
        const emailValue = email.value.trim();

        if (emailValue === '') {
            setErrorFor(email, 'Email cannot be blank');
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, 'Email is not valid');
        } else {
            setSuccessFor(email);
        }
    }

    function checkPassword() {
        const passwordValue = password.value.trim();

        if (passwordValue === '') {
            setErrorFor(password, 'Password cannot be blank');
        } else if (!isPassword(passwordValue)) {
            setErrorFor(password, 'Password is not valid');
        } else {
            setSuccessFor(password);
        }
    }

    function checkConfirmPassword() {
        const confirmPasswordValue = confirmPassword.value.trim();
        const passwordValue = password.value.trim();
        const isConfirmPasswordVisible = parseInt(getComputedStyle(passwordField).maxHeight) > 0;

        if (isConfirmPasswordVisible) {
            if (confirmPasswordValue === '') {
                setErrorFor(confirmPassword, 'Confirm password cannot be blank');
            } else if (passwordValue !== confirmPasswordValue) {
                setErrorFor(confirmPassword, 'Passwords do not match');
            } else {
                setSuccessFor(confirmPassword);
            }
        }
    }

    function checkInputs() {
        checkUsername();
        checkEmail();
        checkPassword();
        checkConfirmPassword();

        const isValid = true;

        if (isValid) {
            const alertElement = document.getElementById('alert');
            alertElement.style.visibility = 'visible';

            setTimeout(() => {
                alertElement.style.visibility = 'hidden';
            }, 5000);
        }
    }



        function setErrorFor(input, message){
            const formControl = input.parentElement;
            const span = formControl.querySelector('span');

            span.innerText = message;
            formControl.className = 'in error';
        }

        function setSuccessFor(input){
            const formControl = input.parentElement;
            formControl.className = 'in success';
        }

        function isEmail(email){
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
        }

        function isPassword(password){
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
        }