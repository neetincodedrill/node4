 //feature to add additional address 
 var address = document.getElementById('addition-address');
 document.getElementById('address').addEventListener("click",additionalAddress);
 function additionalAddress(){
     var response = `
     <h4>Addtional Address</h4> 
     <div class="address">
         <div class="dropdown" id="dropdown1" data-dropdown>
             <input id="button1"  class="link" data-dropdown-button type="button" value="Country">
             <div class="dropdown-menu information-grid">       
                 <div class="dropdown-links " id="add-country">
                 </div>      
             </div>
         </div>
             <input type="text" name="state1" id="state1" placeholder="State" autocomplete="off" />
             <input type="text" name="city1" id="city1" placeholder="City"  autocomplete="off" />
             <input type="text" name="zip1" id="zip1" placeholder="Zip"  autocomplete="off" />
             <p id="addition-address-error"></p>
     </div>
     `
     address.innerHTML = response;
     var elem  = document.getElementById('address');
     elem.parentNode.removeChild(elem);
     return false;
 }

window.onload = additionalAddress()

 //function to display the choose image in img tag
 function loadFile(event){
     var image = document.getElementById("image");
     image.src = URL.createObjectURL(event.target.files[0])
 }

 //eventlistner to show dropdown menu
 document.addEventListener("click", e => {
     const isDropdownButton = e.target.matches("[data-dropdown-button]")
     if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return

     let currentDropdown
     if (isDropdownButton) {
         currentDropdown = e.target.closest("[data-dropdown]")
         currentDropdown.classList.toggle("active")
     }

     document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
         if (dropdown === currentDropdown) return
         dropdown.classList.remove("active")
     })
 })

 //get request to get all the countries fromc country collection 
 let xhr = new XMLHttpRequest();
 const url = 'http://localhost:4000/users/country'
 xhr.open('GET',url);
 xhr.send();

 xhr.onreadystatechange = function(){
     if(this.readyState == 4){
         if(xhr.status == 200){
         outputCountry(xhr.responseText)
     allCountry(xhr.responseText)
         }else if(xhr.status == 404){
         console.log('File not found')
         }      
     }
 }
 
//to display all the country in first country dropdown menu
 function outputCountry(str){
     var country = document.getElementById('country')   
     const data = JSON.parse(str)
     for(i=0;i<data.length;i++){
         var name = data[i].name;
         var code = data[i].code
         var option = `
         <a href="#" class="link" onclick="gotoNode('${name}')">${name} (${code})</a>
         `
         country.innerHTML += option
     }
 }
 
 //change the value of input button tag into the choose country value
 function gotoNode(name){
     const button = document.getElementById('button')
     button.value = name
 }

 //to display all the country in additional country dropdown menu
function allCountry(response){
     var country1 = document.getElementById('add-country')
     const data = JSON.parse(response)
         data.map((element) => {
             var name = element.name;
             var code = element.code;
             var option = `
                 <a href="#" class="link" onclick="getCountry('${name}')">${name} (${code})</a>
                 `
                 country1.innerHTML += option
         })
 } 
  
  //change the value of input button tag into the choose country value
 function getCountry(name){
     const button = document.getElementById('button1')
     button.value = name
 }



//post data
document.getElementById('submit-button').addEventListener("click",postData)
function postData(e){
e.preventDefault();
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var email = document.getElementById('email').value;
    var gender = document.querySelector("input[name=gender]:checked").value;
    var country = document.getElementById('button').value;
    var state = document.getElementById('state').value;       
    var city = document.getElementById('city').value;
    var zip = document.getElementById('zip').value;
    var country1 = document.getElementById('button1').value;       
    var state1 = document.getElementById('state1').value;
    var city1 = document.getElementById('city1').value;
    var zip1 = document.getElementById('zip1').value;    
 
    var formData = new FormData();
           
        formData.append('file',file.files[0])
        formData.append('first_name',first_name)
        formData.append('last_name',last_name)
        formData.append('email',email);
        formData.append('gender',gender);
        formData.append('country',country);
        formData.append('state',state);
        formData.append('city',city);
        formData.append('zip',zip);
        formData.append('country1',country1);
        formData.append('state1',state1);
        formData.append('city1',city1);
        formData.append('zip1',zip1);                    
 
    // for (var value of formData.values()) {
    // console.log(value);
    //     }

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST',"http://localhost:4000/users",true);
    var message = document.getElementById('message');
    xhttp.onreadystatechange = function(){
        document.getElementById('message').innerHTML = "";
        if(xhttp.readyState == 4){
            if(xhttp.status == 201){
                
                document.getElementById('first_name').value = '';
                document.getElementById('last_name').value = '';
                document.getElementById('email').value = '';
                document.querySelector("input[name=gender]:checked").value = false
                document.getElementById('button').value = 'Country';
                document.getElementById('state').value = ''
                document.getElementById('city').value= '';
                document.getElementById('zip').value = '';
                document.getElementById('button1').value = 'Country'
                document.getElementById('state1').value = '';
                document.getElementById('city1').value= ''
                document.getElementById('zip1').value = '';
                document.getElementById('file').value = "";
                var image = document.getElementById("image");
                image.src = "image8.webp";
                newUser(xhttp.response)
            }else if(xhttp.state == 400){
                console.log(xhttp.response)
                dataError(xhttp.response)
            }else if(xhttp.status == 401){
                dataValidation(xhttp.response)
            }
        }
    };
    xhttp.send(formData)
}

const message = document.getElementById('message')

function newUser(response){
    let data = response
    console.log(data)
    console.log(data)
    var response = `<p>${data}</p>`;
    message.innerHTML += response     
}

function dataError(response){
    console.log(response)
    let data = response
    var emailError = `<p>${data}</p>`;
    message.innerHTML += emailError
}

function dataValidation(response){
    let err = JSON.parse(response);         
    for(i=0;i<err.length;i++){                 
        console.log(err[i])
        var responseData = `<p>${err[i]}</p>`;
        message.innerHTML += responseData
    }     
}

