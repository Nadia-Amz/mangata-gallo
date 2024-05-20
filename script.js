/*sticky nav*/

const nav = document.querySelector("nav");

window.addEventListener("scroll", function () {
    nav.classList.toggle("sticky", this.window.scrollY > 0);
})

/*Humburger menu*/

const humburgerIcon = document.querySelector('.humburgerIcon');
const content = document.querySelector('.content');
const closeIcon = document.querySelector('.close');

window.addEventListener('resize', function () {

    if (window.innerWidth > 992) {
        content.style.visibility = 'visible';
        closeIcon.style.visibility = 'hidden';
    }
    else {
        content.style.visibility = 'hidden';
    }
});

humburgerIcon.addEventListener('click', () => {
    content.style.visibility = 'visible';
    closeIcon.style.visibility = 'visible';
});

closeIcon.addEventListener('click', () => {
    content.style.visibility = 'hidden';
    closeIcon.style.visibility = 'hidden';
});


/*Add to cart button*/

const addToCartBtns = document.querySelectorAll('.add-to-card');

    addToCartBtns.forEach(btn => {
        let isClicked = false;

        btn.addEventListener('click', () => {
            // ternary operator: btn.style.background = (isClicked) ? '#fff' : '#d9b99b';
            if (isClicked) {
                btn.style.background = '#fff';
            } else {
                btn.style.background = '#d9b99b';
            }
        });
});


/*heart icon*/

const icons = document.querySelectorAll('.heart-icon');

