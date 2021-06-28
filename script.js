import recetas from './recetas.js'

const dias = [
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
  'domingo',
]

const contenedor = document.querySelector('.contenedor')

window.addEventListener('keydown', event => {
  if (event.code === 'KeyG') generarComidas()
})

function capitalizar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function asignarTipoComida(dia, tipos) {
  const contenedorDia = document.querySelector(`#${dia}`)
  contenedorDia.dataset.tipo = tipos
}

function generarComidas() {
  dias.forEach(dia => {
    const comidaDia = document.querySelector(`#${dia} span`)
    const contenedorDia = document.querySelector(`#${dia}`)
    const tipos = contenedorDia.dataset.tipo.split(', ')
    const recetasDia = recetas.filter(receta => tipos.includes(receta.tipo))

    if (contenedorDia.dataset.lock === 'false')
      comidaDia.innerHTML = capitalizar(
        recetasDia[Math.floor(Math.random() * recetasDia.length)].nombre
      )
  })
}

function bloquearComida(contenedor, icono) {
  contenedor.style.webkitFilter = 'brightness(0.9)'
  contenedor.dataset.lock = 'true'
  icono.classList.add('fa-lock')
  icono.classList.remove('fa-unlock')
}

function desbloquearComida(contenedor, icono) {
  contenedor.dataset.lock = 'false'
  contenedor.style.webkitFilter = 'brightness(1)'
  icono.classList.add('fa-unlock')
  icono.classList.remove('fa-lock')
}

function conmutarBlock(dia) {
  const iconoBoton = document.querySelector(`#${dia} button i`)
  const contenedorDia = document.querySelector(`#${dia}`)

  if (contenedorDia.dataset.lock === 'true') {
    desbloquearComida(contenedorDia, iconoBoton)
  } else {
    bloquearComida(contenedorDia, iconoBoton)
  }
}

function crearContenedorDia(dia) {
  const contenedor = document.createElement('div')
  contenedor.classList.add('dia')
  contenedor.id = dia
  contenedor.dataset.lock = 'false'

  return contenedor
}

function crearBotonLock(dia) {
  const boton = document.createElement('button')
  boton.classList.add('boton-circular')
  boton.addEventListener('click', () => conmutarBlock(dia))

  return boton
}

function crearIconoLock() {
  const iconoBoton = document.createElement('i')
  iconoBoton.classList.add('fas')
  iconoBoton.classList.add('fa-unlock')

  return iconoBoton
}

function crearEstructura() {
  dias.forEach(dia => {
    const contenedorDia = crearContenedorDia(dia)
    const botonLock = crearBotonLock(dia)
    const iconoBoton = crearIconoLock()
    const comidaDia = document.createElement('span')

    const headerDia = document.createElement('h3')
    headerDia.innerHTML = capitalizar(dia)

    botonLock.appendChild(iconoBoton)

    contenedorDia.appendChild(headerDia)
    contenedorDia.appendChild(comidaDia)
    contenedorDia.appendChild(botonLock)

    contenedor.appendChild(contenedorDia)
  })
}

crearEstructura()

asignarTipoComida('lunes', 'pollo, pescado')
asignarTipoComida('martes', 'pollo, carne')
asignarTipoComida('miércoles', 'pollo')
asignarTipoComida('jueves', 'carne')
asignarTipoComida('viernes', 'pollo, pescado')
asignarTipoComida('sábado', 'carne')
asignarTipoComida('domingo', 'pollo, carne, pescado')

generarComidas()
