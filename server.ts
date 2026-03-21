import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Interface for ATM data
interface ATM {
    name: string;
    address: string;
    zip_code: string;
    lat: number;
    lng: number;
}

// Endpoint to provide Google Maps API Key
app.get('/api/config', (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Google Maps API key not configured on server' });
    }
    res.json({ apiKey });
});

// Endpoint to get ATMs by zip code
app.get('/api/atms', async (req, res) => {
    const zipCode = req.query.zip_code as string;
    
    if (!zipCode) {
        return res.status(400).json({ error: 'zip_code query parameter is required' });
    }

    try {
        const dataPath = path.join(__dirname, 'data.json');
        const fileContent = await fs.readFile(dataPath, 'utf-8');
        const atms: ATM[] = JSON.parse(fileContent);

        const filteredAtms = atms.filter(atm => atm.zip_code === zipCode);
        res.json(filteredAtms);
    } catch (error) {
        console.error('Error reading data.json:', error);
        res.status(500).json({ error: 'Failed to read ATM data' });
    }
});

// Fallback to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
