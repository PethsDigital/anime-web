// let select = document.querySelector('.selector')
// let page = 1
// let limit = 2


// select.addEventListener('change',()=>{
//   console.log(select.value)
//   page = select.value
//   loaderprofile(page)
// })

// let fillselect = (page)=>{
  
//   select.innerHTML = ''
//   for (let i = 0; i <= page; i++) {
//     const opt = document.createElement( "option" );
//     opt.textContent = i;
//     opt.value = i;
//     select.append(opt)
    
//   }

// }

  let tbody = document.querySelector('tbody')
  const loaderprofile = ()=>{

    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': retrieveToken()
      },
      redirect: 'follow'
    };
    
    fetch(`https://kuizuapp.herokuapp.com/v1/admins/`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        loader(result)
     
      })
      .catch(error => console.log('error', error));
  
    const loader=(data) =>{
      console.log(data)
    //   fillselect(data.data.noofPages)
      tbody.innerHTML = "";
        let eachdata = data.data
      
        
        for (let i = 0; i < eachdata.length; i++) {

           let tr = `
           <tr class="studrow row1">
                <td class="studname">${i+1}</td>
                <td class="studcontact">${eachdata[i].username}</td>
                <td class="studcontact">${eachdata[i].email}</td>
               
           </tr>
           `
   
           tbody.innerHTML += tr
        
        }
   
        
      }
      
  
}


loaderprofile()


let  addadmin =document.querySelector('.addadmin')
addadmin.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href='addadmin.html'
})