const { DynamoDB } = require('aws-sdk');
const ddb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event, null, 2));

  const userId = event.requestContext.authorizer.claims.sub;

  const result = await ddb.query({
    TableName: TABLE_NAME,
    KeyConditionExpression: "UserId = :uid",
    ExpressionAttributeValues: {
      ":uid": userId
    }
  }).promise();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.Items)
  };
};
