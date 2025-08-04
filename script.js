document.addEventListener('DOMContentLoaded', () => {
    // Background elements
    const bgContainer = document.querySelector('.background-container');
    const bgImage = document.querySelector('.cosmic-bg');
    
    // Particle system setup
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');
    
    // Mouse position tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        
        // Background parallax effect
        const moveX = (window.innerWidth / 2 - mouseX) / 50;
        const moveY = (window.innerHeight / 2 - mouseY) / 50;
        bgImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });
    
    // Cursor interaction effects
    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });
    
    // Particle system
    const particles = [];
    const particleCount = Math.floor(window.innerWidth * window.innerHeight / 5000);
    
    // Particle colors matching your image
    const colors = [
        { r: 255, g: 204, b: 0 },   // Golden yellow
        { r: 255, g: 107, b: 53 },  // Orange
        { r: 255, g: 140, b: 66 },  // Light orange
        { r: 106, g: 14, b: 79 }    // Purple
    ];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 1,
            color: `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.random() * 0.5 + 0.3})`,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: Math.random() * 0.02 - 0.01
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(p => {
            // Movement
            p.x += p.speedX;
            p.y += p.speedY;
            p.angle += p.angleSpeed;
            
            // Wrap around edges
            if (p.x > canvas.width + 50) p.x = -50;
            if (p.x < -50) p.x = canvas.width + 50;
            if (p.y > canvas.height + 50) p.y = -50;
            if (p.y < -50) p.y = canvas.height + 50;
            
            // Mouse interaction - particles react to cursor
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                p.x += dx / distance * force * 3;
                p.y += dy / distance * force * 3;
            }
            
            // Draw particle with glow
            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = p.size * 3;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.restore();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Scroll effect - subtle parallax
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        bgContainer.style.transform = `translateY(${scrollY * 0.3}px)`;
    });
});