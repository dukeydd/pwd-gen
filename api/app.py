import uvicorn
from fastapi import FastAPI
import get_words
from random import randint


app = FastAPI()

@app.get("/")
def root():
    return {"Hello": "World"}


@app.get("/get_words")
def get_all_words():
    return {
        "words": get_words.get_words()[:20]
    }

@app.get("/update_dict")
def update_dict():
    get_words.update_dict()
