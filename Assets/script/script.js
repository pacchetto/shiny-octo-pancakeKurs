document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 1. BURGER MENU & HEADER LOGIC
    // =========================================
    const burgerMenu = document.getElementById('burgerMenu');
    const headerNav = document.getElementById('headerNav');
    const openIcon = document.getElementById('openIcon');
    const closeIcon = document.getElementById('closeIcon');
    const btnX = document.getElementById('btnX');
    
    if(burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            headerNav.classList.toggle('header-nav_open');
            openIcon.classList.toggle('d-none');
            closeIcon.classList.toggle('d-none');
        });
    }
    
    if(btnX) {
        btnX.addEventListener('click', function() {
            const discountPropose = document.getElementById('discountPropose');
            if (discountPropose) {
                discountPropose.style.display = 'none';
                const heroSection = document.querySelector('.hero-section');
                if(heroSection) heroSection.style.height = 'calc(100vh - 60px)';
            }
        });
    }

    // =========================================
    // 2. LOGIN MODAL LOGIC ("Miss click")
    // =========================================
    const modal = document.getElementById('loginModal');
    const loginBtns = document.querySelectorAll('.accaunt-icon'); 
    const closeModal = document.querySelector('.close-modal');
    const passwordToggleBtn = document.querySelector('.toggle-password');

    // Відкриття модалки
    if (modal) {
        loginBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = "flex";
                // Невелика затримка для спрацювання CSS transition
                setTimeout(() => modal.classList.add('active'), 10); 
            });
        });

        // Закриття на хрестик
        if(closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => modal.style.display = "none", 300);
            });
        }

        // Закриття при кліку ПОЗА вікном (Miss click)
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.style.display = "none", 300);
            }
        });
    }

    // Показати/Сховати пароль
    if (passwordToggleBtn) {
        passwordToggleBtn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = "password";
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    // =========================================
    // 3. MOBILE FILTER LOGIC (Shop Page)
    // =========================================
    const filterTrigger = document.querySelector('.filter-trigger');
    const shopSidebar = document.getElementById('shopSidebar');
    const closeSidebar = document.getElementById('closeSidebar'); // Додав ID в HTML, перевір це

    if (filterTrigger && shopSidebar) {
        filterTrigger.addEventListener('click', () => {
            shopSidebar.classList.add('active');
        });
        
        // Закриття сайдбару фільтрів (якщо є кнопка закриття)
        if(closeSidebar) {
            closeSidebar.addEventListener('click', () => {
                shopSidebar.classList.remove('active');
            });
        }
        
        // Закриття при кліку поза сайдбаром
        document.addEventListener('click', (e) => {
            if (!shopSidebar.contains(e.target) && !filterTrigger.contains(e.target) && shopSidebar.classList.contains('active')) {
                shopSidebar.classList.remove('active');
            }
        });
    }

    // =========================================
    // 4. LOAD PRODUCTS + SWIPER INITIALIZATION
    // =========================================
    async function loadProducts() {
        const homeGrid = document.getElementById('productsGrid'); // Це swiper-wrapper на головній
        const shopGrid = document.getElementById('shopProductsGrid'); // Це сітка на сторінці магазину
        
        // Перевіряємо, де ми знаходимось
        const isHome = !!homeGrid; 
        const targetGrid = homeGrid || shopGrid; 
        
        if (!targetGrid) return;

        try {
            const response = await fetch('products.json');
            const products = await response.json();

            targetGrid.innerHTML = '';

            products.forEach(product => {
                // Генеруємо зірочки
                let starsHTML = '';
                for(let i=0; i<5; i++) {
                    starsHTML += i < product.rating 
                        ? '<i class="fa-solid fa-star"></i>' 
                        : '<i class="fa-regular fa-star"></i>';
                }

                // Генеруємо бейджі
                let badgesHTML = '';
                if(product.badges) {
                    product.badges.forEach(badge => {
                        if(badge === 'hot') badgesHTML += '<span class="badge hot">HOT</span>';
                        if(badge === 'sale') badgesHTML += '<span class="badge sale">-50%</span>';
                    });
                }

                // Перевірка ціни
                const priceHTML = product.oldPrice 
                    ? `<span>$${product.price}</span> <span class="old-price">$${product.oldPrice}</span>`
                    : `$${product.price}`;

                // HTML Вміст картки
                const cardContent = `
                    <div class="product-image-container">
                        ${badgesHTML}
                        <a href="product-details.html">
                            <img src="${product.image}" alt="${product.title}">
                        </a>
                        <button class="add-to-cart-btn">Add to cart</button>
                    </div>
                    <div class="product-info">
                        <div class="product-rating">${starsHTML}</div>
                        <h3 class="product-title">
                            <a href="product-details.html">${product.title}</a>
                        </h3>
                        <div class="product-price">${priceHTML}</div>
                    </div>
                `;

                // ЛОГІКА РОЗДІЛЕННЯ: Слайдер vs Сітка
                if (isHome) {
                    // Якщо головна - створюємо слайд
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide'; // Важливо для Swiper
                    
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'product-card';
                    cardDiv.innerHTML = cardContent;
                    
                    slide.appendChild(cardDiv);
                    targetGrid.appendChild(slide);
                } else {
                    // Якщо магазин - просто картка
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = cardContent;
                    targetGrid.appendChild(card);
                }
            });

            // === ІНІЦІАЛІЗАЦІЯ SWIPER (Тільки після завантаження товарів) ===
            if (isHome) {
                new Swiper(".mySwiper", {
                    slidesPerView: 1.2, // Мобільний
                    spaceBetween: 16,
                    loop: true, // Нескінченна прокрутка
                    grabCursor: true,
                    
                    // Автопрокрутка
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },

                    // Пагінація (крапочки)
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                        dynamicBullets: true,
                    },

                    // Стрілочки
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },

                    // Адаптивність
                    breakpoints: {
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    },
                });
            }

        } catch (error) {
            console.error("Error loading JSON:", error);
            targetGrid.innerHTML = "<p>Failed to load products. Check JSON path.</p>";
        }
    }

    loadProducts();

    // =========================================
    // 5. TIMER (EasyTimer.js)
    // =========================================
    if (document.querySelector('.countdown-timer') && typeof easytimer !== 'undefined') {
       var timer = new easytimer.Timer();
       timer.start({countdown: true, startValues: {days: 2, hours: 12, minutes: 45}});
       
       function updateTimerDisplay() {
            const t = timer.getTimeValues();
            const daysEl = document.getElementById('days');
            if(daysEl) {
                daysEl.innerText = String(t.days).padStart(2,'0');
                document.getElementById('hours').innerText = String(t.hours).padStart(2,'0');
                document.getElementById('minutes').innerText = String(t.minutes).padStart(2,'0');
                document.getElementById('seconds').innerText = String(t.seconds).padStart(2,'0');
            }
       }

       timer.addEventListener('secondsUpdated', updateTimerDisplay);
       timer.addEventListener('started', updateTimerDisplay); // Щоб не чекати 1 сек при завантаженні
    }

    // =========================================
    // 6. FOOTER ACCORDION
    // =========================================
    const accordions = document.querySelectorAll('.footer-accordion .accordion-toggle');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            const content = this.nextElementSibling;
            
            // Перевірка на наявність контенту
            if (content) {
                content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
                const icon = this.querySelector('.fa-chevron-up');
                if(icon) {
                    icon.style.transform = content.style.maxHeight ? "rotate(180deg)" : "rotate(0deg)";
                }
            }
        });
    });
});

