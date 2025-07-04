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

### 🚀 **Naprednije Funkcionalnosti (Dodatni Poeni)**
- ✅ **Filtriranje po kategoriji** - Dropdown sa kategorijama
- ✅ **Pretraga po nazivu** - Real-time search
- ✅ **Detalji proizvoda** - Klik na proizvod za detalje
- ✅ **Robusno error handling** - Comprehensive error management
- ✅ **Moderni UI/UX** - Responsive design sa hover efektima

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
│   │   │   └── ProductDetail.js
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
- `GET /api/products?category=Monitori` - Filter po kategoriji
- `GET /api/products?search=laptop` - Pretraga proizvoda

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

## 🚧 Moguća Proširenja

- [ ] Registracija novih korisnika
- [ ] Shopping cart funkcionalnost
- [ ] Favoriti proizvoda
- [ ] Admin panel za upravljanje
- [ ] Email notifikacije
- [ ] Payment integration

## 📄 Licenca

Ovaj projekat je razvijen kao odgovor na Junior Fullstack Developer zadatak i razvio ga je Resad Spahovic.

---

⭐ **Projekat potpuno ispunjava sve zahteve zadatka + dodatne funkcionalnosti!** ⭐