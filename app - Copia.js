class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {
		for (let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null || (this.dia < 1 || this.dia >30)) {
				return false
			}			
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if (id === null) {
			localStorage.setItem('id', 0 )
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {		
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	

}

let bd = new Bd ()

function cadastrarDespesa() {
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa (
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	)

	if (despesa.validarDados()) {
		document.getElementById('titulo').className = 'modal-header text-success'
		document.getElementById('exampleModalLabel').innerHTML = 'Gravação bem sucedida!'
		document.getElementById('resposta').innerHTML = 'Despesa registrada com sucesso!'
		document.getElementById('botao').className = 'btn btn-success'
		//bd.gravar(despesa)
		$('#chamarModal').modal('show')
	} else {
		$('#chamarModal').modal('show')
	}
}