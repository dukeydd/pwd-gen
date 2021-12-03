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
    
    print(data[:5])
    return data

get_dict()
