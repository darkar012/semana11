class colAnswers {
  constructor(comentario, usuario) {
    this.comentario = comentario;
    this.us = usuario;
  }
  render = () => {
    if (this.us.id == this.comentario.id) {
        let component = document.createElement("div");
        component.className = "answer";

        let answerCont = document.createElement("div");
        answerCont.className = "ansCont";
        answerCont.innerHTML = this.comentario.comentario;

        component.appendChild(answerCont);

        return component;
    }
  };
}
