// Portfolio Data Loader (Version intégrée)
class PortfolioLoader {
    constructor() {
        this.data = null;
        this.loadData();
        this.initScrollAnimations();
    }

    // Charger les données depuis le fichier JSON ou utiliser les données par défaut
    async loadData() {
        try {
            // Tentative de chargement depuis le fichier JSON
            const response = await fetch('projects.json');
            this.data = await response.json();
            this.renderPortfolio();
        } catch (error) {
            console.log('Fichier JSON non trouvé, utilisation des données par défaut');
            this.loadDefaultData();
        }
    }

    // Données par défaut intégrées
    loadDefaultData() {
        this.data = {
            projects: [
                {
                    id: 1,
                    title: "Système de Gestion d'Incidents",
                    description: "Application complète de gestion d'incidents avec gestion des rôles (responsable, rapporteur, admin) développée en Java. Système de workflow avancé et interface utilisateur intuitive.",
                    icon: "fas fa-bullseye",
                    technologies: ["Java", "Spring Boot", "MySQL", "REST API"],
                    githubUrl: "#",
                    demoUrl: null,
                    featured: true
                },
                {
                    id: 2,
                    title: "Gestion de Tâches Éducatives",
                    description: "Plateforme collaborative pour la gestion des tâches entre élèves et professeurs. Interface moderne avec tableau de bord personnalisé et système de notifications.",
                    icon: "fas fa-graduation-cap",
                    technologies: ["Django", "Python", "PostgreSQL", "Bootstrap"],
                    githubUrl: "#",
                    demoUrl: null,
                    featured: true
                },
                {
                    id: 3,
                    title: "Application Mobile Angular",
                    description: "Application mobile innovante conçue avec Angular et Ionic, offrant une expérience utilisateur fluide et des fonctionnalités avancées.",
                    icon: "fas fa-mobile-alt",
                    technologies: ["Angular", "Ionic", "TypeScript", "Cordova"],
                    githubUrl: "#",
                    demoUrl: null,
                    featured: true
                },
                {
                    id: 4,
                    title: "Application Météo Flutter",
                    description: "Application météo complète développée en Flutter avec géolocalisation, prévisions détaillées et interface utilisateur moderne et responsive.",
                    icon: "fas fa-cloud-sun",
                    technologies: ["Flutter", "Dart", "Weather API", "Geolocation"],
                    githubUrl: "https://github.com/espoirdev22/meteo.git",
                    demoUrl: null,
                    featured: true
                },
                {
                    id: 5,
                    title: "API Android avec Laravel",
                    description: "API robuste développée avec Laravel pour alimenter une application Android. Architecture RESTful complète avec authentification et gestion des données.",
                    icon: "fas fa-link",
                    technologies: ["Laravel", "Android", "Java", "XML", "MySQL"],
                    githubUrl: "#",
                    demoUrl: null,
                    featured: true
                },
                {
                    id: 6,
                    title: "Service SMS Temps Réel",
                    description: "Application de service à valeur ajoutée pour l'envoi et la réception de SMS en temps réel. Solution complète avec interface web et intégration SMS gateway.",
                    icon: "fas fa-sms",
                    technologies: ["Laravel", "WebSocket", "SMS Gateway", "Real-time"],
                    githubUrl: "#",
                    demoUrl: null,
                    featured: true
                }
            ],
            skills: [
                {
                    id: 1,
                    name: "Java",
                    description: "Développement d'applications robustes et scalables avec une expertise en programmation orientée objet et frameworks Java.",
                    icon: "fab fa-java",
                    level: 90
                },
                {
                    id: 2,
                    name: "Django",
                    description: "Création d'applications web complexes avec Python Django, maîtrise des ORM et des architectures MVC.",
                    icon: "fab fa-python",
                    level: 85
                },
                {
                    id: 3,
                    name: "Angular",
                    description: "Développement d'applications web dynamiques et interactives avec Angular, TypeScript et RxJS.",
                    icon: "fab fa-angular",
                    level: 88
                },
                {
                    id: 4,
                    name: "Laravel",
                    description: "Développement d'APIs RESTful et applications web avec PHP Laravel, maîtrise d'Eloquent ORM.",
                    icon: "fab fa-laravel",
                    level: 92
                },
                {
                    id: 5,
                    name: "Flutter",
                    description: "Création d'applications mobiles cross-platform performantes avec Dart et Flutter.",
                    icon: "fas fa-mobile-alt",
                    level: 87
                },
                {
                    id: 6,
                    name: "Android",
                    description: "Développement d'applications Android natives avec Java/Kotlin, XML et intégration d'APIs.",
                    icon: "fab fa-android",
                    level: 85
                }
            ],
            profile: {
                name: "Salou Diallo",
                title: "Développeur Full Stack Expert",
                description: "Passionné par l'innovation technologique et le développement de solutions digitales performantes.",
                email: "saloudiallo151@gmail.com",
                github: "github.com/espoirdev22",
                linkedin: "linkedin.com/in/votre-profil",
                phone: "+221 XX XXX XX XX",
                stats: {
                    experience: "5+",
                    technologies: "6+",
                    projects: "20+",
                    satisfaction: "100%"
                },
                expertise: [
                    "Architecture logicielle",
                    "APIs RESTful",
                    "Bases de données",
                    "DevOps & CI/CD",
                    "UI/UX Design",
                    "Tests automatisés"
                ]
            }
        };
        this.renderPortfolio();
    }

