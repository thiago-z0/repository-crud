const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

let repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const id = uuid();

  const repository = {
    id,
    url,
    title,
    techs,
    likes: 0 
  }

  repositories.push(repository)

  const index = repositories.indexOf(repository);

  return response.json(repositories[index])
});

app.put("/repositories/:id", (request, response) => {
  const { url, title, techs } = request.body;
  const { id } = request.params;

  const found = repositories.find(element => element.id === id);

  if(found === undefined) return response.status(400).json({ info: 'Repository not found' })
  
  const index = repositories.indexOf(found);

    repositories[index] = {
      id: repositories[index].id,
      url,
      title,
      techs,
      likes: repositories[index].likes,
    };

    return response.json(repositories[index])
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const found = repositories.find(element => element.id === id);

  if(found === undefined) return response.status(400).json({ info: 'Repository not found' })

  repositories.splice(repositories.indexOf(found), 1);
  
  return response.status(204).json({ok: true});
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const found = repositories.find(element => element.id === id);

  if(found === undefined) return response.status(400).json({ info: 'Repository not found' })
  
  const index = repositories.indexOf(found);

    repositories[index] = {
      id: repositories[index].id,
      url: repositories[index].url,
      title: repositories[index].title,
      techs: repositories[index].techs,
      likes: repositories[index].likes + 1,
    };

    return response.json(repositories[index])
});

module.exports = app;
