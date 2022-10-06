const PayU = require('./fuctions/payU');

const axios = require('axios').default;
axios.defaults.headers.post['Content-Type'] = 'application/json';

exports.handler = async function (event, context, callback) {
  console.log("Event Photo: ", JSON.stringify(event));

  var payU = new PayU(process.env.BUCKET, process.env.DYNAMODB);
  var response = { statusCode: 401, data: "Whitout Information" };
  switch (event.httpMethod) {
    case 'POST':
      console.log("### POST ####");
      response = await payU.saveTx(event.body);
      break;
    case 'PUT':
      console.log("### PUT ####");
      break;
    case 'GET':
      console.log("### GET ####");
      //response = await payU.ping();
      response = await payU.getBanks();
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