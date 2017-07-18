module.exports = {
    development: {
        username: 'root',
        password: 'root',
        database: 'Medical_DB',
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: console.log,
        seederStorage: 'sequelize',
    },
    production: {
        use_env_variable: 'JAWSDB_URL',
        dialect: 'mysql',
        logging: false,
        seederStorage: 'sequelize',
    },
};
