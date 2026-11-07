/* 找服网 · 传奇发布网新开服  交互脚本（单文件，根目录部署） */
(function () {
  "use strict";

  /* ---------- 移动端导航 ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  /* ---------- 返回顶部 ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 500) { toTop.classList.add("show"); }
      else { toTop.classList.remove("show"); }
    }, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 开服表筛选 ---------- */
  var filterBtns = document.querySelectorAll(".filter button");
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("on"); });
        btn.classList.add("on");
        var key = btn.getAttribute("data-ver");
        var rows = document.querySelectorAll(".kf-table tbody tr");
        var shown = 0;
        rows.forEach(function (row) {
          var ver = row.getAttribute("data-ver") || "";
          var hit = (key === "all" || ver.indexOf(key) > -1);
          row.classList.toggle("hide", !hit);
          if (hit) { shown++; }
        });
        var counter = document.getElementById("kf-count");
        if (counter) { counter.textContent = shown; }
      });
    });
  }

  /* ---------- 站内搜索 ---------- */
  var searchList = document.getElementById("search-list");
  if (searchList && window.SITE_INDEX) {
    var input = document.getElementById("search-input");
    var form = document.getElementById("search-form");
    var info = document.getElementById("search-info");
    var index = window.SITE_INDEX;

    var render = function (keyword) {
      var kw = (keyword || "").trim();
      var list = index;
      if (kw) {
        var low = kw.toLowerCase();
        list = index.filter(function (item) {
          return (item.t + " " + item.d + " " + (item.k || "") + " " + (item.b || "")).toLowerCase().indexOf(low) > -1;
        });
      }
      searchList.innerHTML = "";
      if (!kw) {
        info.textContent = "共收录 " + index.length + " 篇文章，输入关键词即可检索（如：合击、单职业、打金、运9）。";
      } else {
        info.textContent = "关键词「" + kw + "」共找到 " + list.length + " 篇文章";
      }
      if (!list.length) {
        searchList.innerHTML = '<div class="list-intro"><p>没有匹配的内容，可以换个说法试试，例如：复古、开服表、回收、攻沙。</p></div>';
        return;
      }
      var html = "";
      var n = 0;
      list.forEach(function (item) {
        if (n >= 30) { return; }
        n++;
        html += '<div class="art-item">' +
          '<div class="art-thumb' + (n % 3 === 0 ? " t3" : (n % 2 === 0 ? " t2" : "")) + '">' + (item.c === "资讯" ? "资" : "攻") + "</div>" +
          '<div class="art-main"><h3><a href="' + item.u + '">' + item.t + "</a></h3>" +
          '<div class="art-desc">' + item.d + "</div>" +
          '<div class="art-foot"><span class="cat">' + item.c + "</span><span>" + item.dt + "</span></div>" +
          "</div></div>";
      });
      searchList.innerHTML = html;
    };

    var params = new URLSearchParams(window.location.search);
    var q = params.get("q") || "";
    if (input) { input.value = q; }
    render(q);

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var val = input ? input.value : "";
        var url = "search.html" + (val ? "?q=" + encodeURIComponent(val) : "");
        window.history.replaceState(null, "", url);
        render(val);
      });
    }
  }
})();
