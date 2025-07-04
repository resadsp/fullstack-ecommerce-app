import requests
from typing import List, Dict, Any, Optional

class ExternalAPIService:
    def __init__(self, base_url: str = "https://zadatak.konovo.rs"):
        self.base_url = base_url
    
    def get_products_from_external_api(self, token: str) -> List[Dict[str, Any]]:
        """Fetch products from external API"""
        try:
            headers = {
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
            
            response = requests.get(f"{self.base_url}/products", headers=headers)
            response.raise_for_status()
            
            return response.json()
            
        except requests.exceptions.RequestException as e:
            # Fallback to mock data if external API fails
            return self._get_mock_data()
    
    def get_product_by_id(self, product_id: int, token: str) -> Optional[Dict[str, Any]]:
        """Fetch specific product from external API"""
        products = self.get_products_from_external_api(token)
        return next((p for p in products if p["id"] == product_id), None)
    
    def _get_mock_data(self) -> List[Dict[str, Any]]:
        """Mock data as fallback"""
        return [
            {
                "id": 1,
                "name": "Gaming Monitor 24\"",
                "description": "Visoka brzina osvežavanja za gaming",
                "price": 300.0,
                "category": "Monitori",
                "image_url": "https://via.placeholder.com/400x300/007bff/ffffff?text=Gaming+Monitor+24"
            },
            {
                "id": 2,
                "name": "Laptop Dell XPS", 
                "description": "Laptop sa odličnom brzina procesora",
                "price": 1200.0,
                "category": "Laptopovi",
                "image_url": "https://via.placeholder.com/400x300/28a745/ffffff?text=Dell+XPS+Laptop"
            }
        ]
