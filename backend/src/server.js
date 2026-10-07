const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Selamat datang di API  Portofolio Dinamis!',
        version: '1.0.0'
    });
});

app.get('/api/status', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server dalam keadaan sehat dan aktif',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/biodata', (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            Nama: "Ima Khairunnisa",
            kelas: "XI RPL 1",
            cita_cita: "kaya",
            hobi: "nonton film"
        }
    });
});

const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experiencesRoutes = require('./routes/experiencesRoutes');

app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experiencesRoutes);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan!'
    });
});

app.listen(PORT, () => {
    console.log(`===========================`);
    console.log(`Server berjalan di: http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`===========================`);
});