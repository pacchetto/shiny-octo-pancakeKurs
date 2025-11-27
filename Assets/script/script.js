document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 0. LANGUAGE DATA & INIT
    // =========================================
    const translations = {
        'en': {
            'discount_text': '30% off storewide — Limited time!',
            'nav_home': 'Home',
            'nav_shop': 'Shop',
            'nav_product': 'Product',
            'nav_all': 'All Products',
            'nav_contact': 'Contact Us',
            'nav_blog': 'Blog',
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
            'btn_signin': 'Sign In',
            'related_products': 'You might also like',
            'delivery_returns': 'Delivery & Returns',
            'delivery_info': 'Free delivery for orders over $100. Returns within 30 days.',
            'material_care': 'Material & Care',
            'material_care_info': '100% Cotton. Machine wash cold, do not bleach, tumble dry low.'
        },
        'uk': {
            'discount_text': 'Знижка 30% на все — Тільки зараз!',
            'nav_home': 'Головна',
            'nav_shop': 'Магазин',
            'nav_product': 'Товар',
            'nav_all': 'Всі товари',
            'nav_contact': 'Контакти',
            'nav_blog': 'Блог',
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
            'btn_signin': 'Увійти',
            'related_products': 'Вам може сподобатись',
            'delivery_returns': 'Доставка та Повернення',
            'delivery_info': 'Безкоштовна доставка від $100. Повернення протягом 30 днів.',
            'material_care': 'Матеріали та Догляд',
            'material_care_info': '100% Бавовна. Машинне прання в холодній воді, не відбілювати.'
        }
    };

    window.changeLanguage = function(lang) {
        localStorage.setItem('selectedLang', lang);

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase() === (lang === 'uk' ? 'ua' : 'en')) {
                btn.classList.add('active');
            }
        });

        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(el => {
            const key = el.dataset.key;
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Також оновлюємо атрибут lang у html
        document.documentElement.lang = lang;
        
        loadProducts(); // Оновлюємо товари (якщо треба перекласти щось динамічне)
    };

    const savedLang = localStorage.getItem('selectedLang') || 'en';
    changeLanguage(savedLang);

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
            }
        });
    }

    const header = document.querySelector('.header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (header && window.scrollY > 100) {
            header.classList.add('sticky');
        } else if (header) {
            header.classList.remove('sticky');
        }

        if (scrollTopBtn) {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    // =========================================
    // 2. THEME SWITCHER
    // =========================================
    window.toggleTheme = function() {
        const body = document.body;
        const icon = document.getElementById('themeIcon');
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            if(icon) icon.className = 'fa-regular fa-moon';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if(icon) icon.className = 'fa-regular fa-sun';
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('themeIcon');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if(icon) icon.className = 'fa-regular fa-sun';
    }

    // =========================================
    // 3. LOGIN MODAL LOGIC
    // =========================================
    const modal = document.getElementById('loginModal');
    const loginBtns = document.querySelectorAll('.account-icon, .uppercase-btn'); // Об'єднав селектори
    const closeModal = document.querySelector('.close-modal');
    const passwordToggleBtn = document.querySelector('.toggle-password');

    if (modal) {
        // Делегування подій, якщо кнопок кілька
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.account-icon') || e.target.closest('.uppercase-btn')) {
                e.preventDefault();
                modal.style.display = "flex";
                setTimeout(() => modal.classList.add('active'), 10); 
            }
        });

        if(closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => modal.style.display = "none", 300);
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.style.display = "none", 300);
            }
        });
    }

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
    // 4. LOAD PRODUCTS (Updated with Filters)
    // =========================================
    async function loadProducts() {
        const homeGrid = document.getElementById('productsGrid'); 
        const shopGrid = document.getElementById('shopProductsGrid'); 
        const relatedGrid = document.getElementById('relatedProductsGrid');
        
        const isHome = !!homeGrid; 
        const isRelated = !!relatedGrid;
        
        const targetGrid = homeGrid || shopGrid || relatedGrid; 
        
        if (!targetGrid) return;

        if ((isHome || isRelated) && targetGrid.classList.contains('products-grid')) {
            targetGrid.classList.remove('products-grid');
        }

        try {
            targetGrid.innerHTML = '';
            const response = await fetch('products.json');
            const products = await response.json();
            
            let productsToShow = products;

            // --- ФІЛЬТРАЦІЯ (Тільки для shop.html) ---
            if (shopGrid) {
                const params = new URLSearchParams(window.location.search);
                const category = params.get('category');
                const search = params.get('search');

                if (category && category !== 'all') {
                    productsToShow = products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
                }
                
                if (search) {
                    productsToShow = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
                    // Оновлюємо заголовок сторінки при пошуку
                    const pageTitle = document.querySelector('.page-title');
                    if (pageTitle) pageTitle.innerText = `Search results: "${search}"`;
                }
                
                if (productsToShow.length === 0) {
                    targetGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found.</p>';
                    return;
                }
            } else if (isRelated) {
                // Для слайдера related беремо перші 5 (або випадкові)
                productsToShow = products.slice(0, 5);
            }
            // ----------------------------------------

            productsToShow.forEach(product => {
                let starsHTML = '';
                for(let i=0; i<5; i++) {
                    starsHTML += i < product.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
                }

                let badgesHTML = '';
                if(product.badges) {
                    product.badges.forEach(badge => badgesHTML += `<span class="badge ${badge}">${badge.toUpperCase()}</span>`);
                }

                const priceHTML = product.oldPrice 
                    ? `<span>$${product.price}</span> <span class="old-price">$${product.oldPrice}</span>`
                    : `$${product.price}`;

                const cardContent = `
                    <div class="product-image-container">
                        ${badgesHTML}
                        <a href="product-details.html?id=${product.id}"> 
                            <img src="${product.image}" alt="${product.title}">
                        </a>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})" data-key="btn_add_cart">Add to cart</button>
                    </div>
                    <div class="product-info">
                        <div class="product-rating">${starsHTML}</div>
                        <h3 class="product-title">
                            <a href="product-details.html?id=${product.id}">${product.title}</a>
                        </h3>
                        <div class="product-price">${priceHTML}</div>
                    </div>
                `;

                if (isHome || isRelated) {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'product-card';
                    cardDiv.innerHTML = cardContent;
                    slide.appendChild(cardDiv);
                    targetGrid.appendChild(slide);
                } else {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = cardContent;
                    targetGrid.appendChild(card);
                }
            });

            if (isHome || isRelated) {
                // Перевірка, чи Swiper вже ініціалізовано, щоб уникнути помилок
                if (targetGrid.parentElement.swiper) {
                    targetGrid.parentElement.swiper.destroy(true, true);
                }
                
                new Swiper(".mySwiper", {
                    slidesPerView: 1.2,
                    spaceBetween: 16,
                    loop: true,
                    grabCursor: true,
                    pagination: { el: ".swiper-pagination", clickable: true, dynamicBullets: true },
                    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
                    breakpoints: {
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 3, spaceBetween: 24 },
                        1024: { slidesPerView: 4, spaceBetween: 24 },
                    },
                });
            }

        } catch (error) {
            console.error("Error loading JSON:", error);
            targetGrid.innerHTML = "<p>Failed to load products.</p>";
        }
    }

    loadProducts();

    // =========================================
    // 5. LOAD ARTICLES
    // =========================================
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
            console.error("Error loading articles:", error);
        }
    }

    loadArticles();

    // =========================================
    // 6. TIMER, FOOTER & PUSH
    // =========================================
    if (document.querySelector('.countdown-timer') && typeof easytimer !== 'undefined') {
       var timer = new easytimer.Timer();
       timer.start({countdown: true, startValues: {days: 2, hours: 12, minutes: 45}});
       
       function updateTimerDisplay() {
           const t = timer.getTimeValues();
           const elements = document.querySelectorAll('.countdown-timer');
           elements.forEach(el => {
                const daysSpan = el.querySelector('.timer-box:nth-child(1) .timer-value');
                const hoursSpan = el.querySelector('.timer-box:nth-child(2) .timer-value');
                const minsSpan = el.querySelector('.timer-box:nth-child(3) .timer-value');
                const secsSpan = el.querySelector('.timer-box:nth-child(4) .timer-value');

                if(daysSpan) daysSpan.innerText = String(t.days).padStart(2,'0');
                if(hoursSpan) hoursSpan.innerText = String(t.hours).padStart(2,'0');
                if(minsSpan) minsSpan.innerText = String(t.minutes).padStart(2,'0');
                if(secsSpan) secsSpan.innerText = String(t.seconds).padStart(2,'0');
           });
       }
       timer.addEventListener('secondsUpdated', updateTimerDisplay);
       timer.addEventListener('started', updateTimerDisplay);
    }

    const accordions = document.querySelectorAll('.footer-accordion .accordion-toggle');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content) {
                const isActive = content.style.maxHeight;
                content.style.maxHeight = isActive ? null : content.scrollHeight + "px";
                this.parentElement.classList.toggle('active');
            }
        });
    });
    
    // Акордеони на сторінці продукту
    const prodAccordions = document.querySelectorAll('.product-accordions .accordion-header');
    if(prodAccordions) {
        prodAccordions.forEach(acc => {
            acc.addEventListener('click', function() {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                if(content) {
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                }
            });
        });
    }

    const singBtn = document.getElementById('singBtn');
    if (singBtn && "Notification" in window) {
        singBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification("3legant Golf Store", { body: "Thank you for subscribing!" });
                }
            });
        });
    }

    // =========================================
    // 7. PRODUCT DETAILS PAGE LOGIC
    // =========================================
    async function loadProductDetails() {
        const titleEl = document.getElementById('detailsTitle');
        if (!titleEl) return;

        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');

        if (!productId) return;

        try {
            const response = await fetch('products.json');
            const products = await response.json();
            const product = products.find(p => p.id == productId);

            if (!product) {
                titleEl.innerText = 'Product not found';
                return;
            }

            const mainImg = document.getElementById('mainImg');
            if(mainImg) mainImg.src = product.image;

            titleEl.innerText = product.title;
            
            const breadcrumbTitle = document.getElementById('breadcrumbTitle');
            if(breadcrumbTitle) breadcrumbTitle.innerText = product.title;

            const priceEl = document.getElementById('detailsPrice');
            if(priceEl) {
                priceEl.innerHTML = product.oldPrice 
                    ? `$${product.price} <span class="old-price">$${product.oldPrice}</span>`
                    : `$${product.price}`;
            }

            const descEl = document.getElementById('detailsDesc');
            if(descEl && product.description) descEl.innerText = product.description;

            const ratingContainer = document.getElementById('detailsRating');
            if(ratingContainer) {
                let stars = '';
                for(let i=0; i<5; i++) stars += i < product.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
                ratingContainer.innerHTML = stars + `<span style="color: var(--secondary-text); font-size: 0.8rem; margin-left: 8px;">(Reviews)</span>`;
            }

            const thumbnailsContainer = document.querySelector('.thumbnails');
            if (thumbnailsContainer && product.images) {
                thumbnailsContainer.innerHTML = '';
                product.images.forEach((imgSrc, index) => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    if (index === 0) img.classList.add('active-thumb');
                    
                    img.addEventListener('click', function() {
                        if(mainImg) mainImg.src = this.src;
                        document.querySelectorAll('.thumbnails img').forEach(i => i.classList.remove('active-thumb'));
                        this.classList.add('active-thumb');
                    });
                    thumbnailsContainer.appendChild(img);
                });
            }

        } catch (error) {
            console.error(error);
        }
    }

    loadProductDetails();

    // =========================================
    // 8. INTERACTIVE ELEMENTS
    // =========================================
    
    // Wishlist Button
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#ff0000';
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                icon.style.color = '';
            }
        });
    }

    // Counter
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');

    if (minusBtn && plusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val > 1) qtyInput.value = val - 1;
        });
        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            qtyInput.value = val + 1;
        });
        qtyInput.addEventListener('change', function() {
            if (this.value < 1 || isNaN(this.value)) this.value = 1;
        });
    }
    
    // FORMAT CARD NUMBER (CHECKOUT)
    const cardInput = document.getElementById('cardNumber');
    if (cardInput) {
        cardInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, ''); 
            value = value.substring(0, 16); 
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value; 
            e.target.value = formattedValue;
        });
    }
    
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, ''); 
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // === SEARCH LOGIC ===
    const searchIcon = document.querySelector('.search-icon'); 
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');

    if (searchIcon && searchOverlay) {
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            searchOverlay.classList.add('open'); 
            setTimeout(() => {
                if(searchInput) searchInput.focus();
            }, 100);
        });

        if(closeSearch) {
            closeSearch.addEventListener('click', () => {
                searchOverlay.classList.remove('open');
            });
        }

        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) searchOverlay.classList.remove('open');
        });

        if(searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = searchInput.value.trim();
                    if (query) {
                        window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
                    }
                }
            });
        }
    }

});

