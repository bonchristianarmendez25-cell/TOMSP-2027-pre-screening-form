/*!
 * TOMSP Hub – floating side panel with official-site links + FAQ.
 * Usage: add before </body> on index.html (and form.html if you like):
 *   <script src="tomsp-hub.js" defer></script>
 * No dependencies. Does not touch your existing code.
 */
(function () {
  if (window.__tomspHub) return;
  window.__tomspHub = true;

  var BASE = "https://sites.google.com/tomsp.org/tomsp/";
  var LINKS = [
    ["Home", "home", "Official TOMSP website"],
    ["About Us", "about-us", "Who runs TOMSP"],
    ["TOMSPAC Executive Board", "about-us/tomspac-executive-board", "Meet the board"],
    ["TOMSP 2026", "tomsp-2026", "Current search"],
    ["Nomination Hub", "nomination-hub", "Rules, files, instructions"],
    ["For Maritime Students / Nominees", "nomination-hub/maritime-students-nominees", "What students prepare"],
    ["For School Staff / Nominators", "nomination-hub/school-staff-nominators", "How schools endorse"],
    ["Partners", "partners", "Supporting organizations"],
    ["FAQs", "faqs", "Full list of questions"]
  ];

  // Short summaries of the official FAQ (full answers live on the official site)
  var FAQ = [
    ["Is TOMSP based only on grades?",
     "No. Academic and professional excellence is one of three pillars, alongside responsible leadership and social responsibility. If you failed or dropped a subject, disclose it honestly and explain what you learned."],
    ["Can students nominate themselves?",
     "No. A student can prepare records and express interest, but the school (MHEI) must select, verify, formally endorse and submit the nomination."],
    ["What do National Finalists go through?",
     "A Technical and Industry Panel interview, a Values, Leadership and Social Impact Panel interview, and a written examination."],
    ["Is the Formation Program required?",
     "Yes, for all National Finalists. Missing it without a valid reason accepted by the Search Committee may lead to disqualification. Nominators should confirm the nominee can join every TOMSP Week activity."],
    ["How many entries per pillar?",
     "Three is the sweet spot. Fewer may put the bidbook at a disadvantage, and when more than three are submitted only the first three are reviewed."],
    ["What if I have no proof of an achievement?",
     "Undocumented claims are disregarded. Ask the school or awarding body for an official certification. Certificates, official letters, school records, programs and reports can all serve as evidence."],
    ["Can achievements outside college count?",
     "Yes, but college-related recognitions and affiliations carry more weight."],
    ["Nominee has Completed Classroom Instruction (CCI) status?",
     "Still eligible with a Certificate of Enrollment showing official enrollment as a 3rd- or 4th-year student for shipboard training (2-1-1 or 3-1 curriculum)."],
    ["Can both nominees be from the same course?",
     "Yes, as long as both meet all eligibility criteria."]
  ];

  var css = "\
.th-btn{position:fixed;right:0;top:42%;z-index:9998;background:#0B3A82;color:#fff;border:0;border-radius:12px 0 0 12px;\
padding:14px 10px;cursor:pointer;font:600 14px/1 inherit;box-shadow:-3px 3px 14px rgba(11,58,130,.35);\
writing-mode:vertical-rl;letter-spacing:.04em;border-left:4px solid #F2B705;transition:padding .15s}\
.th-btn:hover,.th-btn:focus-visible{padding-right:16px;outline:none}\
.th-btn:focus-visible{box-shadow:0 0 0 3px #F2B705}\
.th-back{position:fixed;inset:0;background:rgba(7,25,60,.45);z-index:9998;opacity:0;pointer-events:none;transition:opacity .2s}\
.th-open .th-back{opacity:1;pointer-events:auto}\
.th-panel{position:fixed;top:0;right:0;height:100%;width:min(400px,92vw);background:#fff;z-index:9999;display:flex;flex-direction:column;\
transform:translateX(105%);transition:transform .25s ease;box-shadow:-8px 0 30px rgba(0,0,0,.25);font-family:inherit;color:#1b2a41}\
.th-open .th-panel{transform:none}\
.th-head{background:#0B3A82;color:#fff;padding:16px 18px;border-bottom:4px solid #F2B705;display:flex;align-items:center;justify-content:space-between}\
.th-head b{font-size:16px}.th-head small{display:block;opacity:.8;font-size:12px;margin-top:2px}\
.th-x{background:none;border:0;color:#fff;font-size:26px;cursor:pointer;line-height:1;padding:4px 8px}\
.th-tabs{display:flex;border-bottom:1px solid #dde4ef}\
.th-tab{flex:1;padding:12px;background:none;border:0;border-bottom:3px solid transparent;font:600 14px inherit;color:#5a6b85;cursor:pointer}\
.th-tab[aria-selected=true]{color:#0B3A82;border-bottom-color:#F2B705}\
.th-body{overflow:auto;padding:14px 16px;flex:1}\
.th-body a.th-l{display:block;padding:11px 12px;border-radius:10px;text-decoration:none;color:#0B3A82;border:1px solid #e3e9f3;margin-bottom:8px}\
.th-body a.th-l:hover,.th-body a.th-l:focus-visible{background:#f2f6fc;border-color:#0B3A82;outline:none}\
.th-l b{display:block;font-size:14px}.th-l span{font-size:12px;color:#5a6b85}\
.th-search{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #cfd8e6;border-radius:10px;margin-bottom:10px;font:inherit}\
.th-q{width:100%;text-align:left;background:none;border:0;border-bottom:1px solid #e3e9f3;padding:12px 4px;font:600 14px inherit;color:#0B3A82;cursor:pointer;display:flex;justify-content:space-between;gap:10px}\
.th-q::after{content:'+';color:#c99700;font-size:18px;line-height:1}\
.th-q[aria-expanded=true]::after{content:'\\2212'}\
.th-a{display:none;padding:2px 4px 14px;font-size:13.5px;line-height:1.55}\
.th-q[aria-expanded=true]+.th-a{display:block}\
.th-foot{padding:12px 16px;border-top:1px solid #dde4ef;font-size:12.5px;color:#5a6b85;background:#f7f9fc}\
.th-foot a{color:#0B3A82;font-weight:600}\
.th-empty{font-size:13px;color:#5a6b85;padding:8px 4px}\
@media (prefers-reduced-motion:reduce){.th-panel,.th-back,.th-btn{transition:none}}";

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

  function build() {
    var st = el("style", {}, css); document.head.appendChild(st);
    var root = el("div", { id: "tomsp-hub" });

    var btn = el("button", { "class": "th-btn", "aria-label": "Open TOMSP guide: official links and FAQ", "aria-expanded": "false" }, "TOMSP Guide &amp; FAQ");
    var back = el("div", { "class": "th-back" });
    var panel = el("aside", { "class": "th-panel", role: "dialog", "aria-label": "TOMSP guide" });

    panel.innerHTML =
      '<div class="th-head"><div><b>TOMSP Guide</b><small>Official links and frequently asked questions</small></div>' +
      '<button class="th-x" aria-label="Close">&times;</button></div>' +
      '<div class="th-tabs" role="tablist">' +
      '<button class="th-tab" role="tab" aria-selected="true" data-t="links">Official site</button>' +
      '<button class="th-tab" role="tab" aria-selected="false" data-t="faq">FAQ</button></div>' +
      '<div class="th-body"></div>' +
      '<div class="th-foot">Questions? <a href="mailto:tomspac@tomsp.org">tomspac@tomsp.org</a> &middot; +63 918 990 0868</div>';

    var body = panel.querySelector(".th-body");

    function showLinks() {
      body.innerHTML = LINKS.map(function (l) {
        return '<a class="th-l" target="_blank" rel="noopener" href="' + BASE + l[1] + '"><b>' + esc(l[0]) + '</b><span>' + esc(l[2]) + '</span></a>';
      }).join("");
    }
    function showFaq() {
      body.innerHTML = '<input class="th-search" type="search" placeholder="Search questions" aria-label="Search FAQ"><div class="th-list"></div>' +
        '<a class="th-l" target="_blank" rel="noopener" href="' + BASE + 'faqs"><b>Read the full official FAQ</b><span>Opens the TOMSP website</span></a>';
      var list = body.querySelector(".th-list"), inp = body.querySelector(".th-search");
      function render(q) {
        q = (q || "").toLowerCase();
        var items = FAQ.filter(function (f) { return (f[0] + " " + f[1]).toLowerCase().indexOf(q) > -1; });
        list.innerHTML = items.length ? items.map(function (f, i) {
          return '<button class="th-q" aria-expanded="false" aria-controls="th-a' + i + '">' + esc(f[0]) + '</button><div class="th-a" id="th-a' + i + '">' + esc(f[1]) + '</div>';
        }).join("") : '<div class="th-empty">No match. Try fewer words, or open the full FAQ below.</div>';
      }
      render("");
      inp.addEventListener("input", function () { render(inp.value); });
      list.addEventListener("click", function (e) {
        var b = e.target.closest(".th-q"); if (!b) return;
        b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") === "true" ? "false" : "true");
      });
    }

    panel.querySelectorAll(".th-tab").forEach(function (t) {
      t.addEventListener("click", function () {
        panel.querySelectorAll(".th-tab").forEach(function (x) { x.setAttribute("aria-selected", x === t); });
        t.dataset.t === "faq" ? showFaq() : showLinks();
      });
    });

    function open() { root.classList.add("th-open"); btn.setAttribute("aria-expanded", "true"); panel.querySelector(".th-x").focus(); }
    function close() { root.classList.remove("th-open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    btn.addEventListener("click", open);
    back.addEventListener("click", close);
    panel.querySelector(".th-x").addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && root.classList.contains("th-open")) close(); });

    showLinks();
    root.appendChild(btn); root.appendChild(back); root.appendChild(panel);
    document.body.appendChild(root);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
})();
