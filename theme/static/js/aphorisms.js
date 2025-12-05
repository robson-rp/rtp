const aphorisms = [
    "O código é poesia escrita para máquinas.",
    "A consciência é apenas um loop recursivo complexo?",
    "Nós moldamos nossas ferramentas, e depois nossas ferramentas nos moldam. - Marshall McLuhan",
    "A simplicidade é o último grau de sofisticação. - Leonardo da Vinci",
    "Programar é a arte de dizer a outro humano o que se quer que o computador faça. - Donald Knuth",
    "A inteligência artificial não é artificial, é o reflexo cristalizado da inteligência coletiva humana.",
    "O silêncio entre as notas é tão importante quanto as notas em si.",
    "Refatorar é o ato de limpar a mente através do código.",
    "A verdadeira viagem de descobrimento não consiste em procurar novas paisagens, mas em ter novos olhos. - Marcel Proust",
    "Um algoritmo é uma opinião envolta em matemática.",
    "A tecnologia é a fogueira moderna ao redor da qual contamos nossas histórias.",
    "O bug não está no código, está no pensamento.",
    "A entropia do software tende ao infinito se não for contida pela disciplina.",
    "Somos os arquitetos de nossas próprias prisões digitais ou jardins virtuais?",
    "A lógica leva você de A a B. A imaginação leva você a qualquer lugar. - Einstein"
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('aphorism-container');
    if (!container) return;

    const randomIndex = Math.floor(Math.random() * aphorisms.length);
    const quote = aphorisms[randomIndex];

    container.innerHTML = `<p class="aphorism-text">"${quote}"</p>`;
    container.style.opacity = 0;
    
    setTimeout(() => {
        container.style.transition = 'opacity 1s ease';
        container.style.opacity = 1;
    }, 500);
});