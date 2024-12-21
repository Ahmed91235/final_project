const { DynamoDB } = require('aws-sdk');
const ddb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event, null, 2));

  const userId = event.requestContext.authorizer.claims.sub;
  const { taskId } = event.pathParameters;

  await ddb.delete({
    TableName: TABLE_NAME,
    Key: { UserId: userId, TaskId: taskId }
  }).promise();

  return {
    statusCode: 204,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  };
};
