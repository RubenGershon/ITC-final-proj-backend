import fs from "fs";

async function readUsers() {
  const response = await fs.promises.readFile("src/data/users.json");
  return JSON.parse(response);
}

async function login(username, password) {
  //const users = await readUsers();
  //const user = users.find(
    //(user) => user.username === username && user.password === password
  //);
  //return user;
  return "Logged In"
}

export default { login };
