const index = require('../index');
var event = 
{
    "body": "eyJ0ZXN0IjoiYm9keSJ9",
    "resource": "/{proxy+}",
    "path": "/path/to/resource",
    "httpMethod": "GET",
    "isBase64Encoded": true,
    "queryStringParameters": {
      "foo": "bar"
    }
}
index.handler(event,{},{});
