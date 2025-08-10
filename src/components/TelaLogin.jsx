import React, { useState } from 'react';
import './TelaLogin.css'; // Importa o CSS separado

function TelaLogin() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Tentativa de login com usuário: ${usuario}`);
  };

  return (
    <div className="container-principal flex flex-col items-center justify-start pt-20 h-screen w-screen">
      
      {/* Logo */}
      <img
        src="https://via.placeholder.com/180x60.png?text=Sua+Logo"
        alt="Logo da Empresa"
        className="mb-12"
      />

      {/* Caixa de Login */}
      <div className="
        w-full max-w-md p-8 space-y-6
        bg-white/90 backdrop-blur-md
        rounded-xl shadow-lg
      ">
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

          {/* Botão */}
          <button
            type="submit"
            className="w-full py-3 font-bold text-black bg-yellow-500 border-2 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
            style={{
              borderColor: 'gray',    // cor da borda
              borderWidth: '1px'       // espessura da borda
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default TelaLogin;
