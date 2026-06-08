const API_URL = 'http://localhost:3001/api';

export const saveGameState = async (state: any) => {
  try {
    const response = await fetch(`${API_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state }),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to save game state:', error);
    return { success: false };
  }
};

export const loadGameState = async () => {
  try {
    const response = await fetch(`${API_URL}/save`);
    const data = await response.json();
    if (data.success && data.state) {
      return data.state;
    }
    return null;
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
};
