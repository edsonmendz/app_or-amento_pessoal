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

	recuperarTodosRegistros() {

		//array de despesas

		let despesas = Array()

		let id = localStorage.getItem('id')
		// permite recuperar uma a uma despesa cadastrada em local storage
		for (let i = 1; i<=id; i++) {
			let despesa = JSON.parse(localStorage.getItem(i))

			if (despesa === null) {			
				continue
			}
			despesa.id = i
			despesas.push(despesa)
		}
		return despesas
	}

	pesquisar(despesa) {
		let despesasFiltradas = Array ()
		despesasFiltradas = this.recuperarTodosRegistros()

		if (despesa.ano != ''){
		despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}

		if (despesa.mes != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		if (despesa.dia != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		if (despesa.tipo != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}
		
		if (despesa.descricao != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		if (despesa.valor != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}
		return despesasFiltradas
	}	

	remover(id) {
		localStorage.removeItem(id)
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
		document.getElementById('botao').innerHTML = 'Fechar'
		bd.gravar(despesa)		
		$('#chamarModal').modal('show')
		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''
	} else {
		document.getElementById('titulo').className = 'modal-header text-danger'
		document.getElementById('exampleModalLabel').innerHTML = 'Algum campo está incorreto.'
		document.getElementById('resposta').innerHTML = 'Despesa não foi registrada'
		document.getElementById('botao').className = 'btn btn-danger'
		document.getElementById('botao').innerHTML = 'Voltar e corrigir'
		

		$('#chamarModal').modal('show')
	}
}

function carregaListaDespesas( despesas = Array (), filtro = false) {

	if (despesas.length == 0 && filtro == false) {
		despesas = bd.recuperarTodosRegistros()
	}	
	
	//selecionando o elemento tbody da tabela
	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''


	/* 
	<tr>
	    <td>15/03/2018</td>
	    <td>Alimentação</td>
	    <td>Compras do mês</td>
	    <td>666</td>
	</tr>`
    */

    //percorrer ARRAY despesas, listando cada despesa de forma diNãmica

    despesas.forEach(function(d) {    	
    	//criando a linha <tr>
    	let linha = listaDespesas.insertRow()
    	//inserir valores, criar as colunas
    	linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}` 
    	//ajustar o tipo
    	switch(d.tipo) {
	    	case '1': d.tipo = 'Alimentação'
	    		break
	    	case '2': d.tipo = 'Educação'
	    		break
	    	case '3': d.tipo = 'Lazer'
	    		break
	    	case '4': d.tipo = 'Saúde'
	    		break
	    	case '5': d.tipo = 'Transporte'
	    		break
       	}
    	linha.insertCell(1).innerHTML = d.tipo
    	linha.insertCell(2).innerHTML = d.descricao
    	linha.insertCell(3).innerHTML = d.valor

		// criar botão de exclusão
		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class=" fas fa-times"></i>'
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function() {			
			let id = this.id.replace('id_despesa_','')

			bd.remover(id)

			window.location.reload()

		}
		linha.insertCell(4).append(btn)

		console.log(d)

    	
    })	
}

function pesquisarDespesa() {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	let despesas = bd.pesquisar(despesa)

	this.carregaListaDespesas(despesas, true)
	
}

