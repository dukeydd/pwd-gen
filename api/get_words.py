import requests
from io import BytesIO
import zipfile 
import os


def update_dictionary():
    url = "http://www.gwicks.net/textlists/usa.zip"
    resp = requests.get(url, stream=True).content
    zf = zipfile.ZipFile(BytesIO(resp))
    zf.extractall()
    os.rename('usa.txt', 'dictionary.txt')


def get_dict(filename='dictionary.txt'):
    if not os.path.isfile(filename):
        update_dictionary()
    data = []
    with open(filename, 'r') as dictionary:
        for word in dictionary:
            data.append(word.strip('\n'))
    return data


def get_words(minimum_len=4, maximum_len=8):
    data = get_dict()
    
    # restrict words based on length
    words = [word for word in data 
                if len(word) >= minimum_len 
                and len(word) <= maximum_len]

    # attempt to remove plurals and past participles
    # loop through to catch more due to having multiple versions of the same word
    for _ in range(3):
        for idx, word in reversed(list(enumerate(words))):
            #  remove -s and -d and -es and -ed suffixed words
            if word[:-1] == words[idx-1] or word[:-2] == words[idx-1]:
                words.pop(idx)

            # remove -ing words which do and do not end in 'e'
            if word[:-3] == words[idx-1] or word[:-3] == words[idx-1][:-1]:
                words.pop(idx)

    words_needed = 16384 # 4^7
    return words[:words_needed]


def get_dice_dec(dice_value=0, dice_no=0):
    if not dice_value and not dice_no:
        raise ValueError("Either dice_value or dice_no not provided")
    
    dice_value -= 1 # arrays start at zero
    decimal = dice_value/(4**dice_no)
    return decimal


if __name__ == "__main__":
    words = get_words()
    print(words[:20])
