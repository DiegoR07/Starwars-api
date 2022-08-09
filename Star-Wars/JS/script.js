class Personaje {
  constructor(datos) {
    const {name, image, bornLocation} = datos
    
    this.name = name;
    this.image = image;
    this.bornLocation = bornLocation;
  }

  obtenerNombre() {
    return this.name;
  }

  obtenerFoto() {
    return this.image;
  }

  obtenerInfo() {
    return `
      <ul>
        <li>Lugar de nacimiento: ${this.bornLocation}
      </ul>
    `
  }
}

let personajes = [];
let elemento = document.getElementById("personajes-wrapper");

const inputBuscador = document.getElementById("buscador")
inputBuscador.addEventListener('keyup', llamarBusqueda)

function obtenerMasInfo(nombre) {
  const labelNombre = `mas-info-${nombre.replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase()}`
  const masInfo = document.getElementById(labelNombre)

  selectedPersonaje = personajes.filter(personaje => personaje.name === nombre).pop()

  masInfo.innerHTML = selectedPersonaje.obtenerInfo()
}

function buildCharacterCard(nombre, foto) {
  return `
    <div class="column">
      <div class="card">
        <h3 class="tpersonaje">${nombre}</h3>
        <p>
          <img src="${foto}" height="300" width="250" />
        </p>
        <p><button type="button" onclick="obtenerMasInfo('${nombre}')">Mas</button></p>
        <p class="mas-info" "id="mas-info-${nombre.replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase()}"></p>
      </div>
    </div>
  `
}

async function getPersonajes () {
  let url = "https://akabab.github.io/starwars-api/api/all.json";
  
  const response = await fetch(url);
  const data = await response.json();

  data.forEach(datum => {
    let nuevoPersonaje = new Personaje(datum)
    personajes.push(nuevoPersonaje);
  });

  personajes.forEach((personaje) => {

    elemento.innerHTML += buildCharacterCard(
      personaje.obtenerNombre(),
      personaje.obtenerFoto()
    )
  })
}

function reiniciarData() {
  personajes.length = 0;
  elemento.innerHTML = null;
  getPersonajes();
}

function llamarBusqueda() {
  setTimeout(() => {
    const consulta = inputBuscador.value;
    const personajesFiltrados = personajes.filter(personaje => personaje.name.toLowerCase().includes(consulta.toLowerCase()))
  
    if (personajesFiltrados.length > 0) {
      elemento.innerHTML = null
      personajesFiltrados.forEach((personajeFiltrado) => {
        elemento.innerHTML += buildCharacterCard(
          personajeFiltrado.obtenerNombre(),
          personajeFiltrado.obtenerFoto()
        )
      })
    }
  }, 500);
}

function ordenarPersonajes() {
  const selector = document.getElementById("sort").value

  if (selector === 'none') {
    reiniciarData();
    return null
  }

  const personajesOrdenados = personajes.sort((a,b) => {
    let personajeA = a.name.toLowerCase()
    let personajeB = b.name.toLowerCase()

    if (selector === 'menor') {
      if (personajeA < personajeB) {
        return -1
      }
    } else if (selector === 'mayor') {
      if (personajeA > personajeB) {
        return -1
      }
    } else {
      return 0;
    }
  })

  if (personajesOrdenados.length > 0) {
    elemento.innerHTML = null

    personajesOrdenados.forEach((personajeOrdenado) => {
      elemento.innerHTML += buildCharacterCard(
        personajeOrdenado.obtenerNombre(),
        personajeOrdenado.obtenerFoto()
      )
    })
  }
}

getPersonajes();
