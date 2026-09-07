const header = document.querySelector("[data-header]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 36);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal-on-scroll").forEach((element) => {
  observer.observe(element);
});

const evolutionData = {
  before: {
    image: "./assets/legacy-budget.jpg",
    alt: "早期 AI 预算助手原型",
    label: "早期原型 · AI 预算助手",
    title: "先验证“对话驱动工作台”是否成立",
    text: "用三栏结构连接任务入口、AI 对话与分析报告，验证自然语言修改预算后数据联动的核心体验。",
    points: [
      "优势：交互直接，能快速验证 AI 与业务操作联动。",
      "问题：模块持续增加后，长报告和多角色入口开始互相挤压。",
      "下一步：从页面级功能堆叠，转向任务级信息架构。"
    ]
  },
  after: {
    image: "./assets/target-setup.jpg",
    alt: "当前大促目标 AI 助手工作区",
    label: "当前方案 · 大促目标 AI 助手",
    title: "把 AI 能力嵌入可理解的任务流程",
    text: "将复杂任务拆为信息、基线、大盘与行业模块，并把 Knowledge、Skill、完整度和校验状态放到决策现场。",
    points: [
      "结构：侧边任务树承载稳定心智，减少功能入口竞争。",
      "反馈：步骤状态、缺失项和下游影响持续可见。",
      "控制：编辑、生成、确认、发布分层，保留人工决策权。"
    ]
  }
};

const evolutionButtons = document.querySelectorAll("[data-evolution]");
const evolutionImage = document.querySelector("[data-evolution-image]");
const evolutionLabel = document.querySelector("[data-evolution-label]");
const evolutionTitle = document.querySelector("[data-evolution-title]");
const evolutionText = document.querySelector("[data-evolution-text]");
const evolutionPoints = document.querySelector("[data-evolution-points]");

evolutionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.evolution;
    const state = evolutionData[key];
    if (!state) return;

    evolutionButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    evolutionImage.src = state.image;
    evolutionImage.alt = state.alt;
    evolutionLabel.textContent = state.label;
    evolutionTitle.textContent = state.title;
    evolutionText.textContent = state.text;
    evolutionPoints.replaceChildren(
      ...state.points.map((point) => {
        const item = document.createElement("li");
        item.textContent = point;
        return item;
      })
    );
  });
});

const lightbox = document.querySelector("[data-lightbox-dialog]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    const image = button.querySelector("img");
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = image?.alt || "产品界面截图";
    lightbox.showModal();
    document.body.classList.add("is-locked");
  });
});

const closeLightbox = () => {
  if (!lightbox?.open) return;
  lightbox.close();
  document.body.classList.remove("is-locked");
};

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox?.addEventListener("close", () => {
  document.body.classList.remove("is-locked");
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

window.addEventListener("DOMContentLoaded", () => {
  window.lucide?.createIcons();
});
