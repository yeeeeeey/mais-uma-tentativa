import { useState } from "react";
import LogisticsHero from "../landing/LogisticsHero";
import VantagensSection from "../landing/Vantagens";
import ComoFuncionaSection from "../landing/ComoFunciona";
import PlanosSection from "../landing/Planos";
import FooterSection from "../landing/Footer";
import SignupForm from "./Cadastro";
import LoginScreen from "./login";
import DashboardScreen from "./Dashboard";

// Fluxo entre as telas:
// início (landing) -> cadastro <-> login -> dashboard -> sair (volta ao login)
function App() {
  const [tela, setTela] = useState("inicio");
  const [usuario, setUsuario] = useState(null);
  const [emailLogin, setEmailLogin] = useState("");

  function irParaLogin(email = "") {
    setEmailLogin(email);
    setTela("login");
  }

  function irParaCadastro() {
    setTela("cadastro");
  }

  function entrarNoSistema(dadosUsuario) {
    setUsuario(dadosUsuario);
    setTela("dashboard");
  }

  function sair() {
    setUsuario(null);
    irParaLogin();
  }

  if (tela === "dashboard" && usuario) {
    return <DashboardScreen usuario={usuario} onSair={sair} />;
  }

  if (tela === "login") {
    return (
      <LoginScreen
        emailInicial={emailLogin}
        onGoToSignup={irParaCadastro}
        onLogin={entrarNoSistema}
      />
    );
  }

  if (tela === "cadastro") {
    return <SignupForm onGoToLogin={irParaLogin} />;
  }

  return (
    <>
      <LogisticsHero onEntrar={() => irParaLogin()} onComecar={irParaCadastro} />
      <VantagensSection />
      <ComoFuncionaSection />
      <PlanosSection onEscolherPlano={irParaCadastro} />
      <FooterSection />
    </>
  );
}

export default App;