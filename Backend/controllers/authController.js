const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');


exports.login = async (req, res) => {
    const {userName, password } = req.body;

    if (!userName || !password ) {
        return res.status(401).json({msg:'Please enter your credentials'})
    }

    try {
        const user = await User.findOne({ where: { userName } });

        if (!user) {
            return res.status(401).json({msg: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({msg: 'Invalid credentials'});
        }

        const payload = {
            user: {
                id: user.idUser
            }
        };
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h'},
            (error, token) => {
                if (error) throw error;
                res.json({ token});
                }
        
        );

        res.json({ token, user });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({msg: 'Server error'});
    }

};
exports.register = async (req, res) =>  {

    const {userName,name,surname,password,email} = req.body
    
    if (!userName || !name || !surname || !password || !email) {
        return res.status(400).json({msg:'Please fill all fields'})
    }

    try {
        const existingUser = await User.findOne({ where: { userName } });

        if (existingUser) {
            return res.status(400).json({msg: 'Username already exists'});
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
            return res.status(400).json({msg: 'Username or email already exists'});
        }

        res.status(500).json({msg: 'Server error'});
    }
};
