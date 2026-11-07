(function () {
  "use strict";

  const configNode = document.getElementById("page-config");
  const root = document.getElementById("prototype-root");
  const config = JSON.parse(configNode.textContent);
  const state = { rows: (config.rows || []).slice(), visibleColumns: (config.columns || []).map((_, i) => i), selected: new Set(), mode: "normal" };

  const escapeHtml = (value) => String(value == null ? "" : value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const menus = {
    "流程表单": ["流程管理", "表单管理", "审核管理"],
    "事项管理": ["事项管理列表"],
    "经费管理": ["经费概览"],
    "单位内部管理": ["内设部门管理", "单位成员管理", "用户组管理", "岗位管理"],
    "消息公告": ["文章管理", "公告管理", "消息模板", "消息配置"],
    "权限管理": ["单位管理", "角色管理", "功能组管理", "单位组织关系管理"],
    "配置中心": ["字典配置", "参数配置", "文件管理", "职称关联", "单位关联", "职称字典", "人员类型", "职称评价管理"],
    "审计日志": ["登录日志", "操作日志"],
    "系统管理": ["菜单管理"]
  };
  const descriptions = {
    "事项管理列表": "维护业务事项与流程绑定、启停状态和生效时间。",
    "流程管理": "维护流程模型、版本、发布状态和运行状态。",
    "表单管理": "维护动态或预设表单、表单版本、权限和启用状态。",
    "审核管理": "查看待我审批任务并进入审批工作台处理材料。",
    "经费概览": "汇总年度经费指标并维护经费计划、申请、审批、支出和报销数据。",
    "单位成员管理": "维护单位成员账号、联系方式、所属组织及账号状态。",
    "用户组管理": "维护树形用户组及成员分配关系。",
    "岗位管理": "按组织维护岗位、上下级岗位、负责人标识及任职用户。",
    "单位管理": "维护单位基础信息、状态、功能组和单位类型。",
    "角色管理": "维护角色编码与描述，并配置角色菜单权限。",
    "功能组管理": "维护可供单位选择的功能模板。",
    "单位组织关系管理": "维护单位之间的多层级组织关系及关系状态。"
  };

  function renderMenu() {
    const order = ["流程表单", "事项管理", "经费管理", "单位内部管理", "消息公告", "权限管理", "配置中心", "审计日志", "系统管理"];
    const parts = [`<a class="mg-menu-item" href="#">系统首页</a>`];
    order.forEach((group) => {
      const current = group === config.group;
      parts.push(`<div class="mg-menu-group ${current ? "current" : ""}"><button class="mg-menu-item mg-menu-parent" type="button"><span>${escapeHtml(group)}</span><span>${current ? "⌃" : "⌄"}</span></button>${current ? `<div class="mg-submenu">${menus[group].map((x) => `<a class="mg-menu-item ${x === config.title ? "active" : ""}" href="#main-content">${escapeHtml(x)}</a>`).join("")}</div>` : ""}</div>`);
    });
    parts.push(`<a class="mg-menu-item" href="#">运维管理</a>`);
    return parts.join("");
  }

  function renderMetrics() {
    if (!config.metrics || !config.metrics.length) return "";
    return `<section class="mg-metrics">${config.metrics.map((item) => `<article class="mg-metric"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong><small>${escapeHtml(item.note || "")}</small></article>`).join("")}</section>`;
  }

  function renderTabs() {
    if (!config.tabs || !config.tabs.length) return "";
    return `<div class="mg-tabs" role="tablist">${config.tabs.map((item, index) => `<button type="button" role="tab" class="${index === 0 ? "active" : ""}" data-tab="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join("")}</div>`;
  }

  function renderFilter(field, index) {
    const id = `filter-${index}`;
    if (field.type === "select") return `<div class="mg-field"><label for="${id}">${escapeHtml(field.label)}</label><select class="mg-select" id="${id}" data-filter><option value="">${escapeHtml(field.placeholder || "全部")}</option>${(field.options || []).map((x) => `<option>${escapeHtml(x)}</option>`).join("")}</select></div>`;
    if (field.type === "switch") return `<div class="mg-field"><label>${escapeHtml(field.label)}</label><label class="mg-switch"><input id="${id}" type="checkbox" data-filter ${field.checked ? "checked" : ""}> <span>${escapeHtml(field.onText || "启用")}</span></label></div>`;
    return `<div class="mg-field"><label for="${id}">${escapeHtml(field.label)}</label><input class="mg-input" id="${id}" type="search" data-filter placeholder="${escapeHtml(field.placeholder || "请输入" )}"></div>`;
  }

  function renderTree() {
    if (!config.tree) return "";
    return `<aside class="mg-card mg-tree-card"><div class="mg-card-head"><div class="mg-card-title">${escapeHtml(config.tree.title)}</div></div><div class="mg-card-body"><input class="mg-input mg-tree-search" placeholder="搜索组织"><div class="mg-tree">${config.tree.nodes.map((n, i) => `<button type="button" class="${i === 0 ? "active" : ""} level-${n.level || 0}" data-tree="${escapeHtml(n.name)}"><span class="mg-tree-caret">${n.hasChildren ? "▾" : "·"}</span><span>${escapeHtml(n.name)}</span></button>`).join("")}</div></div></aside>`;
  }

  function renderShell() {
    const primary = config.primaryAction === false ? "" : `<button class="mg-btn primary" type="button" data-action="add">＋ ${escapeHtml(config.primaryAction || "新增")}</button>`;
    const extras = (config.toolbarActions || []).map((x) => `<button class="mg-btn" type="button" data-toolbar-action="${escapeHtml(x)}">${escapeHtml(x)}</button>`).join("");
    root.innerHTML = `<div class="mg-app"><header class="mg-header"><div class="mg-brand"><span class="mg-mark">政</span><span><strong>某政务项目服务平台</strong><small>政务事项协同管理示例</small></span></div><div class="mg-header-actions"><button class="mg-header-btn" type="button">消息通知 <span class="mg-notice">1</span></button><button class="mg-header-btn" type="button">管理员　⌄</button></div></header><div class="mg-body"><aside class="mg-sidebar"><nav class="mg-menu">${renderMenu()}</nav></aside><main class="mg-main" id="main-content"><div class="mg-breadcrumb">${escapeHtml(config.group)} / ${escapeHtml(config.title)}</div><div class="mg-title-row"><div><h1>${escapeHtml(config.title)}</h1><p>${escapeHtml(config.description || descriptions[config.title])} 当前为脱敏反向补档示例，示例数据不作为正式业务字典。</p></div><select class="mg-select mg-state-select" id="demo-state" aria-label="原型状态"><option value="normal">正常数据</option><option value="loading">加载中</option><option value="empty">无数据</option><option value="no-result">查询无结果</option><option value="error">接口异常</option><option value="no-permission">权限不足</option></select></div>${renderMetrics()}<div class="mg-workspace ${config.tree ? "with-tree" : ""}">${renderTree()}<div class="mg-content-column">${renderTabs()}<section class="mg-card"><div class="mg-card-head"><div class="mg-card-title">数据筛选</div><button class="mg-btn text" type="button" data-action="collapse-filter">收起筛选</button></div><div class="mg-card-body" id="filter-body"><form class="mg-search-grid" id="search-form">${(config.filters || []).map(renderFilter).join("")}<div class="mg-search-actions"><button class="mg-btn" type="reset">重置</button><button class="mg-btn primary" type="submit">查询</button></div></form></div></section><section class="mg-card"><div class="mg-card-head"><div class="mg-card-title">${escapeHtml(config.listTitle || "数据列表")}</div><div class="mg-toolbar"><div class="mg-actions">${primary}${extras}${config.batchDelete ? `<button class="mg-btn danger" type="button" data-action="batch-delete" disabled>批量删除</button>` : ""}</div><div class="mg-tools"><button class="mg-icon-btn" type="button" data-action="columns" title="表格列配置">列</button><button class="mg-icon-btn" type="button" data-action="refresh" title="刷新列表">↻</button></div></div></div><div class="mg-card-body"><div id="table-region"></div></div></section></div></div></main></div><div class="mg-overlay" id="modal-overlay" aria-hidden="true"><div class="mg-modal" role="dialog" aria-modal="true"><div class="mg-modal-head"><h2 id="modal-title"></h2><button class="mg-close" type="button" data-action="close-modal" aria-label="关闭">×</button></div><div class="mg-modal-body" id="modal-body"></div><div class="mg-modal-foot" id="modal-foot"></div></div></div><div class="mg-toast" id="toast"></div></div>`;
    const pageDescription = root.querySelector(".mg-title-row p");
    if (pageDescription) pageDescription.textContent = config.description || descriptions[config.title] || "";
    const pageStateSelect = root.querySelector("#demo-state");
    if (pageStateSelect) pageStateSelect.setAttribute("aria-label", "页面状态");
  }

  function cellValue(row, col) {
    const value = row[col.key];
    if (value === "启用" || value === "正常" || value === "是") return `<span class="mg-tag">${escapeHtml(value)}</span>`;
    if (value === "停用" || value === "禁用") return `<span class="mg-tag off">${escapeHtml(value)}</span>`;
    if (col.code) return `<span class="mg-code">${escapeHtml(value || "—")}</span>`;
    if (col.tree) return `<span class="mg-tree-indent ${row.level ? "child" : ""}">${row.hasChildren ? "▾" : ""} ${escapeHtml(value || "—")}</span>`;
    return value === "" || value == null ? `<span class="mg-empty-cell">—</span>` : escapeHtml(value);
  }

  function stateView(type) {
    const map = {
      loading: ["", "数据加载中", "正在获取最新数据，请稍候。"],
      empty: ["空", "暂无数据", "当前范围内没有可展示的数据。"],
      "no-result": ["0", "未找到匹配结果", "请调整筛选条件后重新查询。"],
      error: ["!", "数据加载失败", "请检查网络后重新加载。"],
      "no-permission": ["锁", "暂无访问权限", "请联系管理员开通页面或数据权限。"]
    };
    const item = map[type];
    return `<div class="mg-state show">${type === "loading" ? '<div class="mg-spinner"></div>' : `<div class="mg-state-symbol">${item[0]}</div>`}<div><strong>${item[1]}</strong><span>${item[2]}</span>${type === "error" ? '<div style="margin-top:12px"><button class="mg-btn" data-action="refresh">重新加载</button></div>' : ""}</div></div>`;
  }

  function renderTable() {
    const region = document.getElementById("table-region");
    if (state.mode !== "normal") { region.innerHTML = stateView(state.mode); return; }
    const columns = config.columns.filter((_, i) => state.visibleColumns.includes(i));
    const selector = config.batchDelete ? `<th style="width:44px"><input type="checkbox" aria-label="选择所有行" data-select-all></th>` : "";
    const rows = state.rows.map((row, rowIndex) => `<tr>${config.batchDelete ? `<td><input type="checkbox" aria-label="选择当前行" data-select-row="${rowIndex}" ${state.selected.has(rowIndex) ? "checked" : ""}></td>` : ""}${columns.map((col) => `<td>${cellValue(row, col)}</td>`).join("")}<td><div class="mg-actions">${config.rowActions.map((action) => `<button class="mg-btn text ${action === "删除" ? "danger" : ""}" type="button" data-row-action="${escapeHtml(action)}" data-row="${rowIndex}">${escapeHtml(action)}</button>`).join("")}</div></td></tr>`).join("");
    region.innerHTML = `<div class="mg-table-wrap"><table class="mg-table"><thead><tr>${selector}${columns.map((col) => `<th>${escapeHtml(col.label)}</th>`).join("")}<th>操作</th></tr></thead><tbody>${rows || `<tr><td colspan="${columns.length + 2}">${stateView("empty")}</td></tr>`}</tbody></table></div>${config.pagination === false ? "" : `<div class="mg-table-foot"><span>共 ${escapeHtml(config.total || state.rows.length)} 条</span><div class="mg-pagination"><button class="mg-page" disabled>‹</button><button class="mg-page active">1</button>${(config.pages || 1) > 1 ? '<button class="mg-page">2</button>' : ""}<button class="mg-page">›</button><select class="mg-select" style="width:auto"><option>10条/页</option><option>20条/页</option></select></div></div>`}`;
    syncBatchButton();
  }

  function fieldControl(field, index) {
    const id = `form-field-${index}`;
    const label = `<label for="${id}" class="${field.required ? "mg-required" : ""}">${escapeHtml(field.label)}</label>`;
    let control;
    if (field.type === "textarea") control = `<textarea class="mg-textarea" id="${id}" placeholder="${escapeHtml(field.placeholder || "请输入")}">${escapeHtml(field.value || "")}</textarea>`;
    else if (field.type === "select") control = `<select class="mg-select" id="${id}"><option>${escapeHtml(field.placeholder || "请选择")}</option>${(field.options || []).map((x) => `<option>${escapeHtml(x)}</option>`).join("")}</select>`;
    else if (field.type === "radio") control = `<div class="mg-inline" style="gap:16px;min-height:34px">${(field.options || []).map((x, i) => `<label><input type="radio" name="${id}" ${i === 0 ? "checked" : ""}> ${escapeHtml(x)}</label>`).join("")}</div>`;
    else control = `<input class="mg-input" id="${id}" type="${field.type === "number" ? "number" : "text"}" value="${escapeHtml(field.value || "")}" placeholder="${escapeHtml(field.placeholder || "请输入")}">`;
    return `<div class="mg-field ${field.full ? "full" : ""}">${label}${control}${field.help ? `<div class="mg-help">${escapeHtml(field.help)}</div>` : ""}</div>`;
  }

  function openModal(title, body, options) {
    const overlay = document.getElementById("modal-overlay");
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-body").innerHTML = body;
    document.getElementById("modal-foot").innerHTML = options && options.confirm === false ? `<button class="mg-btn" data-action="close-modal">关闭</button>` : `<button class="mg-btn" data-action="close-modal">取消</button><button class="mg-btn primary" data-action="confirm-modal">确定</button>`;
    overlay.querySelector(".mg-modal").classList.toggle("wide", Boolean(options && options.wide));
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
  }

  function openForm(mode, rowIndex, action) {
    const row = typeof rowIndex === "number" ? state.rows[rowIndex] : null;
    const fields = (config.formFields || []).map((f) => Object.assign({}, f, { value: row && row[f.key] != null ? row[f.key] : (f.value || "") }));
    const title = action === "子用户组" ? "新增子用户组" : action === "下级关系" ? "新增下级关系" : `${mode === "edit" ? "编辑" : "新增"}${config.entity}`;
    const prefix = action === "子用户组" || action === "下级关系" ? `<div class="mg-help" style="margin-bottom:14px">当前上级：${escapeHtml(row ? row[config.columns[0].key] : "根节点")}</div>` : "";
    openModal(title, `${prefix}<div class="mg-form-grid">${fields.map(fieldControl).join("")}</div>`);
  }

  function openLookup(title) {
    const users = [
      ["demo-user-a", "示例用户甲", "示例单位甲"],
      ["demo-user-b", "示例用户乙", "示例单位乙"],
      ["demo-user-c", "示例用户丙", "示例单位丙"]
    ];
    openModal(title, `<div class="mg-inline" style="gap:8px;margin-bottom:12px"><input class="mg-input" placeholder="输入账号或姓名"><button class="mg-btn primary">查询</button></div><div class="mg-table-wrap"><table class="mg-table"><thead><tr><th>选择</th><th>登录账号</th><th>用户姓名</th><th>系统组织</th></tr></thead><tbody>${users.map((x) => `<tr><td><input type="checkbox"></td><td>${x[0]}</td><td>${x[1]}</td><td>${x[2]}</td></tr>`).join("")}</tbody></table></div>`, { wide: true });
  }

  function openPermission() {
    const items = ["系统首页", "流程表单", "事项管理", "经费管理", "单位内部管理", "权限管理", "配置中心", "审计日志", "系统管理", "运维管理"];
    openModal("授权菜单", `<p class="mg-help" style="margin-top:0">勾选角色可访问的菜单；正式权限继承、半选和数据范围规则需评审确认。</p><div class="mg-permission-grid">${items.map((x, i) => `<label class="mg-permission-item"><input type="checkbox" ${i < 6 ? "checked" : ""}> ${x}</label>`).join("")}</div>`);
  }

  function openColumns() {
    openModal("调整表格列", `<p class="mg-help" style="margin-top:0">勾选决定显示或隐藏表格项。操作列固定显示。</p><div class="mg-permission-grid">${config.columns.map((col, i) => `<label class="mg-permission-item"><input type="checkbox" data-column="${i}" ${state.visibleColumns.includes(i) ? "checked" : ""}> ${escapeHtml(col.label)}</label>`).join("")}</div>`);
  }

  function closeModal() {
    const overlay = document.getElementById("modal-overlay");
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  }

  function toast(message) {
    const node = document.getElementById("toast");
    node.textContent = message;
    node.classList.add("show");
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(() => node.classList.remove("show"), 1700);
  }

  function syncBatchButton() {
    const button = document.querySelector('[data-action="batch-delete"]');
    if (button) button.disabled = state.selected.size === 0;
  }

  renderShell();
  if (config.hideFilter) document.getElementById("filter-body").closest(".mg-card").remove();
  renderTable();

  document.addEventListener("submit", (event) => {
    if (event.target.id !== "search-form") return;
    event.preventDefault();
    const terms = Array.from(event.target.querySelectorAll("input[data-filter],select[data-filter]")).map((x) => x.value.trim().toLowerCase()).filter(Boolean);
    state.rows = !terms.length ? config.rows.slice() : config.rows.filter((row) => terms.every((term) => Object.values(row).some((value) => String(value).toLowerCase().includes(term))));
    state.mode = state.rows.length ? "normal" : "no-result";
    state.selected.clear();
    renderTable();
    toast(state.rows.length ? `查询完成，共 ${state.rows.length} 条` : "未找到匹配数据");
  });

  document.addEventListener("reset", (event) => {
    if (event.target.id !== "search-form") return;
    window.setTimeout(() => { state.rows = config.rows.slice(); state.mode = "normal"; state.selected.clear(); renderTable(); toast("筛选条件已重置"); }, 0);
  });

  document.addEventListener("change", (event) => {
    if (event.target.id === "demo-state") { state.mode = event.target.value; renderTable(); return; }
    if (event.target.matches("[data-select-all]")) {
      state.selected.clear();
      if (event.target.checked) state.rows.forEach((_, i) => state.selected.add(i));
      renderTable();
    }
    if (event.target.matches("[data-select-row]")) {
      const index = Number(event.target.dataset.selectRow);
      event.target.checked ? state.selected.add(index) : state.selected.delete(index);
      syncBatchButton();
    }
    if (event.target.matches("[data-column]")) {
      const index = Number(event.target.dataset.column);
      if (event.target.checked && !state.visibleColumns.includes(index)) state.visibleColumns.push(index);
      if (!event.target.checked) state.visibleColumns = state.visibleColumns.filter((x) => x !== index);
      state.visibleColumns.sort((a, b) => a - b);
    }
  });

  document.addEventListener("click", (event) => {
    const tabNode = event.target.closest("[data-tab]");
    if (tabNode) {
      document.querySelectorAll("[data-tab]").forEach((x) => x.classList.remove("active"));
      tabNode.classList.add("active");
      toast(`已切换至：${tabNode.dataset.tab}`);
      return;
    }
    const toolbarNode = event.target.closest("[data-toolbar-action]");
    if (toolbarNode) {
      openModal(toolbarNode.dataset.toolbarAction, `<p class="mg-help">${escapeHtml(toolbarNode.dataset.toolbarAction)}流程演示，不写入真实数据。</p>`, { confirm: false });
      return;
    }
    const actionNode = event.target.closest("[data-action]");
    if (actionNode) {
      const action = actionNode.dataset.action;
      if (action === "add") openForm("add");
      if (action === "columns") openColumns();
      if (action === "close-modal") closeModal();
      if (action === "confirm-modal") { closeModal(); renderTable(); toast("操作已完成"); }
      if (action === "collapse-filter") { const body = document.getElementById("filter-body"); const hidden = body.hidden; body.hidden = !hidden; actionNode.textContent = hidden ? "收起筛选" : "展开筛选"; }
      if (action === "refresh") { state.mode = "loading"; renderTable(); window.setTimeout(() => { state.mode = "normal"; state.rows = config.rows.slice(); renderTable(); toast("列表已刷新"); }, 650); }
      if (action === "batch-delete") openModal("批量删除确认", `<div class="mg-confirm"><strong>确定删除已选择的 ${state.selected.size} 条记录吗？</strong><p>删除后不可恢复，请谨慎操作。</p></div>`);
      return;
    }
    const rowAction = event.target.closest("[data-row-action]");
    if (rowAction) {
      const action = rowAction.dataset.rowAction;
      const index = Number(rowAction.dataset.row);
      const rowName = state.rows[index][config.columns[0].key];
      if (action === "编辑") openForm("edit", index);
      else if (action === "删除") openModal("删除确认", `<div class="mg-confirm"><strong>确定删除“${escapeHtml(rowName)}”吗？</strong><p>删除约束及引用校验以正式接口规则为准。</p></div>`);
      else if (action === "分配用户") openLookup(`分配用户 · ${rowName}`);
      else if (action === "查看用户") openLookup(`岗位用户 · ${rowName}`);
      else if (action === "授权菜单") openPermission();
      else if (action === "更多操作") openModal(`更多操作 · ${rowName}`, `<div class="mg-actions"><button class="mg-btn">重置密码</button><button class="mg-btn">分配角色</button><button class="mg-btn">分配岗位</button></div><p class="mg-help">具体可用操作及权限边界需评审确认。</p>`, { confirm: false });
      else if (action === "子用户组" || action === "下级关系") openForm("add", index, action);
      else openModal(`${action} · ${rowName}`, `<p class="mg-help">已进入“${escapeHtml(action)}”操作演示。真实业务提交、状态变更和权限校验由正式接口处理。</p>`, { confirm: false });
      return;
    }
    const treeNode = event.target.closest("[data-tree]");
    if (treeNode) { document.querySelectorAll("[data-tree]").forEach((x) => x.classList.remove("active")); treeNode.classList.add("active"); toast(`已选择：${treeNode.dataset.tree}`); }
  });
})();
