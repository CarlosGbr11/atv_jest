const { getUserById, connection } = require('./db');

describe('Testes para CRUD de agendamento de horários', () => {

    beforeAll(async () => {
        await connection.query(`CREATE TABLE IF NOT EXISTS agenda (id_agenda INT AUTO_INCREMENT PRIMARY KEY, nome_pessoa VARCHAR(255), contato_telefonico VARCHAR(20), email VARCHAR(255), data_agendamento DATETIME)`);
        await connection.query(`INSERT INTO agenda (nome_pessoa, contato_telefonico, email, data_agendamento) VALUES ('Maria Silva', '123456789', 'maria@example.com', '2024-10-10 15:00:00'), ('João Souza', '987654321', 'joao@example.com', '2024-10-11 14:00:00')`);
    });

    test('1- Deve inserir um novo agendamento', async () => {
        const [result] = await connection.query(`INSERT INTO agenda (nome_pessoa, contato_telefonico, email, data_agendamento) VALUES ('Carlos Gabriel', '123123123', 'carlos@mail.com', '2024-10-12 10:00:00')`);
        expect(result.affectedRows).toBe(1);
    });

    test('2- Deve retornar todos os agendamentos', async () => {
        const [rows] = await connection.query('SELECT * FROM agenda');
        expect(rows.length).toBeGreaterThanOrEqual(2);
    });

    test('3- Deve retornar um agendamento por nome específico', async () => {
        const [rows] = await connection.query('SELECT * FROM agenda WHERE nome_pessoa = ?', ['Maria Silva']);
        expect(rows[0]).toHaveProperty('nome_pessoa', 'Maria Silva');
    });

    test('4- Deve retornar agendamentos dentro de um intervalo de datas', async () => {
        const [rows] = await connection.query(`SELECT * FROM agenda WHERE data_agendamento BETWEEN '2024-10-09' AND '2024-10-12'`);
        expect(rows.length).toBe(2); 
    });

    test('5- Deve atualizar o telefone de um agendamento', async () => {
        const [result] = await connection.query(`UPDATE agenda SET contato_telefonico = ? WHERE nome_pessoa = ?`, ['999999999', 'Maria Silva']);
        expect(result.affectedRows).toBe(1);
    });

    test('6- Deve deletar um agendamento pelo nome', async () => {
        const [result] = await connection.query('DELETE FROM agenda WHERE nome_pessoa = ?', ['Carlos Gabriel']);
        expect(result.affectedRows).toBe(1);
    });

});
