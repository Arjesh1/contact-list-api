const apiUrl = "https://randomuser.me/api/?results=10"

let userList = []

const displayElm = document.querySelector("#list")
const countElm = document.querySelector("#count")
const selectElm = document.querySelector("#select")
const searchElm = document.querySelector("#search-input")

const fetchUsers = () => {
    fetch(apiUrl)
    .then( (response) => response.json())
    .then( (data) => {userList = data.results 
        display(data.results)
        console.log(data);
    })
    .catch((error) => console.log(error))

}

const display = (users) => {
    let str = "";
  
    users.map((user) => {
      str += `
          <div class="card m-2 border border-danger " style="width: 20rem ">
          <img src="${user.picture.large}" class="card-img-top" alt="user-img"/>
          <div class="card-body  text-white">
          <h5 class="card-title">
          ${user.name.title} ${user.name.first} ${user.name.last}
          </h5>
          <p class="card-text bg-body">
          <ul class="list-unstyled">
          <li>${user.phone}</li>
          <li>${user.email}</li>
          <li>${user.dob.date}</li>
          <li>${user.location.city} ${user.location.country}</li>
          </ul>
          </p>
          </div>
          </div>
      `;
    });
    displayElm.innerHTML = str;
    countElm.innerText = users.length
  };
  
  fetchUsers();

  searchElm.addEventListener("keyup", (e) =>{
    console.log(e.key);
    let filteredUsers
    let searchTerm = e.target.value

    filteredUsers = userList.filter((user) =>{
        const fullName = user.name.first + " " + user.name.last

        return fullName.toLowerCase().includes(searchTerm.toLowerCase())

    })

    display(filteredUsers)
  
  })

  selectElm.addEventListener("change", (e) =>{
    let filteredUsers
    filteredUsers = userList.filter((user) => user.gender === e.target.value)
    display(filteredUsers)
  })