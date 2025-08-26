from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_files(archivos: List[UploadFile] = File(...)):
    if len(archivos) > 4:
        raise HTTPException(status_code=400, detail="Solo se permiten hasta 4 archivos")

    ext = archivos[0].filename.split(".")[-1].lower()

    for archivo in archivos:
        if archivo.filename.split(".")[-1].lower() != ext:
            raise HTTPException(status_code=400, detail="Todos los archivos deben tener el mismo formato")

    for archivo in archivos:
        with open(f"uploads/{archivo.filename}", "wb") as f:
            f.write(await archivo.read())

    return {"message": "Archivos subidos correctamente", "formato": ext}