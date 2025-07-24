const User = require('../models/usuarioModel')
const bcrypt = require('bcryptjs');

exports.mockBd = async () => {
    const c = await User.count()

    try {
        if (c === 0) {
            const usersData = [
                { userName: 'admin', password: 'admin123', name: 'Admin', surname: 'User', email: 'adminLoco12@example.com' },
                { userName: 'IgnaSamo', password: '123456', name: 'Ignacio', surname: 'Samocachan', email: 'ignasamo2@gmail.com' },
                { userName: 'MariaLopez', password: 'maria2024', name: 'Maria', surname: 'Lopez', email: 'maria.lopez@example.com' },
                { userName: 'JuanPerez', password: 'juanpass', name: 'Juan', surname: 'Perez', email: 'juan.perez@example.com' },
                { userName: 'CamilaFernandez', password: 'camilaF!', name: 'Camila', surname: 'Fernandez', email: 'camila.fernandez@example.com' }
            ]

            const salt = await bcrypt.genSalt(10);
            const userPswHash = await Promise.all(
                usersData.map(async (user) =>{
                    const hashedPassword = await bcrypt.hash(user.password, salt);
                
                return {
                    ...user,
                    userName: user.userName.toLowerCase(),
                    password: hashedPassword
                }
                })
            );
            await User.bulkCreate(userPswHash);

            console.log('Mock database created successfully');}
    } catch (error) {
        console.error('Error creating mock database:', error);
    }
}