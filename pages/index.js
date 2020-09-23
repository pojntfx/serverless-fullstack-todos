import useSWR from "swr";
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
  const { data, err } = useSWR("/api/todos", fetcher, {
    initialData: props.todos,
  });

  if (err) return <div>😞 Failed to load todos</div>;
  if (!data) return <div>⌛ Loading todos ...</div>;

  return (
    <div>
      <h1>Todos</h1>

      <ul>
        {data.map((todo, index) => (
          <li key={index}>
            <div>
              <h2>{todo.title}</h2>
              <p>{todo.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
