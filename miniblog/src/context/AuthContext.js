// Importa os hooks useContext e createContext do React
// Esses hooks são usados para gerenciar e acessar valores de contexto em um componente React.
import { useContext, createContext } from "react";

// Criação de um contexto chamado AuthContext.
// O createContext é usado para criar um "espaço" onde valores podem ser compartilhados entre componentes sem a necessidade de passar explicitamente como props.
const AuthContext = createContext();

export function AuthProvider({ children, value }) {
  // O AuthContext.Provider é usado para definir o valor do contexto
  // Todos os componentes filhos terão acesso ao valor fornecido aqui.
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuthValue() {
  // useContext é usado para acessar o valor atual de AuthContext.
  // Isso elimina a necessidade de importar e usar useContext manualmente em vários componentes.
  return useContext(AuthContext);
}
