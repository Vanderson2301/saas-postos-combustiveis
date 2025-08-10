import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importando os componentes e o provedor de autenticação
import { AuthProvider } from './context/AuthContext';
import TelaLogin from './components/TelaLogin';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {
  return (
    // 1. O AuthProvider "abraça" toda a aplicação.
    // Assim, todos os componentes podem saber se o usuário está logado.
    <AuthProvider>
      {/* 2. O Router gerencia a navegação baseada na URL. */}
      <Router>
        {/* 3. O Routes decide qual rota/componente mostrar. */}
        <Routes>
          {/* Rota pública: qualquer um pode acessar a tela de login. */}
          <Route path="/login" element={<TelaLogin />} />

          {/* Rotas protegidas: só podem ser acessadas por usuários logados. */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Você pode adicionar outras rotas protegidas aqui, como /perfil, /configuracoes, etc. */}
          </Route>
          
          {/* Rota padrão: se o usuário digitar qualquer outra coisa, é redirecionado para a tela de login. */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;