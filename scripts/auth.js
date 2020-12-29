
const login = document.querySelector('form');
let email = document.querySelector('#email');
let pwd = document.querySelector('#pwd');
let suc = document.querySelector('.success')
const myFunction=()=> {
  setTimeout(()=>{
    location.reload()
  }, 3000);
}
login.addEventListener('submit', (e)=>{

    e.preventDefault()
    document.getElementById('subit').disabled = true;

    document.getElementById('subit').value='Loading...'
   
    const  raw = {
        "username": email.value,
        "password" : pwd.value  
    }
    var toks = window.localStorage.getItem("token")
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(raw),
      // you did not add the header content-type that was why it wasnt working.
      headers: {
        'Content-Type': 'application/json',
        'authorization':toks,
    },
      redirect: 'follow'
    };
    
    fetch("https://kuizuapp.herokuapp.com/v1/users/login", requestOptions)
        .then(response => {
         console.log(response) 
         return response.json()
        })
        .then((data) => {
          
           console.log(data)
           if (data.success) {
            suc.style.color='green'
            suc.style.textAlign = 'center'
            suc.style.margin="10px 0"
            suc.textContent= 'Authentication Successful '
            window.localStorage.setItem("token",data.data.token);
            document.getElementById('subit').disabled = false;
            window.location.href="questions.html"
           }
           else{
            suc.style.color='red'
            suc.style.textAlign = 'center'
            suc.style.margin="10px 0"
            suc.textContent= data.message
            myFunction()

            document.getElementById('subit').disabled = false;
           }
           
          
        //   else{
        //     suc.style.color='red'
        //     suc.textContent=data.response + " " + 'try again'
        //     document.getElementById('subit').disabled = false;

        //     document.getElementById('subit').textContent='Next'
            
        //   }

          
          
        } )
        .catch(error => console.log('error', error));
  

})






