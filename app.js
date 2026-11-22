const grid = document.querySelector("#internship-grid");
const searchInput = document.querySelector("#search-input");
const domainFilter = document.querySelector("#domain-filter");
const clearButton = document.querySelector("#clear-filters");
const statusText = document.querySelector("#status-text");
const count = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const errorState = document.querySelector("#error-state");
const retryButton = document.querySelector("#retry-button");

let internships = [];

function initials(name) {
  return name.split(/\\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase();
}

function createCard(internship) {
  const article = document.createElement("article");
  article.className = "internship-card";

  const top = document.createElement("div");
  top.className = "card-top";
  const mark = document.createElement("div");
  mark.className = "company-mark";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = initials(internship.company);
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = internship.domain;
  top.append(mark, tag);

  const title = document.createElement("h3");
  title.textContent = internship.title;
  const company = document.createElement("p");
  company.className = "company";
  company.textContent = internship.company;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  [internship.location, internship.duration, internship.type].forEach(value => {
    const item = document.createElement("span");
    item.textContent = value;
    meta.append(item);
  });

  const bottom = document.createElement("div");
  bottom.className = "card-bottom";
  const stipend = document.createElement("span");
  stipend.className = "stipend";
  stipend.textContent = internship.stipend;
  const link = document.createElement("a");
  link.className = "apply-link";
  link.href = internship.applyUrl || "#";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "View opportunity ↗";
  link.setAttribute("aria-label", `View ${internship.title} at ${internship.company}`);
  bottom.append(stipend, link);

  article.append(top, title, company, meta, bottom);
  return article;
}

function render() {
  const keyword = searchInput.value.trim().toLowerCase();
  const domain = domainFilter.value;
  const filtered = internships.filter(item => {
    const searchable = [item.title, item.company, item.domain, item.location].join(" ").toLowerCase();
    return searchable.includes(keyword) && (domain === "all" || item.domain === domain);
  });

  grid.replaceChildren(...filtered.map(createCard));
  count.textContent = filtered.length;
  statusText.textContent = `Showing ${filtered.length} of ${internships.length} opportunities`;
  emptyState.hidden = filtered.length !== 0;
}

async function loadInternships() {
  grid.setAttribute("aria-busy", "true");
  errorState.hidden = true;
  emptyState.hidden = true;
  statusText.textContent = "Loading internships…";

  try {
    const response = await fetch("./data/internships.json");
    if (!response.ok) throw new Error("Could not load internship data");
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid internship data");
    internships = data;
    grid.removeAttribute("aria-busy");
    render();
  } catch (error) {
    grid.removeAttribute("aria-busy");
    grid.replaceChildren();
    count.textContent = "0";
    statusText.textContent = "Internship data is unavailable";
    errorState.hidden = false;
  }
}

searchInput.addEventListener("input", render);
domainFilter.addEventListener("change", render);
clearButton.addEventListener("click", () => {
  searchInput.value = "";
  domainFilter.value = "all";
  render();
  searchInput.focus();
});
retryButton.addEventListener("click", loadInternships);

loadInternships();