    // Rendu des projets
    renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid || !this.data) return;

        projectsGrid.innerHTML = '';

        this.data.projects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    }

    // Créer une carte de projet
    createProjectCard(project) {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card animate-on-scroll';
        
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        projectCard.innerHTML = `
            <div class="project-header">
                <i class="${project.icon} project-icon"></i>
                <h3>${project.title}</h3>
            </div>
            <p>${project.description}</p>
            <div class="tech-stack">
                ${techTags}
            </div>
            <a href="${project.githubUrl}" class="project-link" target="_blank">
                <i class="fab fa-github"></i> Voir sur GitHub
            </a>
        `;

        return projectCard;
    }

    // Rendu des compétences
    renderSkills() {
        const skillsGrid = document.querySelector('.skills-grid');
        if (!skillsGrid || !this.data) return;

        skillsGrid.innerHTML = '';

        this.data.skills.forEach(skill => {
            const skillCard = this.createSkillCard(skill);
            skillsGrid.appendChild(skillCard);
        });
    }

    // Créer une carte de compétence
    createSkillCard(skill) {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card animate-on-scroll';
        
        skillCard.innerHTML = `
            <i class="${skill.icon} skill-icon"></i>
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
            ${skill.level ? `<div class="skill-level">
                <div class="skill-bar" style="width: ${skill.level}%"></div>
            </div>` : ''}
        `;

        return skillCard;
    }

    // Rendu des informations de profil
    renderProfile() {
        if (!this.data || !this.data.profile) return;

        const profile = this.data.profile;
        
        // Mettre à jour le nom et titre
        const profileName = document.querySelector('.profile-name');
        if (profileName) profileName.textContent = profile.name;

        const profileTitle = document.querySelector('.profile-title');
        if (profileTitle) profileTitle.textContent = profile.title;

        // Mettre à jour les statistiques
        if (profile.stats) {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            if (statNumbers.length >= 1) {
                statNumbers[0].textContent = profile.stats.satisfaction;
            }
        }

        // Mettre à jour les expertises
        if (profile.expertise) {
            const expertiseList = document.querySelector('.expertise-list');
            if (expertiseList) {
                expertiseList.innerHTML = '';
                profile.expertise.forEach(expertise => {
                    const expertiseItem = document.createElement('div');
                    expertiseItem.className = 'expertise-item';
                    expertiseItem.textContent = expertise;
                    expertiseList.appendChild(expertiseItem);
                });
            }
        }

        // Mettre à jour les informations de contact
        this.updateContactInfo(profile);
    }

    // Mettre à jour les informations de contact
    updateContactInfo(profile) {
        const contactItems = document.querySelectorAll('.contact-item');
        
        contactItems.forEach(item => {
            const icon = item.querySelector('i');
            const link = item.querySelector('a p') || item.querySelector('p');
            
            if (icon && link) {
                if (icon.classList.contains('fa-envelope')) {
                    link.textContent = profile.email;
                    const emailLink = item.querySelector('a');
                    if (emailLink) {
                        emailLink.href = `mailto:${profile.email}`;
                    }
                } else if (icon.classList.contains('fa-github')) {
                    link.textContent = profile.github;
                } else if (icon.classList.contains('fa-linkedin')) {
                    link.textContent = profile.linkedin;
                } else if (icon.classList.contains('fa-phone')) {
                    link.textContent = profile.phone;
                }
            }
        });
    }

    // Rendu complet du portfolio
    renderPortfolio() {
        this.renderProjects();
        this.renderSkills();
        this.renderProfile();
        // Réinitialiser les animations après le rendu
        setTimeout(() => {
            this.initScrollAnimations();
        }, 100);
    }

    // Initialiser les animations au scroll
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // Navigation fluide
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Méthodes utilitaires pour ajouter/modifier des données
    addProject(project) {
        if (this.data && this.data.projects) {
            project.id = this.data.projects.length + 1;
            this.data.projects.push(project);
            this.renderProjects();
        }
    }

    updateProject(id, updatedProject) {
        if (this.data && this.data.projects) {
            const index = this.data.projects.findIndex(p => p.id === id);
            if (index !== -1) {
                this.data.projects[index] = { ...this.data.projects[index], ...updatedProject };
                this.renderProjects();
            }
        }
    }

    removeProject(id) {
        if (this.data && this.data.projects) {
            this.data.projects = this.data.projects.filter(p => p.id !== id);
            this.renderProjects();
        }
    }

    // Obtenir les données pour utilisation externe
    getData() {
        return this.data;
    }
}

