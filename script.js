// بيانات الأصدقاء
const friends = {
    friend1: {
        name: "ضياء حريز",
        price: "10 ضحكات",
        image: "images/friend1.jpg",
        description: "ضياء حريز هو المحب الحقيقي لصبا وما عندوش حتى مهارة يتربجو بيه ملك الجبر!<br><strong>النكتة اليومية:</strong><ul><li>خبير في التعرض للضرب  !</li><li>يعشق صبا أكثر مالصبا !</li><li>يتنفس... هذا الشي الوحيد لي يعرف يعملو  !</li></ul>",
        cartMessage: "هههه! ضياء في السلة؟ إياد شايخ عليك بالضحك !"
    },
    friend2: {
        name: "محمد المختار بونني",
        price: "15 ضحكة",
        image: "images/bounenni.jpg",
        description: "يحب سارة مليح وينجم يتبعها فوق حي الدير وتحت حي الدير!<br><strong>النكتة اليومية:</strong><ul><li>خير من ضو...   موش برشا!</li><li>عندو لحية   !</li><li>يرقد    !</li></ul>",
        cartMessage: "محمد المختار في السلة؟ سارة فيبالها؟"
    },
    friend3: {
        name: "فارس الكلاعي",
        price: "8 ضحكات",
        image: "images/fares.jpg",
        description: "فرياليات!<br><strong>النكتة اليومية:</strong><ul><li>  مولى غروب زبيبي !</li><li>   يوكل زبي يشرب زبي !</li><li> 10    أحسن واحد يتنفس!</li></ul>",
        cartMessage: "فارس في السلة؟ إياد، إنت متأكد؟ ههه!"
    },
    friend4: {
        name: "علي بن رزيق",
        price: "0 ضحكة",
        image: "images/ali.jpg",
        description: " عبد أبيض!br><strong>النكتة اليومية:</strong><ul><li>   متطرف أما منحرف و يحب الكوابل !</li><li>خبير في الضحك     !</li><li>  أحسن غارديان في مخو...  !</li></ul>",
        cartMessage: "علي بن رزيق في السلة؟ إياد يقول: هذا أكبر مقلب!"
    },
    friend5: {
        name: "جوهر",
        price: "11 ضحكة",
        image: "images/jawhar.jpg",
        description: "جوهر،  الكينغ متاع المات!<br><strong>النكتة اليومية:</strong><ul><li>      لتوا ماعرس توا يفيدك غوس يا مستك!</li><li>المثال الأعلى متاع ضو   ...    !</li><li>تو يخرا فيه هوا و غوس   ...     !</li></ul>",
        cartMessage: "جوهر في السلة؟ إياد يقول: هذا مقلب يستاهل قصة!"
    }
};

// إدارة السلة
let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

// تحديث العداد في شريط التنقل
const cartCountElement = document.getElementById('cart-count');
if (cartCountElement) {
    cartCountElement.textContent = cartCount;
}

// قراءة المعرف من عنوان URL
const urlParams = new URLSearchParams(window.location.search);
const friendId = urlParams.get('id');

// تحديث صفحة المنتج
if (friendId && friends[friendId] && document.getElementById('product-name')) {
    document.getElementById('product-name').textContent = friends[friendId].name;
    document.getElementById('product-price').textContent = `السعر: ${friends[friendId].price}`;
    document.getElementById('product-image').src = friends[friendId].image;
    document.getElementById('product-image').alt = friends[friendId].name;
    document.getElementById('product-description').innerHTML = friends[friendId].description;
} else if (document.getElementById('product-description')) {
    document.getElementById('product-description').textContent = 'المنتج غير موجود!';
}

// التعامل مع زر أضف إلى السلة
const addToCartButton = document.getElementById('add-to-cart');
const cartMessage = document.getElementById('cart-message');

if (addToCartButton && cartMessage) {
    addToCartButton.addEventListener('click', () => {
        cartCount++;
        cartItems.push(friendId);
        localStorage.setItem('cartCount', cartCount);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        cartCountElement.textContent = cartCount;
        cartMessage.textContent = friends[friendId].cartMessage;
        cartMessage.classList.add('show');
        setTimeout(() => {
            cartMessage.classList.remove('show');
        }, 3000);
    });
}

// تحديث صفحة السلة
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart');

function updateCart() {
    if (cartItemsContainer && cartTotalElement) {
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>السلة فارغة! أضف بعض الأصدقاء للمقلب!</p>';
            cartTotalElement.textContent = 'إجمالي الضحكات: 0';
        } else {
            cartItemsContainer.innerHTML = '';
            let totalLaughs = 0;
            cartItems.forEach((itemId, index) => {
                if (friends[itemId]) {
                    const item = friends[itemId];
                    const priceNumber = parseInt(item.price) || 0;
                    totalLaughs += priceNumber;
                    cartItemsContainer.innerHTML += `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div>
                                <h3>${item.name}</h3>
                                <p>السعر: ${item.price}</p>
                                <button class="remove-btn" data-index="${index}">إزالة</button>
                            </div>
                        </div>
                    `;
                }
            });
            cartTotalElement.textContent = `إجمالي الضحكات: ${totalLaughs}`;
        }
        cartCountElement.textContent = cartCount;
    }
}

if (cartItemsContainer) {
    updateCart();
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = parseInt(e.target.dataset.index);
            cartItems.splice(index, 1);
            cartCount--;
            localStorage.setItem('cartCount', cartCount);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCart();
        }
    });
}

if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
        cartItems = [];
        cartCount = 0;
        localStorage.setItem('cartCount', 0);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCart();
    });
}

// التعامل مع البحث
const searchInput = document.getElementById('search-input');
const searchMessage = document.getElementById('search-message');
const productList = document.querySelector('.product-list');

if (searchInput && productList) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        const cards = productList.querySelectorAll('.product-card');
        let found = false;
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            if (name.includes(query) && query !== '') {
                card.style.display = 'block';
                found = true;
            } else {
                card.style.display = 'none';
            }
        });
        searchMessage.textContent = found ? '' : query === '' ? '' : 'ما لقيناش هذا الطحان الرجاء ماعادش تعاودها! إياد يقول: جرب اسم ثاني!';
    });
}

// التعامل مع نموذج الاتصال
const contactForm = document.querySelector('.contact-form');
const contactResponse = document.getElementById('contact-response');

if (contactForm && contactResponse) {
    document.getElementById('submit-contact').addEventListener('click', () => {
        const name = document.getElementById('contact-name').value.trim();
        const friend = document.getElementById('contact-friend').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        if (name && friend && message) {
            contactResponse.textContent = `يا ${name}! إياد شاف رسالتك عن ${friend}! قال: "${message}"؟ هههه، يزي مالبلادة متاعك !`;
            contactResponse.classList.add('show');
            setTimeout(() => {
                contactResponse.classList.remove('show');
            }, 5000);
            document.getElementById('contact-name').value = '';
            document.getElementById('contact-friend').value = '';
            document.getElementById('contact-message').value = '';
        } else {
            contactResponse.textContent = 'إياد يقول: إملى كل الحقول يا بطل متاع البهيم تعملو سطل!';
            contactResponse.classList.add('show');
            setTimeout(() => {
                contactResponse.classList.remove('show');
            }, 3000);
        }
    });
}