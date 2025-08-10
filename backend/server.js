const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./database.js');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'seu_segredo_super_secreto_aqui'; // Em produção, use variáveis de ambiente!

app.use(cors());
app.use(express.json());

// Rota de Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
    }

    const sql = "SELECT * FROM users WHERE username = ?";
    db.get(sql, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor.' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
        }

        // Compara a senha enviada com o hash salvo no banco
        const isPasswordCorrect = bcrypt.compareSync(password, user.password_hash);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
        }

        // Se a senha está correta, cria um token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        res.json({ message: 'Login bem-sucedido!', token });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});