// === 0. LANGUAGE DATA & LOGIC ===
const translations = {
    'en': {
        'discount_text': '30% off storewide — Limited time!',
        'nav_home': 'Home',
        'nav_shop': 'Shop',
        'nav_product': 'Product',
        'nav_all': 'All Products',
        'nav_contact': 'Contact Us',
        'hero_title': 'More than<br>just a game.<br>It\'s a lifestyle.',
        'hero_desc': "Whether you're just starting out, have played your whole life or you're a Tour pro, your swing is like a fingerprint.",
        'btn_shop_now': 'Shopping Now',
        'sec_featured': 'Featured',
        'sec_categories': 'Shop by Categories',
        'sec_collection': 'Shop Collection',
        'sec_articles': 'Latest Articles',
        'offer_tag': 'LIMITED EDITION',
        'offer_title': 'Hurry up! 30% OFF',
        'offer_desc': 'Find clubs that are right for your game',
        'newsletter_title': 'Join Our Newsletter',
        'newsletter_desc': 'Sign up for deals, new products and promotions',
        'btn_signup': 'Signup',
        'footer_desc': "More than just a game. It's a lifestyle.",
        'cat_clubs': 'Golf Clubs',
        'cat_balls': 'Golf Balls',
        'cat_bags': 'Golf Bags',
        'cat_clothing': 'Clothing & Rainwear',
        'cat_footwear': 'Footwear',
        'cat_acc': 'Accessories',
        'btn_add_cart': 'Add to cart',
        'modal_title': 'Sign In',
        'btn_signin': 'Sign In'
    },
    'uk': {
        'discount_text': 'Знижка 30% на все — Тільки зараз!',
        'nav_home': 'Головна',
        'nav_shop': 'Магазин',
        'nav_product': 'Товар',
        'nav_all': 'Всі товари',
        'nav_contact': 'Контакти',
        'hero_title': 'Більше ніж<br>просто гра.<br>Це стиль життя.',
        'hero_desc': 'Незалежно від того, чи ви тільки починаєте, граєте все життя або ви профі — ваш удар унікальний, як відбиток пальця.',
        'btn_shop_now': 'Купити зараз',
        'sec_featured': 'Хіти продажу',
        'sec_categories': 'Категорії',
        'sec_collection': 'Колекції',
        'sec_articles': 'Останні статті',
        'offer_tag': 'ЛІМІТОВАНА СЕРІЯ',
        'offer_title': 'Поспішай! Знижка 30%',
        'offer_desc': 'Знайдіть ключки, що підходять саме для вашої гри',
        'newsletter_title': 'Підпишись на новини',
        'newsletter_desc': 'Отримуйте знижки, новинки та акції',
        'btn_signup': 'Підписатись',
        'footer_desc': 'Більше ніж просто гра. Це стиль життя.',
        'cat_clubs': 'Ключки',
        'cat_balls': 'М\'ячі',
        'cat_bags': 'Сумки',
        'cat_clothing': 'Одяг',
        'cat_footwear': 'Взуття',
        'cat_acc': 'Аксесуари',
        'btn_add_cart': 'В кошик',
        'modal_title': 'Вхід',
        'btn_signin': 'Увійти'
    }
};

