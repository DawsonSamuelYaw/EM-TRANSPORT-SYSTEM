function logout() {
    var confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      alert("Logging out..."); 
      window.location.assign("index.html");
    } else {
      // If the user clicks 'Cancel', do nothing or handle accordingly
      alert("Logout canceled.");
    }
  }


  //JS CODE FOR ADDING DRIER TO THE ADMIN PANEL

var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    fullname = document.getElementById("name"),
    dob = document.getElementById("dates"),
    ghanacard = document.getElementById("card"),
    license = document.getElementById("lic"),
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
    imgInput.src = "IMG/3135715.png"
    form.reset()
})

file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}



function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeDOB}</td>
            <td>${element.employeeGH}</td>
            <td>${element.employeeLIC}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}','${element.employeeName}', '${element.employeeDOB}', '${element.employeeGH}', '${element.employeeLIC}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo('${element.picture}','${element.employeeName}', '${element.employeeDOB}', '${element.employeeGH}', '${element.employeeLIC}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>


                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pic,name, dates, card, lic){
    document.querySelector('.showImg').src = pic,
    document.querySelector('#showName').value = name,
    document.querySelector("#showDates").value = dates,
    document.querySelector("#showGH").value = card,
    document.querySelector("#showLIC").value = lic
}


function editInfo(index,pic,name, dates, card, lic){
    isEdit = true
    editId = index
    imgInput.src = pic
    fullname.value = name
    dob.value = dates
    ghanacard.value = card
    license.value = lic,

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
        picture: imgInput.src == undefined ? "IMG/3135715.png" : imgInput.src,
        employeeName: fullname.value,
        employeeDOB: dob.value,
        employeeGH: ghanacard.value,
        employeeLIC: license.value,
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
    imgInput.src = "IMG/3135715.png"
    
  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})  
