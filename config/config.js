module.exports = {
    port: process.env.port || 3000,
    url: process.env.url || "http://localhost:3000",
    role: process.env.role || false,
    clientId: process.env.clientId,
    guildId: process.env.guildId,
    token: process.env.token,
    sourceName: process.env.sourceName || "mediachat",
    corsOptions: 
    {
        origin: "*",
        methods: ["GET", "POST"],
    },
    fileLimit : "100mb",
    publicFolder : "public",
}