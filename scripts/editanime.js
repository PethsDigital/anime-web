const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const product = urlParams.get('questionid')



const url = "https://api.cloudinary.com/v1_1/pethsdigital/image/upload";
var cloudpreset = 'hoolpcjw'

let form = document.querySelector('#addForm')
let suc = document.querySelector('.success')
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let subit = document.querySelector('.subit')
    subit.disabled = true;
    subit.value= 'Adding....'
    let link1,link2;
    let image = document.getElementById('imaga')
    let image2 = document.getElementById('imaga2')
    let callFirst=(image)=>{
      const files = image.files;
      const formData = new FormData();
      let file = files[0];
      formData.append("file", file);
      formData.append("upload_preset", cloudpreset);
  
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data)
          link1 = data.secure_url
          callSecond(image2)
        });
    }
    callFirst(image)

    let callSecond=(image)=>{
      const files = image.files;
      const formData = new FormData();
      let file = files[0];
      formData.append("file", file);
      formData.append("upload_preset", cloudpreset);
  
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data)
          link2 = data.secure_url
          lastCaller(link1,link2)
        });
    }
   
    let lastCaller=(link1,link2)=>{
      const  raw = {
        "name": form.anime.value,
        "bg_image": link1,
        "cover_image": link2
    }
    console.log(JSON.stringify(raw))
    var requestOptions = {
      method: 'PUT',
      body: JSON.stringify(raw),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': retrieveToken()
      
    },
      redirect: 'follow'
    };
    
    fetch(`https://kuizuapp.herokuapp.com/v1/animes/edit/${product}/`, requestOptions)
        .then(response => {
         console.log(response) 
         return response.json()
        })
        .then((data) => {
          

          if (data.success) {
            console.log(data)
            subit.value = 'Edited successfully'
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
    }

   
})