// AI Assistant functionality for TravelMate

class TravelMateAI {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.userPreferences = this.loadUserPreferences();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadConversationHistory();
    }

    setupEventListeners() {
        // AI input enter key handler
        document.addEventListener('keypress', (e) => {
            if (e.target.id === 'ai-input' && e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            const chatContainer = document.getElementById('ai-chat');
            const chatToggleBtn = document.querySelector('[onclick="toggleAIChat()"]');
            
            if (this.isOpen && chatContainer && !chatContainer.contains(e.target) && e.target !== chatToggleBtn) {
                this.closeChat();
            }
        });
    }

    openChat() {
        const chatContainer = document.getElementById('ai-chat');
        if (chatContainer) {
            chatContainer.classList.add('open');
            this.isOpen = true;
            
            // Focus on input
            const input = document.getElementById('ai-input');
            if (input) {
                setTimeout(() => input.focus(), 100);
            }
        }
    }

    closeChat() {
        const chatContainer = document.getElementById('ai-chat');
        if (chatContainer) {
            chatContainer.classList.remove('open');
            this.isOpen = false;
        }
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    sendMessage() {
        const input = document.getElementById('ai-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateIntelligentResponse(message);
            this.addMessage(response, 'ai');
            
            // Save conversation
            this.saveConversation();
        }, 1000 + Math.random() * 1000); // Random delay for realism
    }

    addMessage(message, sender) {
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

        // Add to conversation history
        this.conversationHistory.push({
            message,
            sender,
            timestamp: new Date().toISOString()
        });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('ai-messages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="ai-avatar-small">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Add typing animation CSS if not exists
        if (!document.getElementById('typing-animation')) {
            const style = document.createElement('style');
            style.id = 'typing-animation';
            style.textContent = `
                .typing-dots {
                    display: flex;
                    gap: 4px;
                    padding: 8px 0;
                }
                .typing-dots span {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #667eea;
                    animation: typing 1.4s infinite ease-in-out;
                }
                .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
                .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
                .typing-dots span:nth-child(3) { animation-delay: 0s; }
                @keyframes typing {
                    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                    40% { transform: scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateIntelligentResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Context-aware responses based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Check for specific travel intents
        if (this.containsBookingIntent(message)) {
            return this.getBookingResponse(message, currentPage);
        } else if (this.containsShoppingIntent(message)) {
            return this.getShoppingResponse(message, currentPage);
        } else if (this.containsTrackingIntent(message)) {
            return this.getTrackingResponse(message, currentPage);
        } else if (this.containsDestinationIntent(message)) {
            return this.getDestinationResponse(message);
        } else if (this.containsBudgetIntent(message)) {
            return this.getBudgetResponse(message);
        } else if (this.containsPackingIntent(message)) {
            return this.getPackingResponse(message);
        } else if (this.containsWeatherIntent(message)) {
            return this.getWeatherResponse(message);
        } else if (this.containsSafetyIntent(message)) {
            return this.getSafetyResponse(message);
        } else if (this.containsGreeting(message)) {
            return this.getGreetingResponse();
        } else if (this.containsGratitude(message)) {
            return this.getGratitudeResponse();
        } else {
            return this.getGeneralHelpResponse();
        }
    }

    // Intent detection methods
    containsBookingIntent(message) {
        const bookingKeywords = ['book', 'flight', 'hotel', 'reserve', 'accommodation', 'airline', 'room', 'ticket'];
        return bookingKeywords.some(keyword => message.includes(keyword));
    }

    containsShoppingIntent(message) {
        const shoppingKeywords = ['buy', 'shop', 'purchase', 'luggage', 'backpack', 'gear', 'equipment', 'accessories'];
        return shoppingKeywords.some(keyword => message.includes(keyword));
    }

    containsTrackingIntent(message) {
        const trackingKeywords = ['track', 'itinerary', 'schedule', 'plan', 'expense', 'budget', 'memory', 'photo'];
        return trackingKeywords.some(keyword => message.includes(keyword));
    }

    containsDestinationIntent(message) {
        const destinationKeywords = ['where', 'destination', 'recommend', 'suggest', 'place', 'country', 'city'];
        return destinationKeywords.some(keyword => message.includes(keyword));
    }

    containsBudgetIntent(message) {
        const budgetKeywords = ['budget', 'money', 'cost', 'price', 'expensive', 'cheap', 'afford'];
        return budgetKeywords.some(keyword => message.includes(keyword));
    }

    containsPackingIntent(message) {
        const packingKeywords = ['pack', 'bring', 'luggage', 'suitcase', 'what to take', 'essentials'];
        return packingKeywords.some(keyword => message.includes(keyword));
    }

    containsWeatherIntent(message) {
        const weatherKeywords = ['weather', 'climate', 'temperature', 'rain', 'sunny', 'cold', 'hot'];
        return weatherKeywords.some(keyword => message.includes(keyword));
    }

    containsSafetyIntent(message) {
        const safetyKeywords = ['safe', 'safety', 'security', 'dangerous', 'crime', 'insurance'];
        return safetyKeywords.some(keyword => message.includes(keyword));
    }

    containsGreeting(message) {
        const greetingKeywords = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
        return greetingKeywords.some(keyword => message.includes(keyword));
    }

    containsGratitude(message) {
        const gratitudeKeywords = ['thank', 'thanks', 'appreciate', 'grateful'];
        return gratitudeKeywords.some(keyword => message.includes(keyword));
    }

    // Response generation methods
    getBookingResponse(message, currentPage) {
        const responses = [
            "I can help you find amazing deals! Our booking system searches hundreds of airlines and hotels to get you the best prices. What destination are you thinking about?",
            "Great choice! Booking early often gets you better rates. I recommend comparing prices across different dates and being flexible with your travel times for maximum savings.",
            "For the best booking experience, try our smart search filters. You can sort by price, duration, ratings, and amenities to find exactly what you're looking for!",
            "Pro tip: Tuesday and Wednesday flights are often cheaper, and booking hotels directly sometimes includes perks like free breakfast or WiFi upgrades!"
        ];
        
        if (currentPage === 'booking.html') {
            return "Perfect! You're already on our booking page. " + this.getRandomResponse(responses);
        } else {
            return this.getRandomResponse(responses) + " Head over to our booking page to get started!";
        }
    }

    getShoppingResponse(message, currentPage) {
        const responses = [
            "Our travel shop has everything you need for the perfect trip! From durable luggage to tech accessories, we've curated the best travel essentials.",
            "Smart packing makes all the difference! I recommend starting with a good backpack or suitcase, then adding electronics like portable chargers and travel adapters.",
            "Don't forget the comfort items - a good travel pillow and noise-cancelling headphones can transform long flights into pleasant experiences!",
            "Our products are rated by real travelers, so you can shop with confidence. Check out our customer reviews for honest feedback!"
        ];
        
        if (currentPage === 'shopping.html') {
            return "Excellent! You're browsing our travel shop. " + this.getRandomResponse(responses);
        } else {
            return this.getRandomResponse(responses) + " Visit our shopping section to explore all available items!";
        }
    }

    getTrackingResponse(message, currentPage) {
        const responses = [
            "Staying organized during travel is key to a stress-free experience! Our tracking tools help you manage your itinerary, expenses, and memories all in one place.",
            "I love how you're thinking ahead! Tracking your expenses in real-time helps you stay within budget and avoid surprises at the end of your trip.",
            "Creating an itinerary helps you make the most of your time, but don't forget to leave some room for spontaneous adventures!",
            "Capturing memories is so important! Use our memory tracker to record special moments, rate experiences, and build a digital travel journal."
        ];
        
        if (currentPage === 'tracking.html') {
            return "Perfect timing! You're on our tracking page. " + this.getRandomResponse(responses);
        } else {
            return this.getRandomResponse(responses) + " Check out our activity tracking page to get organized!";
        }
    }

    getDestinationResponse(message) {
        const destinations = [
            {
                name: "Paris, France",
                highlight: "Perfect for art lovers and romantics! Don't miss the Louvre, Eiffel Tower, and charming Montmartre district."
            },
            {
                name: "Tokyo, Japan",
                highlight: "An incredible blend of traditional and modern culture. Amazing food, technology, and beautiful temples await!"
            },
            {
                name: "Bali, Indonesia",
                highlight: "Paradise for beach lovers and spiritual seekers. Beautiful temples, stunning beaches, and incredible hospitality."
            },
            {
                name: "New York City, USA",
                highlight: "The city that never sleeps! Broadway shows, world-class museums, and iconic landmarks like Central Park."
            },
            {
                name: "Barcelona, Spain",
                highlight: "Stunning architecture by Gaudí, delicious tapas, beautiful beaches, and vibrant nightlife!"
            }
        ];
        
        const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
        
        return `I'd recommend ${randomDestination.name}! ${randomDestination.highlight} What type of experience are you looking for - adventure, relaxation, culture, or food?`;
    }

    getBudgetResponse(message) {
        const tips = [
            "Set a daily spending limit and track it with our expense tracker. This helps you stay on budget without constantly worrying about money.",
            "The 50/30/20 travel rule works well: 50% for accommodation and transport, 30% for food and activities, 20% for shopping and emergencies.",
            "Book flights and hotels in advance, but leave some budget for spontaneous local experiences - they're often the most memorable!",
            "Consider traveling during shoulder seasons for better prices, and don't forget to factor in travel insurance and visa fees.",
            "Use our expense tracking to monitor spending in real-time. Many travelers are surprised by how small purchases add up!"
        ];
        
        return this.getRandomResponse(tips);
    }

    getPackingResponse(message) {
        const tips = [
            "Pack light and smart! Choose versatile pieces that mix and match. Roll clothes instead of folding to save 30% more space.",
            "Essential electronics: portable charger, universal adapter, noise-cancelling headphones, and a backup phone charger.",
            "Don't forget: copies of important documents, basic first aid supplies, and comfortable walking shoes broken in before your trip.",
            "Weather-check your destination and pack layers. A light rain jacket and comfortable shoes are always good investments!",
            "Pro packing tip: Pack one complete outfit in your carry-on in case checked luggage gets delayed."
        ];
        
        return this.getRandomResponse(tips) + " Check our shopping section for high-quality travel essentials!";
    }

    getWeatherResponse(message) {
        return "Weather can make or break a trip! I recommend checking the forecast 2 weeks before departure and packing layers. Don't forget that mountain areas and coastal regions can have very different weather than cities. Always pack a light rain jacket - it's better to have it and not need it! What's your destination and travel dates?";
    }

    getSafetyResponse(message) {
        return "Safety first! Research your destination's current situation, register with your embassy if traveling internationally, and keep digital copies of important documents. Share your itinerary with someone at home, stay aware of your surroundings, and trust your instincts. Consider travel insurance - it's a small price for peace of mind!";
    }

    getGreetingResponse() {
        const greetings = [
            "Hello there! I'm your AI travel companion, ready to help make your trip amazing! What adventure are you planning?",
            "Hi! Welcome to TravelMate! I'm here to help with everything from booking flights to packing tips. What can I help you with today?",
            "Hey! Great to see you! I'm your personal travel assistant. Whether you need help planning, booking, or organizing your trip, I'm here for you!",
            "Hello! Ready for your next adventure? I can help you with bookings, shopping for travel gear, tracking your itinerary, and much more!"
        ];
        
        return this.getRandomResponse(greetings);
    }

    getGratitudeResponse() {
        const responses = [
            "You're so welcome! I love helping travelers create amazing experiences. Feel free to ask me anything else!",
            "My pleasure! That's what I'm here for. Have an incredible trip, and don't hesitate to reach out if you need more help!",
            "Happy to help! Safe travels, and I hope you create wonderful memories on your journey!",
            "Anytime! I'm always here to make your travel planning easier and more enjoyable. Bon voyage!"
        ];
        
        return this.getRandomResponse(responses);
    }

    getGeneralHelpResponse() {
        return "I'm your AI travel assistant, and I'm here to help with all aspects of your journey! I can assist with:\n\n🛫 Finding and booking flights & hotels\n🛍️ Recommending travel gear and essentials\n📋 Organizing your itinerary and tracking expenses\n🌍 Suggesting destinations and activities\n💡 Providing travel tips and safety advice\n\nWhat would you like to explore first?";
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Data persistence methods
    saveConversation() {
        localStorage.setItem('travelmate_ai_conversation', JSON.stringify(this.conversationHistory));
    }

    loadConversationHistory() {
        const saved = localStorage.getItem('travelmate_ai_conversation');
        if (saved) {
            this.conversationHistory = JSON.parse(saved);
            // Restore messages to UI (limit to last 20 for performance)
            const recentMessages = this.conversationHistory.slice(-20);
            const messagesContainer = document.getElementById('ai-messages');
            
            if (messagesContainer && recentMessages.length > 1) {
                // Clear existing messages except the welcome message
                const welcomeMessage = messagesContainer.querySelector('.ai-message');
                messagesContainer.innerHTML = '';
                if (welcomeMessage) {
                    messagesContainer.appendChild(welcomeMessage);
                }
                
                // Add saved messages
                recentMessages.forEach(msg => {
                    if (msg.message !== "Hello! I'm your AI travel assistant. How can I help you plan your perfect trip today?") {
                        this.addMessageToUI(msg.message, msg.sender);
                    }
                });
            }
        }
    }

    addMessageToUI(message, sender) {
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
    }

    loadUserPreferences() {
        const saved = localStorage.getItem('travelmate_user_preferences');
        return saved ? JSON.parse(saved) : {
            preferredCurrency: 'USD',
            travelStyle: 'balanced',
            budgetRange: 'medium'
        };
    }

    saveUserPreferences() {
        localStorage.setItem('travelmate_user_preferences', JSON.stringify(this.userPreferences));
    }

    clearConversation() {
        this.conversationHistory = [];
        localStorage.removeItem('travelmate_ai_conversation');
        
        // Reset UI to welcome message only
        const messagesContainer = document.getElementById('ai-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="ai-message">
                    <div class="ai-avatar-small">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>Hello! I'm your AI travel assistant. How can I help you plan your perfect trip today?</p>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize AI Assistant when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.travelMateAI = new TravelMateAI();
});

// Global functions for HTML onclick handlers
function toggleAIChat() {
    if (window.travelMateAI) {
        window.travelMateAI.toggleChat();
    }
}

function sendAIMessage() {
    if (window.travelMateAI) {
        window.travelMateAI.sendMessage();
    }
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TravelMateAI;
}