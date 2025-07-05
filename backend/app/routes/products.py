from fastapi import APIRouter, Depends, HTTPException, Query, Header
from typing import List, Optional
from ..services.product_service import ProductService

router = APIRouter()

async def get_current_user_token_optional(authorization: str = Header(None)):
    """Extract token from Authorization header (optional)"""
    if authorization and authorization.startswith("Bearer "):
        return authorization.split(" ")[1]
    return "anonymous"  # Default za neautentifikovane korisnike

@router.get("/products")
async def get_products(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    token: str = Depends(get_current_user_token_optional)
):
    """Get filtered products"""
    print(f"🚀 DEBUG: category='{category}', search='{search}', token='{token}'")
    try:
        products = ProductService.get_filtered_products(
            token=token,
            category=category,
            search=search
        )
        print(f"🚀 DEBUG: Returning {len(products)} products")
        return products
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/products/{product_id}")
async def get_product(
    product_id: int,
    token: str = Depends(get_current_user_token_optional)
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
