const app = require('./app');
const PORT = process.env.PORT;

const cors = require('cors');
app.use(cors());

require('./config/database');




const servers = app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});


process.on('uncaughtException', (err) => {
  console.error(`Error: ${err.message}`);
  console.error('Shutting down server due to uncaught exception');
  servers.close(() => process.exit(1));
});


process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  console.error('Shutting down server due to unhandled rejection');
  servers.close(() => process.exit(1));
});

