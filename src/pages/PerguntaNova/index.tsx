import { useForm } from "react-hook-form";
import { BGbutton } from "../../components/BGbutton";
import { BGformulario } from "../../components/BGformulario";
import { BGInput } from "../../components/BGinput";
import { BGSelect } from "../../components/BGSelect";
import "./perguntaNova.css";
import { PerguntaNovaInfo, usePergunta } from "../../context/PerguntaContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import BGModal from "../../components/BGmodal";
import { NovaDisciplina } from "./NovaDisciplina";
import { useDisciplina } from "../../context/DisciplinaContext";
import { BGSelectObject } from "../../components/BGSelectObject";
import { useAssunto } from "../../context/AssuntoContext";
import { NovoAssunto } from "./NovoAssunto";
import { useCategoria } from "../../context/CategoriaContext";
import { NovaCategoria } from "./NovaCategoria";

const PerguntaNovaSchema = yup.object().shape({
  disciplina: yup.string().required(),
  nivel: yup.string().required(),
  asunto: yup.string().required(),
  categoria: yup.string().required(),
  pergunta: yup.string().required(),
});

export const PerguntaNova = () => {
  const { NewQuestion } = usePergunta();
  const { disciplinas, DisciplinasLoader } = useDisciplina();
  const { assuntos, AssuntosLoader } = useAssunto();
  const { categorias, CategoriasLoader } = useCategoria();
  const nivel = ["Fundamental", "Médio", "Técnico", "Superior"];

  const [newDisciplineOpen, setNewDisciplineOpen] = useState(false);
  const [newTopicOpen, setNewTopicOpen] = useState(false);
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);

  useEffect(() => {
    DisciplinasLoader();
  }, [newDisciplineOpen]);

  useEffect(() => {
    AssuntosLoader();
  }, [newTopicOpen]);

  useEffect(() => {
    CategoriasLoader();
  }, [newCategoryOpen]);

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<PerguntaNovaInfo>({ resolver: yupResolver(PerguntaNovaSchema) });

  const sender = (info: PerguntaNovaInfo) => {
    console.log(info);

    try {
      NewQuestion(info);
    } catch (error) {
      console.error();
    }
    reset();
  };

  const disciplineModal = () => {
    setNewDisciplineOpen(!newDisciplineOpen);
  };

  const topicModal = () => {
    setNewTopicOpen(!newTopicOpen);
  };

  const categoryModal = () => {
    setNewCategoryOpen(!newCategoryOpen);
  };

  return (
    <>
      <div className="pergunta_form">
        <BGformulario onSubmit={handleSubmit(sender)} clase="vertical-form">
          <h1>Pergunta Nova</h1>
          <div className="clasificacion">
            <div className="start-separator">
              <BGSelectObject name="disciplina" register={register}>
                <option value={""}>Selecione uma disciplina</option>
                {disciplinas &&
                  disciplinas.map((item) => (
                    <option key={item.disciplinaId} value={item.disciplinaId}>
                      {item.disciplina}
                    </option>
                  ))}
              </BGSelectObject>
            </div>
            <div className="separator">
              <BGSelect name="nivel" options={nivel} register={register} />
            </div>
            <div className="separator">
              <BGSelectObject name="assunto" register={register}>
                <option value={""}>Selecione um assunto</option>
                {assuntos &&
                  assuntos.map((item) => (
                    <option key={item.assuntoId} value={item.assuntoId}>
                      {item.assunto}
                    </option>
                  ))}
              </BGSelectObject>
            </div>
            <div className="end-separator">
              <BGSelectObject name="categoria" register={register}>
                <option value={""}>Selecione uma categoria</option>
                {categorias &&
                  categorias.map((item) => (
                    <option key={item.categoriaId} value={item.categoriaId}>
                      {item.categoria}
                    </option>
                  ))}
              </BGSelectObject>
            </div>
          </div>
          <div className="separator">
            <BGInput
              name="pergunta"
              placeholder="pergunta"
              register={register}
              error={errors.pergunta?.message}
            />
          </div>
          <div className="separator">
            <BGbutton type="submit">Guardar</BGbutton>
          </div>
        </BGformulario>
        <div className="actions">
          <div className="start-separator">
            <BGbutton onClick={() => disciplineModal()}>
              Nova Disciplina
            </BGbutton>
          </div>
          <div className="separator">
            <BGbutton onClick={() => topicModal()}>Novo Assunto</BGbutton>
          </div>
          <div className="end-separator">
            <BGbutton onClick={() => categoryModal()}>Nova Categoria</BGbutton>
          </div>
        </div>
      </div>
      <BGModal isOpen={newDisciplineOpen} setIsOpen={disciplineModal}>
        <NovaDisciplina fechar={disciplineModal} />
      </BGModal>
      <BGModal isOpen={newTopicOpen} setIsOpen={topicModal}>
        <NovoAssunto fechar={topicModal} />
      </BGModal>
      <BGModal isOpen={newCategoryOpen} setIsOpen={categoryModal}>
        <NovaCategoria fechar={categoryModal} />
      </BGModal>
    </>
  );
};
