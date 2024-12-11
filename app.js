const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const agendaRoutes = require('./routes/agenda');

//inicializar la app
const app = express();
const PORT = 3000;
// Middleware
app.use(bodyParser.json());
// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/contactos', {
  
})
.then(() => console.log('Conexión a MongoDB exitosa'))
.catch(err => console.error('Error al conectar a MongoDB:', err));
// Rutas
app.use('/api/agenda', agendaRoutes);
// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
