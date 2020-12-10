let select = document.querySelector('.selector')
let page = 1
let limit = 2
select.addEventListener('change',()=>{
  console.log(select.value)
  page = select.value
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
    
    fetch(`https://excelminds.herokuapp.com/api/v1/student?page=${page}&limit=${limit}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        loader(result)
     
      })
      .catch(error => console.log('error', error));
  
    const loader=(data) =>{
      console.log(data)
      tbody.innerHTML = "";
        let eachdata = data.result.results
        console.log(eachdata)
        
        for (let i = 0; i < eachdata.length; i++) {

           let tr = `
           <tr class="studrow row1">
                <td class="studname"> <div class="vb"><img class="studimg" src=${eachdata[i].profile_picture} alt=""> <p class="studentname">${eachdata[i].firstname} ${eachdata[i].lastname}</p></div> </td>
                <td class="studcontact">${eachdata[i].phone}</td>
                <td class="studcourse">English Language</td>
                <td class="studmail">${eachdata[i].email}</td>
                <td class="action"> <a href=student-details.html?studentid=${eachdata[i]._id}><button>View Details</button></a> </td>
           
           </tr>
           `
   
           tbody.innerHTML += tr
        
        }
   
        
      }
      
  
}


loaderprofile()

})






// const loaderprofile = ()=>{

//     var requestOptions = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': retrieveToken()
//       },
//       redirect: 'follow'
//     };
    
//     fetch(`https://excelminds.herokuapp.com/api/v1/student?page=${page}&limit=${limit}`, requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         console.log(result)
//         loader(result)
     
//       })
//       .catch(error => console.log('error', error));
  
//     const loader=(data) =>{
//       console.log(data)
//         let eachdata = data.result.results
//         console.log(eachdata)
//         let tbody = document.querySelector('tbody')
//         for (let i = 0; i < eachdata.length; i++) {

//            let tr = `
//            <tr class="studrow row1">
//                 <td class="studname"> <div class="vb"><img class="studimg" src=${eachdata[i].profile_picture} alt=""> <p class="studentname">${eachdata[i].firstname} ${eachdata[i].lastname}</p></div> </td>
//                 <td class="studcontact">${eachdata[i].phone}</td>
//                 <td class="studcourse">English Language</td>
//                 <td class="studmail">${eachdata[i].email}</td>
//                 <td class="action"> <a href=student-details.html?studid=${eachdata[i]._id}><button>View Details</button></a> </td>
           
//            </tr>
//            `
   
//            tbody.innerHTML += tr
        
//         }
   
        
//       }
      
  
// }
  
//   loaderprofile()