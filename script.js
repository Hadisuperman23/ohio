// Intersection Observer for Scroll Animations
const observeElements = document.querySelectorAll('[data-observe]');

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observeElements.forEach(el => observer.observe(el));

// Parallax effect for hero shoe
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const shoe = document.getElementById('heroShoe');
    const rings = document.querySelectorAll('.glow-ring');
    
    if(shoe) {
        shoe.style.transform = `translate(${x * 20}px, ${y * 20}px) rotate(-10deg)`;
    }
    
    rings.forEach((ring, index) => {
        const factor = (index + 1) * 15;
        ring.style.marginLeft = `${-x * factor}px`;
        ring.style.marginTop = `${-y * factor}px`;
    });
});

// Particles Background Canvas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let w, h;

function initCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

window.addEventListener('resize', initCanvas);
initCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5 - 0.5; // Drift upwards slowly
        
        // Colors: blue, violet, white
        const colors = [
            'rgba(0, 243, 255, 0.4)',
            'rgba(138, 43, 226, 0.4)',
            'rgba(255, 255, 255, 0.3)'
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.y < -10) {
            this.y = h + 10;
            this.x = Math.random() * w;
        }
        if (this.x > w + 10) this.x = -10;
        if (this.x < -10) this.x = w + 10;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

createParticles();
animateParticles();
