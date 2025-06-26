		const canvas = document.getElementById('meteorCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 星星数组
        const stars = [];
        // 流星数组
        const meteors = [];

        // 创建星星
        class Star {
            constructor() {
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
                
                // 闪烁效果
                this.opacity += this.blinkSpeed;
                if (this.opacity > 1 || this.opacity < 0) {
                    this.blinkSpeed = -this.blinkSpeed;
                }
            }
        }

        // 创建流星
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

        // 初始化星星
        for (let i = 0; i < 200; i++) {
            stars.push(new Star());
        }

        // 初始化流星
        for (let i = 0; i < 5; i++) {
            meteors.push(new Meteor());
        }

        // 动画循环
        function animate() {
            ctx.fillStyle = 'rgba(11, 15, 25, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 绘制星星
            stars.forEach(star => star.draw());
            
            // 更新和绘制流星
            meteors.forEach(meteor => {
                meteor.update();
                meteor.draw();
            });
            
            requestAnimationFrame(animate);
        }

        // 窗口大小调整
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        animate();