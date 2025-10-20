// Main JavaScript functionality for TravelMate

// Global variables
let cart = JSON.parse(localStorage.getItem('travelmate_cart')) || [];
let bookings = JSON.parse(localStorage.getItem('travelmate_bookings')) || [];
let itinerary = JSON.parse(localStorage.getItem('travelmate_itinerary')) || [];
let expenses = JSON.parse(localStorage.getItem('travelmate_expenses')) || [];
let memories = JSON.parse(localStorage.getItem('travelmate_memories')) || [];

// Sample data for demonstrations
const sampleFlights = [
    {
        id: 'FL001',
        airline: 'SkyWings Airlines',
        from: 'New York',
        to: 'Paris',
        departure: '08:30',
        arrival: '22:15',
        duration: '7h 45m',
        price: 899,
        stops: 'Direct'
    },
    {
        id: 'FL002',
        airline: 'Global Airways',
        from: 'New York',
        to: 'Paris',
        departure: '14:20',
        arrival: '06:30+1',
        duration: '8h 10m',
        price: 749,
        stops: '1 Stop'
    },
    {
        id: 'FL003',
        airline: 'EuroFly',
        from: 'New York',
        to: 'Paris',
        departure: '23:45',
        arrival: '13:20+1',
        duration: '7h 35m',
        price: 1099,
        stops: 'Direct'
    }
];

const sampleHotels = [
    {
        id: 'HT001',
        name: 'Grand Palace Hotel',
        location: 'Paris City Center',
        rating: 5,
        price: 299,
        amenities: ['Free WiFi', 'Spa', 'Restaurant', 'Pool'],
        image: '🏨'
    },
    {
        id: 'HT002',
        name: 'Boutique Charm Inn',
        location: 'Montmartre District',
        rating: 4,
        price: 189,
        amenities: ['Free WiFi', 'Breakfast', 'Bar'],
        image: '🏩'
    },
    {
        id: 'HT003',
        name: 'Modern City Suites',
        location: 'Business District',
        rating: 4,
        price: 249,
        amenities: ['Free WiFi', 'Gym', 'Business Center'],
        image: '🏢'
    }
];

const sampleActivities = [
    {
        id: 'AC001',
        name: 'Eiffel Tower Skip-the-Line Tour',
        location: 'Paris, France',
        duration: '3 hours',
        price: 45,
        rating: 4.8,
        category: 'tours',
        description: 'Skip the long lines and enjoy breathtaking views from the Eiffel Tower'
    },
    {
        id: 'AC002',
        name: 'Seine River Cruise & Dinner',
        location: 'Paris, France',
        duration: '2.5 hours',
        price: 89,
        rating: 4.7,
        category: 'food',
        description: 'Romantic dinner cruise along the Seine with stunning city views'
    },
    {
        id: 'AC003',
        name: 'Louvre Museum Private Tour',
        location: 'Paris, France',
        duration: '4 hours',
        price: 120,
        rating: 4.9,
        category: 'cultural',
        description: 'Private guided tour of the world\'s most famous art museum'
    }
];

