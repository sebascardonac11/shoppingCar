const PayU = require('./fuctions/payU');

const axios = require('axios').default;
axios.defaults.headers.post['Content-Type'] = 'application/json';

exports.handler = async function (event, context, callback) {
  console.log("Event Photo: ", JSON.stringify(event));

  var payU = new PayU(
    process.env.BUCKET, 
    process.env.DYNAMODB,
    process.env.APIKEY,
    process.env.MERCHANID,
    process.env.ACCOUNTID,
    );
  var response = { statusCode: 401, data: "Whitout Information" };
  switch (event.httpMethod) {
    case 'POST':
      console.log("### POST ####");
      if (event.resource == '/ShoppingCar/payU') {
      response = await payU.saveTx(event.body,event.requestContext.authorizer.claims.email);
      }
      if (event.resource == '/ShoppingCar/payU/confirmation') {
        response = await payU.setConfirmationTx(event.body);
      }
      break;
    case 'PUT':
      console.log("### PUT ####");
      break;
    case 'GET':
      console.log("### GET ####");
      //response = await payU.ping();
      response = await payU.getTX(event.requestContext.authorizer.claims.email);
      break;
    default:
      break;
  }
  console.log("Response: ", response);
  return {
    statusCode: response.statusCode,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(response.data)
  };
}