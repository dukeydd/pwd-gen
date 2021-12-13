import uvicorn
from fastapi import FastAPI
import get_words
from random import randint


app = FastAPI()

@app.get("/")
def root():
    return {"Hello": "World"}


@app.get("/get_all_words")
def get_all_words():
    return {
        "words": get_words.get_words()[:20]
    }

@app.get("/update_dict")
def update_dict():
    get_words.update_dict()

@app.get("/get_word")
def get_word(dice_numbers = []):
    if not dice_numbers:
        raise ValueError("No input dice numbers given")

    if len(dice_numbers) < 7:
        raise ValueError("Not enough dice numbers given")
    
    word_number = ((dice_numbers[0] - 1) * 16384) /4 
