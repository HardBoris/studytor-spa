import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";
// import { api } from "../services/api";

interface InstitutionProviderProps {
  children: ReactNode;
}

export interface Institution {
  institutionId: string;
  institutionName: string;
  institutionEmail: string;
  code: string;
}

/* interface AuthState {
  token: string;
  user: User;
  institution: string;
} */

export interface InstitutionInfo {
  institutionName: string;
  institutionEmail: string;
}

interface InstitutionContextData {
  instituto: Institution;
  institutos: Institution[];
  miInstituto: Institution;
  NewInstitution: (info: InstitutionInfo) => Promise<void>;
  institutionsList: () => Promise<void>;
  myInstitution: () => Promise<void>;
}

const InstitutionContext = createContext<InstitutionContextData>(
  {} as InstitutionContextData,
);

const useInstitution = () => useContext(InstitutionContext);

const InstitutionProvider = ({ children }: InstitutionProviderProps) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [instituto, setInstituto] = useState<Institution>({} as Institution);
  const [institutos, setInstitutos] = useState<Institution[]>([]);
  const [miInstituto, setMiInstituto] = useState<Institution>(
    {} as Institution,
  );

  const NewInstitution = async ({
    institutionName,
    institutionEmail,
  }: InstitutionInfo) => {
    let institution: Institution;
    await api
      .post("/institutions/register", {
        institutionName,
        institutionEmail,
      })
      .then((response) => {
        console.log(response.data);
        institution = response.data;
        setInstituto(institution);
      })
      .then(() => navigate(`/${institution.institutionId}/users/register`))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {}, []);

  const institutionsList = async () => {
    await api
      .get("/institutions", {
        headers: {
          authrization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { institutions } = response.data;
        setInstitutos(institutions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const myInstitution = async () => {
    await api
      .get("/institutions/:institutionId", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { institution } = response.data;
        setMiInstituto(institution);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <InstitutionContext.Provider
      value={{
        instituto,
        institutos,
        miInstituto,
        NewInstitution,
        institutionsList,
        myInstitution,
      }}
    >
      {children}
    </InstitutionContext.Provider>
  );
};

export { InstitutionProvider, useInstitution };
