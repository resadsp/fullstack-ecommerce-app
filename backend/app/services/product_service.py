from typing import Optional, List, Dict, Any

class ProductService:
    # Demo proizvodi sa pravim slikama
    DEMO_PRODUCTS = [
        {
            "id": 1,
            "name": "Laptop Dell XPS 13",
            "description": "Ultrabook sa Intel i7 procesorom",
            "price": 1299.99,
            "category": "Electronics",
            "image_url": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9315/media-gallery/notebook-xps-13-9315-nt-blue-gallery-4.psd?fmt=pjpg&pscan=auto&scl=1&wid=3491&hei=2962&qlt=100,1&resMode=sharp2&size=3491,2962&chrss=full&imwidth=5000"
        },
        {
            "id": 2,
            "name": "iPhone 14 Pro",
            "description": "Najnoviji iPhone sa Pro kamerom",
            "price": 999.99,
            "category": "Electronics",
            "image_url": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896"
        },
        {
            "id": 3,
            "name": "Nike Air Max 270",
            "description": "Sportske patike za trčanje sa Air Max tehnologijom",
            "price": 129.99,
            "category": "Shoes",
            "image_url": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/air-max-270-shoes-KkLcGR.png"
        },
        {
            "id": 4,
            "name": "Samsung TV 55\" QLED",
            "description": "4K Smart TV sa HDR i Quantum Dot tehnologijom",
            "price": 699.99,
            "category": "Electronics",
            "image_url": "https://images.samsung.com/is/image/samsung/p6pim/rs/qe55q60cauxxh/gallery/rs-qled-q60c-qe55q60cauxxh-534851983?$650_519_PNG$"
        },
        {
            "id": 5,
            "name": "Adidas Hoodie Essentials",
            "description": "Pamučni duks sa kapuljačom, udoban za svakodnevno nošenje",
            "price": 59.99,
            "category": "Clothing",
            "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Essentials_3-Stripes_Fleece_Hoodie_Black_H12159_21_model.jpg"
        },
        {
            "id": 6,
            "name": "MacBook Pro 14\"",
            "description": "Apple MacBook Pro sa M2 Pro čipom",
            "price": 1999.99,
            "category": "Electronics",
            "image_url": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673229"
        },
        {
            "id": 7,
            "name": "Sony WH-1000XM4",
            "description": "Bežične slušalice sa potiskivanjem buke",
            "price": 349.99,
            "category": "Electronics",
            "image_url": "https://www.sony.com/image/5d02da5df552836db894c9443976e68c?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF"
        },
        {
            "id": 8,
            "name": "Levi's 501 Original Jeans",
            "description": "Klasični straight fit farmerke",
            "price": 89.99,
            "category": "Clothing",
            "image_url": "https://lsco.scene7.com/is/image/lsco/005010000-front-pdp-lse?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,1&op_usm=0.6,0.6,8&wid=750&hei=1000"
        },
        {
            "id": 9,
            "name": "Converse Chuck Taylor All Star",
            "description": "Kultne patike u high-top stilu",
            "price": 65.99,
            "category": "Shoes",
            "image_url": "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw2f8aa3b6/images/a_107/M9160_A_107X1.jpg?sw=964"
        },
        {
            "id": 10,
            "name": "iPad Air 5th Gen",
            "description": "Apple iPad Air sa M1 čipom",
            "price": 599.99,
            "category": "Electronics",
            "image_url": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1645065732688"
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
