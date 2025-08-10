const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados users.db.');
});

db.serialize(() => {
    // Cria a tabela de usuários se ela não existir
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password_hash TEXT,
        role TEXT NOT NULL CHECK(role IN ('admin', 'editor', 'viewer'))
    )`, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Tabela 'users' criada ou já existente.");

        // Insere usuários padrão (apenas se a tabela estiver vazia)
        const stmt = db.prepare("INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)");
        const users = [
            { user: 'admin', pass: 'admin123', role: 'admin' },
            { user: 'editor', pass: 'editor123', role: 'editor' },
            { user: 'joao', pass: 'joao123', role: 'viewer' }
        ];

        db.get("SELECT count(*) as count FROM users", (err, row) => {
            if (row.count === 0) {
                console.log("Populando tabela com usuários padrão...");
                users.forEach(u => {
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(u.pass, salt);
                    stmt.run(u.user, hash, u.role);
                });
                stmt.finalize();
                console.log("Usuários padrão inseridos.");
            }
        });
    });
});

module.exports = db;