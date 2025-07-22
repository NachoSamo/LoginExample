const User = require('../models/usuarioModel')

exports.mockBd = async () => {
    const c = await User.count()

    try {
        if (c === 0) {
            await User.bulkCreate([
                {
                    idUser: 1,
                    userName: 'IgnaSamo',
                    password: '123456',
                    name: 'Ignacio',
                    surname: 'Samocachan',
                    email: 'ignasamo2@gmail.com'
                },
                {
                    idUser: 2,
                    userName: 'MariaLopez',
                    password: 'maria2024',
                    name: 'Maria',
                    surname: 'Lopez',
                    email: 'maria.lopez@example.com'
                },
                {
                    idUser: 3,
                    userName: 'JuanPerez',
                    password: 'juanpass',
                    name: 'Juan',
                    surname: 'Perez',
                    email: 'juan.perez@example.com'
                },
                {
                    idUser: 4,
                    userName: 'SofiaMartinez',
                    password: 'sofiaM123',
                    name: 'Sofia',
                    surname: 'Martinez',
                    email: 'sofia.martinez@example.com'
                },
                {
                    idUser: 5,
                    userName: 'CarlosGomez',
                    password: 'carlosgomez!',
                    name: 'Carlos',
                    surname: 'Gomez',
                    email: 'carlos.gomez@example.com'
                },
                {
                    idUser: 6,
                    userName: 'AnaTorres',
                    password: 'anaT2024',
                    name: 'Ana',
                    surname: 'Torres',
                    email: 'ana.torres@example.com'
                },
                {
                    idUser: 7,
                    userName: 'LuisRamirez',
                    password: 'luisRpass',
                    name: 'Luis',
                    surname: 'Ramirez',
                    email: 'luis.ramirez@example.com'
                },
                {
                    idUser: 8,
                    userName: 'ValentinaDiaz',
                    password: 'valenDiaz1',
                    name: 'Valentina',
                    surname: 'Diaz',
                    email: 'valentina.diaz@example.com'
                },
                {
                    idUser: 9,
                    userName: 'PedroAlvarez',
                    password: 'pedroAlv2024',
                    name: 'Pedro',
                    surname: 'Alvarez',
                    email: 'pedro.alvarez@example.com'
                },
                {
                    idUser: 10,
                    userName: 'CamilaFernandez',
                    password: 'camilaF!',
                    name: 'Camila',
                    surname: 'Fernandez',
                    email: 'camila.fernandez@example.com'
                },
                {
                    idUser: 11,
                    userName: 'DiegoSanchez',
                    password: 'diegoS2024',
                    name: 'Diego',
                    surname: 'Sanchez',
                    email: 'diego.sanchez@example.com'
                }
            ])
            console.log('Mock database created successfully');}
    } catch (error) {
        console.error('Error creating mock database:', error);
    }
}