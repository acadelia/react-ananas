import { useState } from "react";

const initialFormState = {
  username: '',
  password: '',
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [remember, setRemember] = useState(false);

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="username"
          id="username"
          value={formState.username}
          placeholder="username"/>
        <input
          type="text"
          onChange={handleChange}
          name="password"
          id="password"
          value={formState.password}
          placeholder="password"/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
