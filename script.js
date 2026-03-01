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

if (!currentUser) showLogin();


// ================= BOOKS =================
const books = [
  { id:1, title:"Atomic Habits", price:200, category:"Self-Help", synopsis:"Atomic Habits teaches you how small daily improvements can lead to massive long-term changes." },
  { id:2, title:"Diary of a Wimpy Kid 1", price:150, category:"Kids", synopsis:"Follow Greg Heffley through his hilarious middle school adventures." },
  { id:3, title:"Diary of a Wimpy Kid 2", price:150, category:"Kids", synopsis:"Greg faces new school challenges in this sequel." },
  { id:4, title:"Harry Potter 1", price:200, category:"Fantasy", synopsis:"Harry discovers he is a wizard and begins his journey at Hogwarts." },
  { id:5, title:"Rich Dad Poor Dad", price:200, category:"Finance", synopsis:"Lessons about money, investing, and financial freedom." },
  { id:6, title:"The Alchemist", price:150, category:"Fiction", synopsis:"A shepherd travels in search of treasure and purpose." },
  { id:7, title:"JavaScript Basics", price:200, category:"Programming", synopsis:"Learn JavaScript fundamentals and build interactive websites." },
  { id:8, title:"Python Basics", price:200, category:"Programming", synopsis:"Beginner-friendly introduction to Python programming." },
  { id:9, title:"Mathematics for Kids", price:150, category:"Education", synopsis:"Fun and engaging math lessons for children." },
  { id:10, title:"Healthy Recipes", price:150, category:"Cooking", synopsis:"Simple and nutritious meals for everyday cooking." },

  // Books 11–100
  {id:11, title:"Mindset Mastery", price:200, category:"Self-Help", synopsis:"Unlock your potential with strategies to build a growth mindset and achieve your goals."},
  {id:12, title:"The Coding Adventure", price:200, category:"Programming", synopsis:"Learn programming through fun challenges and interactive projects in JavaScript and Python."},
  {id:13, title:"Secrets of Successful People", price:200, category:"Self-Help", synopsis:"Discover habits, routines, and insights from highly successful individuals."},
  {id:14, title:"Fantasy Chronicles: Dragon's Rise", price:200, category:"Fantasy", synopsis:"Embark on a magical journey in a world filled with dragons, heroes, and epic battles."},
  {id:15, title:"Python in Action", price:200, category:"Programming", synopsis:"Hands-on Python projects to enhance coding skills and build practical applications."},
  {id:16, title:"The Wealth Blueprint", price:200, category:"Finance", synopsis:"Learn to manage money, save, invest, and plan for financial freedom."},
  {id:17, title:"Adventures in Science", price:150, category:"Education", synopsis:"Engaging science experiments and activities to inspire curiosity in young learners."},
  {id:18, title:"Gourmet Cooking Made Easy", price:150, category:"Cooking", synopsis:"Step-by-step recipes to make delicious meals at home with ease."},
  {id:19, title:"The Art of Focus", price:200, category:"Self-Help", synopsis:"Techniques to improve concentration, productivity, and mental clarity."},
  {id:20, title:"Magical Kingdoms", price:200, category:"Fantasy", synopsis:"Explore enchanted worlds filled with mythical creatures, magic, and adventures."},

  {id:21, title:"The Power of Discipline", price:200, category:"Self-Help", synopsis:"Learn how discipline shapes success and how to build habits that push you toward greatness."},
  {id:22, title:"Advanced JavaScript Concepts", price:200, category:"Programming", synopsis:"Deep dive into closures, async programming, APIs, and performance optimization."},
  {id:23, title:"Kingdom of Shadows", price:200, category:"Fantasy", synopsis:"A dark kingdom faces rebellion as a hidden heir rises to claim the throne."},
  {id:24, title:"Money Mindset for Teens", price:150, category:"Finance", synopsis:"A beginner-friendly guide to saving, investing, and understanding wealth early in life."},
  {id:25, title:"Creative Writing for Kids", price:150, category:"Education", synopsis:"Fun exercises that help children develop storytelling and imagination skills."},
  {id:26, title:"Mastering React", price:200, category:"Programming", synopsis:"Build modern web apps using components, hooks, and advanced state management."},
  {id:27, title:"Healthy Living Blueprint", price:150, category:"Self-Help", synopsis:"Simple strategies for maintaining physical and mental wellness."},
  {id:28, title:"The Lost Empire", price:200, category:"Fantasy", synopsis:"An explorer uncovers secrets of a forgotten civilization with magical powers."},
  {id:29, title:"Investing 101", price:200, category:"Finance", synopsis:"Understand stocks, bonds, and long-term investment strategies."},
  {id:30, title:"Cooking for Beginners", price:150, category:"Cooking", synopsis:"Step-by-step guide to preparing simple and delicious meals."},

  // Continue books 31–100 exactly as you provided...
  {id:31, title:"Data Structures Simplified", price:200, category:"Programming", synopsis:"Understand arrays, stacks, queues, and trees in an easy-to-grasp way."},
  {id:32, title:"Confidence Builder", price:200, category:"Self-Help", synopsis:"Practical exercises to overcome fear and build strong self-belief."},
  {id:33, title:"Space Adventures", price:150, category:"Kids", synopsis:"Join young astronauts on exciting missions beyond Earth."},
  {id:34, title:"The Wealth Code", price:200, category:"Finance", synopsis:"Secrets behind building generational wealth and smart investments."},
  {id:35, title:"Magical Forest Tales", price:150, category:"Fantasy", synopsis:"Stories of enchanted forests filled with mystical creatures."},
  {id:36, title:"HTML & CSS Mastery", price:200, category:"Programming", synopsis:"Design beautiful responsive websites from scratch."},
  {id:37, title:"Focus Like a Pro", price:200, category:"Self-Help", synopsis:"Learn deep work techniques used by top performers."},
  {id:38, title:"Algebra Made Easy", price:150, category:"Education", synopsis:"Step-by-step explanations to master algebra fundamentals."},
  {id:39, title:"Startup Secrets", price:200, category:"Finance", synopsis:"How entrepreneurs build billion-dollar companies."},
  {id:40, title:"Quick & Easy Meals", price:150, category:"Cooking", synopsis:"Fast recipes for busy lifestyles."},

  {id:41, title:"Node.js in Practice", price:200, category:"Programming", synopsis:"Build backend servers and APIs using Node.js."},
  {id:42, title:"The Dragon's Prophecy", price:200, category:"Fantasy", synopsis:"A prophecy foretells the rise of a dragon warrior."},
  {id:43, title:"Positive Thinking Habits", price:200, category:"Self-Help", synopsis:"Train your mind to see opportunities instead of obstacles."},
  {id:44, title:"Saving Smart", price:150, category:"Finance", synopsis:"Practical saving techniques for everyday life."},
  {id:45, title:"Fun Math Puzzles", price:150, category:"Kids", synopsis:"Brain-teasing puzzles to improve problem-solving skills."},
  {id:46, title:"Python Projects", price:200, category:"Programming", synopsis:"Build real-world applications using Python."},
  {id:47, title:"The Golden Crown", price:200, category:"Fantasy", synopsis:"A royal battle for power unfolds in a divided kingdom."},
  {id:48, title:"Self-Leadership", price:200, category:"Self-Help", synopsis:"Take control of your decisions and direct your life intentionally."},
  {id:49, title:"Financial Freedom Roadmap", price:200, category:"Finance", synopsis:"A step-by-step guide toward long-term financial independence."},
  {id:50, title:"Baking Basics", price:150, category:"Cooking", synopsis:"Learn the fundamentals of baking cakes, bread, and pastries."},

  // ... Continue all the way to id:100 exactly as you wrote
  {id:51, title:"Cybersecurity Essentials", price:200, category:"Programming", synopsis:"Understand online threats and how to protect digital systems."},
  {id:52, title:"Hidden Realms", price:200, category:"Fantasy", synopsis:"Discover secret dimensions filled with magic and danger."},
  {id:53, title:"Mind Power Techniques", price:200, category:"Self-Help", synopsis:"Harness mental strength to achieve extraordinary goals."},
  {id:54, title:"Smart Budgeting", price:150, category:"Finance", synopsis:"Create and maintain budgets that actually work."},
  {id:55, title:"Science Experiments at Home", price:150, category:"Education", synopsis:"Safe and fun science projects for young learners."},
  {id:56, title:"Full Stack Development", price:200, category:"Programming", synopsis:"Learn frontend and backend development together."},
  {id:57, title:"The Crystal Kingdom", price:200, category:"Fantasy", synopsis:"A magical land threatened by an ancient curse."},
  {id:58, title:"Daily Productivity Hacks", price:200, category:"Self-Help", synopsis:"Small daily improvements that lead to massive results."},
  {id:59, title:"Wealth Building Strategies", price:200, category:"Finance", synopsis:"Advanced methods to multiply your income streams."},
  {id:60, title:"Kids Story Collection", price:150, category:"Kids", synopsis:"A collection of inspiring and entertaining short stories."},

  {id:61, title:"Machine Learning Basics", price:200, category:"Programming", synopsis:"An introduction to AI and machine learning concepts."},
  {id:62, title:"War of the Wizards", price:200, category:"Fantasy", synopsis:"Powerful wizards clash in an epic magical war."},
  {id:63, title:"The Success Blueprint", price:200, category:"Self-Help", synopsis:"Frameworks used by top achievers worldwide."},
  {id:64, title:"Personal Finance Mastery", price:200, category:"Finance", synopsis:"Control debt, increase income, and grow assets."},
  {id:65, title:"World History for Kids", price:150, category:"Education", synopsis:"Important historical events explained simply."},
  {id:66, title:"Java Programming Guide", price:200, category:"Programming", synopsis:"Comprehensive introduction to Java development."},
  {id:67, title:"Rise of the Phoenix", price:200, category:"Fantasy", synopsis:"A fallen hero returns with fiery determination."},
  {id:68, title:"Emotional Intelligence", price:200, category:"Self-Help", synopsis:"Develop awareness and manage emotions effectively."},
  {id:69, title:"Investment Strategies Pro", price:200, category:"Finance", synopsis:"Advanced investment techniques for higher returns."},
  {id:70, title:"Healthy Smoothies", price:150, category:"Cooking", synopsis:"Nutritious smoothie recipes for energy and health."},

  {id:71, title:"C++ Fundamentals", price:200, category:"Programming", synopsis:"Core concepts of C++ explained clearly."},
  {id:72, title:"Legends of Avalon", price:200, category:"Fantasy", synopsis:"Ancient legends awaken in a magical land."},
  {id:73, title:"Goal Setting Mastery", price:200, category:"Self-Help", synopsis:"Turn dreams into achievable action plans."},
  {id:74, title:"Teen Entrepreneur", price:150, category:"Finance", synopsis:"How young people can start and grow businesses."},
  {id:75, title:"Physics Simplified", price:150, category:"Education", synopsis:"Understand motion, energy, and forces easily."},
  {id:76, title:"Django Web Development", price:200, category:"Programming", synopsis:"Build powerful web apps using Django framework."},
  {id:77, title:"Sword of Destiny", price:200, category:"Fantasy", synopsis:"A warrior searches for a legendary weapon."},
  {id:78, title:"Mental Toughness", price:200, category:"Self-Help", synopsis:"Develop resilience during difficult times."},
  {id:79, title:"Stock Market Basics", price:200, category:"Finance", synopsis:"Learn how the stock market works from scratch."},
  {id:80, title:"Gourmet Desserts", price:150, category:"Cooking", synopsis:"Create restaurant-style desserts at home."},

  {id:81, title:"AI for Beginners", price:200, category:"Programming", synopsis:"Introduction to artificial intelligence systems."},
  {id:82, title:"The Enchanted Blade", price:200, category:"Fantasy", synopsis:"A mystical blade holds the fate of kingdoms."},
  {id:83, title:"Habits of Millionaires", price:200, category:"Self-Help", synopsis:"Daily routines practiced by wealthy individuals."},
  {id:84, title:"Passive Income Ideas", price:200, category:"Finance", synopsis:"Ways to earn money even while you sleep."},
  {id:85, title:"Geography Explorer", price:150, category:"Education", synopsis:"Discover continents, oceans, and cultures."},
  {id:86, title:"Kotlin Programming", price:200, category:"Programming", synopsis:"Modern Android development with Kotlin."},
  {id:87, title:"The Ice Kingdom", price:200, category:"Fantasy", synopsis:"A frozen empire hides powerful secrets."},
  {id:88, title:"Leadership Skills", price:200, category:"Self-Help", synopsis:"Become a confident and effective leader."},
  {id:89, title:"Crypto Investing Guide", price:200, category:"Finance", synopsis:"Understand cryptocurrency and blockchain basics."},
  {id:90, title:"Quick Family Meals", price:150, category:"Cooking", synopsis:"Healthy meals the whole family will love."},

  {id:91, title:"Flutter App Development", price:200, category:"Programming", synopsis:"Build cross-platform mobile apps with Flutter."},
  {id:92, title:"The Dark Sorcerer", price:200, category:"Fantasy", synopsis:"A powerful sorcerer threatens the balance of magic."},
  {id:93, title:"Time Management Secrets", price:200, category:"Self-Help", synopsis:"Maximize productivity with smart scheduling."},
  {id:94, title:"Wealth Creation System", price:200, category:"Finance", synopsis:"Systematic approach to building long-term wealth."},
  {id:95, title:"Chemistry Basics", price:150, category:"Education", synopsis:"Understand atoms, molecules, and reactions."},
  {id:96, title:"SQL Database Guide", price:200, category:"Programming", synopsis:"Learn how to design and query databases."},
  {id:97, title:"Realm of Fire", price:200, category:"Fantasy", synopsis:"A fiery realm where dragons rule the skies."},
  {id:98, title:"Self-Discipline Formula", price:200, category:"Self-Help", synopsis:"Build unstoppable discipline for success."},
  {id:99, title:"Financial Intelligence", price:200, category:"Finance", synopsis:"Understand how money truly works in the economy."},
  {id:100, title:"Web3 Revolution", price:200, category:"Programming", synopsis:"Explore blockchain technology and decentralized applications."}
];

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

