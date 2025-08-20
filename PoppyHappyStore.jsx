import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Heart, Star, Plus, Minus, Edit, Trash2, BarChart3, Users, Package, Settings, Menu, X, Home, Tag, Gift } from 'lucide-react';

const PoppyHappyStore = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample data
  const initialProducts = [
    {
      id: 1,
      name: "Cozy Pet Bed - Premium",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
      category: "beds",
      description: "Ultra-soft, washable pet bed perfect for small to medium dogs and cats.",
      rating: 4.8,
      reviews: 124,
      inStock: true,
      variants: {
        size: ["Small", "Medium", "Large"],
        color: ["Pink", "Blue", "Gray"]
      }
    },
    {
      id: 2,
      name: "Interactive Puzzle Toy",
      price: 19.99,
      originalPrice: 24.99,
      image: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400",
      category: "toys",
      description: "Keep your pet entertained with this brain-stimulating puzzle toy.",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      variants: {
        color: ["Red", "Blue", "Yellow"]
      }
    },
    {
      id: 3,
      name: "Premium Grooming Kit",
      price: 34.99,
      originalPrice: 44.99,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
      category: "grooming",
      description: "Complete grooming set with brushes, nail clippers, and shampoo.",
      rating: 4.9,
      reviews: 67,
      inStock: true,
      variants: {
        type: ["Basic", "Premium", "Professional"]
      }
    },
    {
      id: 4,
      name: "Stylish Pet Collar",
      price: 14.99,
      originalPrice: 19.99,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
      category: "accessories",
      description: "Durable, comfortable collar with adjustable sizing and cute designs.",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      variants: {
        size: ["XS", "S", "M", "L", "XL"],
        color: ["Pink", "Blue", "Purple", "Green"]
      }
    },
    {
      id: 5,
      name: "Automatic Pet Feeder",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400",
      category: "feeding",
      description: "Smart feeder with timer and portion control for busy pet parents.",
      rating: 4.5,
      reviews: 93,
      inStock: true,
      variants: {
        capacity: ["2L", "4L", "6L"]
      }
    },
    {
      id: 6,
      name: "Squeaky Plush Toys Set",
      price: 16.99,
      originalPrice: 22.99,
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400",
      category: "toys",
      description: "Set of 3 adorable squeaky toys that pets absolutely love.",
      rating: 4.8,
      reviews: 201,
      inStock: true,
      variants: {
        set: ["3-Pack", "5-Pack", "8-Pack"]
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🏠' },
    { id: 'toys', name: 'Toys', icon: '🧸' },
    { id: 'beds', name: 'Beds', icon: '🛏️' },
    { id: 'grooming', name: 'Grooming', icon: '✂️' },
    { id: 'accessories', name: 'Accessories', icon: '🎀' },
    { id: 'feeding', name: 'Feeding', icon: '🥣' }
  ];

  useEffect(() => {
    setProducts(initialProducts);
    // Sample orders for admin
    setOrders([
      { id: 1001, customer: "Sarah Johnson", total: 84.97, status: "shipped", date: "2024-08-18" },
      { id: 1002, customer: "Mike Chen", total: 29.99, status: "pending", date: "2024-08-19" },
      { id: 1003, customer: "Emma Wilson", total: 51.98, status: "delivered", date: "2024-08-17" }
    ]);
    setCustomers([
      { id: 1, name: "Sarah Johnson", email: "sarah@email.com", orders: 3, totalSpent: 234.56 },
      { id: 2, name: "Mike Chen", email: "mike@email.com", orders: 1, totalSpent: 29.99 },
      { id: 3, name: "Emma Wilson", email: "emma@email.com", orders: 2, totalSpent: 156.78 }
    ]);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product, variant = {}) => {
    const cartItem = {
      ...product,
      cartId: `${product.id}-${JSON.stringify(variant)}`,
      variant,
      quantity: 1
    };
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.cartId === cartItem.cartId);
      if (existingItem) {
        return prevCart.map(item => 
          item.cartId === cartItem.cartId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, cartItem];
    });
  };

  const removeFromCart = (cartId) => {
    setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => 
        item.cartId === cartId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div 
              onClick={() => setCurrentView('home')}
              className="text-2xl font-bold text-pink-500 cursor-pointer flex items-center"
            >
              🐾 PoppyHappy
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => setCurrentView('home')}
              className={`hover:text-pink-500 transition ${currentView === 'home' ? 'text-pink-500' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentView('products')}
              className={`hover:text-pink-500 transition ${currentView === 'products' ? 'text-pink-500' : ''}`}
            >
              Products
            </button>
            <button className="hover:text-pink-500 transition">About</button>
            <button className="hover:text-pink-500 transition">Contact</button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <button 
              onClick={() => setCurrentView('wishlist')}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <Heart size={20} className={wishlist.length > 0 ? 'text-pink-500' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setCurrentView('cart')}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            <button 
              onClick={() => user ? setCurrentView('account') : setCurrentView('login')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <User size={20} />
            </button>

            {isAdmin && (
              <button 
                onClick={() => setCurrentView('admin')}
                className="px-3 py-1 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600 transition"
              >
                Admin
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => { setCurrentView('home'); setShowMobileMenu(false); }}
                className="text-left hover:text-pink-500 transition py-2"
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentView('products'); setShowMobileMenu(false); }}
                className="text-left hover:text-pink-500 transition py-2"
              >
                Products
              </button>
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  // Product Card Component
  const ProductCard = ({ product, showFullDetails = false }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            wishlist.includes(product.id) 
              ? 'bg-pink-500 text-white' 
              : 'bg-white text-gray-400 hover:text-pink-500'
          }`}
        >
          <Heart size={18} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
        </button>
        {product.originalPrice > product.price && (
          <div className="absolute top-3 left-3 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-800">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {showFullDetails && (
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        )}

        <div className="flex space-x-2">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              product.inStock
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Add to Cart
          </button>
          <button 
            onClick={() => setSelectedProduct(product)}
            className="px-3 py-2 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50 transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-100 to-blue-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Happy Pets, Happy Life! 🐾
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing products for your furry friends. From cozy beds to fun toys, 
            we have everything to keep your pets happy and healthy.
          </p>
          <button 
            onClick={() => setCurrentView('products')}
            className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-all transform hover:scale-105"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.slice(1).map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentView('products');
                }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center group hover:bg-pink-50"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-800 group-hover:text-pink-500 transition">
                  {category.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-blue-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated!</h2>
          <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
            Get the latest deals, new product updates, and pet care tips delivered to your inbox.
          </p>
          <div className="flex flex-col md:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-pink-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  // Products Page
  const ProductsPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-2 rounded-lg transition ${
                      selectedCategory === category.id
                        ? 'bg-pink-100 text-pink-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {selectedCategory === 'all' ? 'All Products' : 
                 categories.find(cat => cat.id === selectedCategory)?.name}
              </h1>
              <span className="text-gray-600">
                {filteredProducts.length} products found
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Product Details Modal
  const ProductModal = () => {
    if (!selectedProduct) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full rounded-lg"
                />
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < Math.floor(selectedProduct.rating) ? 'currentColor' : 'none'} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({selectedProduct.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl font-bold text-gray-800">${selectedProduct.price}</span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-lg text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                
                <div className="space-y-4 mb-6">
                  {Object.entries(selectedProduct.variants || {}).map(([key, values]) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                        {key}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {values.map(value => (
                          <button
                            key={value}
                            className="px-3 py-1 border border-gray-300 rounded-lg hover:border-pink-500 hover:text-pink-500 transition"
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`px-4 py-3 rounded-lg transition ${
                      wishlist.includes(selectedProduct.id)
                        ? 'bg-pink-500 text-white'
                        : 'border border-pink-500 text-pink-500 hover:bg-pink-50'
                    }`}
                  >
                    <Heart size={20} fill={wishlist.includes(selectedProduct.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Cart Page
  const CartPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button 
              onClick={() => setCurrentView('products')}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6">
                {cart.map(item => (
                  <div key={item.cartId} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {Object.entries(item.variant || {}).map(([key, value]) => 
                          `${key}: ${value}`
                        ).join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                      <button 
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition mb-3">
                Proceed to Checkout
              </button>
              <button 
                onClick={() => setCurrentView('products')}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Wishlist Page
  const WishlistPage = () => {
    const wishlistProducts = products.filter(product => wishlist.includes(product.id));
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>
          
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16">
              <Heart size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">Your wishlist is empty</p>
              <button 
                onClick={() => setCurrentView('products')}
                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
              >
                Discover Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Login/Register Page
  const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Simulate authentication
      setUser({ name: formData.name || 'John Doe', email: formData.email });
      setCurrentView('account');
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            )}
            
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            )}
            
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-pink-500 hover:text-pink-600 transition"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsAdmin(true);
                setUser({ name: 'Admin', email: 'admin@poppyhappy.com' });
                setCurrentView('admin');
              }}
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Admin Access (Demo)
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Account Page
  const AccountPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <p className="font-semibold">{user?.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-semibold">{user?.email}</p>
              </div>
              <button className="text-pink-500 hover:text-pink-600 transition">
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            <div className="space-y-3">
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span className="font-semibold">#1001</span>
                  <span className="text-green-600">Delivered</span>
                </div>
                <p className="text-sm text-gray-600">2 items • $84.97</p>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span className="font-semibold">#1002</span>
                  <span className="text-blue-600">Shipped</span>
                </div>
                <p className="text-sm text-gray-600">1 item • $29.99</p>
              </div>
            </div>
            <button className="text-pink-500 hover:text-pink-600 transition mt-3">
              View All Orders
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={() => setCurrentView('wishlist')}
                className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition"
              >
                View Wishlist ({wishlist.length})
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition">
                Track Orders
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition">
                Address Book
              </button>
              <button 
                onClick={() => {
                  setUser(null);
                  setIsAdmin(false);
                  setCurrentView('home');
                }}
                className="w-full text-left p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Admin Dashboard
  const AdminDashboard = () => {
    const [adminView, setAdminView] = useState('dashboard');
    const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      originalPrice: '',
      category: 'toys',
      description: '',
      image: ''
    });

    const addNewProduct = () => {
      const product = {
        ...newProduct,
        id: products.length + 1,
        price: parseFloat(newProduct.price),
        originalPrice: parseFloat(newProduct.originalPrice) || parseFloat(newProduct.price),
        rating: 4.5,
        reviews: 0,
        inStock: true,
        variants: { color: ["Blue", "Red", "Green"] }
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', price: '', originalPrice: '', category: 'toys', description: '', image: '' });
    };

    const updateOrderStatus = (orderId, newStatus) => {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Admin Sidebar */}
          <div className="w-64 bg-white shadow-md min-h-screen">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            </div>
            <nav className="p-4">
              <div className="space-y-2">
                <button
                  onClick={() => setAdminView('dashboard')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                    adminView === 'dashboard' ? 'bg-pink-100 text-pink-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 size={20} />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setAdminView('products')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                    adminView === 'products' ? 'bg-pink-100 text-pink-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <Package size={20} />
                  <span>Products</span>
                </button>
                <button
                  onClick={() => setAdminView('orders')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                    adminView === 'orders' ? 'bg-pink-100 text-pink-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>Orders</span>
                </button>
                <button
                  onClick={() => setAdminView('customers')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                    adminView === 'customers' ? 'bg-pink-100 text-pink-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <Users size={20} />
                  <span>Customers</span>
                </button>
                <button
                  onClick={() => setAdminView('settings')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                    adminView === 'settings' ? 'bg-pink-100 text-pink-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </button>
              </div>
              
              <div className="mt-8 pt-4 border-t">
                <button
                  onClick={() => {
                    setIsAdmin(false);
                    setCurrentView('home');
                  }}
                  className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  <Home size={20} />
                  <span>Back to Store</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Admin Content */}
          <div className="flex-1 p-8">
            {adminView === 'dashboard' && (
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Sales</p>
                        <p className="text-2xl font-bold text-gray-800">$12,345</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <BarChart3 className="text-green-600" size={24} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <ShoppingCart className="text-blue-600" size={24} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Products</p>
                        <p className="text-2xl font-bold text-gray-800">{products.length}</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Package className="text-purple-600" size={24} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Customers</p>
                        <p className="text-2xl font-bold text-gray-800">{customers.length}</p>
                      </div>
                      <div className="bg-pink-100 p-3 rounded-full">
                        <Users className="text-pink-600" size={24} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-md">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {adminView === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                  <button
                    onClick={() => setAdminView('add-product')}
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition flex items-center space-x-2"
                  >
                    <Plus size={20} />
                    <span>Add Product</span>
                  </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {products.map(product => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg mr-4" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-500">ID: {product.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{product.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Edit size={16} />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {adminView === 'add-product' && (
              <div>
                <div className="flex items-center space-x-4 mb-8">
                  <button
                    onClick={() => setAdminView('products')}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ← Back
                  </button>
                  <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter product name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="0.00"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (Optional)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newProduct.originalPrice}
                          onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      >
                        {categories.slice(1).map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                      <input
                        type="url"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter product description"
                      />
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={addNewProduct}
                        className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
                      >
                        Add Product
                      </button>
                      <button
                        onClick={() => setAdminView('products')}
                        className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {adminView === 'orders' && (
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Orders Management</h1>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                className={`px-2 py-1 text-xs rounded-full border-0 focus:ring-2 focus:ring-pink-500 ${
                                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-pink-600 hover:text-pink-900">View Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {adminView === 'customers' && (
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Customers</h1>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {customers.map(customer => (
                          <tr key={customer.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                                  <span className="text-pink-600 font-semibold">
                                    {customer.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.orders}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${customer.totalSpent}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-pink-600 hover:text-pink-900">View Profile</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {adminView === 'settings' && (
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Store Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                        <input
                          type="text"
                          defaultValue="PoppyHappy"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Store Email</label>
                        <input
                          type="email"
                          defaultValue="hello@poppyhappy.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Stripe</span>
                        <div className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" defaultChecked />
                          <span className="ml-2 text-sm text-green-600">Connected</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">PayPal</span>
                        <div className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" defaultChecked />
                          <span className="ml-2 text-sm text-green-600">Connected</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                        <input
                          type="number"
                          defaultValue="10"
                          step="0.1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Email Settings</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Order Confirmation</span>
                        <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Shipping Updates</span>
                        <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Abandoned Cart Reminders</span>
                        <input type="checkbox" className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Shipping Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold</label>
                        <input
                          type="number"
                          defaultValue="50"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Standard Shipping Rate</label>
                        <input
                          type="number"
                          defaultValue="5.99"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-pink-500 mb-4 flex items-center">
              🐾 PoppyHappy
            </div>
            <p className="text-gray-400 mb-4">
              Making pets and pet parents happy with quality products and exceptional service.
            </p>
            <div className="flex space-x-4">
              <button className="bg-pink-500 hover:bg-pink-600 p-2 rounded-full transition">
                📘
              </button>
              <button className="bg-pink-500 hover:bg-pink-600 p-2 rounded-full transition">
                📷
              </button>
              <button className="bg-pink-500 hover:bg-pink-600 p-2 rounded-full transition">
                🐦
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button className="hover:text-white transition">About Us</button></li>
              <li><button className="hover:text-white transition">Contact</button></li>
              <li><button className="hover:text-white transition">FAQ</button></li>
              <li><button className="hover:text-white transition">Shipping Info</button></li>
              <li><button className="hover:text-white transition">Returns</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              {categories.slice(1).map(category => (
                <li key={category.id}>
                  <button 
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setCurrentView('products');
                    }}
                    className="hover:text-white transition"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <div className="space-y-2 text-gray-400">
              <p>📧 hello@poppyhappy.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>🕐 Mon-Fri: 9AM-6PM EST</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PoppyHappy. All rights reserved. Made with ❤️ for pet lovers.</p>
        </div>
      </div>
    </footer>
  );

  // Main Render
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {currentView === 'home' && <HomePage />}
      {currentView === 'products' && <ProductsPage />}
      {currentView === 'cart' && <CartPage />}
      {currentView === 'wishlist' && <WishlistPage />}
      {currentView === 'login' && <AuthPage />}
      {currentView === 'account' && <AccountPage />}
      {currentView === 'admin' && <AdminDashboard />}
      
      {selectedProduct && <ProductModal />}
      
      {currentView !== 'admin' && <Footer />}
    </div>
  );
};

export default PoppyHappyStore;
