(function () {
  const list = document.querySelector(".list-group");
  const nav = document.querySelector(".btn-group");
  let articlesCount = document.querySelector(".count-articles");
  let pagesCount = document.querySelector(".count-pages");
  document.querySelector(".current-page").innerHTML = 1;

// удаление дом элементов
  const deleteChild = (list) => {
    while (list.firstChild) {
      list.removeChild(list.lastChild);
    }
  };

// создание ссылок на статьи
  const createLinks = (obj) => {
    const a = document.createElement("a");

    a.classList.add("list-group-item", "list-group-item-action");
    a.innerHTML = obj.title;
    a.href = `post.html?id=${obj.id}`;
    list.append(a);
    return a.href;
  };
// создание навигации
  const createNav = (obj) => {
    const pages = parseInt(obj.meta.pagination.pages);

    for (let i = 1; i <= pages; i++) {
      let navLink = document.createElement("a");
      navLink.classList.add("btn", "btn-secondary");
      navLink.innerHTML = i;
      nav.append(navLink);
    }
    articlesCount.innerHTML = obj.meta.pagination.total;
    pagesCount.innerHTML = obj.meta.pagination.pages;
  };

// получение списка статей с API 
  async function getArticles(number = 1) {
    const response = await fetch(
      `https://gorest.co.in/public-api/posts?page=${number}`
    );
    const data = await response.json();

    for (let key of data.data) {
      createLinks(key);
    }
    createNav(data);
  }

  window.onload = getArticles();
  history.pushState(null, null, `index.html`);

  // обработчик клика на навигацию
  nav.addEventListener("click", function (e) {
    e.preventDefault();
    deleteChild(list);
    deleteChild(nav);
    let number = e.target.textContent;

    getArticles(number);
    let url = `index.html?page=${number}`;
    if (number === "1") {
      let url = `index.html`;
      history.pushState(null, null, url);
    } else {
      let url = `index.html?page=${number}`;
      history.pushState(null, null, url);
    }
    let currentPage = window.location.search.toString().substr(6);
    document.querySelector(".current-page").innerHTML = currentPage;
  });
})();
