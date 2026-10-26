(() => {
  "use strict";

  const data = window.YUZU_TRADITION_DATA;
  const treeIndexGrid = document.querySelector("#tree-index-grid");
  const treeList = document.querySelector("#tree-list");
  const agendaList = document.querySelector("#agenda-list");
  const dialog = document.querySelector("#tradition-dialog");
  const dialogContent = document.querySelector("#dialog-content");
  const closeButton = dialog.querySelector(".dialog-close");

  if (!data || !Array.isArray(data.trees)) {
    treeList.innerHTML = '<p class="agenda-footnote">传统数据加载失败，请确认 data.js 与 index.html 位于同一目录。</p>';
    return;
  }

  let lastTrigger = null;
  const treeById = new Map(data.trees.map((tree) => [tree.id, tree]));
  const itemByTreeAndId = new Map();

  data.trees.forEach((tree) => {
    [tree.adoption, tree.finish, ...tree.nodes].forEach((item) => {
      itemByTreeAndId.set(`${tree.id}:${item.id}`, item);
    });
  });

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const itemName = (tree, id) =>
    tree.nodes.find((node) => node.id === id)?.name ||
    (tree.adoption.id === id ? tree.adoption.name : null) ||
    (tree.finish.id === id ? tree.finish.name : null) ||
    id;

  const listMarkup = (items) =>
    items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  const updateStats = () => {
    document.querySelector("#stat-trees").textContent = data.meta.treeCount;
    document.querySelector("#stat-projects").textContent = data.meta.projectCount;
    document.querySelector("#stat-agendas").textContent = data.meta.implementedAgendaCount;
  };

  const renderTreeIndex = () => {
    treeIndexGrid.innerHTML = data.trees
      .map(
        (tree) => `
          <a
            class="tree-index-card"
            href="#${escapeHtml(tree.id)}"
            style="--tree-accent: ${escapeHtml(tree.accent)}"
          >
            <img src="${escapeHtml(tree.icon)}" alt="" width="48" height="48">
            <span class="tree-index-copy">
              <small>${escapeHtml(tree.order)} · ${escapeHtml(tree.english)}</small>
              <strong>${escapeHtml(tree.name)}</strong>
              <span>${tree.nodes.length} 个项目 · ${escapeHtml(tree.agenda.name)}</span>
            </span>
            <span class="tree-index-arrow" aria-hidden="true">↓</span>
          </a>
        `
      )
      .join("");
  };

  const nodeMarkup = (tree, node) => {
    const requirements = node.requires.length
      ? `前置：${node.requires.map((id) => itemName(tree, id)).join("、")}`
      : "树根节点";
    const rootLabel = node.requires.length ? requirements : "树根节点，采纳后可选";

    return `
      <div class="node-slot" style="--row: ${node.row}; --col: ${node.col}">
        <button
          class="tradition-node"
          type="button"
          data-tree-id="${escapeHtml(tree.id)}"
          data-item-id="${escapeHtml(node.id)}"
          data-item-kind="node"
          aria-label="查看传统项目「${escapeHtml(node.name)}」的前置与效果"
          title="${escapeHtml(rootLabel)}"
        >
          <span class="node-open" aria-hidden="true">+</span>
          <span class="node-icon-wrap">
            <img src="${escapeHtml(node.image)}" alt="" width="61" height="61">
          </span>
          <span class="node-name">${escapeHtml(node.name)}</span>
          <span class="node-requires">${escapeHtml(requirements)}</span>
        </button>
      </div>
    `;
  };

  const treeMarkup = (tree) => {
    const maxRow = Math.max(...tree.nodes.map((node) => node.row));
    const eligibility = tree.eligibility.map((item) => `<span>${escapeHtml(item)}</span>`).join("");

    return `
      <article
        class="tree-article"
        id="${escapeHtml(tree.id)}"
        style="--tree-accent: ${escapeHtml(tree.accent)}"
        aria-labelledby="${escapeHtml(tree.id)}-title"
      >
        <header class="tree-header">
          <div class="tree-emblem">
            <img src="${escapeHtml(tree.icon)}" alt="" width="55" height="55">
          </div>
          <div class="tree-title">
            <span class="tree-number">${escapeHtml(tree.order)} · ${escapeHtml(tree.english)}</span>
            <h3 id="${escapeHtml(tree.id)}-title">${escapeHtml(tree.name)}</h3>
            <p>${escapeHtml(tree.description)}</p>
            <div class="tag-row">${eligibility}</div>
          </div>
          <div class="tree-side">
            <div class="agenda-state">
              <span>COUNCIL AGENDA · 议会议程</span>
              <strong>${escapeHtml(tree.agenda.name)}</strong>
              <small>${escapeHtml(tree.agenda.note)}</small>
            </div>
            <div class="bonus-actions">
              <button
                class="bonus-button"
                type="button"
                data-tree-id="${escapeHtml(tree.id)}"
                data-item-id="${escapeHtml(tree.adoption.id)}"
                data-item-kind="adoption"
              >
                <strong>采纳奖励</strong>
                <span>点击查看全部效果</span>
              </button>
              <button
                class="bonus-button"
                type="button"
                data-tree-id="${escapeHtml(tree.id)}"
                data-item-id="${escapeHtml(tree.finish.id)}"
                data-item-kind="finish"
              >
                <strong>完成奖励</strong>
                <span>完成五项传统后生效</span>
              </button>
            </div>
          </div>
        </header>
        <div class="tree-code-line">
          <span><strong>传统组：</strong>${escapeHtml(tree.code)}</span>
          <span><strong>树型：</strong>${escapeHtml(tree.treeTemplate)}</span>
        </div>
        <p class="graph-hint">窄屏下可横向滑动查看完整依赖图。</p>
        <div class="graph-scroll">
          <div
            class="tree-canvas"
            data-tree-id="${escapeHtml(tree.id)}"
            style="--tree-rows: ${maxRow}"
          >
            <svg class="edge-layer" aria-hidden="true">
              <defs>
                <marker
                  id="arrow-${escapeHtml(tree.id)}"
                  viewBox="0 0 8 8"
                  refX="7"
                  refY="4"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                  markerUnits="userSpaceOnUse"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="${escapeHtml(tree.accent)}"></path>
                </marker>
              </defs>
            </svg>
            ${tree.nodes.map((node) => nodeMarkup(tree, node)).join("")}
          </div>
        </div>
      </article>
    `;
  };

  const renderTrees = () => {
    treeList.innerHTML = data.trees.map(treeMarkup).join("");
  };

  const drawEdges = (treeId) => {
    const tree = treeById.get(treeId);
    const canvas = treeList.querySelector(`.tree-canvas[data-tree-id="${treeId}"]`);
    if (!tree || !canvas) {
      return;
    }

    const svg = canvas.querySelector(".edge-layer");
    const canvasRect = canvas.getBoundingClientRect();
    const nodeButtons = new Map(
      [...canvas.querySelectorAll(".tradition-node")].map((button) => [
        button.dataset.itemId,
        button
      ])
    );

    svg.setAttribute("viewBox", `0 0 ${canvasRect.width} ${canvasRect.height}`);
    [...svg.querySelectorAll(".edge-path, .edge-path-glow")].forEach((path) => path.remove());

    tree.nodes.forEach((targetNode) => {
      targetNode.requires.forEach((sourceId) => {
        const source = nodeButtons.get(sourceId);
        const target = nodeButtons.get(targetNode.id);
        if (!source || !target) {
          return;
        }

        const sourceRect = source.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const x1 = sourceRect.left - canvasRect.left + sourceRect.width / 2;
        const y1 = sourceRect.bottom - canvasRect.top - 16;
        const x2 = targetRect.left - canvasRect.left + targetRect.width / 2;
        const y2 = targetRect.top - canvasRect.top + 10;
        const bend = Math.max(34, Math.abs(y2 - y1) * 0.42);
        const pathData = `M ${x1} ${y1} C ${x1} ${y1 + bend}, ${x2} ${y2 - bend}, ${x2} ${y2}`;

        const glow = document.createElementNS("http://www.w3.org/2000/svg", "path");
        glow.setAttribute("class", "edge-path-glow");
        glow.setAttribute("d", pathData);
        svg.append(glow);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("class", "edge-path");
        path.setAttribute("d", pathData);
        path.setAttribute("marker-end", `url(#arrow-${tree.id})`);
        svg.append(path);
      });
    });
  };

  const drawAllEdges = () => {
    data.trees.forEach((tree) => drawEdges(tree.id));
  };

  const renderAgendas = () => {
    agendaList.innerHTML = data.trees
      .map(
        (tree) => `
          <article class="agenda-row">
            <div>
              <strong>${escapeHtml(tree.name)}</strong>
              <span>${escapeHtml(tree.code)}</span>
            </div>
            <b>${escapeHtml(tree.agenda.name)}</b>
          </article>
        `
      )
      .join("");
  };

  const requirementsMarkup = (tree, item, kind) => {
    if (kind === "adoption") {
      return "<li>采纳此传统树</li>";
    }
    if (kind === "finish") {
      return "<li>完成本树的全部五项传统</li>";
    }
    if (!item.requires.length) {
      return "<li>树根节点，采纳后即可选择</li>";
    }
    return item.requires.map((id) => `<li>${escapeHtml(itemName(tree, id))}</li>`).join("");
  };

  const effectGroupsMarkup = (groups) =>
    groups
      .map(
        (group) => `
          <section class="effect-group">
            <h4>${escapeHtml(group.label)}</h4>
            <ul class="effect-items">${listMarkup(group.items)}</ul>
          </section>
        `
      )
      .join("");

  const openDetail = (tree, item, kind, trigger) => {
    lastTrigger = trigger;
    const typeLabel =
      kind === "adoption" ? "采纳奖励" : kind === "finish" ? "完成奖励" : "传统项目";
    const icon = kind === "node" ? item.image : tree.icon;

    dialogContent.innerHTML = `
      <header class="dialog-header">
        <div class="dialog-icon">
          <img src="${escapeHtml(icon)}" alt="" width="72" height="72">
        </div>
        <div>
          <p class="eyebrow">${escapeHtml(typeLabel)} · ${escapeHtml(tree.english)}</p>
          <h2 id="dialog-title">${escapeHtml(item.name)}</h2>
          <p class="dialog-tree-name">${escapeHtml(tree.name)}</p>
        </div>
      </header>
      <div class="dialog-body">
        <p class="dialog-description">${escapeHtml(item.description)}</p>
        <div class="dialog-meta">
          <div>
            <span>传统组</span>
            <strong>${escapeHtml(tree.name)}</strong>
          </div>
          <div>
            <span>议会议程</span>
            <strong>${escapeHtml(tree.agenda.name)}</strong>
          </div>
        </div>
        <section class="dialog-section">
          <h3>前置条件</h3>
          <ul class="requirement-list">${requirementsMarkup(tree, item, kind)}</ul>
        </section>
        <section class="dialog-section">
          <h3>${kind === "node" ? "项目效果" : typeLabel + "效果"}</h3>
          <div class="effect-groups">${effectGroupsMarkup(item.effectGroups)}</div>
        </section>
        <p class="dialog-code">脚本键：${escapeHtml(item.id)}</p>
      </div>
    `;

    dialog.style.setProperty("--dialog-accent", tree.accent);
    dialog.showModal();
    dialog.querySelector(".dialog-shell").scrollTop = 0;
    closeButton.focus({ preventScroll: true });
  };

  treeList.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-tree-id][data-item-id]");
    if (!trigger) {
      return;
    }

    const tree = treeById.get(trigger.dataset.treeId);
    const item = itemByTreeAndId.get(`${trigger.dataset.treeId}:${trigger.dataset.itemId}`);
    if (tree && item) {
      openDetail(tree, item, trigger.dataset.itemKind, trigger);
    }
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    lastTrigger?.focus({ preventScroll: true });
  });

  let resizeFrame = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(drawAllEdges);
  });

  updateStats();
  renderTreeIndex();
  renderTrees();
  renderAgendas();
  requestAnimationFrame(drawAllEdges);
})();
