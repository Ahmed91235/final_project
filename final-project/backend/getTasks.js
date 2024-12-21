const { DynamoDB } = require('aws-sdk');
const ddb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event, null, 2));

  // Since the authorizer is removed, we don't have claims.
  // Use a default userId or handle it differently as needed.
  const userId = "public-user"; // You can customize this if you want a unique user or some logic.

  try {
    const result = await ddb.query({
      TableName: TABLE_NAME,
      KeyConditionExpression: "UserId = :uid",
      ExpressionAttributeValues: {
        ":uid": userId
      }
    }).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
      },
      body: JSON.stringify(result.Items || [])
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
      },
      body: JSON.stringify({ message: "Internal server error" })
    };
  }
};
