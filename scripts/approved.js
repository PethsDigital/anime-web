// let select = document.querySelector('.selector')
// let page = 1
// let limit = 2
// select.addEventListener('change',()=>{
//   console.log(select.value)
//   page = select.value
//   loaderprofile(page)
// })

const searchFill = ()=>{
   
    fetch("https://kuizuapp.herokuapp.com/v1//animes")
      .then(response => response.json())
      .then(result => {             
       console.log(result)
        loaderprofile(result.data)
    })
      .catch(error => console.log('error', error));

    
    
}
searchFill()

let fillselect = (page)=>{
  
  select.innerHTML = ''
  for (let i = 0; i <= page; i++) {
    const opt = document.createElement( "option" );
    opt.textContent = i;
    opt.value = i;
    select.append(opt)
    
  }

}

  let tbody = document.querySelector('tbody')
  const loaderprofile = (data)=>{
  console.log(data)
    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': retrieveToken()
      },
      redirect: 'follow'
    };
    
    fetch(`https://kuizuapp.herokuapp.com/v1//questions/anime/${data[2]._id}/approved`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        // loader(result)
     
      })
      .catch(error => console.log('error', error));
  
    const loader=(data) =>{
 
      fillselect(data.data.noofPages)
      tbody.innerHTML = "";
        let eachdata = data.data.questions
      
        
        for (let i = 0; i < eachdata.length; i++) {

           let tr = `
           <tr class="studrow row1">
                <td class="studname">${i+1}</td>
                <td class="studcontact">${eachdata[i].question}</td>
                <td class="studmail">${eachdata[i].anime_name}</td>
                <td class="action"> <a href=eachquestion.html?questionid=${eachdata[i]._id}><button>View Details</button></a> </td>
           
           </tr>
           `
   
           tbody.innerHTML += tr
        
        }
   
        
      }
      
  
}