icons.forEach(icon => {
    let isClicked = false;

    icon.addEventListener('click', () => {
        // icon.style.color = (isClicked) ? '' : 'red';
        // icon.style.opacity = (isClicked) ? '0.5' : '1';

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


/* wishlist*/

let wishlist = [];

function addToWishlist(itemId) {

    if (!wishlist.includes(itemId)) {
        wishlist.push(itemId);
        updateWishlist();
        updatePoint();
        console.log(`Item ${itemId} added to wishlist`);
    } else {
        deleteItem(itemId);
        updatePoint();
    }
}


function updateWishlist() {
    const wishlistItems = document.getElementById('wishlistItems');
          wishlistItems.innerHTML = '';

    if (wishlist.length > 0) {
        wishlist.forEach(itemId => {
            const itemDiv = document.getElementById(itemId).cloneNode(true);
            const icon = document.querySelector(`.heart-icon[data-item-id="${itemId}"]`);

            itemDiv.classList.add('wishlist-item');
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('buttonContainer');

            const addItemBtn = document.createElement('button');
            addItemBtn.textContent = 'Add to cart';
            addItemBtn.id = "addItemBtn";
            addItemBtn.onclick = function () {
                addToCart(itemId);
                icon.style.color = '';
                icon.style.opacity = '0.5';

            };

            buttonContainer.appendChild(addItemBtn);
            itemDiv.appendChild(buttonContainer);
            wishlistItems.appendChild(itemDiv);
        });
    }
    wishlistMessage();
    updatePoint();

}

function wishlistMessage() {
    const wishlistMessage = document.getElementById("wishlist-msg");
    if (wishlist.length > 0) {
        wishlistMessage.style.display = "none";
    } else {
        wishlistMessage.style.display = "block";
    }
}

function updatePoint() {
    const point = document.querySelector('.point');
    if (wishlist.length > 0) {
        point.style.visibility = "visible";
    } else {
        point.style.visibility = "hidden";
    }
}

// add items from wishlist to cartlist

function addToCart(itemId) {

    const wishlistItem = document.getElementById(itemId);

    if (wishlistItem) {
        const cartItems = document.getElementById('cartlistItems');
        const cartItem = wishlistItem.cloneNode(true);

        cartItem.id = 'cart' + itemId;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.id = "removeButton";
        removeButton.onclick = function () {
            removeFromCart(itemId);
        };

        cartItem.classList.add('cart-div');
        cartItem.appendChild(removeButton);
        cartItems.appendChild(cartItem);
        
        cartlist.push(itemId);
        console.log('CART : ', cartlist.length);

        wishlistItem.remove();
        deleteItem(itemId);

        console.log('wishlist: ', wishlist.length);
        console.log(`Item ${itemId} added to the cart and removed from the wishlist`);

        wishlistMessage();
        updatePoint();
        cartMessage();
        cartCount();

    }
}


function deleteItem(itemId) {
    const index = wishlist.indexOf(itemId);
    if (index !== -1) {
        wishlist.splice(index, 1);
        updateWishlist();
        console.log(`Item ${itemId} removed from wishlist`);
    }
}

function removeFromCart(itemId) {
    const item = document.getElementById("cart" + itemId);
    const index = cartlist.indexOf(itemId);
    if(index !== -1 && item){
        cartlist.splice(index, 1);
        item.remove();
        cartCount();
        cartMessage();
        console.log(`Item ${itemId} removed from cartlist`);
    }
}


/*cart list*/

let cartlist = [];


function cart() {
    console.log('loaded');
    const products = document.querySelectorAll(".add-to-card");

    for (let i = 0; i < products.length; i++) {
        products[i].onclick = function (e) {
            addItem(e);
        }
    }

}

function cartMessage() {
    const emptyCartMessage = document.getElementById("cart-msg");
    if (cartlist.length > 0) {
        emptyCartMessage.style.display = "none";
    } else {
        emptyCartMessage.style.display = "block";
    }
}


function cartCount() {
    const countElement = document.getElementById('count');
    countElement.textContent = cartlist.length.toString();
}

function addItem(e) {
    const productId = e.target.getAttribute("id");
    console.log("Product :", productId);
    const productDiv = document.getElementById(productId);
    let cartlistItems = document.getElementById("cartlistItems");
    const addToCartBtn = document.querySelector(`.add-to-card[id="${productId}"]`);

    const cartDiv = document.createElement("div");
    cartDiv.setAttribute("id", "cart" + productId);
    cartDiv.setAttribute("class", "item1");
    cartDiv.classList.add('cart-item');

    cartDiv.innerHTML = productDiv.innerHTML;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.id = "removeBtnCart";
    removeBtn.onclick = function () {
        removeItem(productId);
        addToCartBtn.style.background='#fff'; 
    };

    cartDiv.appendChild(removeBtn);
    cartlistItems.appendChild(cartDiv);
    cartlist.push(productId);
    cartCount();
    cartMessage();

}

function removeItem(productId) {
    const product = document.getElementById("cart" + productId);
    const index = cartlist.indexOf(productId);
    if (index !== -1 && product) {
        cartlist.splice(index, 1);
        product.remove();
        console.log(`Item ${productId} removed from cartlist`);
        cartCount();
        cartMessage();
    }

}
// delete all items from cartlist array after clicking on the checkout button

function checkoutBtn() {
    if (cartlist.length > 0) {
        const alertElement = document.getElementById('alert-checkout');
        alertElement.style.visibility = 'visible';
        setTimeout(() => {
            alertElement.style.visibility = 'hidden';
            const cartlistCopy = [...cartlist];

            for (const productId of cartlistCopy) {
                removeItem(productId);
                const addToCartBtn = document.querySelector(`.add-to-card[id="${productId}"]`);
                if(addToCartBtn){
                    addToCartBtn.style.background='#fff';
                }
            }
            for (const itemId of cartlistCopy) {
                removeFromCart(itemId);
            }
        }, 1000);
    } else {
        console.log('cart is empty');
    }
    console.log('cartlist', cartlist.length);
}

window.addEventListener("load", cart);

/*Login Form*/

/*SignIn and SignUp buttons*/

let signinBtn = document.getElementById("signinBtn");
let signupBtn = document.getElementById("signupBtn");
let RegisterBtn = document.getElementById("RegisterBtn");
let field = document.getElementById("field");
let passwordField = document.getElementById("passwordField");
let title = document.getElementById("title");

signinBtn.onclick = function (e) {
    e.preventDefault();
    field.style.maxHeight = "0";
    field.style.display = "none";
    passwordField.style.maxHeight = "0";
    passwordField.style.display = "none";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

signupBtn.onclick = function (e) {
    e.preventDefault();
    field.style.maxHeight = "60px";
    field.style.display = "flex";
    passwordField.style.maxHeight = "60px";
    passwordField.style.display = "flex";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}


/*Remember me checkbox*/

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password2");



const rememberMe = document.getElementById("RememberCheck");
rememberMe.addEventListener('change', checkRememberMe);


if (localStorage.checkbox && localStorage.checkbox !== "") {
    rememberMe.setAttribute("checked", "checked");
    email.value = localStorage.email;
    password.value = localStorage.password;
} else {
    rememberMe.removeAttribute("checked");
    email.value = "";
    password.value = "";
}

function checkRememberMe() {

    if (rememberMe.checked && email.value !== "" && password.value !== "") {
        localStorage.email = email.value;
        localStorage.password = password.value;
        localStorage.checkbox = rememberMe.value;
    } else {
        localStorage.email = "";
        localStorage.password = "";
        localStorage.checkbox = "";
    }
}

/*Form validation*/

username.addEventListener('input', checkUsername);
email.addEventListener('input', checkEmail);
password.addEventListener('input', checkPassword);
confirmPassword.addEventListener('input', checkConfirmPassword);

function checkUsername() {
    const usernameValue = username.value.trim();
    const isUsernameVisible = parseInt(getComputedStyle(field).maxHeight) > 0;

    if (isUsernameVisible) {
        if (usernameValue === '') {
            errorMsg(username, 'Username cannot be blank');
            return false;
        } else {
            success(username);
            return true;
        }
    }
}

function checkEmail() {
    const emailValue = email.value.trim();

    if (emailValue === '') {
        errorMsg(email, 'Email cannot be blank');
        return false;
    } else if (!emailRegex(emailValue)) {
        errorMsg(email, 'Email is not valid');
        return false;
    } else {
        success(email);
        return true;
    }
}

function checkPassword() {
    const passwordValue = password.value.trim();

    if (passwordValue === '') {
        errorMsg(password, 'Password cannot be blank');
        return false;
    } else if (!passwordRegex(passwordValue)) {
        errorMsg(password, 'Password is not valid');
        return false;
    } else {
        success(password);
        return true;
    }
}

function checkConfirmPassword() {
    const confirmPasswordValue = confirmPassword.value.trim();
    const passwordValue = password.value.trim();
    const isConfirmPasswordVisible = parseInt(getComputedStyle(passwordField).maxHeight) > 0;

    if (isConfirmPasswordVisible) {
        if (confirmPasswordValue === '') {
            errorMsg(confirmPassword, 'Confirm password cannot be blank');
            return false;
        } else if (passwordValue !== confirmPasswordValue) {
            errorMsg(confirmPassword, 'Passwords do not match');
            return false;
        } else {
            success(confirmPassword);
            return true;
        }
    }
}

function checkInputs(e) {
    e.preventDefault();

    let usernameIsValid = checkUsername();
    let emaiIsValid = checkEmail();
    let passwordIsValid = checkPassword();
    let confirmPasswordIsValid = checkConfirmPassword();

    if (usernameIsValid && emaiIsValid && passwordIsValid && confirmPasswordIsValid) {
        const alertElement = document.getElementById('alert');
        alertElement.style.visibility = 'visible';

        setTimeout(() => {
            alertElement.style.visibility = 'hidden';
        },5000);
        console.log("is valid");
    }
}document.getElementById('form').addEventListener('submit', checkInputs);

function errorMsg(input, message) {
    const formControl = input.parentElement;
    const span = formControl.querySelector('span');

    span.innerText = message;
    formControl.className = 'inputArea error';
}

function success(input) {
    const formControl = input.parentElement;
    formControl.className = 'inputArea success';
}

function emailRegex(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

function passwordRegex(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
}