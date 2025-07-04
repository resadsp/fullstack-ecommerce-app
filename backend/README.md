# E-commerce Backend API

FastAPI backend aplikacija za e-commerce sistem.

## Instalacija

1. Kreirajte virtuelno okruženje:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

2. Instalirajte dependencies:
```bash
pip install -r requirements.txt
```

3. Pokrenite aplikaciju:
```bash
python run.py
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/login` - Login
- `GET /api/products` - Lista proizvoda (potreban token)
- `GET /api/products/{id}` - Detalji proizvoda (potreban token)

## Dokumentacija

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Demo podaci

- Username: `demo`
- Password: `password`

## Testiranje

1. Idite na http://127.0.0.1:8000/docs
2. Testirajte login sa demo podacima
3. Kopirajte token iz odgovora
4. Koristite token za pristup products endpoint-ima

## Struktura

```
backend/
├── app/
│   ├── models/          # Pydantic modeli
│   ├── routes/          # API rute
│   ├── services/        # Biznis logika
│   ├── utils/           # Pomoćne funkcije
│   └── main.py          # FastAPI aplikacija
├── run.py               # Pokretanje servera
├── requirements.txt     # Python dependencies
└── .env                 # Environment varijable
```
