// const data = [
//   { name: "sheik", details: [22, 2001] },
//   { name: "revina", details: [22, 2001] },
// ];
const data = [
  {
    name: "United States",
    details:
      "The United States is a country located in North America. It is the third-largest country by land area and the third most populous. The capital city is Washington, D.C., and the largest city is New York City. The United States is known for its cultural diversity, technological advancements, and economic power.",
  },
  {
    name: "China",
    details:
      "China, officially known as the People's Republic of China, is the most populous country in the world. It is located in East Asia and has the second-largest land area. Beijing is the capital city, and Shanghai is the largest city. China is recognized for its rich history, cultural heritage, and rapid economic growth.",
  },
  {
    name: "India",
    details:
      "India is a country in South Asia and the second most populous country globally. It is known for its diverse culture, languages, and religions. New Delhi is the capital city, and Mumbai is the largest city. India has a rich history, and it is renowned for contributions in fields like mathematics, spirituality, and art.",
  },
  {
    name: "Indonesia",
    details:
      "Indonesia is an archipelago country located in Southeast Asia. It is the world's largest island country, consisting of thousands of islands. Jakarta is the capital and largest city. Indonesia is known for its stunning natural landscapes, vibrant cultures, and biodiversity.",
  },
  {
    name: "Pakistan",
    details:
      "Pakistan is a country in South Asia and shares borders with India, Afghanistan, Iran, and China. Islamabad is the capital city, and Karachi is the largest city. Pakistan is known for its historical sites, diverse geography, and cultural heritage.",
  },
  {
    name: "Brazil",
    details:
      "Brazil is the largest country in South America and the fifth largest globally. It shares borders with every South American country except Chile and Ecuador. Brasília is the capital city, and São Paulo is the largest city. Brazil is famous for its Amazon rainforest, vibrant festivals, and football tradition.",
  },
  {
    name: "Nigeria",
    details:
      "Nigeria is a country located in West Africa. It is the most populous country in Africa and the seventh most populous globally. Abuja is the capital city, and Lagos is the largest city. Nigeria is known for its diverse culture, music, and contributions to African literature and film.",
  },
  {
    name: "Bangladesh",
    details:
      "Bangladesh is a country located in South Asia, sharing borders with India and Myanmar. Dhaka is the capital and largest city. Bangladesh is known for its lush green landscapes, cultural heritage, and being one of the world's largest producers of textiles and garments.",
  },
  {
    name: "Russia",
    details:
      "Russia, officially known as the Russian Federation, is the largest country in the world by land area, spanning Eastern Europe and Northern Asia. Moscow is the capital and largest city. Russia is known for its rich history, diverse landscapes, and significant contributions to literature, music, and science.",
  },
  {
    name: "Mexico",
    details:
      "Mexico is a country located in the southern part of North America. It is known for its ancient civilizations, such as the Maya and Aztec, as well as its vibrant culture. Mexico City is the capital and largest city. Mexico is famous for its cuisine, traditional music and dance, and beautiful beaches.",
  },
];

function showMoreDetails(details) {
  var about = document.getElementById("about");

  var closeButton = document.createElement("button");
  closeButton.setAttribute("id", "close");
  closeButton.innerHTML = "Close";
  closeButton.addEventListener("click", function () {
    about.style.display = "none";
  });

  about.innerHTML = "Details: " + details;

  about.appendChild(closeButton);

  about.style.display = "block";
}

function createListElements() {
  var map = document.getElementById("map");
  var searchInput = document.getElementById("searchInput");
  var searchValue = "";

  searchInput.addEventListener("input", function (event) {
    searchValue = event.target.value.toLowerCase();
    updateList();
  });

  function updateList() {
    map.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var itemName = item.name.toLowerCase();

      if (itemName.includes(searchValue)) {
        var image = document.createElement("img");
        image.src = "./images/" + item.name + ".png";
        image.height = 150;
        var button = document.createElement("button");
        button.setAttribute("id", "show");
        button.innerHTML = item.name;
        button.addEventListener(
          "click",
          showMoreDetails.bind(null, item.details)
        );

        var div_ = document.createElement("div");
        div_.setAttribute("id", "item");
        div_.appendChild(image);

        div_.appendChild(button);

        map.appendChild(div_);
      }
    }
  }

  updateList();
}

createListElements();
