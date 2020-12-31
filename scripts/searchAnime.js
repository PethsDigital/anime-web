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
    
    fetch(`https://kuizuapp.herokuapp.com/v1/animes/${ID}`, requestOptions)
      .then(response => response.json())
      .then(result => {
       
        loader(result)
     
     
      })
      .catch(error => console.log('error', error));
      
      const loader=(data) =>{
 
        tbody.innerHTML = "";
        let eachdata = data.data
          
        

            let tr = `
            <tr class="studrow row1">
                <td class="studname">${1}</td>
                <td class="studcontact">${eachdata.name}</td>
                <td class="studcontact">${eachdata.__v}</td>
                <td class="action"> <a href=editAnime.html?questionid=${eachdata._id}><button>Edit Anime</button></a> </td>
                <td class="action"> <a><button class="deleter" onclick="deleteAnime('${eachdata._id}')" >Delete Anime</button></a> </td>
        
            </tr>
            `
    
            tbody.innerHTML += tr
          
          
    
          
      }

      const loadempty=()=>{
        alert('This Category has not been created')
      }
      
  
}

console.log(selectTwo.value)
loaderprofile(selectTwo.value)


})