from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .routes import auth, products

# Load environment variables
load_dotenv()

app = FastAPI(
    title="E-commerce API",
    description="A simple e-commerce API",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(products.router, prefix="/api", tags=["products"])

@app.get("/")
async def root():
    return {"message": "E-commerce API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
