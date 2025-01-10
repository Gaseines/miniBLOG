// Importa a configuração do Firebase para acessar o banco de dados ou outras funcionalidades
import { db } from '../firebase/config';

// Importa funções específicas do Firebase Authentication
import {
  getAuth, // Função para inicializar o serviço de autenticação
  createUserWithEmailAndPassword, // Cria usuários com e-mail e senha
  signInWithEmailAndPassword, // Faz login com e-mail e senha
  updateProfile, // Atualiza o perfil do usuário
  signOut // Faz logout do usuário
} from "firebase/auth";

// Importa hooks do React
import { useState, useEffect } from "react";

// Hook personalizado para gerenciar autenticação no Firebase
export const useAuthentication = () => {
  // Estado para armazenar erros
  const [error, setError] = useState(null);

  // Estado para controlar o carregamento das operações
  const [loading, setLoading] = useState(null);

  // Estado para lidar com possíveis vazamentos de memória
  const [cancelled, setCancelled] = useState(false);

  // Inicializa o serviço de autenticação do Firebase
  const auth = getAuth();

  // Função para verificar se o componente foi desmontado antes de realizar operações
  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  /**
   * Função para criar um novo usuário no Firebase Authentication
   * @param {Object} data - Objeto contendo os dados do usuário (email, password, displayName)
   * @returns {Object|undefined} - Retorna o objeto do usuário criado ou undefined em caso de erro
   */
  const createUser = async (data) => {
    // Verifica se o hook foi cancelado
    checkIfIsCancelled();

    // Define estados de carregamento e erro
    setLoading(true);
    setError(null);

    try {
      // Cria o usuário no Firebase Authentication com email e senha
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Atualiza o perfil do usuário com o nome fornecido
      await updateProfile(user, { displayName: data.displayName });

      setLoading(false); // Finaliza o carregamento

      return user; // Retorna o usuário criado
    } catch (error) {
      console.log(error.message); // Loga a mensagem de erro no console
      console.log(typeof error.message); // Loga o tipo do erro

      // Trata erros específicos para fornecer mensagens mais claras ao usuário
      let systemError;
      if (error.message.includes("Password")) {
        systemError = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemError = "E-mail já cadastrado.";
      } else {
        systemError = "Ocorreu um erro, por favor tente mais tarde.";
      }

      // Atualiza o estado de erro com a mensagem tratada
      setError(systemError);
    }
  };

  // Hook para lidar com desmontagem do componente e evitar vazamento de memória
  useEffect(() => {
    return () => setCancelled(true); // Define o estado como cancelado
  }, []);

  // Retorna as funcionalidades e estados gerenciados pelo hook
  return {
    auth, // Instância do serviço de autenticação
    createUser, // Função para criar usuários
    error, // Estado de erro
    loading // Estado de carregamento
  };
};
