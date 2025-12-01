const defaultContent = [
  {
    section: "index",
    type: "deal",
    title: "Thompson Central Park",
    location: "New York, USA",
    rating: "9.2 Superb (2,411)",
    perks: ["Rooftop pool", "No resort fee"],
    price: "$289",
    image:
      "https://images.unsplash.com/photo-1508255139162-e1f7b7288ab7?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "index",
    type: "deal",
    title: "Hotel Cafe Royal",
    location: "London, UK",
    rating: "9.5 Exceptional (1,022)",
    perks: ["Wellness access", "Afternoon tea"],
    price: "$412",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "packages",
    type: "package",
    title: "Tulum beach reset",
    duration: "5 nights · Flight + Hotel",
    price: "$1,185",
    perks: ["Private transfer", "Daily breakfast", "Sunset sailing"],
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "packages",
    type: "package",
    title: "Swiss Alps rail journey",
    duration: "7 nights · First class rail",
    price: "$2,450",
    perks: ["Glacier Express", "Mountain spa", "Dining credits"],
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "guides",
    type: "guide",
    title: "48 hours in Lisbon",
    author: "By Ana Sousa",
    summary: "Tile-clad streets, seaside eats, and boutique stays in Chiado.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "guides",
    type: "guide",
    title: "Tokyo neighborhoods decoded",
    author: "By Ken Watanabe",
    summary: "Where to stay for ramen crawls, vintage hunting, or neon nights.",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "flights",
    type: "flight",
    title: "LAX → CDG",
    duration: "10h 50m · Nonstop",
    price: "$698",
    perks: ["2 checked bags", "Changeable fare"],
    image:
      "https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "flights",
    type: "flight",
    title: "JFK → BCN",
    duration: "7h 45m · Red-eye",
    price: "$432",
    perks: ["Wi-Fi", "Seat selection"],
    image:
      "https://images.unsplash.com/photo-1504199367641-abbcbe73a3ad?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "cars",
    type: "car",
    title: "Tesla Model Y",
    duration: "Electric · 300 mi range",
    price: "$79/day",
    perks: ["Free Supercharging", "Premium insurance"],
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "cars",
    type: "car",
    title: "Jeep Wrangler",
    duration: "SUV · 5 seats",
    price: "$68/day",
    perks: ["Unlimited miles", "Adventure kit"],
    image:
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "deals-page",
    type: "deal",
    title: "Mondrian South Beach",
    location: "Miami, USA",
    rating: "8.9 Excellent (1,502)",
    perks: ["Suite upgrade", "Pool cabana"],
    price: "$259",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "deals-page",
    type: "deal",
    title: "The Hoxton",
    location: "Amsterdam, NL",
    rating: "9.1 Superb (2,310)",
    perks: ["Canal views", "Late checkout"],
    price: "$188",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "destinations",
    type: "destination",
    title: "Coastal escapes",
    summary: "Boutique stays along turquoise waters worldwide.",
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb210cc?auto=format&fit=crop&w=700&q=80",
  },
  {
    section: "destinations",
    type: "destination",
    title: "Design capitals",
    summary: "Architecture, art hotels, and creative hubs to explore.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80",
  },
];

const fetchContent = async () => {
  try {
    const response = await fetch("/data/content.json");
    if (!response.ok) throw new Error("Missing content payload");
    return await response.json();
  } catch (error) {
    console.warn("Falling back to default content", error.message);
    return defaultContent;
  }
};

const templateBuilders = {
  deal: (item) => `
    <article class="deal-card injected">
      <img src="${item.image}" alt="${item.title}">
      <div class="deal-body">
        <div class="deal-meta">
          <span class="rating">${item.rating}</span>
          <span>${item.location ?? ""}</span>
        </div>
        <h3>${item.title}</h3>
        ${renderList(item.perks)}
        <div class="price-row">
          <div><span class="price">${item.price}</span><span class="per"> per night</span></div>
          <button class="ghost-btn">Check deal</button>
        </div>
      </div>
    </article>
  `,
  package: (item) => `
    <article class="package-card injected">
      <img src="${item.image}" alt="${item.title}">
      <div class="card-body">
        <p class="eyebrow">${item.duration}</p>
        <h3>${item.title}</h3>
        ${renderList(item.perks)}
        <div class="price-row">
          <span class="price">${item.price}</span>
          <button class="primary-btn">Customize</button>
        </div>
      </div>
    </article>
  `,
  guide: (item) => `
    <article class="guide-card injected">
      <img src="${item.image}" alt="${item.title}">
      <div class="card-body">
        <p class="eyebrow">${item.author}</p>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <button class="ghost-btn">Read guide</button>
      </div>
    </article>
  `,
  flight: (item) => `
    <article class="flight-card injected">
      <img src="${item.image}" alt="${item.title}">
      <div class="card-body">
        <p class="eyebrow">${item.duration}</p>
        <h3>${item.title}</h3>
        ${renderList(item.perks)}
        <div class="price-row">
          <span class="price">${item.price}</span>
          <button class="ghost-btn">Track price</button>
        </div>
      </div>
    </article>
  `,
  car: (item) => `
    <article class="car-card injected">
      <img src="${item.image}" alt="${item.title}">
      <div class="card-body">
        <p class="eyebrow">${item.duration}</p>
        <h3>${item.title}</h3>
        ${renderList(item.perks)}
        <div class="price-row">
          <span class="price">${item.price}</span>
          <button class="ghost-btn">Reserve</button>
        </div>
      </div>
    </article>
  `,
  destination: (item) => `
    <article class="destination-card injected">
      <img src="${item.image}" alt="${item.title}">
      <div class="card-body">
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <button class="ghost-btn">View stays</button>
      </div>
    </article>
  `,
};

const renderList = (items = []) => {
  if (!items.length) return "";
  return `<ul>${items.map((perk) => `<li>${perk}</li>`).join("")}</ul>`;
};

const injectContent = (allContent) => {
  const normalized = Array.isArray(allContent) ? allContent : allContent.content;
  if (!Array.isArray(normalized)) return;

  document.querySelectorAll(".js-inject-target").forEach((target) => {
    const section = target.dataset.section;
    const fragment = normalized
      .filter((item) => item.section === section)
      .map((item) => templateBuilders[item.type]?.(item) ?? "")
      .join("");
    if (fragment) target.insertAdjacentHTML("beforeend", fragment);
  });
};

const initTabs = () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".panel");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((btn) => btn.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.target)?.classList.add("active");
    });
  });
};

const initCarousel = () => {
  const grid = document.querySelector(".popular-grid");
  const buttons = document.querySelectorAll(".carousel-controls button");
  if (!grid || !buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.direction === "next" ? 1 : -1;
      grid.scrollBy({ left: direction * 300, behavior: "smooth" });
    });
  });
};

const boot = async () => {
  initTabs();
  initCarousel();
  const payload = await fetchContent();
  injectContent(payload);
};

document.addEventListener("DOMContentLoaded", boot);
