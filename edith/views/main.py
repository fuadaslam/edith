"""EDITH."""


from edith import app
from fastapi import Request
import requests
import json
import wikipedia

API_ENDPOINT = 'https://api.wit.ai/message'

wit_access_token = 'N2Y36TQWIDJ52VVFBKDJQOV4VVWZJQKL'


def get_logic(data):
    intents = data.get("intents")[0]
    entities = data.get("entities")
    if intents["name"] == "search":
        question = entities.get("question:question")
        res = default_search(question)
    elif intents["name"] == "search_with_target":
        question = entities.get("question:question")
        target = entities.get("target:target")
        res = target_search(question, target)

    return res



def default_search(question):
    try:
        response = wikipedia.summary(question[0].get("body"))
    except wikipedia.DisambiguationError:
        response = "DisambiguationError"

    return response


def target_search(question, target):
    pass


@app.get("/")
async def index(request: Request):
    return {"status":"server running"}


@app.get("/query/{full_query}")
async def get_query(full_query: str):
    # processed = quote(full_query)
    headers = {'Authorization': 'Bearer '+ wit_access_token, }
    params = (('v', '20200905'),('q', full_query),)
    response = requests.get(API_ENDPOINT, headers=headers, params=params)
    data = json.loads(response.content)

    response = get_logic(data)

    return json.dumps(response)
