//API
let url = 'https://api.github.com/users/';

const mainContent = document.querySelector('.main-content');
const form = document.querySelector('.form');
const input = document.querySelector('.header__input');
form.addEventListener('submit', (event)=>{
  event.preventDefault()
  const username = input.value.trim()
  getUser(username)
  

})
/**Función Fetch Obtener usuario*/

async function getUser(username){

  try{
    const res = await fetch(url + username)
    const data = await res.json()
    console.log(data)
    showUser(data)

  }catch(error){
    console.error(error)

  }
 
}

/*Mostrar Usuario*/

function showUser(data){
  const {avatar_url,name, created_at,login,bio,public_repos,followers, following,location, blog,twitter_username,company,html_url } = data

  console.log(avatar_url,name, created_at,login,bio,public_repos,followers, following,location, blog,twitter_username,company)

  const UsuarioDatos = `
  
  <div class="main-imagen">
  <img class="avatar" src="${avatar_url}" alt="Logo GitHub" />
  </div>
  <div class="perfil">
  <h2>${name}</h2>
  <a class="link-perfil" href="${html_url}">@${login}</a>
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
    <p>${public_repos}</p>
  </div>
  <div>
    <p>Follower</p>
    <p>${followers}</p>
  </div>
  <div>
    <p>Following</p>
    <p>${following}</p>
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
  `
  /*Creación de HTML Data*/
  mainContent.innerHTML = UsuarioDatos;

/*Cambio de formato de fecha*/
  function parseDate(date){
    let options = {weekday:'short', year:'numeric', month:'short', day:'numeric'}
  return new Date(date).toLocaleString('es-Es', options)
  
  }
}

