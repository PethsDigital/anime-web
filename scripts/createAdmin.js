let form = document.querySelector('#addForm')

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
          
          
          document.getElementById('subit').disabled = false;

          document.getElementById('subit').textContent='done'
         
          
          
        } )
        .catch(error => console.log('error', error));
  

})






