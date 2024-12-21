const { DynamoDB } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const ddb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event, null, 2));

  const userId = event.requestContext.authorizer.claims.sub; // Cognito user sub
  const body = JSON.parse(event.body);

  const taskItem = {
    UserId: userId,
    TaskId: uuidv4(),
    title: body.title,
    description: body.description || "",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await ddb.put({
    TableName: TABLE_NAME,
    Item: taskItem
  }).promise();

  return {
    statusCode: 201,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskItem)
  };
};
