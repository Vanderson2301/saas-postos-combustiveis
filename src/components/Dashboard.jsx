import React from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-2">Bem-vindo, {user.username}!</h1>
                <p className="text-lg text-gray-600 mb-6">Seu cargo é: <span className="font-semibold capitalize text-blue-600">{user.role}</span></p>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Funcionalidades disponíveis:</h2>
                    
                    {/* Funcionalidade para todos os usuários logados */}
                    <button className="w-full p-3 bg-gray-500 text-white rounded-lg">Ver Perfil</button>
                    
                    {/* Funcionalidade apenas para 'editor' e 'admin' */}
                    {(user.role === 'editor' || user.role === 'admin') && (
                        <button className="w-full p-3 bg-green-600 text-white rounded-lg">Criar/Editar Conteúdo</button>
                    )}

                    {/* Funcionalidade EXCLUSIVA para 'admin' */}
                    {user.role === 'admin' && (
                        <button className="w-full p-3 bg-purple-700 text-white rounded-lg">Painel de Administração de Usuários</button>
                    )}
                </div>

                <button onClick={logout} className="mt-8 w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Sair (Logout)
                </button>
            </div>
        </div>
    );
}

export default Dashboard;