const products = [
    {
        id: 'P001',
        name: 'Premium Travel Backpack',
        description: 'Durable, lightweight backpack with multiple compartments and TSA-approved laptop section',
        price: 129.99,
        category: 'luggage',
        rating: 4.8,
        image: '🎒'
    },
    {
        id: 'P002',
        name: 'Noise-Cancelling Headphones',
        description: 'Wireless headphones with active noise cancellation, perfect for long flights',
        price: 249.99,
        category: 'electronics',
        rating: 4.9,
        image: '🎧'
    },
    {
        id: 'P003',
        name: 'Travel Adapter Universal',
        description: 'All-in-one travel adapter compatible with outlets in 150+ countries',
        price: 29.99,
        category: 'electronics',
        rating: 4.7,
        image: '🔌'
    },
    {
        id: 'P004',
        name: 'Portable Charger 20000mAh',
        description: 'High-capacity power bank with fast charging and multiple USB ports',
        price: 59.99,
        category: 'electronics',
        rating: 4.6,
        image: '🔋'
    },
    {
        id: 'P005',
        name: 'Travel Pillow Memory Foam',
        description: 'Ergonomic neck pillow with memory foam for comfortable sleep during travel',
        price: 39.99,
        category: 'accessories',
        rating: 4.5,
        image: '🛏️'
    },
    {
        id: 'P006',
        name: 'Waterproof Travel Jacket',
        description: 'Lightweight, packable jacket with waterproof and windproof protection',
        price: 89.99,
        category: 'clothing',
        rating: 4.7,
        image: '🧥'
    },
    {
        id: 'P007',
        name: 'First Aid Travel Kit',
        description: 'Compact medical kit with essential supplies for travel emergencies',
        price: 24.99,
        category: 'health',
        rating: 4.4,
        image: '🏥'
    },
    {
        id: 'P008',
        name: 'Rolling Suitcase 28"',
        description: 'Hard-shell suitcase with 360° spinner wheels and TSA-approved lock',
        price: 199.99,
        category: 'luggage',
        rating: 4.8,
        image: '🧳'
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    updateCartCount();
    
    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            // Homepage is already set up
            break;
        case 'booking.html':
            initializeBookingPage();
            break;
        case 'shopping.html':
            initializeShoppingPage();
            break;
        case 'tracking.html':
            initializeTrackingPage();
            break;
    }
    
    // Set today's date as default for date inputs
    setDefaultDates();
}

// Navigation functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Set default dates for form inputs
function setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    // Set default dates for various inputs
    const dateInputs = {
        'flight-departure': todayStr,
        'flight-return': tomorrowStr,
        'hotel-checkin': todayStr,
        'hotel-checkout': tomorrowStr,
        'activity-date': todayStr,
        'expense-date': todayStr,
        'memory-date': todayStr
    };
    
    Object.entries(dateInputs).forEach(([id, value]) => {
        const input = document.getElementById(id);
        if (input) {
            input.value = value;
        }
    });
    
    // Set datetime-local for itinerary
    const activityDatetime = document.getElementById('activity-datetime');
    if (activityDatetime) {
        const now = new Date();
        now.setHours(now.getHours() + 1, 0, 0, 0); // Round to next hour
        activityDatetime.value = now.toISOString().slice(0, 16);
    }
}

// Booking functionality
function initializeBookingPage() {
    // Tab switching is handled by switchTab function
    console.log('Booking page initialized');
}

function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function searchFlights() {
    const from = document.getElementById('flight-from').value;
    const to = document.getElementById('flight-to').value;
    const departure = document.getElementById('flight-departure').value;
    const passengers = document.getElementById('flight-passengers').value;
    
    if (!from || !to || !departure) {
        alert('Please fill in all required fields');
        return;
    }
    
    const resultsContainer = document.getElementById('flight-results');
    const resultsGrid = resultsContainer.querySelector('.results-grid');
    
    // Show loading
    resultsGrid.innerHTML = '<div class="loading">Searching for flights...</div>';
    resultsContainer.style.display = 'block';
    
    // Simulate API call
    setTimeout(() => {
        resultsGrid.innerHTML = sampleFlights.map(flight => `
            <div class="result-card">
                <div class="result-header">
                    <div class="result-title">${flight.airline}</div>
                    <div class="result-price">$${flight.price}</div>
                </div>
                <div class="result-details">
                    <p><strong>${flight.from}</strong> → <strong>${flight.to}</strong></p>
                    <p>Departure: ${flight.departure} | Arrival: ${flight.arrival}</p>
                    <p>Duration: ${flight.duration} | ${flight.stops}</p>
                </div>
                <div class="result-actions">
                    <button class="btn btn-primary" onclick="bookFlight('${flight.id}')">
                        <i class="fas fa-plane"></i>
                        Book Flight
                    </button>
                </div>
            </div>
        `).join('');
    }, 1000);
}

