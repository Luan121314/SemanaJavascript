//IIFE => Immeately Invoked Function Expression
(() => {

    const BTN_REINICIAR = "btnReiniciar";
    const ID_CONTADOR = "contador";
    const VALOR_CONTADOR = 100;
    const PERIODO_INTERVALO = 100;

    class ContadorComponent {
        constructor() {
            this.inicializar()
        }

        prepararContadorProxy() {
            const handler = {
                set: (currentContext, propertyKey, newValue) => {
                    // console.log({ currentContext, propertyKey, newValue });

                    if (!currentContext.valor) {
                        currentContext.efetuarParada();
                    }
                    currentContext[propertyKey] = newValue;

                    return true;
                }
            }

            const contador = new Proxy({
                valor: VALOR_CONTADOR,
                efetuarParada: () => { }
            }, handler);

            return contador;
        }

        atualizarTexto = ({ elementoContador, contador }) => function () {
            const identificadorTexto = "$$contador";
            const textoPadrao = `Começando em <strong> ${identificadorTexto} </strong> segundos...`;
            elementoContador.innerHTML = textoPadrao.replace(identificadorTexto, contador.valor--);
        }

        agendarParadaContador({ elementoContador, idIntervalo }) {
            return () => {
                clearInterval(idIntervalo)
                elementoContador.innerHTML = "";
                this.desabilitarBotao(false);

            }
        }

        prepararBotao(elemetoBotao, iniciarFn) {
            elemetoBotao.addEventListener("click", iniciarFn.bind(this));
            return (valor = true) => {
                const atributo = 'disabled';
                if (valor) {
                    elemetoBotao.setAttribute(atributo, valor);
                    return;
                }

                elemetoBotao.removeAttribute(atributo);
            }
        }

        inicializar() {
            const elementoContador = document.getElementById(ID_CONTADOR);
            const contador = this.prepararContadorProxy();

            const argumentos = {
                elementoContador,
                contador
            }

            const fn = this.atualizarTexto(argumentos);
            const idIntervalo = setInterval(fn, PERIODO_INTERVALO);

            {

                const elementoBotao = document.getElementById(BTN_REINICIAR);
                const desabilitarBotao = this.prepararBotao(elementoBotao, this.inicializar);
                desabilitarBotao();
                const argumentos = { elementoContador, idIntervalo }
                // const desabilitarBotao = () => console.log("Desabilitou..");
                const paraContadorFn = this.agendarParadaContador.apply({ desabilitarBotao }, [argumentos])
                contador.efetuarParada = paraContadorFn

            }

        }
    }
    window.ContadorComponent = ContadorComponent;
})()
