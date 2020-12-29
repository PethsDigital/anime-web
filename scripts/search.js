let selectTwo = document.querySelector('form .searf')

let fillselect2 = (data)=>{


  for (let i = 0; i < data.length; i++) {
    const opt = document.createElement( "option" );
    opt.textContent = data[i].name;
    opt.value = data[i]._id;
    selectTwo.append(opt)
    
  }

}

// fill search
const searchFill = ()=>{
  
  
  fetch("https://kuizuapp.herokuapp.com/v1//animes")
    .then(response => response.json())
    .then(result => {             
     
      fillselect2(result.data)
  })
    .catch(error => console.log('error', error));
  
}
searchFill()


let form = document.querySelector('form')

selectTwo.addEventListener('change',()=>{
  let tbody = document.querySelector('tbody')
  const loaderprofile = (ID)=>{

    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': retrieveToken()
      },
      redirect: 'follow'
    };
    
    fetch(`https://kuizuapp.herokuapp.com/v1/questions/anime/${ID}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.data.length==0) {
          loadempty()
        }
        else{
          loader(result.data)
        }
     
     
      })
      .catch(error => console.log('error', error));
  
      const loader=(data) =>{
        tbody.innerHTML = "";
          let eachdata = data
        
          
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

      const loadempty=()=>{
        alert('No questions for this category')
      }
      
  
}

console.log(selectTwo.value)
loaderprofile(selectTwo.value)


})