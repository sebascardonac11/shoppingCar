exports.handler = async function (event, context, callback) {
  console.log("Event Photo: ", JSON.stringify(event));
  var response = { statusCode: 401, data: "Whitout Information" };
  switch (event.httpMethod) {
    case 'POST':
      console.log("### POST ####");
    case 'PUT':
      console.log("### GET ####");
    case 'GET':
      console.log("### GET ####");
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