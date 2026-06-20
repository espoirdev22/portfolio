/* ============================================================
   PORTFOLIO SALOU DIALLO — script.js
   ============================================================ */

   class Portfolio {
    constructor() {
      this.data = null;
      this.init();
    }
  
    async init() {
      await this.loadData();
      this.renderStats();
      this.renderProjects();
      this.renderStack();
      this.renderContact();
      this.renderFooter();
      this.initTerminal();
      this.initScrollAnimations();
      this.initNav();
    }
  
    /* ---------- CHARGEMENT DES DONNÉES ---------- */
    async loadData() {
      try {
        const res = await fetch('projects.json');
        this.data = await res.json();
      } catch (e) {
        console.error('Impossible de charger data.json', e);
      }
    }
  
    /* ---------- STATS ---------- */
    renderStats() {
      const container = document.getElementById('stats-container');
      if (!container || !this.data) return;
  
      container.innerHTML = this.data.stats.map(s => `
        <div class="stat fade-up">
          <div class="stat-num">${s.value}</div>
          <div class="stat-label">${s.label}</div>
        </div>
      `).join('');
    }
  
    /* ---------- PROJETS ---------- */
    renderProjects() {
      const grid = document.getElementById('projects-grid');
      if (!grid || !this.data) return;
  
      grid.innerHTML = this.data.projects.map(p => `
        <div class="project-card ${p.featured ? 'featured' : ''} fade-up">
          <div class="project-tag ${p.tagType === 'devops' ? 'devops' : ''}">${p.tag}</div>
          <div class="project-title">${p.title}</div>
          <p class="project-desc">${p.description}</p>
          <div class="project-tech">
            ${p.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('')}
          </div>
          <a href="${p.githubUrl}" target="_blank" rel="noopener" class="project-link">
            Voir sur GitHub →
          </a>
        </div>
      `).join('');
    }
  
    /* ---------- STACK ---------- */
    renderStack() {
      const grid = document.getElementById('stack-grid');
      if (!grid || !this.data) return;
  
      grid.innerHTML = this.data.stack.map(g => `
        <div class="stack-group fade-up">
          <div class="stack-group-title">${g.group}</div>
          <div class="stack-items">
            ${g.items.map(i => `
              <div class="stack-item">
                <i class="${i.icon} stack-icon"></i>
                <span>${i.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    }
  
    /* ---------- CONTACT ---------- */
    renderContact() {
      const p = this.data?.profile;
      if (!p) return;
  
      /* liens */
      const linksEl = document.getElementById('contact-links');
      if (linksEl) {
        linksEl.innerHTML = `
          <a href="mailto:${p.email}" class="contact-link">
            <div class="contact-link-icon">✉</div>
            <div class="contact-link-text">
              <div class="contact-link-label">Email</div>
              ${p.email}
            </div>
          </a>
          <a href="${p.github}" target="_blank" rel="noopener" class="contact-link">
            <div class="contact-link-icon">⌥</div>
            <div class="contact-link-text">
              <div class="contact-link-label">GitHub</div>
              github.com/espoirdev22
            </div>
          </a>
          <a href="${p.linkedin}" target="_blank" rel="noopener" class="contact-link">
            <div class="contact-link-icon">in</div>
            <div class="contact-link-text">
              <div class="contact-link-label">LinkedIn</div>
              diallo-salou-163608309
            </div>
          </a>
          <a href="tel:${p.phone.replace(/\s/g,'')}" class="contact-link">
            <div class="contact-link-icon">☎</div>
            <div class="contact-link-text">
              <div class="contact-link-label">Téléphone</div>
              ${p.phone}
            </div>
          </a>
        `;
      }
  
      /* bloc info */
      const infoEl = document.getElementById('contact-info');
      if (infoEl) {
        const rows = [
          ['Localisation',  p.location,        false],
          ['Formation',     p.formation,        false],
          ['Certification', p.certification,    false],
          ['Disponibilité', p.disponibilite,    true],
          ['Docker Hub',    p.dockerhub,        false],
        ];
        infoEl.innerHTML = rows.map(([k, v, highlight]) => `
          <div class="info-row">
            <span class="info-key">${k}</span>
            <span class="info-val ${highlight ? 'available' : ''}">${v}</span>
          </div>
        `).join('');
      }
    }
  
    /* ---------- FOOTER ---------- */
    renderFooter() {
      const p = this.data?.profile;
      if (!p) return;
      const el = document.getElementById('footer-content');
      if (el) {
        el.innerHTML = `
          <span>© 2026 ${p.name}</span>
          <span>${p.location}</span>
          <span>${p.email}</span>
        `;
      }
    }
  
    /* ---------- TERMINAL ANIMÉ ---------- */
    initTerminal() {
      const lines = this.data?.terminal_lines || [
        'Développeur Front-End & DevOps',
        'React · Angular · Kubernetes',
        'Orange API · AWS · CI/CD'
      ];
      const el = document.getElementById('terminal');
      if (!el) return;
  
      let li = 0, ci = 0, deleting = false;
  
      const type = () => {
        const line = lines[li];
        if (!deleting) {
          ci++;
          el.innerHTML = line.slice(0, ci) + '<span class="cursor"></span>';
          if (ci === line.length) {
            deleting = true;
            setTimeout(type, 2000);
            return;
          }
        } else {
          ci--;
          el.innerHTML = line.slice(0, ci) + '<span class="cursor"></span>';
          if (ci === 0) {
            deleting = false;
            li = (li + 1) % lines.length;
          }
        }
        setTimeout(type, deleting ? 40 : 70);
      };
  
      type();
    }
  
    /* ---------- SCROLL ANIMATIONS ---------- */
    initScrollAnimations() {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      }, { threshold: 0.1 });
  
      /* Observer les éléments existants */
      document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
  
      /* Observer les éléments rendus dynamiquement */
      const mutObs = new MutationObserver(() => {
        document.querySelectorAll('.fade-up:not([data-observed])').forEach(el => {
          el.setAttribute('data-observed', '1');
          obs.observe(el);
        });
      });
      mutObs.observe(document.body, { childList: true, subtree: true });
    }
  
    /* ---------- NAV ACTIVE ---------- */
    initNav() {
      const sections = document.querySelectorAll('section[id]');
      const links    = document.querySelectorAll('.nav-links a');
  
      const navObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            links.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
            if (active) active.classList.add('active');
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
  
      sections.forEach(s => navObs.observe(s));
    }
  }
  
  /* Lance tout quand le DOM est prêt */
  document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
  });
  
  /* Chargement photo de profil */
  function loadPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const placeholder = document.getElementById('avatar-placeholder');
      const wrapper = document.getElementById('avatar-wrapper');
      placeholder.style.display = 'none';
      let img = wrapper.querySelector('.avatar-img');
      if (!img) {
        img = document.createElement('img');
        img.className = 'avatar-img';
        img.alt = 'Salou Diallo';
        wrapper.insertBefore(img, placeholder);
      }
      img.src = e.target.result;
      img.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }