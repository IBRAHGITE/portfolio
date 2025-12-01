import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe';
interface Skill {
  name: string;
  icon: string;
  link: string;
  level: number;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface Project {
  name: string;
  url: string;
  description: string;
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

  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  skills: Skill[] = [
    // frontend
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', link: 'https://developer.mozilla.org/fr/docs/Web/HTML', level: 95 },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', link: 'https://developer.mozilla.org/fr/docs/Web/CSS', level: 95 },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', link: 'https://developer.mozilla.org/fr/docs/Web/JavaScript', level: 90 },
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg', link: 'https://angular.io', level: 90 },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', link: 'https://react.dev', level: 80 },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', link: 'https://getbootstrap.com', level: 85 },
    { name: 'TailwindCSS', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg', link: 'https://tailwindcss.com', level: 80 },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', link: 'https://www.figma.com', level: 80 },
    // backend
    { name: 'Laravel', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', link: 'https://laravel.com', level: 90 },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', link: 'https://www.php.net', level: 90 },
    { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', link: 'https://www.djangoproject.com', level: 75 },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg', link: 'https://nodejs.org', level: 80 },
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', link: 'https://fastapi.tiangolo.com', level: 75 },
    { name: 'Livewire', icon: 'https://raw.githubusercontent.com/livewire/livewire/master/art/logo.svg', link: 'https://laravel-livewire.com', level: 70 },
    // database
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', link: 'https://www.mysql.com', level: 90 },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', link: 'https://www.postgresql.org', level: 85 },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', link: 'https://www.mongodb.com', level: 80 },
    { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg', link: 'https://www.microsoft.com/sql-server', level: 85 },

    //autres
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', link: 'https://www.docker.com', level: 75 },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', link: 'https://isocpp.org', level: 70 },
    { name: 'Windows Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg', link: 'https://www.microsoft.com/windows-server', level: 80 }

  ];



  experiences: Experience[] = [
    {
      title: 'Développeur Web Angular & Laravel',
      company: 'Alerte Info',
      period: 'Depuis Juin 2025',
      description: [
        'Création d\'application web dynamique ',
        'Réalisation de sute web pour clients',
        'Heberegement des sites web'
        // 'Développement de système u-reporting (JavaScript, Bootstrap, Angular, Laravel, PHP MVC)',
        // 'Gestion de bases de données SQL Server'
      ]
    },
    {
      title: 'Stagiaire Chargé de Projet Technique',
      company: 'Endeavour Mining',
      period: 'Juin 2024 - Juin 2025',
      description: [
        'Création de dashboards avec Power BI',
        'Développement et maintenance de logiciels d\'analyse',
        'Développement de système u-reporting (JavaScript, Bootstrap, Angular, Laravel, PHP MVC)',
        'Gestion de bases de données SQL Server'
      ]
    },
    {
      title: 'Stagiaire Informatique',
      company: 'Société Ivoirienne de Manutention et de Transit',
      period: 'Novembre 2023 - Juin 2024',
      description: [
        'Administration réseau et matérielle',
        'Développement et maintenance de logiciel de gestion sous Windev25 et HFsql'
      ]
    }
  ];

  projects: Project[] = [
    { name: 'Ivoire Hebdo', url: 'https://www.ivoirhebdo.com/', description: 'Site web d\'actualités' },
    { name: 'Tabala Éditions', url: 'https://tabala.alerteinfo-mairie.com/', description: 'Site de maison d\'édition' },
    // { name: 'Mnaracom TV', url: 'https://mnaracomtv.com', description: 'Plateforme de streaming' },
    { name: 'Massiwa', url: 'https://massiwa.alerteinfo-mairie.com/', description: 'Journal en ligne' },
    { name: 'HRT', url: 'http://hadombwe-radiotele.com', description: 'Radio télé HRT' },
    { name: 'RTN', url: 'https://rtn-anjouan.com/', description: 'Radio RTN' },
    // { name: 'Quoi2neuf', url: 'https://www.version2.quoideneuf.info/', description: 'version 2 de quoi de neuf' },
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

  ngOnInit() {
    this.observeSections();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.scrolled = window.pageYOffset > 50;
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
  // observeSections() {
  //   const sections = document.querySelectorAll('section[id]');
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add('visible');
  //         this.activeSection = entry.target.id;
  //       }
  //     });
  //   }, { threshold: 0.3 });

  //   sections.forEach(section => observer.observe(section));
  // }

  scrollToSection(sectionId: string) {
    this.activeSection = sectionId;
    this.isMenuOpen = false;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  downloadCV() {
    // Créer un lien de téléchargement
    const link = document.createElement('a');
    link.href = 'assets/pdf/Cv-Ibrahim-GITE.pdf';
    link.download = 'CV_Ibrahim_GITE.pdf';
    link.click();
  }
}
