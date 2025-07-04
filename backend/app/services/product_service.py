from typing import List, Optional

class ProductService:
    # Demo proizvodi
    DEMO_PRODUCTS = [
        {
            "id": 1,
            "name": "Laptop Dell XPS 13",
            "description": "Ultrabook sa Intel i7 procesorom",
            "price": 1299.99,
            "category": "Electronics",
            "image_url": "https://via.placeholder.com/300x200?text=Laptop"
        },
        {
            "id": 2,
            "name": "iPhone 14 Pro",
            "description": "Najnoviji iPhone sa Pro kamerom",
            "price": 999.99,
            "category": "Electronics",
            "image_url": "https://via.placeholder.com/300x200?text=iPhone"
        },
        {
            "id": 3,
            "name": "Nike Air Max",
            "description": "Sportske patike za trčanje",
            "price": 129.99,
            "category": "Shoes",
            "image_url": "https://via.placeholder.com/300x200?text=Shoes"
        },
        {
            "id": 4,
            "name": "Samsung TV 55\"",
            "description": "4K Smart TV sa HDR",
            "price": 699.99,
            "category": "Electronics",
            "image_url": "https://via.placeholder.com/300x200?text=TV"
        },
        {
            "id": 5,
            "name": "Adidas Hoodie",
            "description": "Pamučni duks sa kapuljačom",
            "price": 59.99,
            "category": "Clothing",
            "image_url": "https://via.placeholder.com/300x200?text=Hoodie"
        }
    ]
    
    @classmethod
    def get_filtered_products(cls, token: str, category: Optional[str] = None, search: Optional[str] = None) -> List[dict]:
        """Get filtered products"""
        products = cls.DEMO_PRODUCTS.copy()
        
        # Filter by category
        if category:
            products = [p for p in products if p["category"].lower() == category.lower()]
        
        # Filter by search
        if search:
            search_lower = search.lower()
            products = [
                p for p in products 
                if search_lower in p["name"].lower() or search_lower in p["description"].lower()
            ]
        
        return products
    
    @classmethod
    def get_product_by_id(cls, product_id: int, token: str) -> Optional[dict]:
        """Get product by ID"""
        for product in cls.DEMO_PRODUCTS:
            if product["id"] == product_id:
                return product
        return None
