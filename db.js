const mongoose = require('mongoose');

// URL de conexión a la base de datos MongoDB
const dbUrl = 'mongodb+srv://admin:Admin123@tonyapi.xuv2gje.mongodb.net/Node-API?retryWrites=true&w=majority';

// Establecer la conexión con la base de datos
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });