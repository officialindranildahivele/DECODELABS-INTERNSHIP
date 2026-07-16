const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies.
app.use(express.json());

// Enable cross-origin requests for frontend clients.
app.use(cors());

// Root endpoint for health check.
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend API Running' });
});

// Mount user routes.
app.use('/users', userRoutes);

// Return a JSON 404 for unknown routes.
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware.
app.use(errorMiddleware);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
