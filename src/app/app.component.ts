import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
interface NavItem {
  id: string;
  label: string;
  icon: string;
}
interface Skill {
  name: string;
  icon: string;
  link: string;
  level: number;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  link?: string;
  type: 'email' | 'phone' | 'address' | 'github' | 'linkedin' | 'whatsapp';
  color?: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}
interface Experience {
  title: string;
  company: string;
  companyLogo?: string; // Logo de l'entreprise
  location: string; // Ville/Pays
  period: string;
  startDate: Date; // Pour tri automatique
  endDate?: Date; // undefined = poste actuel
  type: 'CDI' | 'Stage' | 'CDD' | 'Freelance';
  description: string[];
  technologies?: string[]; // Technologies utilisées
  achievements?: string[]; // Réalisations clés (optionnel)
}

interface Project {
  name: string;
  url: string;
  description: string;
  stack: string[];
  role: string;
}

interface PersonalInfo {
  icon: string;
  label: string;
  value: string;
  color: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface Interest {
  icon: string;
  name: string;
  color: string;
}

interface Journey {
  year: string;
  title: string;
  description: string;
  icon: string;
}


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MaterialModule, SafeUrlPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  title = 'IBRAHPHOLIO';
  activeSection = 'home';
  isMenuOpen = false;
  scrolled = false;
  selectedCategory: number = 0;
  roles: string[] = [
    'Développeur Full Stack',
    'Expert Angular & Laravel',
    'Créateur d\'Expériences Web',
    'Architecte Logiciel'
  ];
  currentYear: number = new Date().getFullYear();
  currentRoleIndex = 0;
  displayedRole = '';
  isDeleting = false;
  typingSpeed = 100;

