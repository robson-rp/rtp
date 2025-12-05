document.addEventListener('DOMContentLoaded', () => {
    // Criar elementos do chat
    const chatWidget = document.createElement('div');
    chatWidget.id = 'eco-chat';
    chatWidget.className = 'eco-chat closed';
    
    chatWidget.innerHTML = `
        <div class="chat-header">
            <span class="chat-title">Eco Digital</span>
            <button class="chat-toggle" aria-label="Toggle Chat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </button>
        </div>
        <div class="chat-body">
            <div class="chat-messages" id="chat-messages">
                <div class="message bot">
                    Olá. Sou um eco digital do autor. Em que posso ajudar?
                </div>
            </div>
            <div class="chat-options" id="chat-options">
                <!-- Opções serão injetadas aqui -->
            </div>
        </div>
    `;
    
    document.body.appendChild(chatWidget);

    const messagesContainer = document.getElementById('chat-messages');
    const optionsContainer = document.getElementById('chat-options');
    const toggleBtn = chatWidget.querySelector('.chat-toggle');
    const header = chatWidget.querySelector('.chat-header');

    // Estado do chat
    let isOpen = false;

    // Base de conhecimento simples
    const knowledgeBase = {
        start: {
            options: [
                { text: "Quem é você?", next: "who" },
                { text: "Sobre o autor", next: "author" },
                { text: "Filosofia do site", next: "philosophy" },
                { text: "Apenas navegando", next: "browsing" }
            ]
        },
        who: {
            text: "Sou uma construção algorítmica simples, desenhada para refletir os interesses do Robson. Não sou uma LLM complexa, apenas um conjunto de caminhos pré-definidos... por enquanto.",
            options: [
                { text: "Sobre o autor", next: "author" },
                { text: "Voltar", next: "start" }
            ]
        },
        author: {
            text: "Robson Paulo é um desenvolvedor e escritor ocasional baseado em Angola. Ele explora a interseção entre código, poesia e filosofia. Gosta de Python, minimalismo e pores do sol.",
            options: [
                { text: "O que ele lê?", next: "reading" },
                { text: "Projetos?", next: "projects" },
                { text: "Voltar", next: "start" }
            ]
        },
        philosophy: {
            text: "Este espaço foi criado como um jardim digital. A ideia é cultivar pensamentos lentamente, sem a pressa das redes sociais. Minimalismo não é apenas estética, é foco.",
            options: [
                { text: "Interessante", next: "start" }
            ]
        },
        browsing: {
            text: "Fique à vontade. O silêncio aqui é proposital. Se precisar de um guia, estarei aqui.",
            options: [
                { text: "Reiniciar", next: "start" }
            ]
        },
        reading: {
            text: "Atualmente ele se interessa por Estoicismo, Ficção Científica Hard e manuais técnicos obscuros.",
            options: [
                { text: "Voltar", next: "author" }
            ]
        },
        projects: {
            text: "Além deste site, ele trabalha em experimentos com APIs de IA e automação. O código é sua tela de pintura.",
            options: [
                { text: "Voltar", next: "author" }
            ]
        }
    };

    // Funções
    function toggleChat() {
        isOpen = !isOpen;
        chatWidget.classList.toggle('open', isOpen);
        chatWidget.classList.toggle('closed', !isOpen);
        
        if (isOpen && messagesContainer.children.length <= 1) {
            showOptions('start');
        }
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerText = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showOptions(nodeKey) {
        optionsContainer.innerHTML = '';
        const node = knowledgeBase[nodeKey];
        
        if (!node) return;

        node.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.innerText = opt.text;
            btn.onclick = () => handleOptionClick(opt, nodeKey);
            optionsContainer.appendChild(btn);
        });
    }

    function handleOptionClick(option, currentNodeKey) {
        // Adicionar escolha do usuário
        addMessage(option.text, 'user');
        
        // Limpar opções
        optionsContainer.innerHTML = '';

        // Simular "pensando"
        setTimeout(() => {
            const nextNode = knowledgeBase[option.next];
            if (nextNode && nextNode.text) {
                addMessage(nextNode.text, 'bot');
            }
            showOptions(option.next);
        }, 600);
    }

    // Event Listeners
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleChat();
    });
    
    header.addEventListener('click', () => {
        if (!isOpen) toggleChat();
    });

    // Inicializar opções iniciais
    showOptions('start');
});
