import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputCustom from "../../components/InputCustom";
import Notification from "../../components/Notification";
import Logo from "../../assets/imgs/Logo.jpeg"
import { perguntas, resultados } from "../../utils/perguntasDisc"
import { postDisc } from "../../apis/apiTestesAxia";
import ConceptsModal from "../../components/modals/ConceptsModal";

type PayloadDISC = {
  nome: string;
  vaga: string;
  email: string;
  respostas: Record<string, string>;
};

function TesteDISC() {
  const navigate = useNavigate();
  const [payload, setPayload] = useState<PayloadDISC>({
    nome: "",
    vaga: "",
    email: "",
    respostas: {},
  });
  const [stateNotification, setStateNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [modalOpen, setModalOpen] = useState(false)
  const [descricao, setDescricao] = useState("")

  const handleInputChange = (event: any) => {
    console.log(event)
    const { name, value } = event.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRespostaChange = (perguntaId: string, valor: string) => {
    setPayload((prev) => ({
      ...prev,
      respostas: {
        ...prev.respostas,
        [perguntaId]: valor,
      },
    }));
  };

  const handleSubmit = async () => {
    const result = await postDisc(payload)
    if (result.status === 200) {
      setNotificationMessage("Respostas enviadas com sucesso!");
      setStateNotification(true);

      const totalD = Object.entries(payload.respostas).filter((resposta) => resposta[1] === "D")
      const totalI= Object.entries(payload.respostas).filter((resposta) => resposta[1] === "I")
      const totalS = Object.entries(payload.respostas).filter((resposta) => resposta[1] === "S")
      const totalC = Object.entries(payload.respostas).filter((resposta) => resposta[1] === "C")

      const maiorLetra = [totalD, totalI, totalS, totalC].reduce((prev, curr) => {
        if (curr.length > prev.length) prev = curr
        return prev
      })[0] || ""

      setDescricao(resultados.find((resultado) => resultado.letra === maiorLetra[1])!.descricao)
      setModalOpen(true)

    }
  };

  const opacity = Math.max(1 - scrollY / 300, 0);
  const opacityBg = Math.min(scrollY / 300, 1);
  // efeito leve de parallax
  const translateY = Math.min(scrollY / 30, 100);
  // aplica blur progressivo (até 10px quando rolar 300px ou mais)
  const blur = Math.min(scrollY / 30, 10);

  return (
  /*  <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/imagens/Logo.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // 🔑 mantém fixo
        opacity: opacityReverse
      }}
    > */
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <div>
            <Grid container item flexDirection={"column"} display={"flex"} alignItems={"center"} justifyContent={"center"} margin={"16px, 0, 0 ,0"} padding={0} sx={{ backgroundColor: "#f7f7f700"}}>
              <Grid item xs={6} textAlign={"center"}>
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url('/imagens/Logo.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    zIndex: -2,
                    opacity: opacityBg, // 🔑 aparece conforme rola
                    transition: "opacity 0.3s ease-out",
                  }}
                />
                <img src={Logo} alt="Logo"
                  style={{
                    position: "relative",
                    width: "100%",
                    objectFit: "cover",
                    opacity: opacity,
                    transform: `translateY(${translateY}px)`,
                    filter: `blur(${blur}px)`,
                    transition: "opacity 0.2s ease-out, filter 0.2s ease-out",
                  }}
                />
              </Grid>
              <hr></hr>
              <Grid item container xs={4} mt={2} p={2} sx={{ backgroundColor: "#fff", boxShadow: "4px 4px 8px 0px gray" }} justifyContent={"center"} border={"2px solid #e7ebee"} borderRadius={2}>
                <Grid item xs={12} textAlign={"left"}>
                  <span className="page-title">TESTE DISC</span>              
                </Grid>
                <Grid item xs={12} textAlign={"left"}>
                  <p>
                    Responda com sinceridade. Este teste ajudará a identificar seu perfil
                    comportamental predominante, para que possamos entender melhor seu estilo
                    de trabalho e interação com os outros.
                  </p>              
                </Grid>
              </Grid>
            </Grid>

            {/* Identificação */}    
            <Grid xs={12} display={"flex"} mt={2} justifyContent={"center"} margin={"16px, 0, 0 ,0"} padding={0} sx={{ backgroundColor: "#f7f7f700"}}>
              <Grid display={"flex"} container xs={4} padding={2} sx={{ backgroundColor: "#fff", boxShadow: "4px 4px 8px 0px gray" }} justifyContent={"center"} border={"2px solid #e7ebee"} borderRadius={2}>
                <Grid item xs={12} textAlign={"left"}>
                  <span className="input-label">Nome completo:</span>
                  <InputCustom
                    placeholder=""
                    name="nome"
                    controlledValue={payload.nome}
                    handleChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} textAlign={"left"}>
                  <span className="input-label">Email:</span>
                  <InputCustom
                    placeholder=""
                    name="email"
                    controlledValue={payload.email}
                    handleChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} textAlign={"left"}>
                  <span className="input-label">Vaga pretendida:</span>
                  <InputCustom
                    placeholder=""
                    name="vaga"
                    controlledValue={payload.vaga}
                    handleChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>    

            {/* Perguntas */}
            <Box sx={{ backgroundColor: "#f7f7f700", borderRadius: "5px" }} mt={2} display={"flex"} justifyContent={"center"}>
              <Grid container xs={4}>
                {perguntas.map((pergunta) => (
                  <Grid key={pergunta.id} xs={12} container padding={2} sx={{ mb: 2, backgroundColor: "#fff", boxShadow: "4px 4px 8px 0px gray" }} justifyContent={"center"} border={"2px solid #e7ebee"} borderRadius={2} >
                    <Grid item xs={12}>
                      <strong>{pergunta.texto}</strong>
                    </Grid>
                    {Object.entries(pergunta.opcoes).map(([letra, texto]) => (
                      <Grid item xs={12} key={letra}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <input
                            type="radio"
                            name={pergunta.id}
                            value={letra}
                            checked={payload.respostas[pergunta.id] === letra}
                            onChange={(e) => handleRespostaChange(pergunta.id, e.target.value)}
                          />
                          {`(${letra}) ${texto}`}
                        </label>
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Grid container justifyContent="center" mt={3} sx={{backgroundColor: "#fff"}} py={8}>
              <Button
                variant="contained"
                className="btn-primario"
                onClick={handleSubmit}
              >
                Enviar Respostas e ver Resultado
              </Button>
              <Button
                variant="contained"
                className="btn-secundario"
                sx={{ ml: 2 }}
                onClick={() => navigate(-1)}
              >
                Voltar
              </Button>
            </Grid>

            <Notification
              message={notificationMessage}
              open={stateNotification}
              handleClose={() => setStateNotification(false)}
            />
          </div>
        </Grid>
        <ConceptsModal open={modalOpen} title="Seu perfil é:" description={descricao}/>
      </Grid>
    /* </Box> */
  );
}

export default TesteDISC;
