(function () {
  var article = document.querySelector("article.doc");
  if (!article) return;

  article.querySelectorAll("table").forEach(function (table) {
    if (table.parentNode && table.parentNode.classList.contains("table-scroll")) return;
    var wrap = document.createElement("div");
    wrap.className = "table-scroll";
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  var details = document.getElementById("toc-details");
  var toc = document.getElementById("toc");
  var headings = article.querySelectorAll("h2, h3, h4");
  if (!details || !toc || !headings.length) return;

  var h1 = article.querySelector("h1");
  if (h1) h1.insertAdjacentElement("afterend", details);

  function childList(item) {
    var nested = null;
    for (var c = 0; c < item.children.length; c++) {
      if (item.children[c].tagName === "UL") nested = item.children[c];
    }
    if (!nested) {
      nested = document.createElement("ul");
      item.appendChild(nested);
    }
    return nested;
  }

  var list = document.createElement("ul");
  headings.forEach(function (heading, index) {
    if (!heading.id) heading.id = "section-" + (index + 1);
    var level = heading.tagName === "H2" ? 2 : heading.tagName === "H3" ? 3 : 4;
    var parent = list;
    if (level >= 3) {
      var h2 = list.lastElementChild;
      if (!h2) {
        h2 = document.createElement("li");
        list.appendChild(h2);
      }
      parent = childList(h2);
    }
    if (level >= 4) {
      var h3 = parent.lastElementChild;
      if (!h3) {
        h3 = document.createElement("li");
        parent.appendChild(h3);
      }
      parent = childList(h3);
    }
    var item = document.createElement("li");
    var link = document.createElement("a");
    link.href = "#" + heading.id;
    link.textContent = heading.textContent.replace(/\s+/g, " ").trim();
    item.appendChild(link);
    parent.appendChild(item);
  });

  toc.appendChild(list);
  details.hidden = false;
  if (window.matchMedia("(min-width: 800px)").matches) details.open = true;
})();
