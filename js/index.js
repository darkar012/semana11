const database = firebase.database();
const publicar = document.getElementById("publicarBtn");
const user = document.getElementById("usuario");
const publicacion = document.getElementById("inputPublicacion");
const publicaciones = document.getElementById("publiContainer");
const respuestas = document.getElementById("publicCont");

const register = () => {
  if (user.value == "" || publicacion.value == "") {
    alert("Hay un campo vacio");
    return;
  }
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let fecha = null;

  if (month < 10) {
    fecha = `${day}-0${month}-${year}`;
  } else {
    fecha = `${day}-${month}-${year}`;
  }

  let referencia = database.ref("usuarios/face").push();
  let usuario = {
    id: referencia.key,
    usuario: user.value,
    publicacion: publicacion.value,
    fecha: fecha,
  };

  referencia.set(usuario);

  user.value = "";
  publicacion.value = "";
};

publicar.addEventListener("click", register);

database.ref("usuarios/face").on("value", function (data) {
  publicaciones.innerHTML = "";
  data.forEach((usuario) => {
    let valor = usuario.val();
    let col = new colPublicaciones(valor);
    publicaciones.appendChild(col.render());
    
  });

  
});
