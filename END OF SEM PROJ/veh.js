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
var form = document.getElementById("myForm"),
    file = document.getElementById("imgInput"),
    vehiclenum = document.getElementById("num"),
    noSeats = document.getElementById("seats"),
    vehicleType = document.getElementById("types"),
    vehicleModel = document.getElementById("model"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("table-data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []

let isEdits = false, editIds
showCar()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdits = false
    form.reset()
})



function showCar(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getInfo.forEach((element, index) => {
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
showCar()


function readInfo(num, seats, types, model){
    document.querySelector('#vehNum').value = num,
    document.querySelector("#vehSeats").value = seats,
    document.querySelector("#vehType").value = types,
    document.querySelector("#vehModel").value = model
}


function editInfo(index,num, seats, types, model){
    isEdits = true
    editIds = index
    vehiclenum.value = num
    noSeats.value = seats
    vehicleType.value = types
    vehicleModel.value = model,

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getInfo.splice(index, 1)
        localStorage.setItem("user", JSON.stringify(getInfo))
        showCar()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        employeePick: vehiclenum.value,
        employeetime: noSeats.value,
        employeedrop: vehicleType.value,
        employeetimes: vehicleModel.value,
    }

    if(!isEdits){
        getInfo.push(information)
    }
    else{
        isEdits = false
        getInfo[editIds] = information
    }

    localStorage.setItem('user', JSON.stringify(getInfo))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showCar()

    form.reset()
  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})