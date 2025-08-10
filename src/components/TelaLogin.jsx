import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar o usuário
import { useAuth } from '../context/AuthContext'; // Para gerenciar o login
import './TelaLogin.css';


function TelaLogin() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(''); // Estado para guardar mensagens de erro
  
  const navigate = useNavigate();
  const { login } = useAuth();

  // Função de submit agora é assíncrona para se comunicar com a API
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Limpa erros anteriores

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password: senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha ao tentar fazer login.');
      }
      
      // Se o login for bem-sucedido:
      login(data.token); // Salva o token no contexto
      navigate('/dashboard'); // Redireciona para a página principal

    } catch (err) {
      setError(err.message); // Exibe o erro para o usuário
    }
  };

  return (
    // A classe 'container-principal' vem do seu CSS
    <div className="container-principal flex flex-col items-center justify-start pt-20 h-screen w-screen">
      
      <img
        src="https://via.placeholder.com/180x60.png?text=Sua+Logo"
        alt="Logo da Empresa"
        className="mb-12"
      />

      <div className="w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-md rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Acessar sua Conta
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="usuario" className="sr-only">Usuário</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Usuário"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="senha" className="sr-only">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          {/* Exibição da mensagem de erro */}
          {error && (
            <p className="text-center text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 font-bold text-black bg-yellow-500 border-2 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
            style={{ borderColor: 'gray', borderWidth: '1px' }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default TelaLogin;