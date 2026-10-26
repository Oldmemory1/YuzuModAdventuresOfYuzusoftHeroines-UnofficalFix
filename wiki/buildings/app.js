(() => {
  "use strict";

  const data = window.YUZU_FE_BUILDINGS_DATA;
  const indexGrid = document.querySelector("#building-index-grid");
  const categories = document.querySelector("#building-categories");
  const costLadderBody = document.querySelector("#cost-ladder-body");

  if (!data || !Array.isArray(data.buildings)) {
    categories.innerHTML = '<p class="table-note">建筑数据加载失败，请确认 data.js 与 index.html 位于同一目录。</p>';
    return;
  }

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const formatAmount = (value) => Number(value).toLocaleString("zh-CN", {
    maximumFractionDigits: 1
  });

  const formatBuildTime = (value) =>
    String(value).replace(/^(\d[\d,]*)\s*(天)$/, (_, amount, suffix) =>
      `${Number(amount.replaceAll(",", "")).toLocaleString("zh-CN")} ${suffix}`
    );

  const resourceText = (items) =>
    items.length
      ? items
          .map((item) => `${escapeHtml(item.resource)} ${formatAmount(item.amount)}`)
          .join(" · ")
      : "无";

  const outputText = (items) =>
    items.length
      ? items
          .map((item) => `${formatAmount(item.amount)} ${escapeHtml(item.resource)}`)
          .join(" · ")
      : "无";

  const tierId = (building, tier) => `${building.id}-t${tier.tier}`;

  const sourceText = (building, tierIndex) =>
    tierIndex === 0
      ? "直接新建"
      : `由 T${building.tiers[tierIndex - 1].tier}「${building.tiers[tierIndex - 1].name}」升级`;

  const updateMeta = () => {
    document.querySelector("#stat-building-count").textContent = data.meta.buildingCount;
    document.querySelector("#stat-tier-count").textContent = data.meta.tierCount;
    document.querySelector("#stat-max-tier").textContent = data.meta.maxTier;
    document.querySelector("#stat-buildable-tier-count").textContent = data.meta.buildableTierCount;
    document.querySelector("#meta-version").textContent = data.meta.version;
    document.querySelector("#meta-excluded").textContent = data.meta.excludedNote;
    document.querySelector("#footer-updated").textContent = `玩家图鉴 · ${data.meta.updated} 整理`;
  };

  const renderIndex = () => {
    indexGrid.innerHTML = data.buildings
      .map((building) => {
        const finalTier = building.tiers[building.tiers.length - 1];
        return `
          <a class="index-card" href="#${escapeHtml(building.id)}">
            <img src="${escapeHtml(finalTier.icon)}" alt="" width="78" height="78">
            <span class="index-no">${escapeHtml(building.order)}</span>
            <strong>${escapeHtml(building.name)}</strong>
            <small>${escapeHtml(building.summary)}</small>
          </a>
        `;
      })
      .join("");
  };

  const tierRowMarkup = (building, tier, index) => {
    const id = tierId(building, tier);
    return `
      <tr class="tier-row" id="${escapeHtml(id)}" data-tier="${tier.tier}">
        <th scope="row">T${tier.tier}</th>
        <td><a class="tier-link" href="#${escapeHtml(id)}">${escapeHtml(tier.name)}</a></td>
        <td>${escapeHtml(formatBuildTime(tier.buildTime))}</td>
        <td>${outputText(tier.outputs)}</td>
        <td>${tier.effects.map(escapeHtml).join(" · ") || "无"}</td>
      </tr>
      <tr class="tier-detail" data-tier="${tier.tier}">
        <td colspan="5">
          <div class="tier-detail-grid">
            <div><span>造价</span><strong>${resourceText(tier.cost)}</strong></div>
            <div><span>获取方式</span><strong class="source-value">${escapeHtml(sourceText(building, index))}</strong></div>
            <div><span>维护 / 月</span><strong>${resourceText(tier.upkeep)}</strong></div>
            <div>
              <span>所需科技</span>
              <strong>
                ${escapeHtml(tier.research.field)} · ${escapeHtml(tier.research.category)} ·
                ${formatAmount(tier.research.points)} 研究点
              </strong>
            </div>
          </div>
        </td>
      </tr>
    `;
  };

  const buildingMarkup = (building) => {
    const finalTier = building.tiers[building.tiers.length - 1];
    return `
      <article
        class="building-card ${escapeHtml(building.accent)}"
        id="${escapeHtml(building.id)}"
        aria-labelledby="${escapeHtml(building.id)}-title"
      >
        <header class="card-banner">
          <div class="icon-orb">
            <img
              src="${escapeHtml(finalTier.icon)}"
              alt="${escapeHtml(finalTier.name)}建筑图标"
              width="78"
              height="78"
            >
          </div>
          <div class="card-title">
            <p class="kicker">${escapeHtml(building.kicker)}</p>
            <h3 id="${escapeHtml(building.id)}-title">${escapeHtml(building.name)}</h3>
            <p>
              ${escapeHtml(building.title)}
              <span aria-hidden="true">→</span>
              ${escapeHtml(building.finalName)}
            </p>
          </div>
          <div class="headline-stat">
            <span>${escapeHtml(building.headline.label)}</span>
            <strong>${escapeHtml(building.headline.value)}</strong>
            <small>${escapeHtml(building.headline.unit)}</small>
          </div>
        </header>

        <div class="tier-gallery" aria-label="${escapeHtml(building.name)}五级形态">
          ${building.tiers
            .map(
              (tier) => `
                <a
                  class="tier-choice"
                  href="#${escapeHtml(tierId(building, tier))}"
                  aria-label="查看 T${tier.tier}「${escapeHtml(tier.name)}」"
                >
                  <figure>
                    <img
                      src="${escapeHtml(tier.icon)}"
                      alt="${escapeHtml(tier.name)}建筑图标"
                      width="78"
                      height="78"
                    >
                    <figcaption>
                      <b>T${tier.tier}</b>
                      <span>${escapeHtml(tier.name)}</span>
                    </figcaption>
                  </figure>
                </a>
              `
            )
            .join("")}
        </div>

        <div class="resource-strip">
          ${building.resourceStrip
            .map(
              (item) => `
                <div>
                  <span>${escapeHtml(item.label)}</span>
                  <strong>${escapeHtml(item.value)}</strong>
                </div>
              `
            )
            .join("")}
        </div>

        <details class="data-drawer" open>
          <summary><span>展开五级参数与档案描述</span><i aria-hidden="true"></i></summary>
          <div class="table-scroll">
            <table class="tier-table">
              <thead>
                <tr>
                  <th scope="col">等级</th>
                  <th scope="col">建筑</th>
                  <th scope="col">时间</th>
                  <th scope="col">产出</th>
                  <th scope="col">岗位与额外效果</th>
                </tr>
              </thead>
              <tbody>
                ${building.tiers.map((tier, index) => tierRowMarkup(building, tier, index)).join("")}
              </tbody>
            </table>
          </div>
          <div class="lore-list">
            ${building.tiers
              .map(
                (tier) => `
                  <p data-tier="${tier.tier}">
                    <b>T${tier.tier}</b>${escapeHtml(tier.description)}
                  </p>
                `
              )
              .join("")}
          </div>
        </details>
      </article>
    `;
  };

  const renderCategories = () => {
    categories.innerHTML = data.sections
      .map((section) => {
        const buildings = data.buildings.filter((building) => building.section === section.id);
        return `
          <section
            class="category-section"
            id="${escapeHtml(section.id)}"
            aria-labelledby="${escapeHtml(section.id)}-title"
          >
            <div class="section-heading category-heading">
              <div>
                <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
                <h2 id="${escapeHtml(section.id)}-title">${escapeHtml(section.title)}</h2>
              </div>
              <p>${escapeHtml(section.description)}</p>
            </div>
            ${buildings.map(buildingMarkup).join("")}
          </section>
        `;
      })
      .join("");
  };

  const renderCostLadder = () => {
    costLadderBody.innerHTML = data.costLadder
      .map(
        (row) => `
          <tr>
            <th scope="row">T${row.tier}</th>
            <td>${escapeHtml(row.source)}</td>
            <td>${escapeHtml(formatBuildTime(row.buildTime))}</td>
            <td>${formatAmount(row.alloy)}</td>
            <td>${formatAmount(row.heart)}</td>
            <td>${formatAmount(row.standardSpecial)}</td>
            <td>${formatAmount(row.rareSpecial)}</td>
          </tr>
        `
      )
      .join("");
  };

  const activateTier = (target, updateHash = true) => {
    const row = target.closest(".tier-row");
    if (!row) {
      return;
    }

    const card = row.closest(".building-card");
    const detail = row.nextElementSibling;
    const tier = row.dataset.tier;
    if (!card || !detail?.classList.contains("tier-detail")) {
      return;
    }

    card.querySelectorAll(".is-active").forEach((element) => {
      element.classList.remove("is-active");
    });
    row.classList.add("is-active");
    detail.classList.add("is-active");
    card.querySelector(`.lore-list p[data-tier="${tier}"]`)?.classList.add("is-active");
    card.classList.add("has-selected-tier");

    if (updateHash) {
      history.replaceState(null, "", `#${row.id}`);
    }
  };

  categories.addEventListener("click", (event) => {
    const link = event.target.closest(".tier-choice, .tier-link");
    if (!link) {
      return;
    }
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const target = document.getElementById(link.hash.slice(1));
    if (!target) {
      return;
    }

    event.preventDefault();
    activateTier(target);
  });

  updateMeta();
  renderIndex();
  renderCostLadder();
  renderCategories();

  if (window.location.hash) {
    const initialTarget = document.getElementById(window.location.hash.slice(1));
    if (initialTarget?.classList.contains("tier-row")) {
      requestAnimationFrame(() => activateTier(initialTarget, false));
    }
  }
})();
