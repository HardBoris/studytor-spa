import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";

interface CategoriaProviderProps {
  children: ReactNode;
}

export interface Categoria {
  categoriaId?: string;
  categoria: string;
}

interface CategoriaContextData {
  categorias: Categoria[];
  CategoriasList: () => void;
}

export const CategoriaContext = createContext<CategoriaContextData>(
  {} as CategoriaContextData
);

const useCategoria = () => useContext(CategoriaContext);

const CategoriaProvider = ({ children }: CategoriaProviderProps) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const CategoriasList = async () => {
    await api
      .get("/studytor-api/categorias")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    CategoriasList();
  }, []);

  return (
    <CategoriaContext.Provider
      value={{
        categorias,
        CategoriasList,
      }}
    >
      {children}
    </CategoriaContext.Provider>
  );
};

export { useCategoria, CategoriaProvider };
