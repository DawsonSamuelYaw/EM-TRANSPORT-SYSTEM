//logging out 

    function logout() {
      var confirmLogout = window.confirm("Are you sure you want to log out?");

      if (confirmLogout) {
        alert("Logging out..."); 
        window.location.assign("index.html")
      } else {
        // If the user clicks 'Cancel', do nothing or handle accordingly
        alert("Logout canceled.");
      }
    }

    

    function newfun(){
        var email = document.querySelector("#email").value;
        var emailID = "you@example.com";
        if (email===emailID){
            window.location.assign("pass.html")
        }
        else{
            alert("INCORRECT EMAIL ADDRESS")
        }
    }
 function user(){
    window.location.assign("USERDASH.html")
 }
/* function logout(){
    alert("Do you want to logout?");
} */
//admin login 
function login(){
   var email=document.getElementById("email").value;
  var pass= document.getElementById("pass").value;
  var emaillogin = "you@example.com";
  var password = "you@example";

   if(email===emaillogin && pass===password){
    alert("You are Good to Go")
    window.location.assign("dashboard.html");

    return
   }
   else{
    alert(
        "Invalid Email ID / Password \n\n Please try again with valid credentials"
    );

}
}
//Password visibility 
function showPassword() {
    var passwordInput = document.getElementById('password');
    var passwordDisplay = document.getElementById('passwordDisplay');
    passwordDisplay.textContent = passwordInput.value;
  }

  function togglePasswordVisibility() {
    var passwordInput = document.getElementById('pass');
    var passwordDisplay = document.getElementById('passwordDisplay');
    var showPasswordCheckbox = document.getElementById('showPassword');

    if (showPasswordCheckbox.checked) {
      passwordDisplay.textContent = passwordInput.value;
      passwordInput.type = 'text';
    } else {
      passwordDisplay.textContent = '';
      passwordInput.type = 'password';
    }
  }
 //ADDING A SCHEDULE TO THE ADMIN PANEL
var form = document.getElementById("myForm"),
    file = document.getElementById("imgInput"),
    picklocation = document.getElementById("pick"),
    picktime = document.getElementById("time"),
    droplocation = document.getElementById("drop"),
    droptime = document.getElementById("times"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    form.reset()
})



function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td>${element.employeePick}</td>
            <td>${element.employeetime}</td>
            <td>${element.employeedrop}</td>
            <td>${element.employeetimes}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.employeePick}', '${element.employeetime}', '${element.employeedrop}', '${element.employeetimes}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo('${element.employeePick}', '${element.employeetime}', '${element.employeedrop}', '${element.employeetimes}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>


                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pick, time, drop, times){
    document.querySelector('#showPick').value = pick,
    document.querySelector("#showTime").value = time,
    document.querySelector("#showDrop").value = drop,
    document.querySelector("#showTimes").value = times
}


function editInfo(index,pick, time, drop, times){
    isEdit = true
    editId = index
    picklocation.value = pick
    picktime.value = time
    droplocation.value =drop
    droptime.value = times,

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        employeePick: picklocation.value,
        employeetime: picktime.value,
        employeedrop: droplocation.value,
        employeetimes: droptime.value,
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()
  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})  