function searchHotels() {
    const destination = document.getElementById('hotel-destination').value;
    const checkin = document.getElementById('hotel-checkin').value;
    const checkout = document.getElementById('hotel-checkout').value;
    
    if (!destination || !checkin || !checkout) {
        alert('Please fill in all required fields');
        return;
    }
    
    const resultsContainer = document.getElementById('hotel-results');
    const resultsGrid = resultsContainer.querySelector('.results-grid');
    
    resultsGrid.innerHTML = '<div class="loading">Searching for hotels...</div>';
    resultsContainer.style.display = 'block';
    
    setTimeout(() => {
        resultsGrid.innerHTML = sampleHotels.map(hotel => `
            <div class="result-card">
                <div class="result-header">
                    <div class="result-title">${hotel.name}</div>
                    <div class="result-price">$${hotel.price}/night</div>
                </div>
                <div class="result-details">
                    <p><i class="fas fa-map-marker-alt"></i> ${hotel.location}</p>
                    <p><i class="fas fa-star"></i> ${hotel.rating} stars</p>
                    <p><strong>Amenities:</strong> ${hotel.amenities.join(', ')}</p>
                </div>
                <div class="result-actions">
                    <button class="btn btn-primary" onclick="bookHotel('${hotel.id}')">
                        <i class="fas fa-bed"></i>
                        Book Hotel
                    </button>
                </div>
            </div>
        `).join('');
    }, 1000);
}

function searchActivities() {
    const destination = document.getElementById('activity-destination').value;
    const type = document.getElementById('activity-type').value;
    const date = document.getElementById('activity-date').value;
    
    if (!destination || !date) {
        alert('Please fill in destination and date');
        return;
    }
    
    const resultsContainer = document.getElementById('activity-results');
    const resultsGrid = resultsContainer.querySelector('.results-grid');
    
    resultsGrid.innerHTML = '<div class="loading">Searching for activities...</div>';
    resultsContainer.style.display = 'block';
    
    setTimeout(() => {
        let filteredActivities = sampleActivities;
        if (type) {
            filteredActivities = sampleActivities.filter(activity => activity.category === type);
        }
        
        resultsGrid.innerHTML = filteredActivities.map(activity => `
            <div class="result-card">
                <div class="result-header">
                    <div class="result-title">${activity.name}</div>
                    <div class="result-price">$${activity.price}</div>
                </div>
                <div class="result-details">
                    <p><i class="fas fa-map-marker-alt"></i> ${activity.location}</p>
                    <p><i class="fas fa-clock"></i> Duration: ${activity.duration}</p>
                    <p><i class="fas fa-star"></i> ${activity.rating} rating</p>
                    <p>${activity.description}</p>
                </div>
                <div class="result-actions">
                    <button class="btn btn-primary" onclick="bookActivity('${activity.id}')">
                        <i class="fas fa-ticket-alt"></i>
                        Book Activity
                    </button>
                </div>
            </div>
        `).join('');
    }, 1000);
}

// Booking functions
function bookFlight(flightId) {
    const flight = sampleFlights.find(f => f.id === flightId);
    if (flight) {
        showBookingModal('flight', flight);
    }
}

function bookHotel(hotelId) {
    const hotel = sampleHotels.find(h => h.id === hotelId);
    if (hotel) {
        showBookingModal('hotel', hotel);
    }
}

function bookActivity(activityId) {
    const activity = sampleActivities.find(a => a.id === activityId);
    if (activity) {
        showBookingModal('activity', activity);
    }
}

