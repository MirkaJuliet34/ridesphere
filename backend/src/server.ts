import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
