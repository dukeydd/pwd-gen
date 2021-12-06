import uvicorn
from fastapi import FastAPI
import get_words 

app = FastAPI()

@app.get("/")
def root():
    return {"Hello": "World"}


@app.get("/get_words")
def get_all_words():
    return {
        "words": get_words.get_words()[:20]
    }