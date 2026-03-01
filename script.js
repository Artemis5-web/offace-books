// ================= LOGIN =================
let currentUser = localStorage.getItem("offaceUser") || null;
let cart = JSON.parse(localStorage.getItem("offaceCart")) || [];

const categoriesDiv = document.getElementById("categories");
const booksDiv = document.getElementById("books");
const cartDiv = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const checkoutDiv = document.getElementById("checkout");
const searchInput = document.getElementById("search");

function showLogin() {
  document.getElementById("login-modal").style.display = "flex";
  booksDiv.style.pointerEvents = "none";
  categoriesDiv.style.pointerEvents = "none";
  cartDiv.style.pointerEvents = "none";
}

function loginUser() {
  const username = document.getElementById("username").value.trim();
  if (!username) return alert("Please enter your name");
  currentUser = username;
  localStorage.setItem("offaceUser", username);
  document.getElementById("login-modal").style.display = "none";
  booksDiv.style.pointerEvents = "auto";
  categoriesDiv.style.pointerEvents = "auto";
  cartDiv.style.pointerEvents = "auto";
}

// Force login if no user
if (!currentUser) showLogin();

// ================= BOOKS =================
const books = [
  { id:1, title:"Atomic Habits", price:200, category:"Self-Help", synopsis:"Atomic Habits teaches you how small daily improvements can lead to massive long-term changes. James Clear explains how habits work and how to design systems for success." },
  { id:2, title:"Diary of a Wimpy Kid 1", price:150, category:"Kids", synopsis:"Follow Greg Heffley through his hilarious middle school misadventures with humor and cartoons." },
  { id:3, title:"Diary of a Wimpy Kid 2", price:150, category:"Kids", synopsis:"Greg Heffley faces new middle school challenges with funny events and comic illustrations." },
  { id:4, title:"Harry Potter 1", price:200, category:"Fantasy", synopsis:"Harry discovers he is a wizard and attends Hogwarts School, where he learns magic, friendship, and uncovers a dark mystery." },
  { id:5, title:"Rich Dad Poor Dad", price:200, category:"Finance", synopsis:"Learn about money, investing, and financial independence through Robert Kiyosaki's contrasting advice from two fathers." },
  { id:6, title:"The Alchemist", price:150, category:"Fiction", synopsis:"A shepherd named Santiago embarks on a journey to find his personal legend, experiencing life lessons, adventure, and spiritual insights." },
  { id:7, title:"JavaScript Basics", price:200, category:"Programming", synopsis:"Beginner-friendly JavaScript tutorial covering variables, loops, functions, and DOM manipulation with practical examples." },
  { id:8, title:"Python Basics", price:200, category:"Programming", synopsis:"Learn Python syntax, data types, functions, and simple projects to start programming effectively." },
  { id:9, title:"Mathematics for Kids", price:150, category:"Education", synopsis:"Fun ways to learn math including addition, subtraction, multiplication, and problem-solving exercises for children." },
  { id:10, title:"Healthy Recipes", price:150, category:"Cooking", synopsis:"A collection of easy, tasty, and nutritious recipes for breakfast, lunch, dinner, and snacks." }
];

// Auto-generate books 11-100 with longer synopses
for(let i=11; i<=100; i++){
  books.push({
    id:i,
    title:"Book " + i,
    price: i % 2 === 0 ? 150 : 200,
    category:["Self-Help","Kids","Fantasy","Finance","Programming","Education"][i % 6],
    synopsis: `Book ${i} is an interesting read covering detailed explanations and engaging content, perfect for readers who want to know more before buying.`
  });
}

// ================= CATEGORIES =================
const categories = ["All", ...new Set(books.map(b => b.category))];

function showHome() {
  cartDiv.style.display = "none";
  booksDiv.style.display = "grid";
  categoriesDiv.style.display = "flex";
}

function showCart() {
  cartDiv.style.display = "block";
  booksDiv.style.display = "none";
  categoriesDiv.style.display = "none";
  renderCart();
}

// ================= RENDER =================
function renderCategories() {
  categoriesDiv.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = () => renderBooks(cat, searchInput.value);
    categoriesDiv.appendChild(btn);
  });
}

function renderBooks(category="All", search="") {
  booksDiv.innerHTML = "";
  let filtered = category==="All" ? books : books.filter(b => b.category===category);
  if(search) filtered = filtered.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  filtered.forEach(book => {
    const div = document.createElement("div");
    div.className = "book";
    div.innerHTML = `
      <img src="https://via.placeholder.com/100x150?text=${encodeURIComponent(book.title)}">
      <h3>${book.title}</h3>
      <p>KES ${book.price}</p>
      <button>Add to Cart</button>
    `;
    div.querySelector("img").onclick = () => showSynopsis(book);
    div.querySelector("h3").onclick = () => showSynopsis(book);
    div.querySelector("button").onclick = () => {
      if(!currentUser) return showLogin();
      addToCart(book);
    };
    booksDiv.appendChild(div);
  });
}

// ================= CART FUNCTIONS =================
function addToCart(book){
  const existing = cart.find(item => item.id===book.id);
  if(existing) existing.quantity +=1;
  else cart.push({...book, quantity:1});
  localStorage.setItem("offaceCart", JSON.stringify(cart));
  renderCart();
}

function removeFromCart(id){
  cart = cart.filter(item => item.id!==id);
  localStorage.setItem("offaceCart", JSON.stringify(cart));
  renderCart();
}

function clearCart(){
  cart = [];
  localStorage.setItem("offaceCart", JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  cartItems.innerHTML = "";
  let total=0;
  if(cart.length===0){
    cartItems.innerHTML="<li>Cart is empty</li>";
    checkoutDiv.style.display="none";
  } else {
    cart.forEach(item=>{
      total += item.price*item.quantity;
      const li = document.createElement("li");
      li.innerHTML = `${item.title} (x${item.quantity}) - KES ${item.price*item.quantity} <button onclick="removeFromCart(${item.id})">Remove</button>`;
      cartItems.appendChild(li);
    });
    const totalLi = document.createElement("li");
    totalLi.innerHTML=`<strong>Total: KES ${total}</strong>`;
    cartItems.appendChild(totalLi);
    checkoutDiv.style.display="block";
  }
  cartCount.textContent=cart.length;
}

// ================= CHECKOUT =================
function checkoutWhatsApp(){
  if(cart.length===0) return;
  let message="Hello Joseph, I want to buy:%0A";
  let total=0;
  cart.forEach(item=>{
    message += `- ${item.title} (x${item.quantity}) - KES ${item.price*item.quantity}%0A`;
    total += item.price*item.quantity;
  });
  message += `%0ATotal: KES ${total}`;
  window.open(`https://wa.me/254758118345?text=${message}`, "_blank");
}

// ================= SYNOPSIS =================
function showSynopsis(book){
  alert(`${book.title}\n\n${book.synopsis}`);
}

// ================= SEARCH =================
function searchBooks(){
  renderBooks("All", searchInput.value);
}

// ================= INIT =================
renderCategories();
renderBooks();