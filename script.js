document.addEventListener('DOMContentLoaded', function() {
    // 设置功能类别的动画顺序
    const categories = document.querySelectorAll('.feature-category');
    categories.forEach((category, index) => {
        category.style.setProperty('--animation-order', index + 1);
    });
    
    // 为主要功能区块添加点击事件和触摸效果
    const featureBoxes = document.querySelectorAll('.feature-box');
    const featureCategories = document.querySelectorAll('.feature-category');
    
    featureBoxes.forEach((box, index) => {
        // 同时支持点击和触摸
        ['click', 'touchend'].forEach(eventType => {
            box.addEventListener(eventType, function(e) {
                if(eventType === 'touchend') {
                    e.preventDefault(); // 防止触摸事件触发点击
                }
                
                // 滚动到对应的功能详情区域
                if (featureCategories[index]) {
                    featureCategories[index].scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // 添加高亮效果
                    featureCategories[index].classList.add('highlight');
                    setTimeout(() => {
                        featureCategories[index].classList.remove('highlight');
                    }, 1500);
                }
            });
        });
        
        // 添加触摸反馈效果
        box.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.opacity = '0.9';
        });
        
        box.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '1';
        });
    });
    
    // 添加触摸效果（移动端）
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        // 移动端触摸效果
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        item.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // 检测设备类型并应用相应样式
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // 移动端特定调整
        const container = document.querySelector('.container');
        if (container) {
            container.style.padding = '0 15px';
        }
        
        // 监听设备方向变化
        window.addEventListener('orientationchange', function() {
            // 重新应用样式
            setTimeout(function() {
                document.body.style.opacity = '0.98';
                setTimeout(function() {
                    document.body.style.opacity = '1';
                }, 100);
            }, 100);
        });
    }
    
    // 添加滚动效果
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // 导航栏效果
        const navBar = document.querySelector('.nav-lightband');
        if (navBar) {
            if (scrollPosition > 50) {
                navBar.style.boxShadow = '0 5px 20px rgba(255, 90, 0, 0.15)';
                navBar.style.background = 'white';
            } else {
                navBar.style.boxShadow = '0 2px 15px rgba(255, 90, 0, 0.1)';
                navBar.style.background = 'linear-gradient(90deg, #fff, #fff8f0)';
            }
        }
        
        // 显示回到顶部按钮
        const backToTop = document.querySelector('.back-to-top');
        if (scrollPosition > 300) {
            if (!backToTop) {
                const button = document.createElement('button');
                button.className = 'back-to-top';
                button.innerHTML = '↑';
                button.addEventListener('click', function() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
                document.body.appendChild(button);
            }
        } else {
            if (backToTop) {
                backToTop.remove();
            }
        }
    });
});

// 添加回到顶部按钮样式
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #FF5A00;
        color: white;
        font-size: 24px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(255, 90, 0, 0.3);
        transition: all 0.3s ease;
        z-index: 99;
        opacity: 0;
        animation: fadeIn 0.5s forwards;
    }
    
    @keyframes fadeIn {
        to { opacity: 1; }
    }
    
    .back-to-top:active {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(255, 90, 0, 0.4);
    }
    
    .highlight {
        animation: highlightPulse 1.5s;
    }
    
    @keyframes highlightPulse {
        0% { box-shadow: 0 0 0 rgba(255, 90, 0, 0); }
        50% { box-shadow: 0 0 20px rgba(255, 90, 0, 0.5); }
        100% { box-shadow: 0 0 0 rgba(255, 90, 0, 0); }
    }
`;
document.head.appendChild(style);

// 场景化导航栏交互
document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item');
  const glowIndicator = document.querySelector('.glow-indicator');
  const contentSections = document.querySelectorAll('.content-section');
  
  // 默认显示所有门店
  document.getElementById('stores-content').style.display = 'block';
  
  // 点击菜单项时切换active状态
  menuItems.forEach((item, index) => {
    item.addEventListener('click', function(e) {
      // 移除所有菜单项的active类
      menuItems.forEach(i => i.classList.remove('active'));
      
      // 为当前点击的菜单项添加active类
      this.classList.add('active');
      
      // 更新光条位置
      glowIndicator.style.left = `${index * 25}%`;
      
      // 隐藏所有内容区域
      contentSections.forEach(section => {
        section.style.display = 'none';
      });
      
      // 显示对应的内容区域
      const targetId = this.querySelector('a').getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId + '-content');
      if (targetSection) {
        targetSection.style.display = 'block';
      }
      
      // 防止链接默认行为
      e.preventDefault();
    });
    
    // 鼠标悬停效果
    item.addEventListener('mouseenter', function() {
      glowIndicator.style.left = `${index * 25}%`;
    });
    
    // 鼠标离开恢复到当前active项
    item.addEventListener('mouseleave', function() {
      const activeIndex = Array.from(menuItems).findIndex(i => i.classList.contains('active'));
      glowIndicator.style.left = `${activeIndex * 25}%`;
    });
  });
});

// 视频播放功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有播放按钮
    const playButtons = document.querySelectorAll('.play-button');
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
    const closeModal = document.querySelector('.close-modal');
    
    // 为每个播放按钮添加点击事件
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取视频源
            const videoSrc = this.getAttribute('data-video-src');
            
            // 设置视频源
            videoPlayer.querySelector('source').src = videoSrc;
            
            // 重新加载视频
            videoPlayer.load();
            
            // 显示模态框
            videoModal.style.display = 'flex';
            
            // 自动播放视频
            videoPlayer.play();
        });
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', function() {
        // 暂停视频
        videoPlayer.pause();
        
        // 隐藏模态框
        videoModal.style.display = 'none';
    });
    
    // 点击模态框背景也可以关闭
    videoModal.addEventListener('click', function(event) {
        if (event.target === videoModal) {
            videoPlayer.pause();
            videoModal.style.display = 'none';
        }
    });
});