// ===== FONCTIONS MENU MOBILE =====

// Fonction pour basculer l'affichage du menu mobile
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navLinks) {
        navLinks.classList.toggle('active');
        
        // Changer l'icône du menu hamburger
        const icon = mobileMenu.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
}

// Fonction pour fermer le menu mobile
function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navLinks) {
        navLinks.classList.remove('active');
        
        // Remettre l'icône hamburger
        const icon = mobileMenu.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// Initialiser le portfolio quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le portfolio
    window.portfolioLoader = new PortfolioLoader();
    
    // Initialiser la navigation fluide
    portfolioLoader.initSmoothScrolling();
    
    // ===== GESTION DU MENU MOBILE =====
    
    // Fermer le menu mobile quand on clique en dehors
    document.addEventListener('click', function(event) {
        const navLinks = document.getElementById('navLinks');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        // Si on clique en dehors du menu et qu'il est ouvert
        if (navLinks && mobileMenu && 
            !navLinks.contains(event.target) && 
            !mobileMenu.contains(event.target) &&
            navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Fermer le menu mobile lors du redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        const navLinks = document.getElementById('navLinks');
        if (navLinks && window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // ===== EFFET PARALLAXE =====
    
    // Effet de parallaxe simple pour le hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // ===== ANIMATION AU SCROLL =====
    
    // Animation supplémentaire pour les barres de compétences
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0%';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    // Observer les barres de compétences après un délai pour s'assurer qu'elles sont chargées
    setTimeout(() => {
        document.querySelectorAll('.skill-bar').forEach(bar => {
            skillObserver.observe(bar);
        });
    }, 1000);
});