// =========================================
// 9. SHOPPING CART LOGIC (GLOBAL)
// =========================================

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const closeCart = document.getElementById('closeCart');
const cartIcon = document.getElementById('cartIcon');

function toggleCart(show) {
    if(!cartOverlay || !cartDrawer) return;
    if (show) {
        cartOverlay.classList.add('open');
        cartDrawer.classList.add('open');
    } else {
        cartOverlay.classList.remove('open');
        cartDrawer.classList.remove('open');
    }
}

if(cartIcon) cartIcon.addEventListener('click', () => toggleCart(true));
if(closeCart) closeCart.addEventListener('click', () => toggleCart(false));
if(cartOverlay) cartOverlay.addEventListener('click', (e) => {
    if(e.target === cartOverlay) toggleCart(false);
});

async function addToCart(productId, quantity = 1) {
    if (typeof quantity === 'object') quantity = 1; 

    try {
        const response = await fetch('products.json');
        const products = await response.json();
        const product = products.find(p => p.id == productId);

        if (!product) return;

        const existingItem = cart.find(item => item.id == productId);

        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: parseInt(quantity)
            });
        }

        updateCartUI();
        toggleCart(true);

    } catch (error) {
        console.error(error);
    }
}
window.addToCart = addToCart;

const addBtnLarge = document.querySelector('.add-to-cart-btn-large');
if(addBtnLarge) {
    addBtnLarge.addEventListener('click', () => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const qtyInput = document.querySelector('.qty-input');
        const qty = qtyInput ? qtyInput.value : 1;
        if(id) addToCart(id, qty);
    });
}

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id != id);
    updateCartUI();
}

