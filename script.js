const search = document.querySelector(".search");
const btn1 = document.querySelector(".btn1");
const input = document.querySelector(".input");

btn1.addEventListener("click",() =>{
    search.classList.toggle("active");
    input.focus();
})

const bag = document.querySelector(".fa-bag-shopping");
const sidebar = document.querySelector(".sidebar");
sidebar.inWindow = 0

bag.addEventListener('mouseover',() =>{
    if(sidebar.classList.contains('hide'))
    sidebar.classList.remove('hide')
    
})


bag.addEventListener('mouseleave',() =>{
    /*if(sidebar.classList.contains('hide'))*/
    setTimeout(()=>{
    if(sidebar.inWindow===0){
        sidebar.classList.add('hide')
    }
    },500)
     
})
    sidebar.addEventListener('mouseover',()=>{
        sidebar.inWindow=1
    })

    sidebar.addEventListener('mouseleave',()=>{
        sidebar.inWindow=0
        sidebar.classList.add('hide')
    })
