
/*heart icon*/

    const icons = document.querySelectorAll('.heart-icon');

    icons.forEach(icon => {
        let isClicked = false;
    
        icon.addEventListener('click', () => {
            
            if (isClicked) {
                icon.style.color = ''; 
                icon.style.opacity = '0.5'; 
                
            } else {
                icon.style.color = 'red';
                icon.style.opacity = '1';
            }
    
            isClicked = !isClicked;
        });
    });
    

/* wishliste*/

let wishlist = [];


function addToWishlist(itemId) {
    if (!wishlist.includes(itemId)) {
        wishlist.push(itemId);
        updateWishlistDisplay();
        console.log(`Item ${itemId} added to wishlist`);
    } else {
        console.log(`Item ${itemId} is already in the wishlist`);
    }
}
function updateWishlistDisplay() {
    const wishlistItemsContainer = document.getElementById('wishlistItems');
    
    wishlistItemsContainer.innerHTML = '';

    if (wishlist.length > 0) {
        wishlist.forEach(itemId => {
            const itemDiv = document.getElementById(itemId).cloneNode(true);
            itemDiv.classList.add('wishlist-item');

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.onclick = function() {
                deleteItem(itemId);
            };

            itemDiv.appendChild(removeBtn);
            wishlistItemsContainer.appendChild(itemDiv); 
        });
    }
}

function deleteItem(itemId) {
    const index = wishlist.indexOf(itemId);
    if (index !== -1) {
        wishlist.splice(index, 1);
        updateWishlistDisplay();
        console.log(`Item ${itemId} removed from wishlist`);
    }
}



/*cart list*/
 
let cartlist = [];

function setup(){
    console.log("window loaded");
    const products = document.querySelectorAll(".add-to-card");
    for(let i=0; i<products.length; i++){
        products[i].onclick = function(e){
            addItem(e);
        }
        
    }
}

function updateCartCount() {
    const countElement = document.getElementById('count');
    countElement.textContent = cartlist.length.toString();
}

function addItem(e){
    const productId = e.target.getAttribute("id");
    console.log("Product :", productId);
    const productDiv = document.getElementById(productId);

    const cartDiv = document.createElement("div");
    cartDiv.setAttribute("id", "cart" + productId);
    cartDiv.setAttribute("class", "item1");
    cartDiv.classList.add('cart-item');

    cartDiv.innerHTML = productDiv.innerHTML;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function() { removeItem(productId)};
    cartDiv.appendChild(removeBtn);

    let aside = document.getElementById("cart-List");
    aside.appendChild(cartDiv);

    cartlist.push(productId);
    updateCartCount();
}

function removeItem(productId){
    const product = document.getElementById("cart" +productId);
    const index = cartlist.indexOf(productId);
    product.remove();
    if (index !== -1) {
        cartlist.splice(index, 1);
        updateCartCount();
        console.log(`Item ${productId} removed from cartlist`);
    }
}

    window.addEventListener("load", setup);

/*sticky nav*/

    const nav = document.querySelector("nav");

    window.addEventListener("scroll", function(){
        nav.classList.toggle ("sticky", this.window.scrollY > 0);
    })

/*Form validation*/

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