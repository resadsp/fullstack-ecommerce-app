from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str
    image_url: str

class ProductFilter(BaseModel):
    category: Optional[str] = None
    search: Optional[str] = None
