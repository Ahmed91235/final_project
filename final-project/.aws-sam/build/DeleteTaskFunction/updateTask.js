const { DynamoDB } = require('aws-sdk');
const ddb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event, null, 2));
  const userId = event.requestContext.authorizer.claims.sub;
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

  const result = await ddb.update(params).promise();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.Attributes)
  };
};