function showBookingModal(type, item) {
    const modal = document.getElementById('booking-modal');
    const details = document.getElementById('booking-details');
    
    let content = '';
    switch(type) {
        case 'flight':
            content = `
                <h3>${item.airline}</h3>
                <p><strong>Route:</strong> ${item.from} → ${item.to}</p>
                <p><strong>Departure:</strong> ${item.departure}</p>
                <p><strong>Arrival:</strong> ${item.arrival}</p>
                <p><strong>Duration:</strong> ${item.duration}</p>
                <p><strong>Price:</strong> $${item.price}</p>
            `;
            break;
        case 'hotel':
            content = `
                <h3>${item.name}</h3>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Rating:</strong> ${item.rating} stars</p>
                <p><strong>Price:</strong> $${item.price}/night</p>
                <p><strong>Amenities:</strong> ${item.amenities.join(', ')}</p>
            `;
            break;
        case 'activity':
            content = `
                <h3>${item.name}</h3>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Duration:</strong> ${item.duration}</p>
                <p><strong>Rating:</strong> ${item.rating}</p>
                <p><strong>Price:</strong> $${item.price}</p>
                <p>${item.description}</p>
            `;
            break;
    }
    
    details.innerHTML = content;
    modal.classList.add('open');
    
    // Store booking data for confirmation
    window.currentBooking = { type, item };
}

function closeBookingModal() {
    document.getElementById('booking-modal').classList.remove('open');
}

function confirmBooking() {
    if (window.currentBooking) {
        const booking = {
            id: Date.now().toString(),
            type: window.currentBooking.type,
            item: window.currentBooking.item,
            date: new Date().toISOString(),
            status: 'confirmed'
        };
        
        bookings.push(booking);
        localStorage.setItem('travelmate_bookings', JSON.stringify(bookings));
        
        alert('Booking confirmed successfully!');
        closeBookingModal();
        
        // Add to itinerary automatically
        addBookingToItinerary(booking);
    }
}

function addBookingToItinerary(booking) {
    const itineraryItem = {
        id: Date.now().toString(),
        title: getBookingTitle(booking),
        datetime: new Date().toISOString(),
        location: getBookingLocation(booking),
        category: booking.type,
        notes: `Booked via TravelMate - ${booking.item.name || booking.item.airline}`,
        bookingId: booking.id
    };
    
    itinerary.push(itineraryItem);
    localStorage.setItem('travelmate_itinerary', JSON.stringify(itinerary));
}

function getBookingTitle(booking) {
    switch(booking.type) {
        case 'flight':
            return `Flight: ${booking.item.from} to ${booking.item.to}`;
        case 'hotel':
            return `Hotel: ${booking.item.name}`;
        case 'activity':
            return booking.item.name;
        default:
            return 'Travel Booking';
    }
}

function getBookingLocation(booking) {
    switch(booking.type) {
        case 'flight':
            return booking.item.to;
        case 'hotel':
            return booking.item.location;
        case 'activity':
            return booking.item.location;
        default:
            return 'Unknown';
    }
}

// Shopping functionality
function initializeShoppingPage() {
    displayProducts();
}

function displayProducts(filteredProducts = products) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductModal('${product.id}')">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>${product.rating}</span>
                </div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart('${product.id}')">
                    <i class="fas fa-cart-plus"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function filterProducts(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    displayProducts(filteredProducts);
}

function searchProducts() {
    const query = document.getElementById('product-search').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    displayProducts(filteredProducts);
}

