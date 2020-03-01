import requests

url = "https://demo.checkbook.io/v3/invoice"

payload = "{\"amount\":5,\"description\":\"Test Invoice\",\"name\":\"Potato Company\",\"recipient\":\"rjp1@iastate.edu\"}"
headers = {
    'accept': "application/json",
    'content-type': "application/json",
    'authorization': "d6aa2703655f4ba2af2a56202961ca86:dXbCgzYBMibj8ZwuQMd2NXr6rtvjZ8"
    }

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)