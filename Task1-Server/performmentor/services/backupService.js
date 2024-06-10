const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class BackupService {
    constructor(pgDumpPath, pgRestorePath) {
        this.pgDumpPath = pgDumpPath;
        this.pgRestorePath = pgRestorePath;
    }

    async createBackup(databaseName, backupDirectory) {
        try {
            if (!fs.existsSync(backupDirectory)) {
                fs.mkdirSync(backupDirectory, { recursive: true });
            }

            const fileName = `backup_${Date.now()}.tar`;
            const filePath = path.join(backupDirectory, fileName);

            const pgDumpProcess = spawn(this.pgDumpPath, [
                '-U', 'postgres',
                '-d', databaseName,
                '-h', 'localhost',
                '-p', '5432',
                '-F', 't',
                '-f', filePath
            ]);

            return new Promise((resolve, reject) => {
                pgDumpProcess.on('exit', (code) => {
                    if (code === 0) {
                        console.log("Backup created");
                        resolve(filePath);
                    } else {
                        console.error('pg_dump process exited with non-zero code:', code);
                        reject(new Error('Backup creation failed'));
                    }
                });
            });
        } catch (error) {
            console.error('Error creating database backup:', error);
            throw new Error('Backup creation failed');
        }
    }

    async restoreBackup(databaseName, backupFilePath) {
        try {
            if (!fs.existsSync(backupFilePath)) {
                throw new Error('Backup file does not exist');
            }

            const pgRestoreProcess = spawn(this.pgRestorePath, [
                '-U', 'postgres',
                '-d', databaseName,
                '-h', 'localhost',
                '-p', '5432',
                '-c', // Clean (drop) database objects before recreating them
                '-F', 't',
                '-f', backupFilePath
            ]);

            return new Promise((resolve, reject) => {
                pgRestoreProcess.on('exit', (code) => {
                    if (code === 0) {
                        console.log("Backup restored");
                        resolve('Backup restored successfully');
                    } else {
                        console.error('pg_restore process exited with non-zero code:', code);
                        reject(new Error('Backup restoration failed'));
                    }
                });
            });
        } catch (error) {
            console.error('Error restoring database backup:', error);
            throw new Error('Backup restoration failed');
        }
    }
}

module.exports = BackupService;



/*const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class BackupService {
    constructor(pgDumpPath) {
        this.pgDumpPath = pgDumpPath;
    }

    async createBackup(databaseName, backupDirectory) {
        try {
            if (!fs.existsSync(backupDirectory)) {
                fs.mkdirSync(backupDirectory, { recursive: true });
            }

            const fileName = `backup_${Date.now()}.sql`;
            const filePath = path.join(backupDirectory, fileName);

            const pgDumpProcess = spawn(this.pgDumpPath, [
                '-U', 'postgres',
                '-d', databaseName,
                '-h', 'localhost',
                '-p', '5432',
                '-f', filePath,
                '-F', 't'
            ]);

            return new Promise((resolve, reject) => {
                pgDumpProcess.on('exit', (code) => {
                    if (code === 0) {
                        console.log("Backup created");
                        resolve(filePath);
                    } else {
                        console.error('pg_dump process exited with non-zero code:', code);
                        reject(new Error('Backup creation failed'));
                    }
                });
            });
        } catch (error) {
            console.error('Error creating database backup:', error);
            throw new Error('Backup creation failed');
        }
    }
}

module.exports = BackupService;
*/