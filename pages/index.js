import useSWR, { mutate } from "swr";
import fetcher from "../lib/fetcher";
import { useState } from "react";

export const getServerSideProps = async ({ req }) => {
  const todos = await fetcher(`http://${req.headers.host}/api/todos`);

  return {
    props: {
      todos,
    },
  };
};

const Home = (props) => {
  const { data: todos, err } = useSWR("/api/todos", fetcher, {
    initialData: props.todos,
  });

  if (err) return <div>😞 Failed to load todos</div>;
  if (!todos) return <div>⌛ Loading todos ...</div>;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div>
      <h1>Todos</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const newTodo = {
            title,
            body,
          };

          setTitle("");
          setBody("");

          mutate(
            "/api/todos",
            [...todos, { id: Date.now(), ...newTodo }],
            false
          );

          await fetcher("/api/todos", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          mutate("/api/todos");
        }}
      >
        <label>
          New todo title:{" "}
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <br />

        <label>
          New todo body:{" "}
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </label>

        <br />

        <input type="submit" value="Create todo" />
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <div>
              <h2>{todo.title}</h2>
              <p>{todo.body}</p>
              <button
                onClick={async () => {
                  mutate(
                    "/api/todos",
                    todos.filter((oldTodo) => oldTodo.id != todo.id),
                    false
                  );

                  await fetch(`/api/todos/${todo.id}`, {
                    method: "DELETE",
                  });

                  mutate("/api/todos");
                }}
              >
                Delete Todo
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
