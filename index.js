const Commander = require("commander");
const Database = require("./Database");
const Heroi = require("./Heroi");

async function main(){
  Commander
    .version('version 01')

    .option('-n, --nome [value]', "Nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")
    .option('-i, --id [value]', "Id do heroi")

    .option('-c, --cadastrar', "Cadastrar Heroi")

    .option('-l, --listar', "Listar Heroi")

    .option('-r, --remover', "Remover heroi por id")    

    .option('-a, --atualizar [value]', "Atualizar heroi pelo id")    

    .parse(process.argv);  

    const heroi = new Heroi(Commander);

    try {
      if(Commander.cadastrar){
        delete heroi.id;
        const resultado = await Database.cadastrar(heroi);
        if(!resultado){
          console.error('Heroi não foi cadastrado!');
          return;
        }

        console.log("Heroi cadastrado com sucesso!");
      }

      if(Commander.listar){
        const resultado = await Database.listar();
        (resultado.length === 0) ? console.log("Nenhum heroi cadastrado!") : 
        console.log('Resultado', resultado);
        
        return;
      }

      if(Commander.remover){
        const resultado = await Database.remover(heroi.id);
        if(!resultado) {
          console.error("Não foi possível remover herói!");
          return;
        }

        console.log("Heroi removido com sucesso!");
      }

      if(Commander.atualizar){
        const idParaAtualizar = parseInt(Commander.atualizar);
        const dado = JSON.stringify(heroi);
        const heroiAtualizar = JSON.parse(dado);
        const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);

        if(!resultado){
          console.error("Não foi possível atualizar o heroi!");
          return;
        }

        console.log("Heroi atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Deu ruim!", error);
    }
} 

main();