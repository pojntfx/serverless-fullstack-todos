import query from "../../lib/db";

const todos = async (req, res) => {
  switch (req.method) {
    case "POST":
      res.statusCode = 201;
      res.json({ id: 1, title: req.body.title, body: req.body.body });

      const newTodo = await query`insert into todos (title, body)
values ('First todo title', 'First todo body')
returning *;`;

      console.log(newTodo);

      return;
    default:
      res.statusCode = 405;
      res.end("method not allowd");

      return;
  }
};

export default todos;
