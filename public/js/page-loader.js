// Page Loader avec Skeleton Animation et Transitions Douces

class PageLoader {
    constructor() {
        this.createLoader();
        this.createPageWrapper();
        this.attachListeners();
        this.initPageTransition();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.id = 'pageLoader';
        loader.className = 'page-loader hidden';
        loader.innerHTML = `
            <div class="page-loader-content">
                <div class="loader-skeleton">
                    <div class="skeleton-loader skeleton-logo"></div>
                    <div class="skeleton-loader skeleton-bar"></div>
                    <div class="skeleton-loader skeleton-bar" style="width: 80%;"></div>
                    <div class="skeleton-loader skeleton-bar" style="width: 60%;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(loader);
    }

    createPageWrapper() {
        // Ne wrapper que si pas déjà fait
        if (!document.getElementById('pageWrapper')) {
            const wrapper = document.createElement('div');
            wrapper.id = 'pageWrapper';
            wrapper.className = 'page-wrapper';
            
            // Déplacer tout le contenu body dans le wrapper (sauf le loader)
            while (document.body.firstChild) {
                if (document.body.firstChild.id !== 'pageLoader') {
                    wrapper.appendChild(document.body.firstChild);
                } else {
                    break;
                }
            }
            
            document.body.insertBefore(wrapper, document.getElementById('pageLoader'));
        }
    }

    show() {
        const loader = document.getElementById('pageLoader');
        const wrapper = document.getElementById('pageWrapper');
        
        // Fade out du contenu actuel
        if (wrapper) {
            wrapper.classList.add('page-fade-out');
        }
        
        // Après le fade out, montrer le loader
        setTimeout(() => {
            loader.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }, 150);
    }

    hide() {
        const loader = document.getElementById('pageLoader');
        const wrapper = document.getElementById('pageWrapper');
        
        // Masquer le loader
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Fade in du nouveau contenu
        if (wrapper) {
            wrapper.classList.remove('page-fade-out');
            wrapper.classList.add('page-fade-in');
            
            // Retirer la classe après l'animation
            setTimeout(() => {
                wrapper.classList.remove('page-fade-in');
            }, 500);
        }
    }

    initPageTransition() {
        // Fade in initial de la page
        const wrapper = document.getElementById('pageWrapper');
        if (wrapper) {
            wrapper.classList.add('page-fade-in');
            setTimeout(() => {
                wrapper.classList.remove('page-fade-in');
            }, 500);
        }
    }

    attachListeners() {
        // Intercepter les liens internes
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            
            // Ignorer les liens externes, ancres, et comportements spéciaux
            if (!href || 
                href.startsWith('#') || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') ||
                link.target === '_blank' ||
                link.hasAttribute('download')) {
                return;
            }

            // Si c'est un lien interne, afficher le loader
            if (href.startsWith('/') || href.startsWith(window.location.origin)) {
                this.show();
            }
        });

        // Intercepter les formulaires
        document.addEventListener('submit', (e) => {
            const form = e.target;
            
            // Ne pas afficher le loader pour les formulaires AJAX ou avec data-no-loader
            if (form.hasAttribute('data-no-loader') || 
                form.onsubmit?.toString().includes('return false')) {
                return;
            }

            this.show();
        });

        // Masquer le loader quand la page est chargée
        window.addEventListener('pageshow', () => {
            this.hide();
        });

        // Masquer immédiatement au chargement initial
        window.addEventListener('load', () => {
            this.hide();
        });

        // Gestion du bouton retour
        window.addEventListener('popstate', () => {
            this.show();
        });
    }
}

// Initialiser le loader dès que le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PageLoader();
    });
} else {
    new PageLoader();
}

