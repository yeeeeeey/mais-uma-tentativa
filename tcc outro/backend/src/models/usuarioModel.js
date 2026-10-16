const pool = require("../database/connection");

async function listarUsuarios() {
    const resultado = await pool.query(
        "SELECT id, login, nome, cnpj, perfil, criado_em FROM usuarios ORDER BY id"
    );
    return resultado.rows;
}

async function buscarUsuarioPorId(id) {
    const resultado = await pool.query(
        "SELECT id, login, nome, cnpj, perfil, criado_em FROM usuarios WHERE id = $1",
        [id]
    );
    return resultado.rows[0];
}

async function buscarUsuarioPorLogin(login) {
    const resultado = await pool.query(
        "SELECT * FROM usuarios WHERE login = $1",
        [login]
    );
    return resultado.rows[0];
}

async function criarUsuario({ login, senhaHash, perfil, nome, cnpj }) {
    const resultado = await pool.query(
        `INSERT INTO usuarios (login, senha, perfil, nome, cnpj)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, login, nome, cnpj, perfil, criado_em`,
        [login, senhaHash, perfil, nome || null, cnpj || null]
    );
    return resultado.rows[0];
}

async function atualizarUsuario(id, { login, perfil }) {
    const resultado = await pool.query(
        `UPDATE usuarios
         SET login = $1, perfil = $2
         WHERE id = $3
         RETURNING id, login, nome, cnpj, perfil, criado_em`,
        [login, perfil, id]
    );
    return resultado.rows[0];
}

async function deletarUsuario(id) {
    const resultado = await pool.query(
        "DELETE FROM usuarios WHERE id = $1 RETURNING id",
        [id]
    );
    return resultado.rows[0];
}

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    buscarUsuarioPorLogin,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};
