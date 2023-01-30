const token = localStorage.getItem("token");

const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

const getFavorites = () => {
  fetch(`http://localhost:5000/api/user/favorites`, requestOptions);
};

module.exports = {
  getFavorites,
};
