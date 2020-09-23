const todo = async (req, res) => {
  switch (req.method) {
    case "GET":
      res.statusCode = 200;
      res.json({ id: 1, title: "asdf", body: "asdfasdf" });

      return;
    default:
      res.statusCode = 405;
      res.end("method not allowed");

      return;
  }
};

export default todo;
