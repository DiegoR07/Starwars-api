class Personaje {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
  obtenerNombre(){
    return this.name;
  }

  async obtenerFoto() {
    console.log(this.url)
    return this.url;
  }
}

let busqueda = [];

let  characters = [];
let elemento = document.getElementById("characters");

async function getPersonajes () {
  let url = "https://api.genshin.dev/";


  const data = await fetch (url);
  let characters = await data.json();

  console.log(characters);
}
