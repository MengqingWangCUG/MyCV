document.addEventListener('DOMContentLoaded', () => {
  if (window.cvData) {
    renderApp(window.cvData);
  } else {
    console.error('Data not found. Please ensure js/data.js is loaded.');
  }
});

function renderApp(data) {
  renderProfile(data.profile, data.contact);
  renderSkills(data.skills);
  renderProjects(data.projects, data.carouselImages);
  renderEducation(data.education);
  renderOtherSkills(data.otherSkills);
  renderHonors(data.honors);
  renderStatus(data.status);

  // Initialize animations after rendering
  initAnimations();

  // Check for admin login and inject "+" buttons
  checkLoginAndInjectButtons();
}

function checkLoginAndInjectButtons() {
  const token = localStorage.getItem('github_pat');
  if (!token) return;

  // Helper to create a button
  const createAddBtn = (section, targetId) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-sm btn-outline-success ms-2 add-item-btn';
    btn.innerHTML = '<i class="fas fa-plus"></i>';
    btn.title = `Add to ${section}`;
    btn.onclick = () => openAddItemModal(section);

    const target = document.getElementById(targetId);
    if (target) {
      // Find the section title within the card body or near the container
      const title = target.closest('.card-body')?.querySelector('.section-title') || target.previousElementSibling;
      if (title && title.classList.contains('section-title')) {
        title.appendChild(btn);
      }
    }
  };

  // Inject buttons for specific sections
  createAddBtn('skills', 'skills-container');
  createAddBtn('projects', 'projects-list');
  createAddBtn('education', 'education-container');
  createAddBtn('honors', 'honors-list');
  createAddBtn('otherSkills', 'other-skills-list');
}

function openAddItemModal(section) {
  // This function will be implemented in admin.js or here, but admin.js is better suited for logic.
  // We can dispatch a custom event or call a global function exposed by admin.js
  if (window.adminOpenAddItemModal) {
    window.adminOpenAddItemModal(section);
  } else {
    console.error('Admin module not loaded or function not exposed');
  }
}


function renderProfile(profile, contact) {
  const profileContainer = document.getElementById('profile-container');
  if (!profileContainer) return;

  // Render Profile + Contact Info
  profileContainer.innerHTML = `
    <div class="profile-image mx-auto mb-3" style="background-image: url('${profile.avatar}')"></div>
    <h1 class="display-6 mb-1">${profile.name}</h1>
    <p class="lead mb-3">${profile.title}</p>
    
    <!-- Contact Info Moved Here -->
    <div class="contact-info mb-3 small text-muted">
        <div><i class="fas fa-phone me-2"></i>${contact.phone}</div>
        <div><i class="fas fa-envelope me-2"></i><a href="mailto:${contact.email}" class="text-decoration-none text-muted">${contact.email}</a></div>
        <div><i class="fas fa-map-marker-alt me-2"></i>${contact.address}</div>
    </div>

    <div class="d-flex flex-wrap justify-content-center mb-2">
      ${profile.social.map(link => `
        <a href="${link.link}" class="btn btn-outline-primary contact-btn btn-sm" target="_blank">
          <i class="${link.icon}"></i> ${link.name}
        </a>
      `).join('')}
    </div>
  `;

  const aboutContainer = document.getElementById('about-container');
  if (!aboutContainer) return;

  aboutContainer.innerHTML = `
    <h2 class="section-title">关于我</h2>
    <div class="text-start">
      ${profile.about.map(p => `<p>${p}</p>`).join('')}
      <h6 class="mt-4">个人素质</h6>
      <p>${profile.about[2]}</p>
    </div>
  `;
}

