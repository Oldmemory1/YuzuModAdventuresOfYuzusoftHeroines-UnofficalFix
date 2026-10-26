(() => {
  const data = window.YUZU_DISTRICT_DATA;
  if (!data) {
    return;
  }

  const planetGrid = document.querySelector("#planet-grid");
  const baseGrid = document.querySelector("#base-district-grid");
  const filterBar = document.querySelector("#zone-filters");
  const towerGrid = document.querySelector("#tower-zone-grid");
  const dreamGrid = document.querySelector("#dream-zone-grid");
  const dialog = document.querySelector("#district-dialog");
  const dialogContent = document.querySelector("#dialog-content");
  const closeButton = dialog.querySelector(".dialog-close");

  let activeCategory = "all";
  let lastTrigger = null;

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const listMarkup = (items) =>
    items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  const districtArt = (item, variant = "") => `
    <span class="district-art ${variant}">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.resultDistrict || item.name)}区划图标" width="77" height="77">
      ${item.badge ? `<img class="badge" src="${escapeHtml(item.badge)}" alt="" width="64" height="64">` : ""}
    </span>
  `;

  const renderPlanets = () => {
    planetGrid.innerHTML = data.planets
      .map(
        (planet) => `
          <article class="planet-card planet-${escapeHtml(planet.accent)}">
            <div class="planet-visual">
              <img src="${escapeHtml(planet.image)}" alt="${escapeHtml(planet.name)}星球预览" width="1024" height="512">
              <span class="planet-code">${escapeHtml(planet.code)}</span>
            </div>
            <div class="planet-body">
              <p class="planet-subtitle">${escapeHtml(planet.eyebrow)}</p>
              <h3>${escapeHtml(planet.name)}</h3>
              <p class="planet-description">${escapeHtml(planet.description)}</p>
              <ul class="highlight-list">${listMarkup(planet.highlights)}</ul>
              <ul class="fact-list">${listMarkup(planet.facts)}</ul>
            </div>
          </article>
        `
      )
      .join("");
  };

  const renderBaseDistricts = () => {
    baseGrid.innerHTML = data.baseDistricts
      .map(
        (district) => `
          <article class="base-card">
            <header class="base-card-head">
              ${districtArt(district)}
              <div>
                <p class="base-kind">${escapeHtml(district.kind)}</p>
                <h3>${escapeHtml(district.name)}</h3>
                <p class="district-code">${escapeHtml(district.code)}</p>
              </div>
            </header>
            <div class="base-card-body">
              <p class="base-summary">${escapeHtml(district.summary)}</p>
              ${
                district.variants
                  ? `<ul class="variant-list">${district.variants
                      .map((variant) => `<li>${escapeHtml(variant)}</li>`)
                      .join("")}</ul>`
                  : ""
              }
              <div class="stat-grid">
                <div><span>造价</span><strong>${escapeHtml(district.cost)}</strong></div>
                <div><span>建造时间</span><strong>${escapeHtml(district.time)}</strong></div>
                <div><span>维护 / 月</span><strong>${escapeHtml(district.upkeep)}</strong></div>
                <div><span>Zone 槽</span><strong>${escapeHtml(district.zones)}</strong></div>
              </div>
              <ul class="effect-list">${listMarkup(district.effects)}</ul>
              <p class="base-note">${escapeHtml(district.note)}</p>
            </div>
          </article>
        `
      )
      .join("");
  };

  const zoneCard = (zone) => `
    <button
      class="zone-card"
      type="button"
      data-zone-id="${escapeHtml(zone.id)}"
      data-category="${escapeHtml(zone.category)}"
      aria-label="查看${escapeHtml(zone.name)}详情"
    >
      <span class="card-open" aria-hidden="true">+</span>
      <span class="zone-card-top">
        ${districtArt(zone)}
        <span>
          <span class="card-kicker">${escapeHtml(zone.resultDistrict)}</span>
          <span class="zone-card-title">${escapeHtml(zone.name)}</span>
          <span class="result-name">来自 ${escapeHtml(zone.code)}</span>
        </span>
      </span>
      <span class="zone-summary">${escapeHtml(zone.summary)}</span>
      <span class="zone-metrics">
        <span><span>基础区划</span><strong>${escapeHtml(zone.baseCost)}</strong></span>
        <span><span>Zone 特化</span><strong>${escapeHtml(zone.zoneCost)}</strong></span>
        <span><span>维护 / 月</span><strong>${escapeHtml(zone.baseUpkeep)}</strong></span>
        <span><span>提供岗位</span><strong>${escapeHtml(zone.jobs.join(" / "))}</strong></span>
      </span>
    </button>
  `;

  const bindZoneCards = (container) => {
    container.querySelectorAll(".zone-card").forEach((card) => {
      card.addEventListener("click", () => {
        const zone = data.zones.find((item) => item.id === card.dataset.zoneId);
        if (zone) {
          lastTrigger = card;
          openDialog(zone);
        }
      });
    });
  };

  const renderTowerZones = () => {
    const zones = data.zones.filter(
      (zone) =>
        zone.group === "tower" &&
        (activeCategory === "all" || zone.category === activeCategory)
    );
    towerGrid.innerHTML = zones.map(zoneCard).join("");
    bindZoneCards(towerGrid);
  };

  const renderDreamZones = () => {
    const zones = data.zones.filter((zone) => zone.group === "dream");
    dreamGrid.innerHTML = zones.map(zoneCard).join("");
    bindZoneCards(dreamGrid);
  };

  const renderFilters = () => {
    const categories = data.categories.filter((category) => category.id !== "dream");
    filterBar.innerHTML = categories
      .map(
        (category) => `
          <button
            class="filter-button${category.id === activeCategory ? " is-active" : ""}"
            type="button"
            data-filter="${escapeHtml(category.id)}"
            aria-pressed="${category.id === activeCategory}"
          >${escapeHtml(category.label)}</button>
        `
      )
      .join("");

    filterBar.querySelectorAll(".filter-button").forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.filter;
        renderFilters();
        renderTowerZones();
      });
    });
  };

  const openDialog = (zone) => {
    const category = data.categories.find((item) => item.id === zone.category);
    dialogContent.innerHTML = `
      <header class="dialog-header">
        ${districtArt(zone)}
        <div>
          <p class="eyebrow">${escapeHtml(category?.label || "DISTRICT SPECIALIZATION")}</p>
          <h2 id="dialog-title">${escapeHtml(zone.name)}</h2>
          <p class="dialog-result">最终区划：${escapeHtml(zone.resultDistrict)}</p>
        </div>
      </header>
      <p class="dialog-description">${escapeHtml(zone.description)}</p>
      <section class="dialog-section">
        <h3>建造与维护</h3>
        <div class="dialog-stat-grid">
          <div><span>基础区划造价</span><strong>${escapeHtml(zone.baseCost)}</strong></div>
          <div><span>Zone 特化造价</span><strong>${escapeHtml(zone.zoneCost)}</strong></div>
          <div><span>Zone 建造时间</span><strong>${escapeHtml(zone.zoneTime)}</strong></div>
          <div><span>月度维护</span><strong>${escapeHtml(zone.baseUpkeep)}</strong></div>
          <div><span>Zone 额外维护</span><strong>${escapeHtml(zone.zoneUpkeep)}</strong></div>
          <div><span>住房变化</span><strong>${escapeHtml(zone.housing)}</strong></div>
          <div><span>建筑槽变化</span><strong>${escapeHtml(zone.buildingSlots)}</strong></div>
          <div><span>基础区划建造时间</span><strong>600 天</strong></div>
          <div><span>解锁条件</span><strong>${escapeHtml(zone.eligibility)}</strong></div>
        </div>
      </section>
      <section class="dialog-section">
        <h3>提供的岗位</h3>
        <ul class="job-list">${listMarkup(zone.jobs)}</ul>
      </section>
      <section class="dialog-section">
        <h3>Zone 效果</h3>
        <ul class="dialog-list">${listMarkup(zone.modifiers)}</ul>
      </section>
      <p class="dialog-code">
        Zone：${escapeHtml(zone.code)}<br>
        最终区划：${escapeHtml(zone.resultCode)}
      </p>
    `;
    dialog.showModal();
  };

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    lastTrigger?.focus();
  });

  renderPlanets();
  renderBaseDistricts();
  renderFilters();
  renderTowerZones();
  renderDreamZones();
})();
