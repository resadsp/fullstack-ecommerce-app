# 🛒 E-Commerce Fullstack Application

Potpuna web aplikacija razvijena kao odgovor na Junior Fullstack Developer zadatak. Aplikacija uključuje React frontend i FastAPI backend koji komunicira sa eksternim API-jem.

## 📋 Zadatak Specifikacije

Ovaj projekat je razvijen prema sledećim zahtevima:

### 🎯 **Cilj Zadatka**
Razviti potpunu web aplikaciju koja uključuje frontend i sopstveni backend API. Backend služi kao posrednik za obradu podataka dobijenih od eksternog API-ja, dok je frontend zadužen za korisnički interfejs i autentifikaciju.

### 🔗 **Eksterni API Konfiguracija**
- **Base URL:** `https://zadatak.konovo.rs/`
- **Test kredencijali:**
  - Username: `zadatak`
  - Password: `zadatak`

### 📡 **API Endpoints**
- **POST /login** - Prima JSON username/password, vraća JWT token
- **GET /products** - Zahteva Authorization Bearer, vraća JSON niz proizvoda

## ✅ Implementirane Funkcionalnosti

### 🔧 **Backend Implementacija**

#### **Autentifikacija:**
- ✅ Sopstveni backend API koji komunicira sa eksternim API-jem
- ✅ JWT token handling i validacija
- ✅ Secure login/logout funkcionalnost

#### **Obrada Proizvoda:**
- ✅ **Dohvatanje proizvoda** sa eksternog API-ja
- ✅ **Cena Monitora +10%** - Automatsko uvećanje cene za kategoriju "Monitori"
- ✅ **Zamena teksta** - "brzina" → "performanse" (case-insensitive)
- ✅ **Filtriranje po kategoriji** - `GET /api/products?category=Electronics`
- ✅ **Pretraga po tekstu** - `GET /api/products?search=laptop`
- ✅ **Pojedinačni proizvod** - `GET /api/products/{id}` sa 404 handling

### 🎨 **Frontend Implementacija**

#### **Autentifikacija:**
- ✅ Login forma koja komunicira sa backend API-jem
- ✅ JWT token čuvanje u localStorage
- ✅ Automatsko preusmeravanje nakon login-a
- ✅ Jasne poruke o grešci za neuspešnu prijavu

#### **Prikaz Proizvoda:**
- ✅ JWT token validacija pre pristupa
- ✅ Dinamički prikaz liste proizvoda
- ✅ Authorization header sa JWT tokenom
- ✅ Logout funkcionalnost

#### **Interaktivno Filtriranje i Pretraga:**
- ✅ **Dropdown filtriranje po kategoriji** - Dinamički dropdown sa svim dostupnim kategorijama
- ✅ **Real-time pretraga** - Pretraga po nazivu i opisu proizvoda u realnom vremenu
- ✅ **Kombinovano filtriranje** - Mogućnost kombinovanja kategorije i pretrage
- ✅ **Brojač rezultata** - Prikaz broja pronađenih proizvoda
- ✅ **Reset filtara** - Mogućnost brisanja svih filtara

#### **Detalji Proizvoda:**
- ✅ **Pojedinačni prikaz proizvoda** - Klik na proizvod otvara detaljnu stranicu
- ✅ **Navigacija nazad** - Povratak na listu proizvoda
- ✅ **404 handling** - Elegantno rukovanje nepostojećim proizvodima
- ✅ **Responsive dizajn** - Optimizovano za sve veličine ekrana

### 🚀 **Naprednije Funkcionalnosti (Dodatni Poeni)**
- ✅ **Filtriranje po kategoriji** - Dropdown sa kategorijama
- ✅ **Pretraga po nazivu** - Real-time search
- ✅ **Detalji proizvoda** - Klik na proizvod za detalje
- ✅ **Robusno error handling** - Comprehensive error management
- ✅ **Moderni UI/UX** - Responsive design sa hover efektima
- ✅ **Loading states** - Indikatori učitavanja za bolje korisničko iskustvo
- ✅ **Fallback slike** - Automatski fallback za neispravne URL-ove slika

## 🛠️ Tehnologije

### Backend
- **FastAPI** - Python web framework
- **Uvicorn** - ASGI server
- **PyJWT** - JSON Web Tokens
- **Pydantic** - Data validation
- **Python-dotenv** - Environment variables
- **Requests** - HTTP library za eksterni API

### Frontend
- **React** - JavaScript library (prednost ispunjena!)
- **React Router** - Client-side routing
- **CSS3** - Modern styling sa gradijentima
- **Fetch API** - HTTP requests

## 📁 Struktura Projekta

```
fullstack-ecommerce-app/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   │   └── auth.py
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   └── products.py
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── product_service.py
│   │   │   └── external_api.py
│   │   └── main.py
│   ├── venv/
│   ├── run.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js & Login.css
│   │   │   ├── Products.js & Products.css
│   │   │   └── ProductDetail.js & ProductDetail.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Pokretanje Aplikacije

### Preduslovi
- Python 3.8+
- Node.js 14+
- npm ili yarn

### Backend Setup

1. **Kloniraj repo:**
```bash
git clone https://github.com/resadsp/fullstack-ecommerce-app.git
cd fullstack-ecommerce-app/backend
```

2. **Kreiraj virtual environment:**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

3. **Instaliraj dependencies:**
```bash
pip install -r requirements.txt
```

4. **Pokreni backend:**
```bash
python run.py
```

Backend će biti dostupan na: `http://127.0.0.1:8000`

