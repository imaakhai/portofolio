const profileModel = require('../models/profileModel');

//controller mengambil data proofile
const getProfile = async (req, res) => {
    try {
        const profile = await profileModel.getProfile();

        //jika data propil blm ada di db
        if (!profile) {
            return res.status(404).json({
                success: false, 
                message: 'Data profile belum tersedia.'
            });
        }

        res.status (200).json({
            success: true,
            message: 'Berhasil mengambil data profile.',
            data: profile
        });
    } catch (error) {
        console.error('Error getProfile:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

// cntrlr memperbarui data
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // validasi sederhana
       if (!data.name || !data.role) {
        return res.status(400).json({
            success: false,
            message: 'Kolom "name" dan "role" wajib diisi!'
        });
       }

       const result = await profileModel.updateProfile(id, data);

       // cek apakah ada baris yg terupdate
       if (result.affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: 'Profile dengan ID ${id} tidak ditemukan.'
        });
       }

       res.status(200).json({
        success: true,
        message: 'Data profil berhasil diperbarui.'
       })
    } catch (error) {
        console.error('Error updateProfile:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

module.exports = {
    getProfile,
    updateProfile
};