import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { useState } from "react";

const Home = () => {
  const [name, setName] = useState("");

  const { data, err } = useSWR(
    () => name != "" && `/api/greeting?name=${name}`,
    fetcher
  );

  if (err) return <div>😞 Failed to load</div>;
  if (!data) return <div>⌛ Loading ...</div>;

  return (
    <div>
      <h1>Greetings Generator</h1>

      {name && <div>Message from the API: {data.message}</div>}

      <input
        placeholder="Your name"
        values={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default Home;
