import { useState } from "react";
import { api } from "../../services/api";
import { Container, Form } from "./styles";
import { Input } from "../../components/Input/";
import { Button } from "../../components/Button/";
import { Link, useNavigate } from "react-router-dom";
export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSignUp() {
    const regEx =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    if (!name || !email || !password) {
      return alert("Preencha todos os campos!");
    }
    if (password.length < 6) {
      return alert("Por favor, sua senha precisa ter mais de 6 caracteres");
    }
    if (!regEx.test(email)) {
      return alert("o email inserido não é valido");
    }
    api
      .post("/users", { name, email, password })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          alert("Não foi possível cadastrar");
        }
      });
  }
  return (
    <Container>
      <div>
        <svg
          width="44"
          height="48"
          viewBox="0 0 44 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.0318 0.216515L43.4349 12.0919V35.8426L22.0318 47.7179L0.628698 35.8426V12.0919L22.0318 0.216515Z"
            fill="#065E7C"
          />
        </svg>
        <h1>food explorer</h1>
      </div>

      <Form>
        <h2>Crie sua conta!</h2>
        <Input
          title="Nome"
          type="text"
          label="nome"
          placeholder="Exemplo: Maria da Silva"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          title="Email"
          type="email"
          label="email"
          placeholder="exemplo@exemplo.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          title="Senha"
          label="password"
          type="password"
          placeholder="No mínimo 6 caracteres"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignUp} title={"Criar conta"} />
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </Container>
  );
}