function renderSkills(skills) {
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) return;

  const mid = Math.ceil(skills.length / 2);
  const leftSkills = skills.slice(0, mid);
  const rightSkills = skills.slice(mid);

  const renderAccordion = (skillList, idPrefix) => {
    return skillList.map((skill, index) => `
      <div class="accordion-item">
        <h2 class="accordion-header" id="${idPrefix}Heading${index}">
          <button class="accordion-button collapsed justify-content-center text-center" type="button" data-bs-toggle="collapse" data-bs-target="#${idPrefix}${index}" aria-expanded="false" aria-controls="${idPrefix}${index}">
            <span class="w-100 d-flex flex-column align-items-center">
              <i class="${skill.icon} me-2 mb-2" style="font-size:1.5rem;"></i>
              <span>${skill.title}</span>
            </span>
          </button>
        </h2>
        <div id="${idPrefix}${index}" class="accordion-collapse collapse" aria-labelledby="${idPrefix}Heading${index}" data-bs-parent="#skillsAccordion${idPrefix === 'skillL' ? 'Left' : 'Right'}">
          <div class="accordion-body text-center">
            ${skill.description}
          </div>
        </div>
      </div>
    `).join('');
  };

  skillsContainer.innerHTML = `
    <div class="col-md-6">
      <div class="accordion" id="skillsAccordionLeft">
        ${renderAccordion(leftSkills, 'skillL')}
      </div>
    </div>
    <div class="col-md-6">
      <div class="accordion" id="skillsAccordionRight">
        ${renderAccordion(rightSkills, 'skillR')}
      </div>
    </div>
  `;
}

function renderProjects(projects, images) {
  const carouselInner = document.querySelector('.carousel-inner');
  if (carouselInner && images) {
    carouselInner.innerHTML = images.map((img, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${img}" class="d-block w-100 rounded project-carousel-img" alt="项目图片${index + 1}">
      </div>
    `).join('');
  }

  const projectsList = document.getElementById('projects-list');
  if (projectsList) {
    projectsList.innerHTML = projects.map(project => `
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${project.title}</h5>
            <p class="card-text">${project.description}</p>
          </div>
          <div class="card-footer bg-white">
            <a href="${project.link}" target="_blank" class="btn btn-outline-primary btn-sm">
              <i class="fab fa-github"></i> ${project.linkText || '源码'}
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function renderEducation(education) {
  const educationContainer = document.querySelector('#education-container .timeline');
  if (!educationContainer) return;

  educationContainer.innerHTML = education.map(edu => `
    <div class="timeline-item">
      <b>${edu.time}</b> ${edu.school}<br>
      专业：${edu.major}<br>
      <span class="text-muted small">${edu.description}</span>
    </div>
  `).join('');
}

function renderOtherSkills(skills) {
  const otherSkillsList = document.getElementById('other-skills-list');
  if (!otherSkillsList) return;

  otherSkillsList.innerHTML = skills.map(skill => `
    <li class="list-group-item"><b>${skill.label}${skill.value ? '：' : ''}</b> ${skill.value}</li>
  `).join('');
}

function renderHonors(honors) {
  const honorsList = document.getElementById('honors-list');
  if (!honorsList) return;

  honorsList.innerHTML = honors.map((honor, index) => {
    const text = typeof honor === 'string' ? honor : honor.text;
    const image = typeof honor === 'object' && honor.image ? honor.image : null;

    return `
    <li class="list-group-item position-relative honor-item" data-index="${index}">
        ${text}
        ${image ? `<img src="${image}" class="honor-hover-img" id="honor-img-${index}" style="display:none; position:absolute; z-index:100; max-width:200px; border:1px solid #ccc; background:#fff; padding:5px; border-radius:5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">` : ''}
    </li>
  `;
  }).join('');

  // Add hover listeners
  document.querySelectorAll('.honor-item').forEach(item => {
    const img = item.querySelector('.honor-hover-img');
    if (img) {
      item.addEventListener('mouseenter', (e) => {
        img.style.display = 'block';
        // Position image near cursor or item
        img.style.top = '100%';
        img.style.left = '20px';
      });
      item.addEventListener('mouseleave', () => {
        img.style.display = 'none';
      });
      item.addEventListener('mousemove', (e) => {
        // Optional: make image follow cursor
        // img.style.top = (e.offsetY + 10) + 'px';
        // img.style.left = (e.offsetX + 10) + 'px';
      });
    }
  });
}

function renderStatus(status) {
  const statusList = document.getElementById('status-list');
  if (!statusList) return;

  statusList.innerHTML = `
    <li class="list-group-item"><b>个人状态：</b>${status.state}</li>
    <li class="list-group-item"><b>实习诉求：</b>${status.internship}</li>
  `;
}

function initAnimations() {
  // Simple fade-in animation for cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}
