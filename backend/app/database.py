from motor.motor_asyncio import AsyncIOMotorClient
from .core.config import MONGO_URI

client = AsyncIOMotorClient(MONGO_URI)
db = client.get_default_database()