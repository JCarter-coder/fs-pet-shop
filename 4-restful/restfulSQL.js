import express from 'express';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    user: 'jessecarter',
    host: 'localhost',
    database: 'pet_shop',
    port: '5432'
});

const PORT = 8000;

const app = express();

app.get('/pets', async (req, res) => {
    const result = await pool.query(
        'SELECT * FROM pets'
    );
    res.send(result.rows);
});

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT: ${PORT}`)
})