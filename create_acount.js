fetch("http://localhost:8081/postUsers/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    User_Name: "enzo",
    Password: "1234"
  })
})
.then(res => res.json())
.then(data => console.log(data));