function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const body = document.getElementById('product-modal-body');
    
    body.innerHTML = `
        <div class="product-modal-grid">
            <div class="product-modal-image">${product.image}</div>
            <div class="product-modal-info">
                <h2>${product.name}</h2>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>${product.rating} rating</span>
                </div>
                <div class="product-price">$${product.price}</div>
                <p class="product-description">${product.description}</p>
                <div class="product-category">
                    <span class="category-tag">${product.category}</span>
                </div>
                <button class="btn btn-primary btn-large" onclick="addToCart('${product.id}'); closeProductModal();">
                    <i class="fas fa-cart-plus"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('open');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('open');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('travelmate_cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    
    // Show success message
    showToast('Product added to cart!');
}

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.textContent = totalItems;
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    <button class="quantity-btn" onclick="removeFromCart('${item.id}')" style="margin-left: 1rem; color: #ff6b6b;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    localStorage.setItem('travelmate_cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('travelmate_cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
        updateCartDisplay();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    const modal = document.getElementById('checkout-modal');
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    
    // Populate checkout items
    checkoutItems.innerHTML = cart.map(item => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = total.toFixed(2);
    
    modal.classList.add('open');
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.remove('open');
}

function processPayment() {
    // Simulate payment processing
    const name = document.getElementById('checkout-name').value;
    const email = document.getElementById('checkout-email').value;
    const address = document.getElementById('checkout-address').value;
    
    if (!name || !email || !address) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Simulate processing delay
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Clear cart
        cart = [];
        localStorage.setItem('travelmate_cart', JSON.stringify(cart));
        updateCartCount();
        
        // Close modals
        closeCheckoutModal();
        toggleCart();
        
        // Show success message
        alert('Order placed successfully! You will receive a confirmation email shortly.');
        
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 2000);
}

// Tracking functionality
function initializeTrackingPage() {
    loadItinerary();
    loadExpenses();
    loadMemories();
    updateAnalytics();
}

function switchTrackingTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tracking-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tracking-tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[onclick="switchTrackingTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Itinerary functions
function loadItinerary() {
    const timeline = document.getElementById('itinerary-timeline');
    if (!timeline) return;
    
    if (itinerary.length === 0) {
        timeline.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No activities planned yet. Add your first activity!</p>';
        return;
    }
    
    // Sort itinerary by date
    const sortedItinerary = [...itinerary].sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    
    timeline.innerHTML = sortedItinerary.map(item => `
        <div class="timeline-item">
            <div class="timeline-date">${formatDate(item.datetime)}</div>
            <div class="timeline-title">${item.title}</div>
            <div class="timeline-location">
                <i class="fas fa-map-marker-alt"></i>
                ${item.location}
            </div>
            <div class="timeline-category">${item.category}</div>
            ${item.notes ? `<p style="color: #666; margin-top: 0.5rem;">${item.notes}</p>` : ''}
            <button class="btn btn-secondary" onclick="editItineraryItem('${item.id}')" style="margin-top: 1rem;">
                <i class="fas fa-edit"></i>
                Edit
            </button>
        </div>
    `).join('');
}

function addItineraryItem() {
    document.getElementById('itinerary-modal').classList.add('open');
}

function closeItineraryModal() {
    document.getElementById('itinerary-modal').classList.remove('open');
    // Clear form
    document.getElementById('activity-title').value = '';
    document.getElementById('activity-location').value = '';
    document.getElementById('activity-notes').value = '';
}

function saveItineraryItem() {
    const title = document.getElementById('activity-title').value;
    const datetime = document.getElementById('activity-datetime').value;
    const location = document.getElementById('activity-location').value;
    const category = document.getElementById('activity-category').value;
    const notes = document.getElementById('activity-notes').value;
    
    if (!title || !datetime || !location) {
        alert('Please fill in all required fields');
        return;
    }
    
    const item = {
        id: Date.now().toString(),
        title,
        datetime,
        location,
        category,
        notes
    };
    
    itinerary.push(item);
    localStorage.setItem('travelmate_itinerary', JSON.stringify(itinerary));
    
    closeItineraryModal();
    loadItinerary();
    updateAnalytics();
    
    showToast('Activity added to itinerary!');
}

// Expense functions
function loadExpenses() {
    const expenseList = document.getElementById('expense-list');
    const totalExpenses = document.getElementById('total-expenses');
    const budgetRemaining = document.getElementById('budget-remaining');
    const dailyAverage = document.getElementById('daily-average');
    
    if (!expenseList) return;
    
    if (expenses.length === 0) {
        expenseList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No expenses recorded yet. Add your first expense!</p>';
        if (totalExpenses) totalExpenses.textContent = '0.00';
        return;
    }
    
    // Sort expenses by date (newest first)
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    expenseList.innerHTML = sortedExpenses.map(expense => `
        <div class="expense-item">
            <div class="expense-details">
                <h4>${expense.description}</h4>
                <div class="expense-meta">
                    ${formatDate(expense.date)} • ${expense.category}
                </div>
            </div>
            <div class="expense-item-amount">
                ${expense.currency} ${expense.amount.toFixed(2)}
            </div>
        </div>
    `).join('');
    
    // Update totals
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    if (totalExpenses) totalExpenses.textContent = total.toFixed(2);
    
    const budget = 2000; // Default budget
    if (budgetRemaining) budgetRemaining.textContent = (budget - total).toFixed(2);
    
    if (dailyAverage && expenses.length > 0) {
        const days = Math.max(1, Math.ceil((Date.now() - new Date(expenses[0].date)) / (1000 * 60 * 60 * 24)));
        dailyAverage.textContent = (total / days).toFixed(2);
    }
}

function addExpense() {
    document.getElementById('expense-modal').classList.add('open');
}

function closeExpenseModal() {
    document.getElementById('expense-modal').classList.remove('open');
    // Clear form
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
}

function saveExpense() {
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const currency = document.getElementById('expense-currency').value;
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;
    
    if (!description || !amount || !date) {
        alert('Please fill in all required fields');
        return;
    }
    
    const expense = {
        id: Date.now().toString(),
        description,
        amount,
        currency,
        category,
        date
    };
    
    expenses.push(expense);
    localStorage.setItem('travelmate_expenses', JSON.stringify(expenses));
    
    closeExpenseModal();
    loadExpenses();
    updateAnalytics();
    
    showToast('Expense added successfully!');
}

// Memory functions
function loadMemories() {
    const memoriesGrid = document.getElementById('memories-grid');
    if (!memoriesGrid) return;
    
    if (memories.length === 0) {
        memoriesGrid.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem; grid-column: 1 / -1;">No memories saved yet. Add your first memory!</p>';
        return;
    }
    
    // Sort memories by date (newest first)
    const sortedMemories = [...memories].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    memoriesGrid.innerHTML = sortedMemories.map(memory => `
        <div class="memory-card">
            <div class="memory-image">📸</div>
            <div class="memory-content">
                <h3 class="memory-title">${memory.title}</h3>
                <div class="memory-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${memory.location}
                </div>
                <div class="memory-date">${formatDate(memory.date)}</div>
                <p style="color: #666; margin: 1rem 0;">${memory.description}</p>
                <div class="memory-rating">
                    ${generateStars(memory.rating)}
                </div>
            </div>
        </div>
    `).join('');
}

function addMemory() {
    document.getElementById('memory-modal').classList.add('open');
    setupRatingInput();
}

function closeMemoryModal() {
    document.getElementById('memory-modal').classList.remove('open');
    // Clear form
    document.getElementById('memory-title').value = '';
    document.getElementById('memory-location').value = '';
    document.getElementById('memory-description').value = '';
    // Reset rating
    document.querySelectorAll('.rating-input .star').forEach(star => {
        star.classList.remove('active');
    });
}

function setupRatingInput() {
    const stars = document.querySelectorAll('.rating-input .star');
    let selectedRating = 0;
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            updateStarDisplay(stars, selectedRating);
        });
        
        star.addEventListener('mouseover', () => {
            updateStarDisplay(stars, index + 1);
        });
    });
    
    document.querySelector('.rating-input').addEventListener('mouseleave', () => {
        updateStarDisplay(stars, selectedRating);
    });
    
    // Store rating for later use
    window.selectedRating = selectedRating;
}

function updateStarDisplay(stars, rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    window.selectedRating = rating;
}

function saveMemory() {
    const title = document.getElementById('memory-title').value;
    const location = document.getElementById('memory-location').value;
    const date = document.getElementById('memory-date').value;
    const description = document.getElementById('memory-description').value;
    const rating = window.selectedRating || 5;
    
    if (!title || !location || !date) {
        alert('Please fill in all required fields');
        return;
    }
    
    const memory = {
        id: Date.now().toString(),
        title,
        location,
        date,
        description,
        rating
    };
    
    memories.push(memory);
    localStorage.setItem('travelmate_memories', JSON.stringify(memories));
    
    closeMemoryModal();
    loadMemories();
    updateAnalytics();
    
    showToast('Memory saved successfully!');
}

// Analytics functions
function updateAnalytics() {
    const countriesCount = document.getElementById('countries-count');
    const citiesCount = document.getElementById('cities-count');
    const activitiesCount = document.getElementById('activities-count');
    const photosCount = document.getElementById('photos-count');
    
    if (countriesCount) {
        const countries = new Set(itinerary.map(item => item.location.split(',').pop().trim()));
        countriesCount.textContent = countries.size;
    }
    
    if (citiesCount) {
        const cities = new Set(itinerary.map(item => item.location.split(',')[0].trim()));
        citiesCount.textContent = cities.size;
    }
    
    if (activitiesCount) {
        activitiesCount.textContent = itinerary.length;
    }
    
    if (photosCount) {
        photosCount.textContent = memories.length;
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    
    // Add animation keyframes
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// AI Chat toggle function (referenced in HTML)
function toggleAIChat() {
    const chatContainer = document.getElementById('ai-chat');
    if (chatContainer) {
        chatContainer.classList.toggle('open');
    }
}

// AI message sending function (referenced in HTML)
function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        addMessageToChat(response, 'ai');
    }, 1000);
}

function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('ai-messages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'ai-message user-message' : 'ai-message';
    
    const avatarClass = sender === 'user' ? 'user-avatar-small' : 'ai-avatar-small';
    const avatarIcon = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    messageDiv.innerHTML = `
        <div class="${avatarClass}">
            ${avatarIcon}
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Simple AI responses based on keywords
    if (message.includes('book') || message.includes('flight') || message.includes('hotel')) {
        return "I can help you find great deals on flights and hotels! Visit our booking page to search for the best options for your destination.";
    } else if (message.includes('pack') || message.includes('luggage') || message.includes('what to bring')) {
        return "Great question! Check out our shopping section for essential travel items. Don't forget: passport, chargers, comfortable shoes, and weather-appropriate clothing!";
    } else if (message.includes('budget') || message.includes('money') || message.includes('cost')) {
        return "Managing travel budget is important! Use our expense tracking feature to monitor your spending. I recommend setting aside 20% extra for unexpected expenses.";
    } else if (message.includes('destination') || message.includes('where') || message.includes('recommend')) {
        return "I'd love to help you choose a destination! Consider factors like weather, budget, activities you enjoy, and travel restrictions. Paris, Tokyo, and Bali are popular choices!";
    } else if (message.includes('itinerary') || message.includes('plan') || message.includes('schedule')) {
        return "Planning is key to a great trip! Use our activity tracking to organize your itinerary. I suggest booking must-see attractions in advance and leaving some free time for spontaneous discoveries.";
    } else if (message.includes('weather') || message.includes('climate')) {
        return "Weather can make or break a trip! Check the forecast for your destination and pack accordingly. Don't forget to consider seasonal variations and pack layers.";
    } else if (message.includes('safety') || message.includes('safe') || message.includes('security')) {
        return "Safety first! Research your destination, keep copies of important documents, stay aware of your surroundings, and consider travel insurance. Check our health & safety products too!";
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! I'm your AI travel assistant. I can help you with booking, packing, budgeting, and planning your perfect trip. What would you like to know?";
    } else if (message.includes('thank')) {
        return "You're welcome! I'm here to help make your travel experience amazing. Feel free to ask me anything about your trip planning!";
    } else {
        return "I'm here to help with all your travel needs! I can assist with booking flights and hotels, suggesting what to pack, managing your budget, and planning activities. What specific aspect of travel would you like help with?";
    }
}

// Allow Enter key to send AI messages
document.addEventListener('DOMContentLoaded', function() {
    const aiInput = document.getElementById('ai-input');
    if (aiInput) {
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
    }
});