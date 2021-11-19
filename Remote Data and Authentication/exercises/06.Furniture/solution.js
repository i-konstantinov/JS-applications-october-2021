function solve() {
    window.addEventListener('DOMContentLoaded', loadFurniture);
}
solve();

async function loadFurniture(ev) {
  const res = await fetch('http://localhost:3030/data/furniture');
  const data = await res.json();
  console.log(data);
}