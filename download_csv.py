import requests
from io import BytesIO
import zipfile 

url = "https://www.bragitoff.com/wp-content/uploads/2016/03/Word-lists-in-csv.zip"
resp = requests.get(url, stream=True).content
zf = zipfile.ZipFile(BytesIO(resp))
zf.extractall()
# for line in zf.open(file).readlines():
#     print(line.decode('utf-8'))