### Frontend Setup

1. **Idi u frontend folder:**
```bash
cd ../frontend
```

2. **Instaliraj dependencies:**
```bash
npm install
```

3. **Pokreni frontend:**
```bash
npm start
```

Frontend će biti dostupan na: `http://localhost:3000`

## 🔑 Test Podaci
- **Username:** `zadatak`
- **Password:** `zadatak`

## 📚 API Dokumentacija

Kada je backend pokrenut, API dokumentacija je dostupna na:
- **Swagger UI:** `http://127.0.0.1:8000/docs`
- **ReDoc:** `http://127.0.0.1:8000/redoc`

## 🔗 Sopstveni API Endpoints

### Autentifikacija
- `POST /api/login` - Login korisnika (komunicira sa eksternim API-jem)
- `POST /api/logout` - Logout korisnika

### Proizvodi
- `GET /api/products` - Lista svih obrađenih proizvoda
- `GET /api/products/{id}` - Detalji specifičnog proizvoda
- `GET /api/products?category=Electronics` - Filter po kategoriji
- `GET /api/products?search=laptop` - Pretraga proizvoda
- `GET /api/products?category=Electronics&search=laptop` - Kombinovano filtriranje

## 🎮 Frontend Funkcionalnosti

### 🔍 **Napredna Pretraga i Filtriranje**
- **Kategorije:** Dropdown meni sa svim dostupnim kategorijama proizvoda
- **Pretraga:** Real-time pretraga kroz naziv i opis proizvoda
- **Kombinovano:** Mogućnost kombinovanja kategorije i pretrage
- **Brojač:** Prikaz broja pronađenih rezultata
- **Reset:** Mogućnost brisanja svih filtara odjednom

### 📱 **Korisničko Iskustvo**
- **Responsive dizajn:** Optimizovano za desktop, tablet i mobilne uređaje
- **Loading indikatori:** Jasni indikatori tokom učitavanja podataka
- **Error handling:** Elegantno rukovanje greškama sa mogućnostima oporavka od istih
- **Hover efekti:** Interaktivni elementi sa smooth animacijama
- **Intuitivna navigacija:** Jasna navigacija između stranica

### 🖼️ **Prikaz Proizvoda**
- **Grid layout:** Responzivni grid sa automatskim prilagođavanjem
- **Kvalitetne slike:** Optimizovane slike sa fallback opcijama
- **Detaljan prikaz:** Klik na proizvod otvara detaljnu stranicu
- **Brza navigacija:** Jednostavan povratak na listu proizvoda

## 🔄 Obrada Podataka

### Automatske Transformacije:
1. **Cena Monitora:** Uvećava se za 10%
2. **Zamena Teksta:** "brzina" → "performanse" (case-insensitive)
3. **Filtriranje:** Po kategoriji i pretraga po tekstu
4. **Validacija:** 404 za nepostojeće proizvode

## 🎨 UI/UX Karakteristike

- **Moderni dizajn** sa gradijentima i animacijama
- **Responsive layout** za sve uređaje
- **Hover efekti** na kartice proizvoda
- **Loading states** i error handling
- **Intuitivna navigacija** sa jasnim CTA dugmićima
- **Consistent branding** kroz celu aplikaciju
- **Accessibility features** za bolje korisničko iskustvo

## 🛡️ Sigurnost

- JWT tokeni za autentifikaciju
- CORS konfiguracija
- Input validacija sa Pydantic
- Secure token storage u localStorage
- Error handling bez otkrivanja sensitive podataka

## 🎯 Zadatak Status

### ✅ Osnovni Zahtevi - ISPUNJENO
- Backend API sa obradom podataka
- Frontend sa autentifikacijom
- Komunikacija sa eksternim API-jem
- JWT token handling

### ✅ Naprednije Funkcionalnosti - ISPUNJENO
- Filtriranje po kategoriji
- Pretraga po nazivu
- Detalji proizvoda
- Robusno error handling
- Poboljšani UI/UX

### ✅ Dodatne Funkcionalnosti - BONUS
- Real-time pretraga
- Kombinovano filtriranje
- Responsive dizajn
- Loading states
- Fallback slike
- Brojač rezultata

## 🚧 Moguća Proširenja

- [ ] Registracija novih korisnika
- [ ] Shopping cart funkcionalnost
- [ ] Favoriti proizvoda
- [ ] Admin panel za upravljanje
- [ ] Email notifikacije
- [ ] Payment integration
- [ ] Wishlist funkcionalnost
- [ ] Product reviews i ratings
- [ ] Advanced sorting opcije

## 📄 Licenca

Ovaj projekat je razvijen kao odgovor na Junior Fullstack Developer zadatak i razvio ga je Resad Spahovic.

---

⭐ **Projekat potpuno ispunjava sve zahteve zadatka + dodatne funkcionalnosti!** ⭐

### 🏆 **Ključne Prednosti:**
- **Potpuna funkcionalnost** - Sve zahtevane funkcije implementirane
- **Moderni stack** - React + FastAPI sa best practices
- **Excellent UX** - Intuitivno i responzivno korisničko iskustvo
- **Robusno error handling** - Elegantno rukovanje svim edge case-ovima
- **Scalable architecture** - Čist kod spreman za proširenja
- **Production ready** - Optimizovano za deployment

---
