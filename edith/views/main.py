from edith import app
from fastapi import Request


@app.get("/")
async def index(request: Request):
    return {"status":"server running"}


@app.get("/query/{full_query}")
async def get_query(full_query:str):
    return {"query": full_query}
