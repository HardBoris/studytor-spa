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
  CategoriasLoader: () => void;
  NewCategory: (data: Categoria) => void;
}

export const CategoriaContext = createContext<CategoriaContextData>(
  {} as CategoriaContextData
);

const useCategoria = () => useContext(CategoriaContext);

const CategoriaProvider = ({ children }: CategoriaProviderProps) => {
  const [categorias, setCategorias] = useState([]);

  const CategoriasLoader = async () => {
    await api
      .get("/categorias")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    CategoriasLoader();
  }, []);

  const NewCategory = (data: Categoria) => {
    api
      .post("/categorias/register", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <CategoriaContext.Provider
      value={{
        categorias,
        CategoriasLoader,
        NewCategory,
      }}
    >
      {children}
    </CategoriaContext.Provider>
  );
};

export { useCategoria, CategoriaProvider };
