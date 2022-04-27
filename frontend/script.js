    //feature to add additional address 
    var address = document.getElementById('addition-address');
    document.getElementById('address').addEventListener("click",additionalAddress);
    function additionalAddress(){
        var response = `
        <h4>Address 2</h4> 
                <input type="text" name="state1" id="state1" placeholder="State" required autocomplete="off" />
                <input type="text" name="city1" id="city1" placeholder="City" required  autocomplete="off" />
                <input type="text" name="zip1" id="zip1" placeholder="Zip" required autocomplete="off" />
        </div>
        `
        address.innerHTML = response;
        var elem  = document.getElementById('address');
        elem.parentNode.removeChild(elem);
        return false;
    }

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
            formData.append('state1',state1);
            formData.append('city1',city1);
            formData.append('zip1',zip1);                    
    

            var xhttp = new XMLHttpRequest();
            xhttp.open('POST',"http://localhost:4000/users",true);
        
            xhttp.onreadystatechange = function(){
                document.getElementById('message').innerHTML = "";
                if(xhttp.readyState == 4){
                    if(xhttp.status == 201){
                        newUser(xhttp.response)
                        var image = document.getElementById("image");
                        image.src = "image8.webp";
                        document.getElementById('first_name').value = '';
                        document.getElementById('last_name').value = '';
                        document.getElementById('email').value = '';
                        document.getElementById('button').value = 'Country';
                        document.getElementById('state').value = ''
                        document.getElementById('city').value= '';
                        document.getElementById('zip').value = '';
                        document.getElementById('state1').value = '';
                        document.getElementById('city1').value= ''
                        document.getElementById('zip1').value = '';
                        document.getElementById('file').value = "";              
                    }else if(xhttp.status == 400){
                        emailValidation(xhttp.response)
                    }else if(xhttp.status == 401){
                        dataValidation(xhttp.response)
                    }else{
                        fileError(xhttp.response)
                    }
                }
            };
            xhttp.send(formData)
    }

    const message = document.getElementById('message')

    //function to display new User create message
    function newUser(response){
        let data = response
        var response = `<p class="success">${data}</p>`;
        message.innerHTML += response     
    }

    //function to display email duplication message
    function emailValidation(response){     
        let data = response
        var emailError = `<p class="error">${data}</p>`;
        message.innerHTML += emailError
    }

    //function to display data-validation message
    function dataValidation(response){
        let err = JSON.parse(response);      
        for(i=0;i<err.length;i++){                 
            var responseData = `<p class="error">${err[i]}</p>`;
            message.innerHTML += responseData
        }     
    }

    //function to display file error
    function fileError(response){
        let error = response;
        var data = `<p class="error">${error}</p>`;
        message.innerHTML += data
    }

