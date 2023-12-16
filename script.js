

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
    let field = document.getElementById("field");
    let title = document.getElementById("form-title");

    signinBtn.onclick = function(){
        field.style.maxHeight = "0";
        title.innerHTML = "Sign In";
        signupBtn.classList.add("disable");
        signinBtn.classList.remove("disable");
    }

    signupBtn.onclick = function(){
        field.style.maxHeight = "65px";
        title.innerHTML = "Sign Up";
        signupBtn.classList.remove("disable");
        signinBtn.classList.add("disable");
    }

    const form = document.getElementById("form");
    const username = document.getElementById("contact-name");
    const email = document.getElementById("contact-email");
    const password = document.getElementById("contact-password");

    signinBtn.addEventListener('click', (e) => {
        console.log('Sign In button clicked');
        e.preventDefault(); 
        checkInputs();

    });

    signupBtn.addEventListener('click', (e) => {
        console.log('Sign up button clicked');
        e.preventDefault(); 
        checkInputs();

    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        checkInputs();
    })

        function checkInputs(){
            const usernameValue = username.value.trim();
            const emailValue = email.value.trim();
            const passwordValue = password.value.trim();

            if(usernameValue ===''){
                setErrorFor(username, 'Username cannot be blank');
            }else{
                setSuccessFor(username);
            }

        }

        function setErrorFor(input, message){
            const formControl = input.parentElement;
            const span = formControl.querySelector('span');

            span.innerText = message;
            formControl.className = '-in error';
        }

        function setSuccessFor(input){
            const formControl = input.parentElement;
            formControl.className = '-in success';
        }