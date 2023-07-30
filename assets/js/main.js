const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const loadingScreen = document.getElementById("loadingScreen");
const pokemonModal = document.getElementById("pokemonModal");
const closeButton = document.querySelector(".close-button");

const maxRecords = 500;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  return pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

function showLoadingScreen() {
  loadingScreen.style.display = "block";
}

function hideLoadingScreen() {
  loadingScreen.style.display = "none";
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  showLoadingScreen();

  offset += limit;
  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit)
      .then(() => {
        loadMoreButton.parentElement.removeChild(loadMoreButton);
      })
      .finally(() => hideLoadingScreen());
  } else {
    loadPokemonItens(offset, limit)
      .then(() => {})
      .finally(() => hideLoadingScreen());
  }
});

function showPokemonModal(pokemon) {
  modalDetails.innerHTML = `
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.photo}" alt="${pokemon.name}">
      <p>Number: #${pokemon.number}</p>
      <p>Type: ${pokemon.types.join(", ")}</p>
    `;

  pokemonModal.style.display = "block";
}

function hidePokemonModal() {
  pokemonModal.style.display = "none";
}

pokemonList.addEventListener("click", (event) => {
  const clickedPokemon = event.target.closest(".pokemon");
  if (clickedPokemon) {
    const number = clickedPokemon.querySelector(".number").textContent.slice(1);
    const name = clickedPokemon.querySelector(".name").textContent;
    const photo = clickedPokemon.querySelector("img").getAttribute("src");
    const types = Array.from(clickedPokemon.querySelectorAll(".type")).map(
      (type) => type.textContent
    );

    const pokemon = {
      number,
      name,
      photo,
      types,
    };

    showPokemonModal(pokemon);
  }
});

closeButton.addEventListener("click", hidePokemonModal);

window.addEventListener("click", (event) => {
  if (event.target === pokemonModal) {
    hidePokemonModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hidePokemonModal();
  }
});
