class GerenciaEstacio {
    constructor() {
        if (GerenciaEstacio.instancia) {
            return GerenciaEstacio.instancia;
        }

        this.totalVagas = 10;
        this.veiculos = [];
        GerenciaEstacio.instancia = this;
    }

    static getInstance() {
        if (!GerenciaEstacio.instancia) {
            GerenciaEstacio.instancia = new GerenciaEstacio();
        }
        return GerenciaEstacio.instancia;
    }

    addVeiculo(placa, modelo) {
        if (this.veiculos.length >= this.totalVagas) {
            return "Estacionamento Lotado!";
        }

        const placaFormatada = placa.toUpperCase();
        for (const v of this.veiculos) {
            if (v.placa === placaFormatada) {
                return `Veículo com a placa ${placaFormatada} já está estacionado.`;
            }
        }

        const veiculo = {
            placa: placaFormatada,
            modelo: modelo
        };
        this.veiculos.push(veiculo);

        console.log("VEÍCULO ADICIONADO ----------------");
        console.log(`${veiculo.placa} - ${veiculo.modelo}`);

        return true;
    }

    removerVeiculo(placa) {
        const placaFormatada = placa.toUpperCase();
        let index = -1;

        for (let i = 0; i < this.veiculos.length; i++) {
            if (this.veiculos[i].placa === placaFormatada) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            return `Veículo com a placa ${placaFormatada} não foi encontrado.`;
        }

        const veiculoRemovido = this.veiculos.splice(index, 1)[0];

        console.log("VEÍCULO REMOVIDO ----------------");
        console.log(`${veiculoRemovido.placa} - ${veiculoRemovido.modelo}`);

        return true;
    }
}

const estacionamento1 = GerenciaEstacio.getInstance();
const estacionamento2 = GerenciaEstacio.getInstance();

console.log("Estacionamento 1", estacionamento1);
console.log("Estacionamento 2", estacionamento2);
console.log("Mesma Instancia:", estacionamento1 === estacionamento2);


function entrarVeiculo() {
    const placa = document.getElementById("placa").value.trim();
    const modelo = document.getElementById("modelo").value.trim();

    if (!placa || !modelo) {
        exibirMensagem("Preencha a Placa e o Modelo.");
        return;
    }

    const estacionamento = GerenciaEstacio.getInstance();
    const resultado = estacionamento.addVeiculo(placa, modelo);

    if (resultado === true) {
        exibirMensagem(`Veículo ${placa.toUpperCase()} - ${modelo} adicionado!`);
        limparCamposTexto();
        atualizarInterface();
    } else {
        exibirMensagem(resultado); 
    }
}

function sairVeiculo() {
    const placa = document.getElementById("placa").value.trim();

    if (!placa) {
        exibirMensagem("Informe a Placa do veículo.");
        return;
    }

    const estacionamento = GerenciaEstacio.getInstance();
    const resultado = estacionamento.removerVeiculo(placa);

    if (resultado === true) {
        exibirMensagem(`Veículo ${placa.toUpperCase()} removido com sucesso!`);
        limparCamposTexto();
        atualizarInterface();
    } else {
        exibirMensagem(resultado); 
    }
}

function limparCampos() {
    limparCamposTexto();
    exibirMensagem("Nenhuma operação realizada.");
}

function limparCamposTexto() {
    document.getElementById("placa").value = "";
    document.getElementById("modelo").value = "";
}

function exibirMensagem(texto) {
    document.getElementById("mensagem").innerText = texto;
}

function atualizarInterface() {
    const estacionamento = GerenciaEstacio.getInstance();

    const ocupadas = estacionamento.veiculos.length;
    const disponiveis = estacionamento.totalVagas - ocupadas;

    document.getElementById("totalVagas").innerText = estacionamento.totalVagas;
    document.getElementById("vagasOcupadas").innerText = ocupadas;
    document.getElementById("vagasDisponiveis").innerText = disponiveis;

    const lista = document.getElementById("listaVeiculos");

    if (estacionamento.veiculos.length === 0) {
        lista.innerHTML = "<li>Nenhum veículo estacionado.</li>";
    } else {
        let html = "";
        for (const veiculo of estacionamento.veiculos) {
            html += `<li>${veiculo.placa} - ${veiculo.modelo}</li>`;
        }
        lista.innerHTML = html;
    }
}