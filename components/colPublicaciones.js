class colPublicaciones {
  constructor(usuario) {
    this.user = usuario;
  }

  render = () => {
    let component = document.createElement("div");

    component.className = "colPublicacion";

    let publicCont = document.createElement("div");
    publicCont.className = "publicCont";
    publicCont.innerHTML = this.user.publicacion;

    let fechaCont = document.createElement("div");
    fechaCont.className = "fechaCont";
    fechaCont.innerHTML = this.user.fecha;

    let userName = document.createElement("div");
    userName.className = "userName";
    userName.innerHTML = "@" + this.user.usuario;

    let answerBlock = document.createElement("div");
    answerBlock.className = "answerBlock";

    let answer = document.createElement("textarea");
    answer.className = "answer";
    answer.placeholder = "Escribe una respuesta";

    let ansBtn = document.createElement("button");
    ansBtn.className = "ansBtn";
    ansBtn.innerHTML = "Responder";

    answerBlock.appendChild(answer);
    answerBlock.appendChild(ansBtn);
    component.appendChild(fechaCont);
    component.appendChild(publicCont);
    component.appendChild(userName);
    component.appendChild(answerBlock);

    let ContRes = document.createElement("div");
    ContRes.className = "answerCont";
    let us = this.user.id;

    database.ref("usuarios/comments").on("value", function (data) {
      ContRes.innerHTML = "";
      data.forEach((comentario) => {
        let valor = comentario.val();
        if (us == valor.id) {
          let answerCont = document.createElement("div");
          answerCont.className = "ansCont";
          answerCont.innerHTML = valor.comentario;
          ContRes.appendChild(answerCont);
          component.appendChild(ContRes);
        }
      });
    });

    ansBtn.addEventListener("click", () => {
        if (answer.value == "") {
            alert("Hay un campo vacio");
            return;
          }
      const database = firebase.database();
      let reference = database.ref("usuarios/comments").push();
      let comentario = {
        id: this.user.id,
        comentario: answer.value,
      };
      reference.set(comentario);
      answer.value = "";
    });

    return component;
  };
}
