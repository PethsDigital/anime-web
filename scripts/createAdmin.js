let form = document.querySelector('#addForm')
let suc = document.querySelector('.success')
// submit form

form.addEventListener('submit', (e)=>{

    e.preventDefault()

    
    document.getElementById('subit').disabled = true;
    document.getElementById('subit').textContent='creating...'
   
    const  raw = {

        "email":form.email.value,
        "username":form.username.value,
        "password":form.password.value

    }
    console.log(JSON.stringify(raw))
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(raw),
      // you did not add the header content-type that was why it wasnt working.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': retrieveToken()
     
    },
      redirect: 'follow'
    };
    
    fetch("https://kuizuapp.herokuapp.com/v1/admins/create/", requestOptions)
        .then(response => {
         console.log(response) 
         return response.json()
        })
        .then((data) => {
          console.log(data)
          if (data.success){
            document.getElementById('subit').disabled = false;
            document.getElementById('subit').textContent='done'
            myFunction()
          }
          else{
            suc.style.color='red'
            suc.style.textAlign = 'center'
            suc.style.margin="10px 0"
            suc.textContent= data.message
            // myFunction()
          }
          
        
          
          
        } )
        .catch(error => console.log('error', error));
  
        const myFunction=()=> {
          setTimeout(()=>{
            location.reload()
          }, 3000);
        }
})






