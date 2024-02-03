let data =[
    {id:1,name:"samuel",email:"samuel@gmail.com"},
    {id:2,name:"samuel",email:"samuel@gmail.com"},
    {id:3,name:"samuel",email:"samuel@gmail.com"}

]

function read(){
    var tbdata = document.querySelector(".table_data");
    var elements = "";
    data.map(d =>(
        elements+= `<tr>
        <td>${d.name}</td>
        <td>${d.email}</td>
        <td>
        <button>Update </button>
        <button>Delete</button>
        </td>

        </tr>
        `
    ))
    tbdata.innerHTML = elements;
}
function create_form(){
    document.querySelector(".create-form").style.display="block";
    document.querySelector(".adduser").style.display="none";
}

function add(){
    var name = document.querySelector(".name").value;
    var email = document.querySelector(".email").value;

    var newobj={id:3, name, email,}
    data.push(newobj);

    document.querySelector(".create-form").style.display="none";
    document.querySelector(".adduser").style.display="block";

    read();


}