function renderBooks(category = "All", search = "") {
  booksDiv.innerHTML = "";

  let filtered =
    category === "All"
      ? books
      : books.filter(b => b.category === category);

  if (search) {
    filtered = filtered.filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );
  }

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
      if (!currentUser) return showLogin();
      addToCart(book);
    };

    booksDiv.appendChild(div);
  });
}


// ================= CART FUNCTIONS =================
function addToCart(book) {
  const existing = cart.find(item => item.id === book.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  localStorage.setItem("offaceCart", JSON.stringify(cart));
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("offaceCart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  cart = [];
  localStorage.setItem("offaceCart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Cart is empty</li>";
    checkoutDiv.style.display = "none";
  } else {
    cart.forEach(item => {
      total += item.price * item.quantity;

      const li = document.createElement("li");
      li.innerHTML = `
        ${item.title} (x${item.quantity}) - KES ${item.price * item.quantity}
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItems.appendChild(li);
    });

    const totalLi = document.createElement("li");
    totalLi.innerHTML = `<strong>Total: KES ${total}</strong>`;
    cartItems.appendChild(totalLi);

    checkoutDiv.style.display = "block";
  }

  cartCount.textContent = cart.length;
}


// ================= CHECKOUT =================
function checkoutWhatsApp() {
  if (cart.length === 0) return;

  let message = "Hello Joseph, I want to buy:%0A";
  let total = 0;

  cart.forEach(item => {
    message += `- ${item.title} (x${item.quantity}) - KES ${item.price * item.quantity}%0A`;
    total += item.price * item.quantity;
  });

  message += `%0ATotal: KES ${total}`;

  window.open(`https://wa.me/254758118345?text=${message}`, "_blank");
}


// ================= SYNOPSIS =================
function showSynopsis(book) {
  alert(`${book.title}\n\n${book.synopsis}`);
}


// ================= SEARCH =================
function searchBooks() {
  renderBooks("All", searchInput.value);
}


// ================= INIT =================
renderCategories();
renderBooks();