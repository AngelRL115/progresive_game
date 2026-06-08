import express from 'express';
import cors from 'cors';
import { getSaveState, saveGameState } from './db';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Endpoint to fetch the latest save game state
app.get('/api/save', (req, res) => {
  try {
    const state = getSaveState();
    if (state) {
      res.json({ success: true, state });
    } else {
      res.json({ success: true, state: null });
    }
  } catch (error) {
    console.error('Error fetching save:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch save' });
  }
});

// Endpoint to save the game state
app.post('/api/save', (req, res) => {
  try {
    const { state } = req.body;
    if (!state) {
      return res.status(400).json({ success: false, error: 'No state provided' });
    }
    
    saveGameState(state);
    res.json({ success: true, message: 'Game saved successfully' });
  } catch (error) {
    console.error('Error saving game:', error);
    res.status(500).json({ success: false, error: 'Failed to save game' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