window.updateQty = function(id, change) {
    const item = cart.find(item => item.id == id);
    if(item) {
        item.quantity += change;
        if(item.quantity < 1) item.quantity = 1;
        updateCartUI();
    }
}

function updateCartUI() {
    localStorage.setItem('cart', JSON.stringify(cart));

    const countBadge = document.getElementById('cartCount');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if(countBadge) {
        countBadge.innerText = totalCount;
        countBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    const container = document.getElementById('cartItemsContainer');
    const totalEl = document.getElementById('cartTotal');
    
    if(container && totalEl) {
        container.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            container.innerHTML = '<p style="text-align:center; margin-top: 20px; color: grey;">Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                totalPrice += item.price * item.quantity;
                container.innerHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.title}</div>
                            <div class="cart-item-price">$${item.price}</div>
                            <div class="cart-item-controls">
                                <div class="item-qty">
                                    <button onclick="updateQty(${item.id}, -1)">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="updateQty(${item.id}, 1)">+</button>
                                </div>
                                <span class="remove-item" onclick="removeFromCart(${item.id})">Remove</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        totalEl.innerText = `$${totalPrice.toFixed(2)}`;
    }

    renderCheckout();
}

function renderCheckout() {
    const checkoutList = document.getElementById('checkoutItemsList');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutTotal = document.getElementById('checkoutTotal');

    if(checkoutList && checkoutSubtotal && checkoutTotal) {
        checkoutList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            checkoutList.innerHTML += `
                <div class="summary-row">
                    <span>${item.title} <span style="color:#6C7275">x${item.quantity}</span></span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
        });

        checkoutSubtotal.innerText = `$${total.toFixed(2)}`;
        checkoutTotal.innerText = `$${total.toFixed(2)}`;
    }
}

const checkoutForm = document.getElementById('checkoutForm');
if(checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if(cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Thank you for your order! It has been placed successfully.');
        cart = [];
        updateCartUI();
        window.location.href = 'index.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});