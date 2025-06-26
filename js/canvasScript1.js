        const canvas = document.getElementById('meteorCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 星空系统
        const stars = [];
        const meteors = [];
        
        // 飞船系统
        const ship = {
            x: canvas.width * 0.05,
            y: canvas.height *0.25,
            size: 15,
            speed: 0,
            maxSpeed: 5,
            angle: -Math.PI/2,
            rotationSpeed: 0.08,
            thrustPower: 0.1,
            isThrusting: false,
            color: '#00a8ff'
        };

        // 星星类
        class Star {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5;
                this.blinkSpeed = Math.random() * 0.05;
                this.opacity = Math.random();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
                
                this.opacity += this.blinkSpeed;
                if (this.opacity > 1 || this.opacity < 0) {
                    this.blinkSpeed = -this.blinkSpeed;
                }
            }
        }

        // 流星类
        class Meteor {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -10;
                this.speed = 2 + Math.random() * 5;
                this.size = 1 + Math.random() * 2;
                this.length = 5 + Math.random() * 15;
                this.angle = Math.PI / 4 + (Math.random() * Math.PI / 8);
                this.color = `hsl(${Math.random() * 60 + 20}, 100%, ${Math.random() * 30 + 70}%)`;
            }
            update() {
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                
                if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(
                    this.x - Math.cos(this.angle) * this.length,
                    this.y - Math.sin(this.angle) * this.length
                );
                ctx.lineWidth = this.size;
                ctx.strokeStyle = this.color;
                ctx.stroke();
            }
        }

        // 绘制飞船
        
// 在原有代码中找到drawShip函数替换为以下内容：
function drawShip() {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    
    // 飞船主体 - 未来战机造型
    ctx.beginPath();
    ctx.moveTo(25, 0);
    ctx.bezierCurveTo(15, -15, -20, -10, -30, 0);
    ctx.bezierCurveTo(-20, 10, 15, 15, 25, 0);
    
    // 金属质感渐变
    const shipGradient = ctx.createLinearGradient(-30, 0, 25, 0);
    shipGradient.addColorStop(0, "#001a33");
    shipGradient.addColorStop(0.5, "#0066cc");
    shipGradient.addColorStop(1, "#00ccff");
    ctx.fillStyle = shipGradient;
    ctx.fill();
    
    // 能量装甲纹路
    ctx.strokeStyle = "rgba(0, 255, 255, 0.7)";
    ctx.lineWidth = 1.5;
    for(let i = -25; i <= 15; i += 5) {
        ctx.beginPath();
        ctx.moveTo(i, -Math.abs(i)/3);
        ctx.lineTo(i, Math.abs(i)/3);
        ctx.stroke();
    }
    
    // 驾驶舱玻璃
    ctx.beginPath();
    ctx.ellipse(10, 0, 8, 5, 0, 0, Math.PI*2);
    const cockpitGrad = ctx.createRadialGradient(5, 0, 0, 10, 0, 8);
    cockpitGrad.addColorStop(0, "rgba(100, 255, 255, 0.9)");
    cockpitGrad.addColorStop(1, "rgba(0, 100, 255, 0.3)");
    ctx.fillStyle = cockpitGrad;
    ctx.fill();
    
    // 推进器特效
    if(ship.isThrusting) {
        const flameLength = 30 + Math.random() * 20;
        const flameWidth = 15 + Math.random() * 10;
        
        // 核心火焰
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.quadraticCurveTo(-50-flameLength, -flameWidth/2, -50-flameLength, 0);
        ctx.quadraticCurveTo(-50-flameLength, flameWidth/2, -30, 0);
        
        const flameGrad = ctx.createLinearGradient(-30, 0, -50-flameLength, 0);
        flameGrad.addColorStop(0, "#ff6600");
        flameGrad.addColorStop(0.5, "#ff3300");
        flameGrad.addColorStop(1, "#ff0066");
        ctx.fillStyle = flameGrad;
        ctx.fill();
        
        // 外层等离子体
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.quadraticCurveTo(-40-flameLength/2, -flameWidth, -50-flameLength, 0);
        ctx.quadraticCurveTo(-40-flameLength/2, flameWidth, -30, 0);
        ctx.fillStyle = "rgba(255, 200, 0, 0.3)";
        ctx.fill();
    }
    
    // 翼尖能量指示器
    ctx.beginPath();
    ctx.arc(15, -12, 3, 0, Math.PI*2);
    ctx.arc(15, 12, 3, 0, Math.PI*2);
    ctx.fillStyle = ship.isThrusting ? "#00ffff" : "#ff5555";
    ctx.fill();
    
    ctx.restore();
}


        // 初始化星空
        for (let i = 0; i < 200; i++) stars.push(new Star());
        for (let i = 0; i < 5; i++) meteors.push(new Meteor());

        // 键盘控制
        const keys = {};
        window.addEventListener('keydown', (e) => {
            keys[e.key] = true;
            if (e.key === ' ' || e.key === 'ArrowUp') ship.isThrusting = true;
        });
        window.addEventListener('keyup', (e) => {
            keys[e.key] = false;
            if (e.key === ' ' || e.key === 'ArrowUp') ship.isThrusting = false;
        });
        

        // 处理输入
        function handleInput() {
            if (keys['ArrowLeft']) ship.angle -= ship.rotationSpeed;
            if (keys['ArrowRight']) ship.angle += ship.rotationSpeed;
            if (ship.isThrusting) {
                ship.speed = Math.min(ship.speed + ship.thrustPower, ship.maxSpeed);
            } else {
                ship.speed = Math.max(ship.speed - 0.02, 0);
            }
            
            // 更新位置
            ship.x += Math.cos(ship.angle) * ship.speed;
            ship.y += Math.sin(ship.angle) * ship.speed;
            
            // 边界穿越
            if (ship.x < -ship.size) ship.x = canvas.width + ship.size;
            if (ship.x > canvas.width + ship.size) ship.x = -ship.size;
            if (ship.y < -ship.size) ship.y = canvas.height + ship.size;
            if (ship.y > canvas.height + ship.size) ship.y = -ship.size;
        }

        // 动画循环
        function animate() {
            ctx.fillStyle = 'rgba(11, 15, 25, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 绘制星空
            stars.forEach(star => star.draw());
            meteors.forEach(meteor => {
                meteor.update();
                meteor.draw();
            });
            
            // 飞船系统
            handleInput();
            drawShip();
            
            requestAnimationFrame(animate);
        }

        // 窗口调整
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        animate();