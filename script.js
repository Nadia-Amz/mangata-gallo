/*sticky nav*/

const nav = document.querySelector("nav");

window.addEventListener("scroll", function(){
    nav.classList.toggle ("sticky", this.window.scrollY > 0);
})

/*Humburger menu*/

const humburgerIcon = document.querySelector('.humburgerIcon');
const content = document.querySelector('.content');
const Close = document.querySelector('.close');

window.addEventListener('resize', function() {
    if(window.innerWidth > 992){
        content.style.visibility = 'visible';
    }
});

    humburgerIcon.addEventListener('click',() =>{
        content.style.visibility = 'visible';
        Close.style.visibility = 'visible';
    });

  Close.addEventListener('click', () =>{
        content.style.visibility = 'hidden';
        Close.style.visibility = 'hidden';

    })

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
        updatePoint();
        console.log(`Item ${itemId} added to wishlist`);
    } else{
        deleteItem(itemId);
        updatePoint();
    }
}


function updateWishlistDisplay() {
    const wishlistItemsContainer = document.getElementById('wishlistItems');
    wishlistItemsContainer.innerHTML = '';

    if (wishlist.length > 0) {
        wishlist.forEach(itemId => {
            const itemDiv = document.getElementById(itemId).cloneNode(true);
            const icons = document.querySelector(`.heart-icon[data-item-id="${itemId}"]`);
            
            itemDiv.classList.add('wishlist-item');
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('buttonContainer');

            const addItemBtn = document.createElement('button');
            addItemBtn.textContent = 'Add to cart';
            addItemBtn.id = "addItemBtn";
            addItemBtn.onclick = function(){
                addToCart(itemId);
                icons.style.color='';
                icons.style.opacity='0.5';

            };

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.id = "removeBtn";
            removeBtn.onclick = function() {
                deleteItem(itemId);
                icons.style.color='';
                icons.style.opacity='0.5';
            };

            buttonContainer.appendChild(removeBtn);
            buttonContainer.appendChild(addItemBtn);
            itemDiv.appendChild(buttonContainer);
            wishlistItemsContainer.appendChild(itemDiv);
        });
    }
        updateEmptyWishlistMessage();
        updatePoint();
    
}

function updateEmptyWishlistMessage() {
    const emptyWishlistMessage = document.getElementById("wishlist-msg");
 if (wishlist.length > 0) {
     emptyWishlistMessage.style.display = "none";
 } else {
    emptyWishlistMessage.style.display = "block";
 }
}

function updatePoint() {
    const point= document.querySelector('.point');
 if (wishlist.length > 0) {
    point.style.visibility = "visible";
} else {
    point.style.visibility = "hidden";
}
}


function addToCart(itemId) {
    const wishlistItem = document.getElementById(itemId);

    // Check if the wishlist item exists
    if (wishlistItem) {
        const cartItemsContainer = document.getElementById('cartlistItems'); 

        // Clone the wishlist item or create a new cart item
        const cartItem = wishlistItem.cloneNode(true);
        cartItem.id = 'cart' + itemId;

        // Add or update any specific classes or attributes for cart items
        cartItem.classList.add('cart-div');

        // Append the cart item to the cart container
        cartItemsContainer.appendChild(cartItem);

        cartlist.push(cartItem);

        console.log('CART : ' ,cartlist.length);

        // Remove the item from the wishlist
        wishlistItem.remove();
        deleteItem(itemId);

        console.log('wishlist: ', wishlist.length);
        console.log(`Item ${itemId} added to the cart and removed from the wishlist`);

        updateEmptyWishlistMessage();
        updatePoint();
        updateEmptyCartMessage();
        updateCartCount(); 

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
            updateEmptyCartMessage();
        }
    }

}

function updateEmptyCartMessage() {
    const emptyCartMessage = document.getElementById("cart-msg");
    if (cartlist.length > 0) {
        emptyCartMessage.style.display = "none";
    } else {
        emptyCartMessage.style.display = "block";
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
    removeBtn.id = "removeBtnCart";
    removeBtn.onclick = function() { removeItem(productId)};
    cartDiv.appendChild(removeBtn);

    let cartSubnav = document.getElementById("cart-List");
    cartSubnav.appendChild(cartDiv);

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
        updateEmptyCartMessage();
    }
}

function checkCartList() {

    if (cartlist.length > 0) {

        const alertElement = document.getElementById('alert-checkout');
        alertElement.style.visibility = 'visible';

        setTimeout(() => {
            alertElement.style.visibility = 'hidden';
        }, 1000);
    }else{
        console.log('cart is empty');
    }
}

    window.addEventListener("load", setup);



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