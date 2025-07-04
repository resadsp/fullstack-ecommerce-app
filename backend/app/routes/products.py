from fastapi import APIRouter, Depends, HTTPException, Query, Header
from typing import List, Optional
from ..services.product_service import ProductService

router = APIRouter()

async def get_current_user_token(authorization: str = Header(None)):
    """Extract token from Authorization header"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")
    return authorization.split(" ")[1]

@router.get("/products")
async def get_products(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    token: str = Depends(get_current_user_token)
):
    """Get filtered products"""
    try:
        products = ProductService.get_filtered_products(
            token=token,
            category=category,
            search=search
        )
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/products/{product_id}")
async def get_product(
    product_id: int,
    token: str = Depends(get_current_user_token)
):
    """Get product by ID"""
    try:
        product = ProductService.get_product_by_id(product_id, token)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
