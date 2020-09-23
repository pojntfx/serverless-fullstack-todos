import query from "../../lib/db";

const todos = async (req, res) => {
  switch (req.method) {
    case "POST":
      if (!req.body.title || !req.body.body) {
        res.statusCode = 422;
        res.end("missing todo title or body");

        return;
      }

      const [newTodo] = await query`insert into todos (title, body)
values (${req.body.title}, ${req.body.body})
returning *;`;

      res.statusCode = 201;
      res.json({ id: newTodo.id, title: newTodo.title, body: newTodo.body });

      return;
    default:
      res.statusCode = 405;
      res.end("method not allowd");

      return;
  }
};

export default todos;
