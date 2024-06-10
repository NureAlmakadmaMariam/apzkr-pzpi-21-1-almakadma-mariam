//backupController
const path = require('path');
const BackupService = require('../services/backupService');

const pgDumpPath = "C:\\Program Files\\PostgreSQL\\16\\bin\\pg_dump.exe";
const pgRestorePath = "C:\\Program Files\\PostgreSQL\\16\\bin\\pg_restore.exe";
const backupService = new BackupService(pgDumpPath, pgRestorePath);

exports.createBackup = async (req, res) => {
    try {
        const backupDirectory = path.join(__dirname, '..', '..', 'backups');
        const filePath = await backupService.createBackup('PerformMentor', backupDirectory);
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error creating database backup:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.restoreBackup = async (req, res) => {
    try {
        const { backupFilePath } = req.body;
        await backupService.restoreBackup('PerformMentor', backupFilePath);
        res.json({ success: true, message: 'Backup restored successfully' });
    } catch (error) {
        console.error('Error restoring database backup:', error);
        res.status(500).send('Internal Server Error');
    }
};