// Ставить іконку й заставку застосунку замість стандартного логотипа Capacitor
const fs = require("fs");
const path = require("path");

const res = path.join(__dirname, "android/app/src/main/res");
const icon = path.join(__dirname, "..", "icons", "icon-192.png");

// Іконка на головному екрані. Адаптивні іконки (mipmap-anydpi-v26) посилаються
// на стандартний логотип, тому прибираємо їх і лишаємо звичайні PNG
fs.rmSync(path.join(res, "mipmap-anydpi-v26"), { recursive: true, force: true });
for (const dir of fs.readdirSync(res).filter(d => d.startsWith("mipmap-"))) {
  for (const name of ["ic_launcher.png", "ic_launcher_round.png", "ic_launcher_foreground.png"]) {
    const target = path.join(res, dir, name);
    if (fs.existsSync(target)) fs.copyFileSync(icon, target);
  }
}

// Заставка під час запуску: фон застосунку з іконкою по центру
for (const dir of fs.readdirSync(res).filter(d => d.startsWith("drawable"))) {
  fs.rmSync(path.join(res, dir, "splash.png"), { force: true });
}
fs.copyFileSync(icon, path.join(res, "drawable", "splash_icon.png"));
fs.writeFileSync(path.join(res, "drawable", "splash.xml"), `<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item><color android:color="#F2F4EF" /></item>
    <item android:gravity="center" android:width="160dp" android:height="160dp" android:drawable="@drawable/splash_icon" />
</layer-list>
`);
console.log("Іконку й заставку оновлено");
