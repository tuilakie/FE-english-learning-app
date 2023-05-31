import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useLogoutUserMutation,
  useWhoamiQuery,
  useGenerateTokenMutation,
} from "./redux/api/authApi";
function App() {
  const [login] = useLoginUserMutation();
  const [logout] = useLogoutUserMutation();
  const [generateToken] = useGenerateTokenMutation();
  const { data } = useWhoamiQuery();

  console.log(data);

  return (
    <>
      <div className="App">
        <h1>Hello</h1>
        <button
          onClick={async () => {
            const res = await login({
              email: "ntneik15@gmail.com",
              password: "123456",
            }).unwrap();
            console.log(res);
          }}
        >
          Login
        </button>
        <button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
        <button
          onClick={async () => {
            const res = await generateToken().unwrap();
            console.log(res);
          }}
        >
          Generate Token
        </button>
      </div>
    </>
  );
}

export default App;
