import React, { useEffect } from 'react';
import anime from 'animejs';

function Profile() {
  return (
    <header className="header">
      <div className="container">
        <div className="profile-image">
          <i className="fas fa-user"></i>
        </div>
        <h1 id="name">王蒙庆</h1>
        <p className="subtitle" id="title">地球科学研究者</p>
        <div className="contact-links">
          <a href="mailto:your.email@example.com" className="contact-btn" id="emailBtn">
            <i className="fas fa-envelope"></i> 邮箱联系
          </a>
          <a href="https://github.com/yourusername" className="contact-btn" id="githubBtn" target="_blank">
            <i className="fab fa-github"></i> GitHub
          </a>
          <a href="https://linkedin.com/in/yourprofile" className="contact-btn" id="linkedinBtn" target="_blank">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <h2>关于我</h2>
      <div className="about-grid">
        <div>
          <h3>专业技能</h3>
          <ul className="skills-list">
            <li><i className="fas fa-globe"></i> 地球科学研究</li>
            <li><i className="fas fa-chart-line"></i> 数据分析</li>
            <li><i className="fab fa-python"></i> Python编程</li>
            <li><i className="fab fa-js"></i> JavaScript开发</li>
            <li><i className="fas fa-database"></i> 数据库管理</li>
            <li><i className="fas fa-microscope"></i> 科学研究</li>
          </ul>
        </div>
        <div>
          <p>我是一名专注于地球科学研究的学者，具有丰富的数据分析和编程经验。在研究工作中，我运用现代技术手段进行地质数据处理和分析，致力于推动地球科学领域的技术创新。</p>
          <p>除了专业研究外，我还积极参与开源项目开发，在GitHub上分享我的技术成果和研究工具，希望能为科学研究社区做出贡献。</p>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <h2>项目展示</h2>
      <div className="projects-grid">
        <div className="project-card">
          <h3>地质数据分析工具</h3>
          <p>使用Python开发的地质数据处理和可视化工具，支持多种地质数据格式的导入和分析。</p>
          <div className="project-links">
            <a href="https://github.com/yourusername/geo-data-analyzer" target="_blank">
              <i className="fab fa-github"></i> 源码
            </a>
            <a href="#" target="_blank">
              <i className="fas fa-external-link-alt"></i> 演示
            </a>
          </div>
        </div>
        <div className="project-card">
          <h3>个人简历网站</h3>
          <p>使用HTML、CSS、JavaScript开发的响应式个人简历网站，展示个人技能和项目经验。</p>
          <div className="project-links">
            <a href="https://github.com/yourusername/curriculum-vitae" target="_blank">
              <i className="fab fa-github"></i> 源码
            </a>
            <a href="#" target="_blank">
              <i className="fas fa-external-link-alt"></i> 在线访问
            </a>
          </div>
        </div>
        <div className="project-card">
          <h3>科研数据管理系统</h3>
          <p>基于Web技术开发的科研数据管理平台，帮助研究团队高效管理和共享研究数据。</p>
          <div className="project-links">
            <a href="https://github.com/yourusername/research-data-system" target="_blank">
              <i className="fab fa-github"></i> 源码
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experience">
      <h2>教育与经历</h2>
      <div className="timeline">
        <div className="timeline-item">
          <h3>地球科学博士研究生</h3>
          <p><strong>某大学地球科学学院</strong> | 2020 - 至今</p>
          <p>专注于地质数据分析和数值模拟研究，发表多篇学术论文。</p>
        </div>
        <div className="timeline-item">
          <h3>地球科学硕士</h3>
          <p><strong>某大学地球科学学院</strong> | 2018 - 2020</p>
          <p>完成地质勘探和数据处理相关研究，获得优秀毕业生称号。</p>
        </div>
        <div className="timeline-item">
          <h3>地质学学士</h3>
          <p><strong>某大学地球科学学院</strong> | 2014 - 2018</p>
          <p>系统学习地质学基础理论，参与多次野外实习和科研项目。</p>
        </div>
      </div>
    </section>
  );
}

function App() {
  useEffect(() => {
    // Animation for profile elements
    anime({
      targets: '.profile-image',
      scale: [0, 1],
      duration: 1000,
      easing: 'easeOutElastic(1, .8)',
    });

    anime({
      targets: '#name',
      translateY: [-20, 0],
      opacity: [0, 1],
      delay: 500,
      duration: 1000,
      easing: 'easeOutQuad',
    });

    anime({
      targets: '#title',
      translateY: [-10, 0],
      opacity: [0, 1],
      delay: 800,
      duration: 1000,
      easing: 'easeOutQuad',
    });

    anime({
      targets: '.contact-btn',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(100),
      easing: 'easeOutBack',
    });

    // Animation for sections as they come into view
    anime({
      targets: '.main-content',
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: 800,
      easing: 'easeOutQuad',
    });

    anime({
      targets: '.skills-list li',
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(100, { start: 1500 }),
      easing: 'easeOutQuad',
    });

    anime({
      targets: '.project-card',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(200, { start: 2000 }),
      easing: 'easeOutQuad',
    });

    anime({
      targets: '.timeline-item',
      translateX: [-100, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(300, { start: 2500 }),
      easing: 'easeOutQuad',
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });

    // Parallax effect for header
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.header');
      const speed = scrolled * 0.5;

      if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
      }
    });
  }, []);

  return (
    <div>
      <Profile />
      <About />
      <Projects />
      <Experience />
    </div>
  );
}

export default App;
