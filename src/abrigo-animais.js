import readline from 'readline'

class AbrigoAnimais {
  verificarAdocao(listaBrinquedosPorPessoa, nomesAnimais) {
    const animaisRegistrados = {
      Rex: { especie: 'cão', brinquedosFavoritos: ['RATO', 'BOLA'] },
      Mimi: { especie: 'gato', brinquedosFavoritos: ['BOLA', 'LASER'] },
      Fofo: { especie: 'gato', brinquedosFavoritos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { especie: 'gato', brinquedosFavoritos: ['RATO', 'BOLA'] },
      Bola: { especie: 'cão', brinquedosFavoritos: ['CAIXA', 'NOVELO'] },
      Bebe: { especie: 'cão', brinquedosFavoritos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { especie: 'jabuti', brinquedosFavoritos: ['SKATE', 'RATO'] },
    };

    const listaAdocoes = [];

    for (const nomeAnimal of nomesAnimais) {
      const animal = animaisRegistrados[nomeAnimal];
      if (!animal) return { erro: 'Animal inválido', lista: null };

      const candidatos = [];

      for (const brinquedosPessoa of listaBrinquedosPorPessoa) {
        if (nomeAnimal === 'Loco') {
          const temTodos = animal.brinquedosFavoritos.every(b => brinquedosPessoa.includes(b));
          const jaAdotouOutro = listaAdocoes.some(r => r.startsWith(brinquedosPessoa.join(',') + ' -'));
          if (temTodos && jaAdotouOutro) candidatos.push(brinquedosPessoa);
        } else {
          let pos = 0;
          for (const brinquedo of brinquedosPessoa) {
            if (brinquedo === animal.brinquedosFavoritos[pos]) pos++;
            if (pos === animal.brinquedosFavoritos.length) break;
          }
          if (pos === animal.brinquedosFavoritos.length) candidatos.push(brinquedosPessoa);
        }
      }

      if (candidatos.length === 1) {
        const adotante = candidatos[0].join(',');
        const qtdAdocoes = listaAdocoes.filter(r => r.startsWith(adotante + ' -')).length;
        if (qtdAdocoes < 3) listaAdocoes.push(`${adotante} - abriga o ${nomeAnimal}`);
      }
    }

    return { erro: false, lista: listaAdocoes };
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const abrigo = new AbrigoAnimais();
const listaBrinquedos = [];
const animais = [];

console.log("Digite os brinquedos para cada pessoa (separados por espaço). Digite 'fim' quando terminar:");

function perguntarBrinquedos() {
  rl.question('Brinquedos: ', (resposta) => {
    if (resposta.toLowerCase() === 'fim') {
      perguntarAnimais();
    } else {
      listaBrinquedos.push(resposta.toUpperCase().split(' '));
      perguntarBrinquedos();
    }
  });
}

function perguntarAnimais() {
  console.log("\nAgora digite os nomes dos animais (separados por espaço):");
  rl.question('Animais: ', (resposta) => {
    const animaisInput = resposta.split(' ');
    animaisInput.forEach(animal => {
      animais.push(animal.charAt(0).toUpperCase() + animal.slice(1).toLowerCase());
    });
    
    const resultado = abrigo.verificarAdocao(listaBrinquedos, animais);
    console.log('\nResultado:', resultado);
    rl.close();
  });
}
 
perguntarBrinquedos();
export {AbrigoAnimais};
 export {AbrigoAnimais as AbrigoAnimais};