import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { localApi as api } from "../services/api";
import { Institution } from "./InstitutionContext";

interface UserProviderProps {
  children: ReactNode;
}

export interface User {
  userId: string;
  name: string;
  userRole: string;
}

interface AuthState {
  token: string;
  user: User;
  institution: Institution;
}

interface SignInCredentials {
  name: string;
  password: string;
  institutionCode: string;
}

interface UserContextData {
  user: User;
  token: string;
  institution: Institution;
  usersArray: User[];
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  signUp: (info: SignInCredentials) => void;
  usersList: () => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const useAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const history = useNavigate();
  const [usersArray, setUsersArray] = useState<User[]>([]);

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@Aventura:token");
    const user = localStorage.getItem("@Aventura:user");
    const institution = localStorage.getItem("@Aventura:institution");

    if (token && user && institution) {
      return {
        token,
        user: JSON.parse(user),
        institution: JSON.parse(institution),
      };
    }

    return {} as AuthState;
  });

  const usersList = async () => {
    await api
      .get(`/${data.institution.institutionId}/users`, {
        headers: { authorization: `Bearer ${data.token}` },
      })
      .then((response) => setUsersArray(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    usersList();
  }, []);

  const signIn = async ({
    name,
    password,
    institutionCode,
  }: SignInCredentials) => {
    // const aviso = toast.loading("Por Favor espere...");
    await api
      .post("/login", { name, password, institutionCode })
      .then((response) => {
        const { user, token, institution } = response.data;
        localStorage.setItem("@Studytor:token", token);
        localStorage.setItem("@Studytor:user", JSON.stringify(user));
        localStorage.setItem(
          "@Studytor:institution",
          JSON.stringify(institution)
        );
        console.log(institution);
        setData({ user, token, institution });
        history(`/${institution.institutionId}`);
        /* toast.update(aviso, {
          render: "Bem-Vindo a Oikos!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        }); */
      })
      .catch((error) => {
        console.log(error);
        /* toast.update(aviso, {
          render: error.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        }); */
      });
  };

  const signUp = async ({ name, password }: SignInCredentials) => {
    // const aviso = toast.loading("Por Favor espere...");
    await api
      .post(
        `/${data.institution.institutionId}/users/register`,
        {
          name,
          password,
        },
        { headers: { authorization: `Bearer ${data.token}` } }
      )
      .then((response) => {
        console.log(response.data);
        const { usuario } = response.data;
        /* toast.update(aviso, {
          render: "Novo usuário cadastrado!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        }); */
      })
      .then(() => history("/login"))
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = () => {
    localStorage.removeItem("@Studytor:token");
    localStorage.removeItem("@Studytor:user");
    localStorage.removeItem("@Studytor:institution");

    setData({} as AuthState);
  };

  return (
    <UserContext.Provider
      value={{
        token: data.token,
        user: data.user,
        institution: data.institution,
        usersArray,
        signIn,
        signOut,
        signUp,
        usersList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useAuth };
