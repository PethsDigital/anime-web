let selectTwo = document.querySelector('select')

let fillselect2 = (data)=>{


  for (let i = 0; i < data.length; i++) {
    const opt = document.createElement( "option" );
    opt.textContent = data[i].name;
    opt.value = data[i]._id;
    selectTwo.append(opt)
    
  }

}
const searchFill = ()=>{
   
    fetch("https://kuizuapp.herokuapp.com/v1//animes")
      .then(response => response.json())
      .then(result => {             
       console.log(result)
        fillselect2(result.data)
    })
      .catch(error => console.log('error', error));

    
    
}
searchFill()


let form = document.querySelector('form')


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    let option = [form.correct.value,form.Incorrect1.value,form.Incorrect2.value,form.Incorrect3.value]
    let button = document.querySelector('#subit')
    button.textContent = 'Editing ...'
    button.disabled = true;
    const loaderprofile = ()=>{
  
      const  raw = {
        "question": form.question.value,
        "options" : option,
        "correctOptionIndex":0
    }
      console.log(JSON.stringify(raw),)
      var requestOptions = {
        method: 'PUT',
        body: JSON.stringify(raw),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': retrieveToken()
        },
        redirect: 'follow'
        };
      
      fetch(`https://kuizuapp.herokuapp.com/v1/questions/edit/${product}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
            button.textContent = 'Edited Successfully'
            myFunction()
          
        })
        .catch(error => console.log('error', error));

        }
    loaderprofile()
    const myFunction=()=> {
      setTimeout(()=>{
        location.reload()
      }, 2000);
  }

})
