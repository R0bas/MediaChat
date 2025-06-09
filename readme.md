# 🎉 MediaChat 

Welcome to **MediaChat**, the app to send texts, images, videos, and audio directly to your friends' screens using Discord commands!

Inspired by the **CCB**, a collective of French streamers, MediaChat allows you to display images accompanied by text directly on your friends' screens. And for an even more fun experience, use it with [**Transparent Overlay**](https://github.com/ProbablyClem/transparent-overlay/releases) !

---

## 🚀 Features

- 🎤 **Send audio**
- 🎥 **Send video**
- 🎥 **Send images**
- 💬 **Send text** 
- 🖼️ **See who's up**

---

## ⚡ Installation

1. **clone it** :
    ```bash
    git clone https://github.com/R0bas/MediaChat
    ```
2. **go into folder** :
    ```bash
    cd MediaChat
    ```
3. ** Environnements variables** : 
    - Create a `.env` file in the root directory
    You will need to add the following variables:
    ```bash
        DISCORD_TOKEN=YOUR_DISCORD_TOKEN
        DISCORD_CLIENT_ID=YOUR_DISCORD_CLIENT_ID
        DISCORD_GUILD_ID=YOUR_DISCORD_GUILD_ID
        COBALT_URL=http://cobalt-api:9000/
        BACKEND_URL=http://localhost:3000
    ```
    - You can get your **DISCORD_TOKEN** by creating a bot on the [Discord Developer Portal](https://discord.com/developers/applications).
    - You can get your **DISCORD_CLIENT_ID** and **DISCORD_GUILD_ID** via the Discord App (right click on the Bot and on the Server to get the ID)
4. **use docker** :
    ```bash
    docker-compose up -d --build
    ```
---


## 🛠️ Technologies

- 🎨 **Frontend** : Vue + TailwindCSS.
- ⚙️ **Backend** : Node.js + Express.
- 🌐 **WebSocket** : Socket.IO
- 🐳 **Containerisation** : Docker.
- 🎮 **Discord.js**: Generating Discord commands 

---

## 🤩 Join the Adventure

Want to contribute your magic touch? We love it! Here's how you can get involved :

1. **Fork the project**.
2. **Create a funky branch**:
    ```bash
    git checkout -b feature/awesome-idea
    ```
3. **Add your personal touch**:
    ```bash
    git commit -m "Added an amazing feature"
    ```
4. **Share your masterpiece**:
    ```bash
    git push origin feature/awesome-idea
    ```
5. **Submit a Pull Request** and become a MediaChat legend!

---

## 📜 Licence

This project is licensed under the [MIT License](LICENSE).

---
