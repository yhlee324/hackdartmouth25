from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.species import router as species_router

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],  # or your frontend URL
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(species_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)