// === THEME SWITCHER LOGIC ===

function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    
    // Перевіряємо поточну тему
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        // Вмикаємо світлу
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if(icon) icon.className = 'fa-regular fa-moon'; // Іконка місяця
    } else {
        // Вмикаємо темну
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if(icon) icon.className = 'fa-regular fa-sun'; // Іконка сонця
    }
}

// Функція для перевірки збереженої теми при завантаженні
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('themeIcon');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if(icon) icon.className = 'fa-regular fa-sun';
    }
}

// Додаємо виклик initTheme() до події DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
});

// Функція зміни мови
function changeLanguage(lang) {
    // 1. Зберігаємо вибір у пам'ять браузера
    localStorage.setItem('selectedLang', lang);

    // 2. Змінюємо активний клас на кнопках
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === (lang === 'uk' ? 'ua' : 'en')) {
            btn.classList.add('active');
        }
    });

    // 3. Знаходимо всі елементи з атрибутом "key" і змінюємо текст
    const elements = document.querySelectorAll('[key]');
    elements.forEach(el => {
        const key = el.getAttribute('key');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // 4. Перезавантажуємо товари (якщо ми на сторінці з товарами), 
    // щоб оновити назви товарів (якщо вони у вас будуть перекладені в JSON)
    if (typeof loadProducts === 'function') {
        loadProducts(); 
    }
}

// Запуск при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    // Перевіряємо, що вибрав користувач раніше, або ставимо EN за замовчуванням
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    changeLanguage(savedLang);
});

// Sticky Header Logic
const header = document.querySelector('.header');
/* Відслідковуємо скрол */
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) { // Якщо прокрутили більше 100px
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

async function loadArticles() {
    const grid = document.getElementById('articlesGrid');
    if (!grid) return;
    
    try {
        const response = await fetch('articles.json');
        const articles = await response.json();
        
        grid.innerHTML = '';
        
        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'article-card';
            // Можна додати і data-aos="fade-up" для анімації
            card.setAttribute('data-aos', 'fade-up'); 
            
            card.innerHTML = `
                <a href="${article.link}">
                    <img src="${article.image}" alt="${article.title}">
                </a>
                <h3>${article.title}</h3>
                <a href="${article.link}" class="read-more">Read More &rarr;</a>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error(error);
    }
}

// Не забудь викликати функцію!
loadArticles();

// =========================================
    // 7. PUSH NOTIFICATIONS (Web API)
    // =========================================
    const singBtn = document.getElementById('singBtn');

    // Перевірка: чи підтримує браузер сповіщення
    if (!("Notification" in window)) {
        console.log("Цей браузер не підтримує сповіщення.");
        if(singBtn) singBtn.style.display = 'none'; // Ховаємо кнопку, якщо не підтримує
    }

    if (singBtn) {
        singBtn.addEventListener('click', () => {
            // Запитуємо дозвіл
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    // Якщо користувач натиснув "Дозволити"
                    const notification = new Notification("3legant Golf Store", {
                        body: "Дякуємо за підписку! Тепер ви будете отримувати найкращі пропозиції першими.",
                    });
                    
                    // Змінюємо іконку на зафарбовану, щоб показати статус
                    const icon = singBtn.querySelector('i');
                    icon.classList.remove('fa-regular');
                    icon.classList.add('fa-solid');
                    
                } else if (permission === "denied") {
                    // Якщо користувач заблокував
                    alert("Ви заблокували сповіщення. Змініть налаштування браузера, якщо передумаєте.");
                }
            });
        });
    }