document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Configuração
    const particleCount = 100; 
    
    let width, height;
    let isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Atualizar estado do tema
    window.addEventListener('themeChanged', (e) => {
        isDarkMode = e.detail.theme === 'dark';
    });
    
    let mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        active: false
    };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
        mouse.active = true;
    });

    window.addEventListener('mouseout', () => {
        mouse.active = false;
    });

    class Particle {
        constructor() {
            this.respawn();
        }

        respawn() {
            // Renascer em posição aleatória
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            
            // Velocidade inicial muito suave
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
            
            this.size = Math.random() * 1.5 + 0.5; // Partículas menores
            this.friction = 0.98; // Mais fricção para movimento mais fluido
            
            // Ciclo de vida (Geração e Regeneração)
            this.life = 0;
            this.maxLife = Math.random() * 400 + 300; // Vida mais longa
            this.alpha = 0;
        }

        update() {
            this.life++;
            
            // Fade in / Fade out muito suave
            // Max alpha reduzido para 0.15 para ser extremamente sutil
            const maxAlpha = 0.15;
            
            if (this.life < 100) {
                this.alpha = (this.life / 100) * maxAlpha;
            } else if (this.life > this.maxLife - 100) {
                this.alpha = ((this.maxLife - this.life) / 100) * maxAlpha;
            } else {
                this.alpha = maxAlpha;
            }

            if (this.life >= this.maxLife) {
                this.respawn();
            }

            // Comportamento de Enxame (Swarm)
            if (mouse.active) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                // Atração ao cursor muito mais fraca e gradual
                let force = distance * 0.00005; 
                let angle = Math.atan2(dy, dx);
                
                this.vx += Math.cos(angle) * force;
                this.vy += Math.sin(angle) * force;
                
                // Espalhamento suave
                if (distance < 80) {
                    this.vx += (Math.random() - 0.5) * 0.05;
                    this.vy += (Math.random() - 0.5) * 0.05;
                }
            }

            // Movimento natural constante (drift)
            this.vx += (Math.random() - 0.5) * 0.02;
            this.vy += (Math.random() - 0.5) * 0.02;

            // Aplicar fricção
            this.vx *= this.friction;
            this.vy *= this.friction;

            // Atualizar posição
            this.x += this.vx;
            this.y += this.vy;

            // Manter dentro da tela (wrap around)
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            // Cor baseada no tema
            // Light mode: cinza escuro (100, 100, 100)
            // Dark mode: cinza claro/branco (200, 200, 200)
            const colorVal = isDarkMode ? 200 : 100;
            
            ctx.fillStyle = `rgba(${colorVal}, ${colorVal}, ${colorVal}, ${this.alpha})`; 
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }

    init();
    animate();
});
