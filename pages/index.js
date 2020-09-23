import useSWR, { mutate } from "swr";
import fetcher from "../lib/fetcher";

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

  return (
    <div>
      <h1>Todos</h1>

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
