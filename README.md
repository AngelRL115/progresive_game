<div align="center">
  <h1>🌌 Cosmic Idle: Progressive Game</h1>
  <p>An intricate and visually stunning sci-fi incremental game built with React, Vite, Express, and SQLite.</p>
  
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
    <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  </p>
</div>

---

> 🌍 **Bilingual README**  
> Scroll down for the Spanish version! | ¡Baja para ver la versión en español! 👇

---

## 🇺🇸 English Version

### 🚀 About the Game
**Cosmic Idle** is an expansive, sci-fi themed incremental/idle game where you manage universal energy and quantum structures. Start with a humble *Hyperion Core* and scale your production all the way to an *Omniverse Nexus*.

The game features deep progression systems, active abilities, a branching laboratory tech tree, permanent prestige layers, and even offline progress calculations.

### ✨ Features
*   **🏭 12 Unique Generators:** Purchase and upgrade sci-fi energy generators that scale exponentially.
*   **⚡ Active & Passive Upgrades:** Buy permanent multipliers or activate powerful temporary boosts (like *Galaxy Boost*).
*   **🏆 Infinite Milestones:** Reach specific level thresholds (10, 25, 50, 100, 200...) on your generators to unlock massive `x10` multipliers infinitely.
*   **🧬 The Cosmic Laboratory:** Activate **Research Mode** to sacrifice 50% of your raw energy production, converting it into permanent *Knowledge Fragments*. Use them to research infinite technologies that survive Prestige resets!
*   **🌌 Prestige System:** Reset your current progress to earn **Prestige Multipliers** based on your lifetime energy accumulation.
*   **💎 Quantum Perks:** Use rare Quantum Credits to buy game-breaking perks (cooldown reductions, laboratory discounts, etc.).
*   **💾 Local Persistence & Offline Progress:** Powered by a local SQLite database, your game saves automatically. When you return, the backend calculates your offline time and rewards you with the energy you generated while away!

### 🛠️ Tech Stack
*   **Frontend:** React (Vite), TypeScript, Zustand (State Management), Vanilla CSS (Neon Glassmorphism UI), Lucide-React (Icons).
*   **Backend:** Node.js, Express, better-sqlite3 (Local database).
*   **Communication:** RESTful APIs using standard `fetch`.

### 💻 Installation & Setup

To run this project locally, you will need two terminal windows to run both the frontend and the backend simultaneously.

**Prerequisites:** Node.js (v18+ recommended) and `npm` installed.

#### 1. Start the Backend
The backend manages the SQLite database and persists your save state.
```bash
cd backend
npm install
npm run dev
```
*The backend will run on `http://localhost:3000`.*

#### 2. Start the Frontend
The frontend runs the game logic and UI.
```bash
cd frontend
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`. Open this URL in your browser to play!*

---

## 🇪🇸 Versión en Español

### 🚀 Sobre el Juego
**Cosmic Idle** es un juego incremental/idle expansivo con temática de ciencia ficción donde gestionas energía universal y estructuras cuánticas. Comienza con un humilde *Hyperion Core* y escala tu producción hasta llegar al *Omniverse Nexus*.

El juego cuenta con sistemas de progresión profunda, habilidades activas, un árbol de tecnologías de laboratorio, capas de prestigio permanente e incluso progreso offline.

### ✨ Características
*   **🏭 12 Generadores Únicos:** Compra y mejora generadores de energía que escalan exponencialmente.
*   **⚡ Mejoras Activas y Pasivas:** Compra multiplicadores permanentes o activa potenciadores temporales (como el *Galaxy Boost*).
*   **🏆 Hitos (Milestones) Infinitos:** Alcanza niveles específicos (10, 25, 50, 100, 200...) en tus generadores para desbloquear multiplicadores masivos de `x10` sin límite.
*   **🧬 El Laboratorio Cósmico:** ¡Activa el **Modo de Investigación** para sacrificar el 50% de tu producción de energía y convertirla en *Knowledge Fragments* permanentes! Úsalos para investigar tecnologías infinitas que sobreviven a los reinicios de Prestigio.
*   **🌌 Sistema de Prestigio:** Reinicia tu progreso actual para ganar **Multiplicadores de Prestigio** basados en la energía acumulada en toda tu vida de juego.
*   **💎 Perks Cuánticos:** Usa Créditos Cuánticos para comprar ventajas que rompen el juego (reducción de enfriamiento, descuentos en el laboratorio, etc.).
*   **💾 Persistencia Local y Progreso Offline:** Gracias a una base de datos local (SQLite), tu partida se guarda automáticamente. Al volver, el backend calcula tu tiempo offline y te recompensa con la energía generada mientras no estabas.

### 🛠️ Tecnologías Utilizadas
*   **Frontend:** React (Vite), TypeScript, Zustand (Gestor de estado), Vanilla CSS (UI estilo Neon Glassmorphism), Lucide-React (Iconos).
*   **Backend:** Node.js, Express, better-sqlite3 (Base de datos local).
*   **Comunicación:** APIs RESTful mediante `fetch`.

### 💻 Instalación y Ejecución

Para ejecutar este proyecto localmente, necesitarás dos ventanas de terminal para correr el frontend y el backend al mismo tiempo.

**Requisitos previos:** Node.js (v18+ recomendado) y `npm` instalados.

#### 1. Iniciar el Backend
El backend gestiona la base de datos SQLite y guarda tu progreso.
```bash
cd backend
npm install
npm run dev
```
*El backend se ejecutará en `http://localhost:3000`.*

#### 2. Iniciar el Frontend
El frontend maneja la interfaz y la lógica principal del juego.
```bash
cd frontend
npm install
npm run dev
```
*El frontend se ejecutará en `http://localhost:5173`. ¡Abre esta URL en tu navegador para jugar!*

---
<div align="center">
  <p>Developed for the Universe 🚀</p>
</div>
