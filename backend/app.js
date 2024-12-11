const express = require('express');
const userRoutes = require('./routes/user.route');
const equipmentRoutes = require('./routes/equipment.route');
const categoryRoutes = require('./routes/category.route');
const uploadRoutes = require('./routes/upload.route');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    'origin': '*'
}))

app.use('/user', userRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/category', categoryRoutes);
app.use('/upload', uploadRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
