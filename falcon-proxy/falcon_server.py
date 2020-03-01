import falcon
from falcon.http_status import HTTPStatus
import json

import requests

class HandleCORS(object):
    def process_request(self, req, resp):
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Methods', '*')
        resp.set_header('Access-Control-Allow-Headers', '*')
        resp.set_header('Access-Control-Max-Age', 1728000)  # 20 days
        if req.method == 'OPTIONS':
            raise HTTPStatus(falcon.HTTP_200, body='\n')

class InvoiceProxy:
    def on_post(self, req, resp):

        url = "https://demo.checkbook.io/v3/invoice"

        payload = "{\"amount\":5,\"description\":\"Test Invoice\",\"name\":\"Potato Company\",\"recipient\":\"rjp1@iastate.edu\"}"
        headers = {
            'accept': "application/json",
            'content-type': "application/json",
            'authorization': "d6aa2703655f4ba2af2a56202961ca86:dXbCgzYBMibj8ZwuQMd2NXr6rtvjZ8"
            }
        payload = json.dumps(req.media)#req.body
        print("PAYLOAD:\n" + str(payload))

        #headers = req.headers
        print("HEADERS:\n" + str(headers))

        # We could choose to relay this response or use our own
        response = requests.request("POST", url, data=payload, headers=headers)

        #print(response.text)


        #resp.set_header('Access-Control-Allow-Origin', '*')

        # We want the falcon server to return the invoice id
        print("RESPONSE:\n" + str(response))
        print("ENCODING:\n" + str(response.encoding))
        print("TEXT:\n" + str(response.text))
        print("INVOICE ID: " + str(response.json()["id"]))

        resp.status = falcon.HTTP_200
        resp.body = response.json()["id"]#'Success'
        #resp.body = 'Success'
        

app = falcon.API(middleware=[HandleCORS()])
invoice = InvoiceProxy()
app.add_route('/invoice', invoice)
