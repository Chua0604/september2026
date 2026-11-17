// 开头
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if(menuToggle && navLinks){
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
}
// 欢迎
function getQueryParam(name) {
 const params = new URLSearchParams(window.location.search);
 return params.get(name);
}

window.addEventListener('load', function () {
 const username = getQueryParam('username');
	if (username) {
	alert("Welcome! " + username + " 🎉");
	history.replaceState({}, document.title, window.location.pathname);
	}
});

// 购物车
let cart = JSON.parse(localStorage.getItem('greenleafCart')) || [];

function saveCart(){
  localStorage.setItem('greenleafCart', JSON.stringify(cart));
}

function addToCart(id, name, price, image){
  const existing = cart.find(p => p.id === id);
  if(existing){ existing.qty++; }
  else { cart.push({id, name, price, image, qty:1}); }
  saveCart();
  updateCartUI();
  alert(`${name} is Added to cart!`);
}

function updateQuantity(id, newQty){
  const product = cart.find(p => p.id === id);
  if(product){
	product.qty = parseInt(newQty) || 1;
	saveCart();
	updateCartUI();
	}
}

function removeFromCart(id){
 cart = cart.filter(p => p.id !== id);
 saveCart();
 updateCartUI();
}

function updateCartUI(){
 const cartContainer = document.getElementById('cart-items');
 const totalEl = document.getElementById('cart-total-price');
 if(!cartContainer || !totalEl) return;

 if(cart.length === 0){
	cartContainer.innerHTML = '<p style="text-align:center; color:#666;">Your shopping cart is empty—start shopping now!</p>';
	totalEl.textContent = '0.00';
	return;
	}

let total = 0;
cartContainer.innerHTML = '';
cart.forEach(item => {
	const subtotal = item.price * item.qty;
	total += subtotal;
	cartContainer.innerHTML += `
		<div class="cart-item">
		<img src="${item.image}" alt="${item.name}" style="width:80px; height:80px; object-fit:cover; border-radius:4px;">
		<h4>${item.name}</h4>
		<p>RM ${item.price.toFixed(2)}</p>
		<input type="number" class="qty-input" value="${item.qty}" min="1"
		onchange="updateQuantity('${item.id}', this.value)">
		<p>RM ${subtotal.toFixed(2)}</p>
		<button class="remove-btn" onclick="removeFromCart('${item.id}')">Delete</button>
		</div>`;
	});
totalEl.textContent = total.toFixed(2);
}

// 加入购物车的样子
window.addEventListener('load', updateCartUI);

// 验证
function validateContactForm() {
 const name = document.getElementById('name').value.trim();
 const email = document.getElementById('email').value.trim();
 const message = document.getElementById('message').value.trim();

 if (name === "") {
	alert("Please enter your name.");
	return false;
	}
 if (email === "") {
	alert("Please enter your email.");
	return false;
	}

 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailPattern.test(email)) {
	alert("Please enter a valid email address.");
	return false;
	}

 if (message === "") {
	alert("Please write your message.");
	return false;
	}

 alert("Thank you! Your message has been sent successfully.");
 document.contactForm.reset();
 return true;
}

// 结账就清空购物车
function checkoutCart() {
 if (cart.length === 0) {
	alert("Your cart is empty!");
	return;
	}
 if (confirm("Confirm order?")) {
	cart = [];
	saveCart();
	updateCartUI();
	alert("Payment successful! Thank you for shopping with GreenLeaf! 🎉");
	}
}

