const xhr = new XMLHttpRequest(); 
const url = "localhost:5000"; 
const selectedTable = null;


function submitQury() {
    var queary = document.querySelector('#textarea1');
    var text;
    // open a connection 
    xhr.open("POST", "http://localhost:5000/api/allquery", true); 
  
    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST,  PATCH, DELETE'); 

    // Create a state> change callback 
    xhr.onload =  ()=> { 
        var data  = JSON.parse(xhr.responseText)
        if (xhr.readyState == 4 && xhr.status == "201") {
            console.log(data);
          } else {
           let retunResponce =  data;
           console.log(retunResponce)
           for (i = 0; i < retunResponce.returnData.length; i++) {
            text +=  retunResponce.returnData[i] + "<br>";
          }
           document.getElementById('returnData').innerHTML=  text         }
    }; 

    // Converting JSON data to string 
    var json = JSON.stringify({ "query": queary.value }); 

    // Sending data with the request 
  xhr.send(json)
}

function selectTable(par){
    selectTable = par
}
// function submitFile() {
//     var radios = document.querySelectorAll('input[type="radio"]:checked');
//     var value = radios.length>0? radios[0].value: null;
//     console.log(value);
//     var file = document.getElementById("myFile");
//     console.log(x)
//     var formData = new FormData();

// formData.append("table", selectTable);
// formData.append("insetType", value); // number 123456 is immediately converted to a string "123456"

// // HTML file input, chosen by user
// formData.append("userfile", fileInputElement.files[0]);

// // JavaScript file-like object
// var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
// var blob = new Blob([content], { type: "text/xml"});

// formData.append("webmasterfile", blob);

// var request = new XMLHttpRequest();
// request.open("POST", "http://foo.com/submitform.php");
// request.send(formData);
// }

const form = document.querySelector('form');
form.addEventListener('submit', e => {

  // disable default action
  e.preventDefault();

    var radios = document.querySelectorAll('input[type="radio"]:checked');
    var value = radios.length>0? radios[0].value: null;
    console.log(value);
    const files = document.querySelector('[name=file]').files;
    var formData = new FormData();

    formData.append("table", selectTable);
    formData.append("insetType", value); // number 123456 is immediately converted to a string "123456"

    // HTML file input, chosen by user
    formData.append("userfile", files[0]);

    var request = new XMLHttpRequest();

    request.onload = () => {
      var data  = JSON.parse(request.responseText)
      if (request.readyState == 4 && request.status == "201") {
          console.log(data);
        } else {
         let retunResponce = `Data inserted successfully in ${data.message} ${'sec'}`   ;
        
         var x = document.getElementById("snackbar");
          x.style.display = "block";
          document.getElementById("showAlert").innerHTML = retunResponce;
        
         console.log(retunResponce)
        //  for (i = 0; i < retunResponce.returnData.length; i++) {
        //   text +=  retunResponce.returnData[i] + "<br>";
        // }
        //  document.getElementById('returnData').innerHTML=  text        
       }
  };
    request.open("POST", "http://localhost:5000/api/upload");
    request.send(formData);
// }
});