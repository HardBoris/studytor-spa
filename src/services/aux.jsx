import { useDisciplina } from "../context/DisciplinaContext";

export const Aux = () => {
  const { disciplinas } = useDisciplina();

  const prueba = () => {
    let novaLista;
    novaLista = disciplinas.map((item) => item.disciplina);
    return console.log(novaLista);
  };
};
