const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const compiler = require("compilex");

const app = express();

// Middleware'leri ekliyoruz
app.use(express.json());  // JSON veri almak için
app.use(express.urlencoded({ extended: true }));  // URLencoded veri almak için
app.use(express.static(path.join(__dirname)));


// Compiler'ı başlatıyoruz
const option = { stats: true };
compiler.init(option);

// Anasayfayı render ediyoruz
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Kodu derlemek için POST isteği alıyoruz
app.post("/compilecode", function(req, res) {
    const { code, lang, inputRadio, input } = req.body;

    if (lang === "C" || lang === "C++") {
        const envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
        
        if (inputRadio === "true") {
            // Input gerektiren C veya C++ kodu derleme
            compiler.compileCPPWithInput(envData, code, input, function(data) {
                if (data.error) {
                    res.status(400).send({ error: data.error });
                } else {
                    res.send({ output: data.output });
                }
            });
        } else {
            // Input gerektirmeyen C veya C++ kodu derleme
            compiler.compileCPP(envData, code, function(data) {
                if (data.error) {
                    res.status(400).send({ error: data.error });
                } else {
                    res.send({ output: data.output });
                }
            });
        }
    } else if (lang === "Python") {
        const envData = { OS: "windows", cmd: "python", options: { timeout: 10000 } };

        if (inputRadio === "true") {
            // Input gerektiren Python kodu derleme
            compiler.compilePythonWithInput(envData, code, input, function(data) {
                if (data.error) {
                    res.status(400).send({ error: data.error });
                } else {
                    res.send({ output: data.output });
                }
            });
        } else {
            // Input gerektirmeyen Python kodu derleme
            compiler.compilePython(envData, code, function(data) {
                if (data.error) {
                    res.status(400).send({ error: data.error });
                } else {
                    res.send({ output: data.output });
                }
            });
        }
    } else {
        res.status(400).send({ error: "Desteklenmeyen dil" });
    }
});

// Compiler'ın durumunu almak için route
app.get("/fullstat", function(req, res) {
    compiler.fullStat(function(data) {
        res.send(data);
    });
});

// Sunucuyu başlatıyoruz
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});

// Derleme işlemi sonrası geçici dosyaları temizliyoruz
compiler.flush(function() {
    console.log("Tüm geçici dosyalar temizlendi!");
});
