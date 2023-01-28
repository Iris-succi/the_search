import React from "react";
import Logo from "../assets/logo-wave.png";
import Waves from "../assets/waves.png";
import Wave from "../assets/wave.svg";

export default function HomePage() {
  return (
    <div className="w-screen">
      <div className="border-b">
        <img src={Logo} alt="Logo" className="w-20 pl-2" />
      </div>
      <div className="flex  flex-col items-center ">
        <h1 className="text-4xl font-oxygen pt-20 pb-10">
          Vous souhaitez trouver les meilleurs spots de surf ?
        </h1>
        <h2 className="text-center font-light">
          De l'Australie au Costa Rica, qui n’a jamais rêvé de se lancer <br />à
          l’assaut des plus belles vagues du monde ?
        </h2>
        <img src={Waves} alt="Waves" className="pt-10 w-44" />
      </div>
      <div className="flex items-center justify-center pt-20">
        <button type="button">Connexion | </button>
        <button type="button">| Inscription</button>
      </div>
      <img src={Wave} alt="header bottom" className="absolute bottom-0" />
    </div>
  );
}
