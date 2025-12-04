# 💻 Node.js Online Code Compiler

![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green)
![Library](https://img.shields.io/badge/Core-Compilex-blue)
![Frontend](https://img.shields.io/badge/Frontend-Ace%20Editor-orange)

Bu proje, geliştiricilerin tarayıcı üzerinden C, C++ ve Python kodlarını yazıp derleyebilecekleri, Node.js tabanlı full-stack bir online derleyicidir. Arka planda **Microsoft Windows** ortamı için yapılandırılmış yerel derleyicileri kullanarak kodu işler ve çıktıyı anlık olarak arayüze döndürür.

## Mimari ve Çalışma Mantığı

Proje **Client-Server (İstemci-Sunucu)** mimarisi üzerine kurulmuştur:

1.  **Frontend:** Kullanıcı `Ace Editor` arayüzünde kodu yazar. Seçilen dil ve kod, JSON formatında sunucuya `POST` edilir.
2.  **Backend (API):** Express.js sunucusu isteği karşılar.
3.  **Derleme (Compilation):** `compilex` kütüphanesi, sunucuda kurulu olan yerel derleyicileri (MinGW/GCC veya Python) tetikler.
4.  **Execution:** Kod sunucu tarafında izole bir işlem olarak çalıştırılır.
5.  **Response:** Oluşan çıktı (Output) veya hata mesajı (Error) yakalanıp frontend'e geri gönderilir.

## Özellikler

* **Çoklu Dil Desteği:** C, C++ ve Python dilleri.
* **Gelişmiş Editör:** Ace Editor entegrasyonu ile syntax highlighting (sözdizimi vurgulama) ve tema seçenekleri (Monokai, GitHub, Dracula vb.).
* **Input Desteği:** Kullanıcıdan veri girişi (`scanf`, `input()`) bekleyen kodlar için özel girdi alanı.
* **RESTful API:** Derleme işlemleri `/compilecode` endpoint'i üzerinden yönetilir.

## Kullanılan Teknolojiler

* **Backend:** Node.js, Express.js
* **Core Library:** [Compilex](https://www.npmjs.com/package/compilex) (Derleme işlemleri için)
* **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
* **Editör:** Ace.js CDN
* **Body Parser:** Gelen JSON verilerini işlemek için.

## Kurulum ve Çalıştırma (Gereksinimler)

Bu projenin çalışması için bilgisayarınızda derleyicilerin kurulu olması şarttır.

* **Node.js:** Yüklü olmalıdır.
* **C/C++ İçin:** [MinGW](https://osdn.net/projects/mingw/) (GCC/G++) kurulu olmalı ve Sistem Ortam Değişkenleri'ne (Path) eklenmiş olmalıdır.
* **Python İçin:** Python yüklü olmalı ve Path'e eklenmiş olmalıdır.