  // Statistiques à afficher
  stats: Stat[] = [
    { value: '3+', label: 'Années d\'expérience', icon: 'work_history' },
    { value: '10+', label: 'Projets réalisés', icon: 'rocket_launch' },
    { value: '30+', label: 'Technologies', icon: 'code' }
  ];
  stats2 = {
    experience: '3+',
    projects: '10+',
    technologies: '30+',
    clients: '5+'
  };
  scrollProgress = 0;
  navItems: NavItem[] = [
    { id: 'home', label: 'Accueil', icon: 'home' },
    { id: 'about', label: 'À propos', icon: 'person' },
    { id: 'skills', label: 'Compétences', icon: 'code' },
    { id: 'experience', label: 'Expériences', icon: 'work' },
    { id: 'projects', label: 'Projets', icon: 'folder' },
    { id: 'education', label: 'Formation', icon: 'school' },
    { id: 'contact', label: 'Contact', icon: 'email' }
  ];
  constructor(
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {}
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Informations personnelles
  personalInfos: PersonalInfo[] = [
    {
      icon: 'cake',
      label: 'Date de naissance',
      value: '01 Avril 2002',
      color: '#FF6584'
    },
    {
      icon: 'location_on',
      label: 'Localisation',
      value: 'Abidjan, Côte d\'Ivoire',
      color: '#00E676'
    },
    {
      icon: 'language',
      label: 'Langues',
      value: 'Français, Anglais',
      color: '#00D9FF'
    },
    {
      icon: 'work_outline',
      label: 'Expérience',
      value: '3+ années',
      color: '#FFB800'
    }
  ];

  // Mes valeurs
  values: Value[] = [
    {
      icon: 'lightbulb',
      title: 'Innovation',
      description: 'Toujours à la recherche de solutions créatives et modernes',
      color: '#FFB800'
    },
    {
      icon: 'speed',
      title: 'Performance',
      description: 'Des applications rapides, optimisées et scalables',
      color: '#00D9FF'
    },
    {
      icon: 'groups',
      title: 'Collaboration',
      description: 'Travail d\'équipe et communication fluide',
      color: '#00E676'
    },
    {
      icon: 'school',
      title: 'Apprentissage',
      description: 'Veille technologique constante et formation continue',
      color: '#6C63FF'
    }
  ];

  // Centres d'intérêt
  interests: Interest[] = [
    { icon: 'code', name: 'Développement', color: '#6C63FF' },
    { icon: 'psychology', name: 'IA & Machine Learning', color: '#FF6584' },
    { icon: 'sports_esports', name: 'Jeux vidéo', color: '#00E676' },
    { icon: 'music_note', name: 'Musique', color: '#FFB800' },
    { icon: 'menu_book', name: 'Lecture Tech', color: '#00D9FF' },
    { icon: 'fitness_center', name: 'Sport', color: '#FF6584' }
  ];

  // Parcours clé
  journeySteps: Journey[] = [
    {
      year: '2020',
      title: 'Baccalauréat Scientifique',
      description: 'Début du parcours en informatique',
      icon: 'school'
    },
    {
      year: '2023',
      title: 'BTS Développeur d\'Application',
      description: 'Spécialisation en développement web',
      icon: 'code'
    },
    {
      year: '2024',
      title: 'Développeur Full Stack',
      description: 'Expériences professionnelles enrichissantes',
      icon: 'rocket_launch'
    },
    {
      year: '2025',
      title: 'Licence Pro Réseau & Génie Logiciel',
      description: 'Expertise avancée en développement',
      icon: 'workspace_premium'
    }
  ];
  skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: 'code',
      color: '#6C63FF',
      skills: [
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', link: 'https://developer.mozilla.org/fr/docs/Web/HTML', level: 95 },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', link: 'https://developer.mozilla.org/fr/docs/Web/CSS', level: 95 },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', link: 'https://developer.mozilla.org/fr/docs/Web/JavaScript', level: 90 },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', link: 'https://www.typescriptlang.org', level: 90 },
        { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg', link: 'https://angular.io', level: 90 },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', link: 'https://react.dev', level: 80 },
        { name: 'RxJS', icon: 'https://rxjs.dev/generated/images/marketing/home/Rx_Logo-512-512.png', link: 'https://rxjs.dev', level: 80 },
        // { name: 'Angular Signals', icon: 'https://angular.io/assets/images/logos/angular/angular.svg', link: 'https://angular.dev/guide/signals', level: 85 },
      ]
    },
    {
      title: 'Styling & Design',
      icon: 'palette',
      color: '#FF6584',
      skills: [
        { name: 'SCSS / SASS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', link: 'https://sass-lang.com', level: 85 },
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', link: 'https://getbootstrap.com', level: 85 },
        { name: 'TailwindCSS', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg', link: 'https://tailwindcss.com', level: 80 },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', link: 'https://www.figma.com', level: 80 },
        { name: 'Responsive Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', link: 'https://developer.mozilla.org/fr/docs/Learn/CSS/CSS_layout/Responsive_Design', level: 90 },
        { name: 'UX / UI Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', link: 'https://uxdesign.cc', level: 80 },
      ]
    },
    {
      title: 'Backend',
      icon: 'storage',
      color: '#00D9FF',
      skills: [
        { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', link: 'https://www.php.net', level: 90 },
        { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', link: 'https://laravel.com', level: 90 },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg', link: 'https://nodejs.org', level: 80 },
        { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', link: 'https://www.djangoproject.com', level: 75 },
        { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', link: 'https://fastapi.tiangolo.com', level: 75 },
        { name: 'REST API', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', link: 'https://restfulapi.net', level: 90 },
        { name: 'Livewire', icon: 'https://raw.githubusercontent.com/livewire/livewire/master/art/logo.svg', link: 'https://laravel-livewire.com', level: 70 },
        // { name: 'Eloquent ORM', icon: 'https://laravel.com/img/logomark.min.svg', link: 'https://laravel.com/docs/eloquent', level: 90 },
      ]
    },
    {
      title: 'Bases de données',
      icon: 'dns',
      color: '#FFB800',
      skills: [
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', link: 'https://www.mysql.com', level: 90 },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', link: 'https://www.postgresql.org', level: 85 },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', link: 'https://www.mongodb.com', level: 80 },
        { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg', link: 'https://www.microsoft.com/sql-server', level: 85 },
      ]
    },
    {
      title: 'DevOps & Outils',
      icon: 'settings',
      color: '#00E676',
      skills: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', link: 'https://git-scm.com', level: 90 },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', link: 'https://github.com', level: 90 },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', link: 'https://www.docker.com', level: 75 },
        { name: 'Linux Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', link: 'https://www.linux.org', level: 75 },
        { name: 'CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg', link: 'https://docs.github.com/actions', level: 70 },
        { name: 'Windows Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg', link: 'https://www.microsoft.com/windows-server', level: 80 },
      ]
    },
    {
      title: 'Autres',
      icon: 'extension',
      color: '#9C27B0',
      skills: [
        { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', link: 'https://isocpp.org', level: 70 },
        { name: 'JWT / Auth', icon: 'https://jwt.io/img/pic_logo.svg', link: 'https://jwt.io', level: 85 },
        { name: 'MVC Architecture', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', link: 'https://laravel.com/docs/architecture', level: 95 },
      ]
    }
  ];
  experiences: Experience[] = [
  {
    title: 'Développeur Web Angular & Laravel',
    company: 'Alerte Info',
    companyLogo: 'assets/img/alerteinfo.png',
    location: 'Abidjan, Côte d\'Ivoire',
    period: 'Depuis Juin 2024',
    startDate: new Date('2024-06-01'),
    type: 'CDD',
    technologies: ['Angular', 'Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    description: [
      'Création d\'applications web dynamiques avec Angular et Laravel',
      'Réalisation de sites web pour clients (e-commerce, vitrine, média, u-reporting)',
      'Hébergement et déploiement des sites web sur serveurs VPS',
      'Maintenance et optimisation des performances des applications'
    ],
    achievements: [
      '5+ sites web livrés avec succès',
      'Réduction du temps de chargement de 40% en moyenne',
      'Automatisation des tâches RH, comptabilité et direction',
      'Gestion de contenu pour plusieurs plateformes médiatiques'
    ]
  },
  {
    title: 'Stagiaire Chargé de Projet Technique',
    company: 'Endeavour Mining',
    companyLogo: 'assets/img/endeavour.png',
    location: 'Abidjan, Côte d\'Ivoire',
    period: 'Juin 2024 - Juin 2025',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2025-06-01'),
    type: 'Stage',
    technologies: ['Power BI', 'Angular', 'Laravel', 'SQL Server', 'JavaScript', 'TypeScript', 'Bootstrap'],
    description: [
      'Création de dashboards interactifs avec Power BI pour le suivi de production',
      'Développement et maintenance de logiciels d\'analyse de données',
      'Développement d\'un système u-reporting (Angular, Laravel, PHP MVC)',
      'Gestion et optimisation de bases de données SQL Server',
      'Développement d\'un logiciel de gestion avec Angular et Laravel (API REST)',
      'Formation et accompagnement des utilisateurs finaux'
    ],
    achievements: [
      'Automatisation de 85% des rapports hebdomadaires',
      'Formation de 20+ utilisateurs'
    ]
  },
  {
    title: 'Stagiaire Informatique',
    company: 'Société Ivoirienne de Manutention et de Transit (SIMAT)',
    companyLogo: 'assets/img/simat.png',
    location: 'Abidjan, Côte d\'Ivoire',
    period: 'Novembre 2023 - Juin 2024',
    startDate: new Date('2023-11-01'),
    endDate: new Date('2024-06-01'),
    type: 'Stage',
    technologies: ['Windev 25', 'HFsql', 'Réseau', 'Windows Server', 'IBM notes'],
    description: [
      'Administration réseau et matérielle (configuration, maintenance)',
      'Développement et maintenance de logiciel de gestion sous Windev 25 et HFsql',
      'Support technique et assistance aux utilisateurs',
      'Documentation des procédures IT'
    ]
  }
];

// Méthode pour trier par date (plus récent en premier)
get sortedExperiences(): Experience[] {
  return [...this.experiences].sort((a, b) =>
    b.startDate.getTime() - a.startDate.getTime()
  );
}

  projects: Project[] = [
    { name: 'Tabala Éditions',
      url: 'https://www.tabalaeditions.com/',
      description: 'Site de maison d\'édition',
      stack: ['React'],
      role: 'Développeur Frontend'
    },
    { name: 'Mnaracom TV',
      url: 'https://mnaracom-tv.net/',
      description: 'Plateforme de streaming',
      stack: ['Angular', 'Laravel', 'MySQL'],
      role: 'Développeur Fullstack'
    },
    // { name: 'Ivoire Hebdo',
    //   url: 'https://www.ivoirhebdo.com/',
    //   description: 'Site web d\'actualités',
    //   stack: ['Laravel', 'MySQL'],
    //   role: 'Développeur Fullstack'
    // },
    { name: 'Massiwa web',
      url: 'https://massiwa.alerteinfo-mairie.com/',
      description: 'Journal en ligne',
      stack: ['Laravel', 'MySQL'],
      role: 'Développeur Fullstack'
    },
    { name: 'HRT',
      url: 'http://hadombwe-radiotele.com/accueil',
      description: 'Radio télé HRT',
      stack: ['Angular', 'Laravel', 'MySQL'],
      role: 'Développeur Fullstack'
    },
    { name: 'RTN',
      url: 'https://rtn-anjouan.com/',
      description: 'Radio RTN',
      stack: ['Laravel', 'MySQL'],
      role: 'Développeur Fullstack'
    },
    // { name: 'Quoi2$neuf', url: 'https://www.version2.quoideneuf.info/', description: 'version 2 de quoi de neuf' },
  ];



  education = [
    {
      degree: 'Licence Professionnelle Réseau et Génie Logiciel',
      school: 'École Pratique de la Chambre de Commerce et d\'Industrie de Côte d\'Ivoire',
      location: 'Abidjan - Plateau',
      year: 'Octobre 2025'
    },
    {
      degree: 'BTS Informatique et Développeur d\'Application',
      school: 'École Pratique de la Chambre de Commerce et d\'Industrie de Côte d\'Ivoire',
      location: 'Abidjan - Plateau',
      year: 'Juillet 2023'
    },
    {
      degree: 'Baccalauréat Série Scientifique',
      school: 'Institut Secondaire Générale la Colombe',
      location: 'Abidjan - Koumassi',
      year: 'Août 2020'
    }
  ];
  email = 'gite.ibrahim02@gmail.com'

  contactInfos: ContactInfo[] = [
  {
    icon: 'email',
    title: 'Email',
    value: 'gite.ibrahim02@gmail.com',
    link: 'mailto:gite.ibrahim02@gmail.com',
    type: 'email',
    color: '#FF6584'
  },
  {
    icon: 'phone',
    title: 'Téléphone',
    value: '+225 07 69 96 95 91',
    link: 'tel:+2250769969591',
    type: 'phone',
    color: '#00E676'
  },
  {
    icon: 'location_on',
    title: 'Localisation',
    value: 'Abidjan, Côte d\'Ivoire',
    type: 'address',
    color: '#FFB800'
  },
  {
    icon: 'schedule',
    title: 'Disponibilité',
    value: 'Ouvert aux opportunités',
    type: 'address',
    color: '#00D9FF'
  }
];

  // Réseaux sociaux
  socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      icon: 'code',
      url: 'https://github.com/IBRAHGITE',
      color: '#333333'
    },
    {
      name: 'LinkedIn',
      icon: 'work',
      url: 'https://www.linkedin.com/in/ibrahim-gite-87598a248/',
      color: '#0077B5'
    },
    {
      name: 'WhatsApp',
      icon: 'chat',
      url: 'https://wa.me/2250769969591',
      color: '#25D366'
    },
    {
      name: 'Facebook',
      icon: 'facebook',
      url: 'https://www.facebook.com/troutrou.4149?locale=fr_FR',
      color: '#1DA1F2'
    }
  ];

  ngOnInit() {
    this.observeSections();
  }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(event: Event) {
  //   this.scrolled = window.pageYOffset > 50;
  // }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.scrolled = window.pageYOffset > 50;

    // Calculer la progression du scroll
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (winScroll / height) * 100;
  }

  trackByName(index: number, item: any) {
    return item.name;
  }


  observeSections() {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
  }

  // scrollToSection(sectionId: string) {
  //   this.activeSection = sectionId;
  //   this.isMenuOpen = false;
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }

  // toggleMenu() {
  //   this.isMenuOpen = !this.isMenuOpen;
  // }
  scrollToSection(sectionId: string) {
    this.activeSection = sectionId;
    this.isMenuOpen = false;
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Hauteur de la navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    // Empêcher le scroll du body quand le menu est ouvert
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // downloadCV() {
  //   // Créer un lien de téléchargement
  //   const link = document.createElement('a');
  //   link.href = 'assets/pdf/Cv-Ibrahim-GITE.pdf';
  //   link.download = 'CV_Ibrahim_GITE.pdf';
  //   link.click();
  // }
  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/pdf/Cv-Ibrahim-GITE.pdf';
    link.download = 'CV_Ibrahim_GITE.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Optionnel : Afficher un message de confirmation
    this.snackBar.open('CV téléchargé avec succès !', 'Fermer', { duration: 3000 });
  }

  // Copier l'email dans le presse-papier
  copyEmail() {
    navigator.clipboard.writeText(this.email).then(() => {
      // Afficher un message de confirmation
      this.snackBar.open('Email copié dans le presse-papier !', 'Fermer', { duration: 3000 });
    });
  }
  sendMessage(){}

  typewriterEffect() {
    const currentRole = this.roles[this.currentRoleIndex];

    if (!this.isDeleting && this.displayedRole === currentRole) {
      // Pause à la fin
      setTimeout(() => {
        this.isDeleting = true;
        this.typewriterEffect();
      }, 2000);
      return;
    }

    if (this.isDeleting && this.displayedRole === '') {
      this.isDeleting = false;
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      setTimeout(() => this.typewriterEffect(), 500);
      return;
    }

    if (this.isDeleting) {
      this.displayedRole = currentRole.substring(0, this.displayedRole.length - 1);
    } else {
      this.displayedRole = currentRole.substring(0, this.displayedRole.length + 1);
    }

    const speed = this.isDeleting ? 50 : this.typingSpeed;
    setTimeout(() => this.typewriterEffect(), speed);
  }
}
