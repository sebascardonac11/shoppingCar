const axios = require('axios').default;
const Str = require('@supercharge/strings')
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = class payU {
    constructor(bucket, table) {
        this.BUCKET = bucket;
        this.DYNAMODBTABLE = table
        this.Entity = 'PURCHASE';
    }
    async saveTx(body,client) {
        try {
            const uuid = Str.uuid();
            var Item = JSON.parse(body);
           // Item.photographer = photographer
            Item.mainkey = client
            Item.mainsort = 'PURCHASE-' + uuid;
            Item.entity = 'PURCHASE'
            var params = {
                TableName: this.DYNAMODBTABLE,
                Item: Item
            }
            console.log("param: ", params)
            var result = await dynamo.put(params).promise();
            return {
                statusCode: 200,
                data: {purchaseId:Item.mainsort}
            }
        } catch (error) {
            console.log("Someting Wrong in payU.saveTx ", error)
            return {
                statusCode: 404,
                data: "Someting Wrong in payU.saveTx ",error
            };
        }
    }
    async getTX(client){
        try {
            var params = {
                TableName: this.DYNAMODBTABLE,
                ExpressionAttributeValues: {
                    ':hashKey': client,
                    ':entity': this.entity
                },
                KeyConditionExpression: 'mainkey =:hashKey',
                FilterExpression: 'entity=:entity'
            }
            console.log(params)
            var oderDB= await dynamo.query(params).promise();
            return oderDB.Items;
        } catch (error) {
            console.log("Someting Wrong in payU.getTX ", error)
            return {
                statusCode: 400,
                data: "Someting Wrong in payU.getTX "
            };
        }
    }
    async ping() {
        try {
            var body = {
                "test": true,
                "language": "en",
                "command": "PING",
                "merchant": {
                    "apiLogin": "pRRXKOl8ikMmt9u",
                    "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
                }
            }
            var req = await axios.post("https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi", JSON.stringify(body)
            );
            return {
                statusCode: req.status,
                data: req.data
            }
        } catch (error) {
            console.log("Someting Wrong in payU.ping ", error)
            return {
                statusCode: 400,
                data: "Someting Wrong in payU.ping "
            };
        }
    }
    async getBanks() {
        try {
            var body = {
                "language": "es",
                "command": "GET_BANKS_LIST",
                "merchant": {
                    "apiLogin": "pRRXKOl8ikMmt9u",
                    "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
                },
                "test": false,
                "bankListInformation": {
                    "paymentMethod": "PSE",
                    "paymentCountry": "CO"
                }
            }
            var req = await axios.post("https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi", JSON.stringify(body)
            );
            return {
                statusCode: req.status,
                data: req.data.banks
            }
        } catch (error) {
            console.log("Someting Wrong in payU.getCity ", error)
            return {
                statusCode: 400,
                data: "Someting Wrong in payU.getCity "
            };
        }
    }
    async sendDebitTransaction() {
        var accountId = "512321";
        var merchant = {
            "apiKey": "4Vj8eK4rloUd272L48hsrarnUA",
            "apiLogin": "pRRXKOl8ikMmt9u"
        }
        var request =
        {
            "language": "es",
            "command": "SUBMIT_TRANSACTION",
            "test": true,
            "merchant": merchant,
            "transaction": {
                "order": {
                    "accountId": accountId,
                    "referenceCode": "PRODUCT_TEST_2021-06-23T19:59:43.229Z",
                    "description": "Payment test description",
                    "language": "es",
                    "signature": "1d6c33aed575c4974ad5c0be7c6a1c87",
                    "notifyUrl": "http://www.payu.com/notify",
                    "additionalValues": {
                        "TX_VALUE": {
                            "value": 65000,
                            "currency": "COP"
                        },
                        "TX_TAX": {
                            "value": 10378,
                            "currency": "COP"
                        },
                        "TX_TAX_RETURN_BASE": {
                            "value": 54622,
                            "currency": "COP"
                        }
                    },
                    "buyer": {
                        "merchantBuyerId": "1",
                        "fullName": "First name and second buyer name",
                        "emailAddress": "buyer_test@test.com",
                        "contactPhone": "7563126",
                        "dniNumber": "123456789",
                        "shippingAddress": {
                            "street1": "Cr 23 No. 53-50",
                            "street2": "5555487",
                            "city": "Bogotá",
                            "state": "Bogotá D.C.",
                            "country": "CO",
                            "postalCode": "000000",
                            "phone": "7563126"
                        }
                    },
                    "shippingAddress": {
                        "street1": "Cr 23 No. 53-50",
                        "street2": "5555487",
                        "city": "Bogotá",
                        "state": "Bogotá D.C.",
                        "country": "CO",
                        "postalCode": "0000000",
                        "phone": "7563126"
                    }
                },
                "payer": {
                    "merchantPayerId": "1",
                    "fullName": "First name and second payer name",
                    "emailAddress": "payer_test@test.com",
                    "contactPhone": "7563126",
                    "dniNumber": "5415668464654",
                    "billingAddress": {
                        "street1": "Cr 23 No. 53-50",
                        "street2": "125544",
                        "city": "Bogotá",
                        "state": "Bogotá D.C.",
                        "country": "CO",
                        "postalCode": "000000",
                        "phone": "7563126"
                    }
                },
                "extraParameters": {
                    "RESPONSE_URL": "http://www.payu.com/response",
                    "PSE_REFERENCE1": "photoevent",
                    "FINANCIAL_INSTITUTION_CODE": "1022",
                    "USER_TYPE": "N",
                    "PSE_REFERENCE2": "CC",
                    "PSE_REFERENCE3": "123456789"
                },
                "type": "AUTHORIZATION_AND_CAPTURE",
                "paymentMethod": "PSE",
                "paymentCountry": "CO",
                "deviceSessionId": "vghs6tvkcle931686k1900o6e1",
                "ipAddress": "127.0.0.1",
                "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
                "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
            }
        }

    }
}