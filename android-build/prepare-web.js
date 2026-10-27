// Копіює файли застосунку з кореня репозиторію в папку www, яку Capacitor пакує в APK
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const www = path.join(__dirname, "www");
const files = ["index.html", "manifest.webmanifest", "sw.js", "icons"];

fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www);
for (const f of files) fs.cpSync(path.join(root, f), path.join(www, f), { recursive: true });
console.log("Скопійовано у www:", files.join(", "));
