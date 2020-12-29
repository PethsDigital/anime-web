
let form = document.querySelector('#addForm')
let suc = document.querySelector('.success')
form.addEventListener('submit', (e)=>{

    e.preventDefault()
    let subit = document.querySelector('.subit')
    subit.disabled = true;

    subit.value= 'Adding....'
   
    const  raw = {
        "name": form.anime.value
    }
    console.log(JSON.stringify(raw),)
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(raw),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': retrieveToken()
      
    },
      redirect: 'follow'
    };
    
    fetch("https://kuizuapp.herokuapp.com/v1/animes/add", requestOptions)
        .then(response => {
         console.log(response) 
         return response.json()
        })
        .then((data) => {
          

          if (data.success) {
            console.log(data)
            subit.value = 'Added successfully'
            subit.disabled = false;
            myFunction()
           }
           else{
            suc.style.color='red'
            suc.style.textAlign = 'center'
            suc.style.margin="10px 0"
            suc.textContent= data.message
           }
          
        } )
        .catch(error => console.log('error', error));
  
        const myFunction=()=> {
            setTimeout(()=>{
              location.reload()
            }, 3000);
        }
})