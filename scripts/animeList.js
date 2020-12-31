let select = document.querySelector('.selector')
let page = 1
let limit = 2


let deleteAnime=(id)=>{

    var requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': retrieveToken()
        },
        redirect: 'follow'
      };
      
      fetch(`https://kuizuapp.herokuapp.com/v1/animes/delete/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          loader(result)
        })
        .catch(error => console.log('error', error));
        let loader=(data)=>{
            console.log(data)
            
            // myFunction()
            loaderprofile(page)
        } 
   
}

select.addEventListener('change',()=>{
  console.log(select.value)
  page = select.value
  loaderprofile(page)
})

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
  const loaderprofile = (page)=>{

    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': retrieveToken()
      },
      redirect: 'follow'
    };
    
    fetch(`https://kuizuapp.herokuapp.com/v1/animes/page/${page}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        loader(result)
     
      })
      .catch(error => console.log('error', error));
  
    const loader=(data) =>{
      console.log(data)
      fillselect(data.data.noofPages)
      tbody.innerHTML = "";
        let eachdata = data.data.animes
      
        
        for (let i = 0; i < eachdata.length; i++) {

           let tr = `
           <tr class="studrow row1">
                <td class="studname">${i+1}</td>
                <td class="studcontact">${eachdata[i].name}</td>
                <td class="studcontact">${eachdata[i].__v}</td>
                <td class="action"> <a href=editAnime.html?questionid=${eachdata[i]._id}><button>Edit Anime</button></a> </td>
                <td class="action"> <a><button class="deleter" onclick="deleteAnime('${eachdata[i]._id}')" >Delete Anime</button></a> </td>
           
           </tr>
           `
   
           tbody.innerHTML += tr
        
        }
   
        
      }
      
  
}


loaderprofile(page)


