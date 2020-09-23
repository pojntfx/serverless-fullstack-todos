import query from "../../../lib/db";

const todo = async (req, res) => {
  switch (req.method) {
    case "GET":
      const [
        todo,
      ] = await query`select * from todos where id = ${req.query.todoId};`;

      if (!todo) {
        res.statusCode = 404;
        res.end("todo not found");

        return;
      }

      res.statusCode = 200;
      res.json({
        id: todo.id,
        title: todo.title,
        body: todo.body,
      });

      return;

    default:
      res.statusCode = 405;
      res.end("method not allowed");

      return;
  }
};

export default todo;
