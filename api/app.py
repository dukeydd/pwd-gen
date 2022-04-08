import uvicorn
from fastapi import FastAPI, Query
import get_words
from random import randint
from fastapi.middleware.cors import CORSMiddleware
from os.path import exists

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    get_words.update_dictionary()


@app.get("/get_word/{dice_values}")
def get_word(dice_values):
    if not dice_values:
        raise ValueError("No input dice numbers given")

    if len(dice_values) != 7:
        raise ValueError("Incorrect number of dice values given")
    
    dice_values = [int(i) for i in list(dice_values)]

    if any(dice_values) > 4 or any(dice_values) < 1: # fix this
        raise ValueError("Contains invalid values")

    word_decimals = [get_words.get_dice_dec(dice_values[i], i+1) for i in range(len(dice_values))]
    word_value = int(sum(word_decimals) * 4**7)
    word = get_words.get_words()[word_value]
    return word


if __name__ == "__main__":
    if not exists("dictionary.txt"):
        print('Dictionary not found, updating')
        get_words.update_dictionary()

    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)