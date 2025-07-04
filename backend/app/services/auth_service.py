import jwt
from datetime import datetime, timedelta
from typing import Optional

class AuthService:
    SECRET_KEY = "your-secret-key-here"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30
    
    # Demo korisnik
    DEMO_USER = {
        "username": "zadatak",
        "password": "zadatak"
    }
    
    # Aktivni tokeni (u produkciji koristiti Redis ili bazu)
    active_tokens = set()
    
    @classmethod
    def authenticate_user(cls, username: str, password: str) -> dict:
        """Authenticate user and return token"""
        if username == cls.DEMO_USER["username"] and password == cls.DEMO_USER["password"]:
            # Kreiraj token
            token_data = {
                "sub": username,
                "exp": datetime.utcnow() + timedelta(minutes=cls.ACCESS_TOKEN_EXPIRE_MINUTES)
            }
            token = jwt.encode(token_data, cls.SECRET_KEY, algorithm=cls.ALGORITHM)
            
            # Dodaj token u aktivne
            cls.active_tokens.add(token)
            
            return {
                "access_token": token,
                "token_type": "bearer",
                "expires_in": cls.ACCESS_TOKEN_EXPIRE_MINUTES * 60
            }
        else:
            raise Exception("Invalid credentials")
    
    @classmethod
    def verify_token(cls, token: str) -> Optional[str]:
        """Verify token and return username"""
        try:
            if token not in cls.active_tokens:
                return None
                
            payload = jwt.decode(token, cls.SECRET_KEY, algorithms=[cls.ALGORITHM])
            username = payload.get("sub")
            return username
        except jwt.ExpiredSignatureError:
            cls.active_tokens.discard(token)
            return None
        except jwt.JWTError:
            return None
    
    @classmethod
    def logout_user(cls, token: str):
        """Logout user by removing token"""
        cls.active_tokens.discard(token)
