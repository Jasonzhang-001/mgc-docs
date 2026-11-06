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
  var headings = article.querySelectorAll("h2, h3");
  if (!details || !toc || !headings.length) return;

  var h1 = article.querySelector("h1");
  if (h1) h1.insertAdjacentElement("afterend", details);

  var list = document.createElement("ul");
  headings.forEach(function (heading, index) {
    if (!heading.id) heading.id = "section-" + (index + 1);
    var level = heading.tagName === "H3" ? 3 : 2;
    var parent = list;
    if (level === 3) {
      var last = list.lastElementChild;
      if (!last) {
        last = document.createElement("li");
        list.appendChild(last);
      }
      var nested = null;
      for (var c = 0; c < last.children.length; c++) {
        if (last.children[c].tagName === "UL") nested = last.children[c];
      }
      if (!nested) {
        nested = document.createElement("ul");
        last.appendChild(nested);
      }
      parent = nested;
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
