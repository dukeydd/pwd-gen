import uvicorn
from fastapi import FastAPI, Query
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


def get_dice_dec(dice_value=0, dice_no=0):
    if not dice_value and not dice_no:
        raise ValueError("Either dice_value or dice_no not provided")
    
    dice_value -= 1 # arrays start at zero
    decimal = dice_value/(4**dice_no)
    return decimal


@app.get("/update_dict")
def update_dict():
    get_words.update_dict()


@app.get("/get_word/{dice_values}")
def get_word(dice_values):
    if not dice_values:
        raise ValueError("No input dice numbers given")

    if len(dice_values) != 7:
        raise ValueError("Incorrect number of dice values given")
    
    dice_values = [int(i) for i in list(dice_values)]
    word_decimals = [get_dice_dec(dice_values[i], i+1) for i in range(len(dice_values))]
    word_value = sum(word_decimals) * 4**7
    return word_value      
