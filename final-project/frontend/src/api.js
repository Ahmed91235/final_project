// api.js
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { API_URL } from './config';

export async function fetchTasks() {
  const session = await Auth.currentSession();
  console.log("Access Token: ", session.getAccessToken().getJwtToken());
  console.log("ID Token: ", session.getIdToken().getJwtToken());

  const token = session.getAccessToken().getJwtToken();
  console.log("ACCESS TOKEN:", token);

  const response = await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function createTask(task) {
  const session = await Auth.currentSession();
  const token = session.getAccessToken().getJwtToken();
  console.log("Access Token (createTask):", token);
  await axios.post(`${API_URL}/tasks`, task, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
