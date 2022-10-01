//API
let url = "https://api.github.com/users/";

const mainContent = document.querySelector(".main-content");
const form = document.querySelector(".form");
const input = document.querySelector(".header__input");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = input.value.trim();
  getUser(username);
  input.value = "";
});
/**Función Fetch Obtener usuario*/

async function getUser(username) {
  try {
    const res = await fetch(url + username);

    if (res.ok == true) {
      const data = await res.json();
      showUser(data);
    } else {
      notFound(username);
      console.log("usuario no encontrado");
    }
  } catch (error) {
    console.error(error);
  }
}

/*Mostrar Usuario*/

function showUser(data) {
  const {
    avatar_url,
    name,
    created_at,
    login,
    bio,
    public_repos,
    followers,
    following,
    location,
    blog,
    twitter_username,
    company,
    html_url,
  } = data;

  const datos = {
    avatar_url,
    name,
    created_at,
    login,
    bio,
    public_repos,
    followers,
    following,
    location,
    blog,
    twitter_username,
    company,
    html_url,
  };
  // console.log(datos);

  /*Creación de HTML Data*/
  mainContent.innerHTML = template(datos);
}
/* Usuario no encontrado */
function notFound(username) {
  mainContent.innerHTML = "";
  username !== ""
    ? (mainContent.innerHTML = `
  <p class="text">El usuario <i><b>"${username}"</b></i> no es válido.</p>
  
  `)
    : (mainContent.innerHTML = `
  <p class="text">No ha ingresado un usuario.</p>
  `);
}

/*Cambio de formato de fecha*/
function parseDate(date) {
  let options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleString("es-Es", options);
}

function template({
  avatar_url = "./img/github.png",
  name = "User not found",
  created_at = "2000-01-01T00:00:00Z",
  html_url = "#",
  login = "nofound",
  bio = "This profile has no bio",
  public_repos = 0,
  followers = 0,
  following = 0,
  location = "Not Available",
  blog = "Not Available",
  twitter_username = "Not Available",
  company = "Not Available",
}) {
  if (bio == null) {
    bio = "This profile has no bio";
  }
  if (location == null) {
    location = "Not Available";
  }
  if (blog == "") {
    blog = "Not Available";
  }
  if (twitter_username == null) {
    twitter_username = "Not Available";
  }
  if (company == null) {
    company = "Not Available";
  }
  return `  
  <div class="main-imagen">
  <img class="avatar" src="${avatar_url}" alt="Logo GitHub" />
  </div>
  <div class="perfil">
  <h2>${name}</h2>
  <a class="link-perfil" target="_blank" href="${html_url}">@${login}</a>
  </div>
  <div class="fecha">
  <p>Joined ${parseDate(created_at)}</p>
  </div>
  <div class="description">
  <p>
    ${bio}
  </p>
  </div>
  <div class="info">
  <div>
    <p>Repos</p>
    <p class="number">${public_repos}</p>
  </div>
  <div>
    <p>Follower</p>
    <p class="number">${followers}</p>
  </div>
  <div>
    <p>Following</p>
    <p class="number">${following}</p>
  </div>
  </div>
  
  <div class="address">
  <div>
    <img class="icono" src="./img/location.svg" alt="Ubicacion" />
    <a href="#">${location}</a>
  </div>
  <div>
    <img class="icono" src="./img/link.svg" alt="" />
    <a href="http://">${blog}</a>
  </div>
  </div>
  <div class="links">
  <div>
    <img class="icono" src="./img/twitter.svg" alt="Twitter" />
    <a href="http://">${twitter_username}</a>
  </div>
  <div>
    <img class="icono" src="./img/org.svg" alt="Org" />
    <a href="http://">${company}</a>
  </div>
  </div>  
  `;
}
