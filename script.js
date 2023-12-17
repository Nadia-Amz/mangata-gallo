

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


 /*sticky nav*/

    const nav = document.querySelector("nav");

    window.addEventListener("scroll", function(){
        nav.classList.toggle ("sticky", this.window.scrollY > 0);
    })


    let signinBtn = document.getElementById("signinBtn");
    let signupBtn = document.getElementById("signupBtn");
    let RegisterBtn = document.getElementById("RegisterBtn").addEventListener("click", function(event) {
        event.preventDefault();});
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

    // const form = document.getElementById("form");

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("password2");


    // username.addEventListener("focus", () => {
    //     checkInput(username);
    // });
    
    // email.addEventListener("focus", () => {
    //     checkInput(email);
    // });
    
    // password.addEventListener("focus", () => {
    //     checkInput(password);
    // });

    // form.addEventListener("submit", (e) => {
    //     e.preventDefault();
    //     checkInputs();
    // })

        function checkInputs(){
            // checkInput(username);
            // checkInput(email);
            // checkInput(password);
            const usernameValue = username.value.trim();
            const emailValue = email.value.trim();
            const passwordValue = password.value.trim();
            const confirmPasswordValue = confirmPassword.value.trim();

            const isUsernameVisible = parseInt(getComputedStyle(field).maxHeight) > 0;
            const isConfirmPasswordVisible = parseInt(getComputedStyle(passwordField).maxHeight) > 0;


              if (isUsernameVisible) {
                 if (usernameValue === '') {
                    setErrorFor(username, 'Username cannot be blank');
            } else {
            setSuccessFor(username);
            }
            }
            if(emailValue === ''){
                setErrorFor(email, 'Email cannot be blank');
            }else if(!isEmail(emailValue)){
                setErrorFor(email, 'Email is not valid');
            }else{
                setSuccessFor(email);
            }

            if(passwordValue ===''){
                setErrorFor(password, 'Password cannot be blank');
            }else if(!isPassword(passwordValue)){
                setErrorFor(password, 'Password is not valid');
            }else{
                setSuccessFor(password);
            }
            if (isConfirmPasswordVisible) {
            if(confirmPasswordValue ===''){
                setErrorFor(confirmPassword, 'Confirm password cannot be blank');
            }else if(passwordValue !== confirmPasswordValue){
                setErrorFor(confirmPassword, 'Passwords does not match');
            }else {
                setSuccessFor(confirmPassword);
            }
             }
        }



        // function checkInput(input) {
        //     const inputValue = input.value.trim();
        //     const formControl = input.parentElement;
        //     const span = formControl.querySelector('span');
        
        //     if (document.activeElement === input && inputValue === '') {
        //         setErrorFor(input, '');
        //         span.style.visibility = 'visible'; 
        //     } else {
        //         setSuccessFor(input);
        //         span.style.visibility = 'hidden'; 
        //     }
        // }
        

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