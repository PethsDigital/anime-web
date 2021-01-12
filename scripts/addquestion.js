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
    let option = [form.correct.value,form.incorrect1.value,form.incorrect2.value,form.incorrect3.value]
    console.log(option,'option')
    let correctOption = form.correct.value
    console.log(correctOption)
    
    var shuffle = function (array) {

      var currentIndex = array.length;
      var temporaryValue, randomIndex;
    
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    
    };
  
    // Create a new, shuffled array from lunch
    var shuffledOption = shuffle(option.slice());
    console.log(shuffledOption,'shuffle')
    let index2 = shuffledOption.indexOf(correctOption)
    console.log(index2,'index correct')
    let button = document.querySelector('button')
    button.textContent = 'Addind ...'
    button.disabled = true;
    const loaderprofile = ()=>{
  
      const  raw = {
        "question": form.question.value,
        "options" : shuffledOption,
        "correctOptionIndex": index2
    }
      console.log(JSON.stringify(raw),)
      var requestOptions = {
        method: 'POST',
        body: JSON.stringify(raw),
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow'
        };
      
      fetch(`https://kuizuapp.herokuapp.com/v1/questions/add/${form.cate.value}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
            
          
            button.textContent = 'Added Successfully'
            // myFunction()
          
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
