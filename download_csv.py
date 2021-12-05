import requests
from io import BytesIO
import zipfile 


def update_dict():
    url = "http://www.gwicks.net/textlists/usa.zip"
    resp = requests.get(url, stream=True).content
    zf = zipfile.ZipFile(BytesIO(resp))
    zf.extractall()


def get_dict(filename='usa.txt'):
    data = []
    with open(filename, 'r') as dictionary:
        for word in dictionary:
            data.append(word.strip('\n').title())
    
    return data


def get_words(minimum_len=4, maximum_len=8):
    data = get_dict()
    words = [word for word in data 
                if len(word) >= minimum_len 
                and len(word) <= maximum_len]

    return words

if __name__ == "__main__":
    words = get_words()
    print(words)
