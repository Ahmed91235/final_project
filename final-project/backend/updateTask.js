const { DynamoDB } = require('aws-sdk');
const ddb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event, null, 2));

  // Use a default userId since we're not using authorizer
  const userId = "public-user";
  const { taskId } = event.pathParameters;
  const body = JSON.parse(event.body);

  const params = {
    TableName: TABLE_NAME,
    Key: { UserId: userId, TaskId: taskId },
    UpdateExpression: "set title = :title, description = :desc, status = :status, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":title": body.title,
      ":desc": body.description,
      ":status": body.status,
      ":updatedAt": new Date().toISOString()
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await ddb.update(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS,PUT,DELETE"
      },
      body: JSON.stringify(result.Attributes)
    };
  } catch (error) {
    console.error("Error updating task:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS,PUT,DELETE"
      },
      body: JSON.stringify({ message: "Internal server error" })
    };
  }
};
