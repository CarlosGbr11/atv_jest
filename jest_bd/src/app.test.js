const { getUserById, connection} = require('./db');

describe('Testes para getUserById', () => {
    beforeAll(async () => {

        await connection.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))');
        await connection.query("INSERT INTO users (name, email) VALUES ('Marcos Vinicius', 'marcos@mail.com')");
        await connection.query("INSERT INTO users (name, email) VALUES ('Marcos', 'mcs@mail.com')");
    });

    test('1- deve retornar o usuario correto pelo ID', async () => {
        const user = await getUserById(1);
        expect(user).toHaveProperty('name', 'Marcos Vinicius');
        expect(user).toHaveProperty('email', 'marcos@mail.com');
    });

    test('2- Vai retornaar undefined se o usuario não existir', async () => {
        const user = await getUserById(999);
        expect(user).toBeUndefined();
    })
    test('3- Verifica se parte do nome está presente', async () => {
        const user = await getUserById(1);
        expect(user.name).toMatch(/Mar/);
    })
    test('4- Vai verificar o número máximo de caracteres no campo do email', async () => {
        const user = await getUserById(1);
        expect(user.email.length).toBeLessThanOrEqual(50);
    })    
    test('5- Vai garantir que o campo do email não seja null ou undefined', async () => {
        const user = await getUserById(1);
        expect(user.email).not.toBeNull();
        expect(user.email).not.toBeUndefined();
    })
    test('6- Vai garantir que o email está em um formato válido', async () => {
        const user = await getUserById(1);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(user.email).toMatch(emailRegex);
    });
})