const express = require('express');
const cors = require('cors');
require('dotenv').config();
const seed = require('./seed/mockBD');

const app = express();
const PORT = process.env.PORT;

const userRoutes = require('./routes/usuario');
const sequelize = require('./data/database');

app.use(cors(
    {origin: 'http://localhost:5173',
    credentials: true,
    }
));

app.use(express.json());

//rutas
app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

sequelize.sync().then(() => {
    console.log('Database synchronized');
    seed.mockBd();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
    );
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
}
);
