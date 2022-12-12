import requests
import json
d = {"query":"query Query {\r\n  FindAllVideos {\r\n    _id\r\n    author\r\n    title\r\n  }\r\n}"}
#{"query":"query Query {\n  userCount\n}","variables":{}}

r = requests.post('http://localhost:3000/graphql', json=d)

print(r.json())
