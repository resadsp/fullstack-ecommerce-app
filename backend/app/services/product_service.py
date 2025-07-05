from typing import Optional, List, Dict, Any

class ProductService:
    # Demo proizvodi sa radnim slikama
    DEMO_PRODUCTS = [
        {
            "id": 1,
            "name": "Laptop Dell XPS 13",
            "description": "Ultrabook sa Intel i7 procesorom",
            "price": 1299.99,
            "category": "Electronics",
            "image_url": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 2,
            "name": "iPhone 14 Pro",
            "description": "Najnoviji iPhone sa Pro kamerom",
            "price": 999.99,
            "category": "Electronics",
            "image_url": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 3,
            "name": "Nike Air Max 270",
            "description": "Sportske patike za trčanje sa Air Max tehnologijom",
            "price": 129.99,
            "category": "Shoes",
            "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 4,
            "name": "Samsung TV 55\" QLED",
            "description": "4K Smart TV sa HDR i Quantum Dot tehnologijom",
            "price": 699.99,
            "category": "Electronics",
            "image_url": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 5,
            "name": "Adidas Hoodie Essentials",
            "description": "Pamučni duks sa kapuljačom, udoban za svakodnevno nošenje",
            "price": 59.99,
            "category": "Clothing",
            "image_url": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 6,
            "name": "MacBook Pro 14\"",
            "description": "Apple MacBook Pro sa M2 Pro čipom",
            "price": 1999.99,
            "category": "Electronics",
            "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 7,
            "name": "Sony WH-1000XM4",
            "description": "Bežične slušalice sa potiskivanjem buke",
            "price": 349.99,
            "category": "Electronics",
            "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 8,
            "name": "Levi's 501 Original Jeans",
            "description": "Klasični straight fit farmerke",
            "price": 89.99,
            "category": "Clothing",
            "image_url": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 9,
            "name": "Converse Chuck Taylor All Star",
            "description": "Kultne patike u high-top stilu",
            "price": 65.99,
            "category": "Shoes",
            "image_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 10,
            "name": "iPad Air 5th Gen",
            "description": "Apple iPad Air sa M1 čipom",
            "price": 599.99,
            "category": "Electronics",
            "image_url": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 11,
            "name": "Canon EOS R5",
            "description": "Profesionalni mirrorless fotoaparat",
            "price": 3899.99,
            "category": "Electronics",
            "image_url": "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 12,
            "name": "Rolex Submariner",
            "description": "Luksuzni ronilački sat",
            "price": 8999.99,
            "category": "Watches",
            "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 13,
            "name": "Tesla Model 3",
            "description": "Električni automobil sa autopilotom",
            "price": 39999.99,
            "category": "Automotive",
            "image_url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 14,
            "name": "Gaming Chair RGB",
            "description": "Ergonomska gaming stolica sa LED osvetljenjem",
            "price": 299.99,
            "category": "Furniture",
            "image_url": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 15,
            "name": "Espresso Machine",
            "description": "Profesionalna espresso mašina za dom",
            "price": 799.99,
            "category": "Appliances",
            "image_url": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 16,
            "name": "Yamaha Acoustic Guitar",
            "description": "Akustična gitara za početnike i profesionalce",
            "price": 449.99,
            "category": "Music",
            "image_url": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 17,
            "name": "Nike Running Shorts",
            "description": "Kratke hlače za trčanje sa Dri-FIT tehnologijom",
            "price": 34.99,
            "category": "Clothing",
            "image_url": "https://images.unsplash.com/photo-1506629905607-d405d7d3b880?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 18,
            "name": "Mechanical Keyboard",
            "description": "RGB mehanička tastatura za gaming",
            "price": 159.99,
            "category": "Electronics",
            "image_url": "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 19,
            "name": "Adidas Ultraboost 22",
            "description": "Premium running patike sa Boost tehnologijom",
            "price": 189.99,
            "category": "Shoes",
            "image_url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop&crop=center"
        },
        {
            "id": 20,
            "name": "Wireless Charger",
            "description": "Bežični punjač za telefone sa fast charging",
            "price": 29.99,
            "category": "Electronics",
            "image_url": "https://images.unsplash.com/photo-1609592806596-4fa8c8b5c7b2?w=400&h=300&fit=crop&crop=center"
        }
    ]
       
    @classmethod
    def get_filtered_products(cls, token: str, category: Optional[str] = None, search: Optional[str] = None) -> List[Dict[Any, Any]]:
        """Get filtered products"""
        print(f"🔍 DEBUG: Starting with {len(cls.DEMO_PRODUCTS)} products")
        print(f"🔍 DEBUG: Filters - category='{category}', search='{search}'")
               
        products = cls.DEMO_PRODUCTS.copy()
               
        # Filter by category
        if category:
            print(f"🔍 DEBUG: Filtering by category '{category}'")
            before_count = len(products)
            products = [p for p in products if p["category"].lower() == category.lower()]
            print(f"🔍 DEBUG: Category filter: {before_count} -> {len(products)} products")
               
        # Filter by search
        if search:
            print(f"🔍 DEBUG: Filtering by search '{search}'")
            before_count = len(products)
            search_lower = search.lower()
            products = [
                p for p in products
                if search_lower in p["name"].lower() or search_lower in p["description"].lower()
            ]
            print(f"🔍 DEBUG: Search filter: {before_count} -> {len(products)} products")
               
        print(f"🔍 DEBUG: Final result: {len(products)} products")
        return products
       
    @classmethod
    def get_product_by_id(cls, product_id: int, token: str) -> Optional[dict]:
        """Get product by ID"""
        for product in cls.DEMO_PRODUCTS:
            if product["id"] == product_id:
                return product
        return None
