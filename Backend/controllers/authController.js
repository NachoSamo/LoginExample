const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarioModel');
const { sendPasswordResetEmail } = require('../services/emailService');
const crypto = require('crypto');
const { Sequelize, DataTypes, Op } = require('sequelize');


exports.login = async (req, res) => {
    let { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(401).json({ msg: 'Please enter your credentials' })
    }

    try {
        userName = userName.toLowerCase()
        const user = await User.findOne({ where: { userName } });

        if (!user) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.idUser
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: user.get({ plain: true }) });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ msg: 'Server error' });
    }

};
exports.register = async (req, res) => {

    let { userName, name, surname, password, email } = req.body

    if (!userName || !name || !surname || !password || !email) {
        return res.status(400).json({ msg: 'Please fill all fields' })
    }

    try {
        userName = userName.toLowerCase();
        const existingUser = await User.findOne({ where: { userName } });

        if (existingUser) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            userName,
            name,
            surname,
            password: hashedPassword,
            email
        });

        const token = jwt.sign({ user: { id: newUser.idUser } }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser });


    } catch (error) {
        console.error('Error during registration:', error);

        if (error.number === 2627 || error.number === 2601) {
            return res.status(400).json({ msg: 'Username or email already exists' });
        }

        res.status(500).json({ msg: 'Server error' });
    }
};


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'Please provide your email' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('User not found for password reset: ${email}');
            return res.status(404).json({ msg: 'If the mail is in the dataBase, you will recibe an email' });
        }
        

        const resetCode = crypto.randomInt(100000, 999999).toString();
        user.resetPasswordCode = resetCode;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration

        await user.save();

        //enviar el correo electrónico con el código de restablecimiento
        const emailSent = await sendPasswordResetEmail(user.email, resetCode);
        if (!emailSent) {
            return res.status(500).json({ msg: 'Failed to send reset email, try it late' });
        }
        res.status(200).json({ msg: 'Password reset email sent, if the email is register' });

    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
        return res.status(400).json({ msg: 'Please provide all fields' });
    }

    try {
        const user = await User.findOne({ where:{
            email,
            resetPasswordCode: code,
            resetPasswordExpires: { [Sequelize.Op.gt]: Date.now() } 


        } 
    });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired reset code' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordCode = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({ msg: 'Password has been reset successfully' });
        

    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ msg: 'Server error' });
    }
}
