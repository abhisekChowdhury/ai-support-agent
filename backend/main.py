from fastapi import FastAPI  # type: ignore[reportMissingImports]

app = FastAPI()

@app.get("/")
def root():
    return {"message": "AI Support Agent is alive"}