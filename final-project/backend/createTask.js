const { DynamoDB } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const ddb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event, null, 2));

  // Use a default userId since we're not using authorizer
  const userId = "public-user";
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

  const params = {
    TableName: TABLE_NAME,
    Item: taskItem
  };

  try {
    await ddb.put(params).promise();
    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS,PUT,DELETE"
      },
      body: JSON.stringify(taskItem)
    };
  } catch (error) {
    console.error("Error creating task:", error);
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
