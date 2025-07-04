from fastapi import APIRouter, HTTPException, Header, Depends
from ..services.auth_service import AuthService
from ..models.auth import LoginRequest, LoginResponse

router = APIRouter()

async def get_current_user_token(authorization: str = Header(None)):
    """Extract token from Authorization header"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")
    return authorization.split(" ")[1]

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """Login endpoint"""
    try:
        result = AuthService.authenticate_user(request.username, request.password)
        return result
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.post("/logout")
async def logout(token: str = Depends(get_current_user_token)):
    """Logout endpoint"""
    try:
        AuthService.logout_user(token)
        return {"message": "Successfully logged out"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
