let select = document.querySelector('.selector')
let page = 1
let limit = 2
select.addEventListener('change',()=>{
  console.log(select.value)
  page = select.value
  loaderprofile(page)
})

let fillselect = (page)=>{
  
  select.innerHTML = ''
  for (let i = 0; i < page; i++) {
    const opt = document.createElement( "option" );
    opt.textContent = i+1;
    opt.value = i+1;
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
    
    fetch(`https://kuizuapp.herokuapp.com/v1/questions/page/${page}`, requestOptions)
      .then(response => response.json())
      .then(result => {
      
        loader(result)
     
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


loaderprofile(page)








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