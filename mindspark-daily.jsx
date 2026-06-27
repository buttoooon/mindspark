import { useState, useEffect } from "react";

const LANGS = {
  uk: {
    appName: "MindSpark Daily",
    tagline: "Щоденна доза натхнення",
    heroTitle: "Живи цікавіше",
    heroSub: "Перевірені наукові факти, мудрість і відкриття великих мислителів.",
    generate: "Згенерувати інсайт",
    generating: "Генерую…",
    allCats: "Усі",
    saved: "Збережені",
    signIn: "Увійти",
    signUp: "Реєстрація",
    signOut: "Вийти",
    saveCard: "Зберегти",
    unsaveCard: "Вилучити",
    readMore: "Читати далі",
    showLess: "Сховати",
    newBadge: "Нове",
    noCards: "Немає карток. Згенеруй першу вище.",
    noSaved: "Немає збережених. Натисни закладку на будь-якій картці.",
    loginTitle: "Ласкаво просимо",
    loginSub: "Увійдіть у свій акаунт MindSpark",
    registerTitle: "Створити акаунт",
    registerSub: "Приєднуйся до MindSpark Daily",
    forgotTitle: "Відновлення паролю",
    name: "Ім'я",
    email: "Електронна пошта",
    password: "Пароль",
    confirmPassword: "Підтвердіть пароль",
    forgotPass: "Забули пароль?",
    noAccount: "Немає акаунту?",
    haveAccount: "Вже є акаунт?",
    sendReset: "Надіслати посилання",
    resetSent: "Якщо цей email зареєстровано, посилання надіслано.",
    backToLogin: "Повернутись до входу",
    memberSince: "Учасник з",
    updateName: "Оновити ім'я",
    saveName: "Зберегти ім'я",
    profileTabs: { info: "Інфо", stats: "Статистика", settings: "Налаштування" },
    statsLabels: ["Усього інсайтів", "Збережено", "Вподобано", "Категорій"],
    toastSaved: "Збережено!",
    toastUnsaved: "Вилучено зі збережених",
    toastSignIn: "Увійдіть, щоб зберігати",
    toastNameUpdated: "Ім'я оновлено",
    toastGenerated: "Новий інсайт готовий!",
    toastError: "Помилка генерації — спробуй ще раз",
    toastWelcomeBack: (name) => `З поверненням, ${name}!`,
    toastWelcome: (name) => `Ласкаво просимо, ${name}!`,
    toastSignedOut: "Ви вийшли з акаунту",
    errName: "Введіть ім'я",
    errEmail: "Введіть дійсний email",
    errPassword: "Пароль — мінімум 6 символів",
    errMatch: "Паролі не збігаються",
    errExists: "Акаунт із таким email вже існує",
    errLogin: "Невірний email або пароль",
    sources: "Джерела",
    verifiedFact: "Перевірений факт",
    quote: "Цитата",
  },
  en: {
    appName: "MindSpark Daily",
    tagline: "Daily dose of inspiration",
    heroTitle: "Feed your curiosity",
    heroSub: "Verified scientific facts, wisdom and discoveries from history's greatest thinkers.",
    generate: "Generate insight",
    generating: "Generating…",
    allCats: "All",
    saved: "Saved",
    signIn: "Sign in",
    signUp: "Sign up",
    signOut: "Sign out",
    saveCard: "Save",
    unsaveCard: "Unsave",
    readMore: "Read more",
    showLess: "Show less",
    newBadge: "New",
    noCards: "No cards yet. Generate one above.",
    noSaved: "No saved insights. Tap the bookmark on any card.",
    loginTitle: "Welcome back",
    loginSub: "Sign in to your MindSpark account",
    registerTitle: "Create account",
    registerSub: "Join MindSpark Daily",
    forgotTitle: "Reset your password",
    name: "Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    forgotPass: "Forgot password?",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    sendReset: "Send reset link",
    resetSent: "If that email is registered, a reset link has been sent.",
    backToLogin: "Back to sign in",
    memberSince: "Member since",
    updateName: "Update name",
    saveName: "Save name",
    profileTabs: { info: "Info", stats: "Stats", settings: "Settings" },
    statsLabels: ["Total insights", "Saved", "Liked", "Categories"],
    toastSaved: "Saved!",
    toastUnsaved: "Removed from saved",
    toastSignIn: "Sign in to save cards",
    toastNameUpdated: "Name updated",
    toastGenerated: "New insight ready!",
    toastError: "Couldn't generate — try again",
    toastWelcomeBack: (name) => `Welcome back, ${name}!`,
    toastWelcome: (name) => `Welcome to MindSpark, ${name}!`,
    toastSignedOut: "Signed out",
    errName: "Enter your name",
    errEmail: "Enter a valid email",
    errPassword: "Password must be at least 6 characters",
    errMatch: "Passwords don't match",
    errExists: "An account with this email already exists",
    errLogin: "Email or password is incorrect",
    sources: "Sources",
    verifiedFact: "Verified fact",
    quote: "Quote",
  },
};

const CATEGORIES = {
  uk: [
    { id: "science", label: "Наука", icon: "ti-microscope", color: "#185FA5", bg: "#E6F1FB" },
    { id: "art", label: "Мистецтво", icon: "ti-palette", color: "#993556", bg: "#FBEAF0" },
    { id: "history", label: "Історія", icon: "ti-hourglass", color: "#854F0B", bg: "#FAEEDA" },
    { id: "philosophy", label: "Філософія", icon: "ti-brain", color: "#534AB7", bg: "#EEEDFE" },
    { id: "nature", label: "Природа", icon: "ti-leaf", color: "#3B6D11", bg: "#EAF3DE" },
  ],
  en: [
    { id: "science", label: "Science", icon: "ti-microscope", color: "#185FA5", bg: "#E6F1FB" },
    { id: "art", label: "Art & Culture", icon: "ti-palette", color: "#993556", bg: "#FBEAF0" },
    { id: "history", label: "History", icon: "ti-hourglass", color: "#854F0B", bg: "#FAEEDA" },
    { id: "philosophy", label: "Philosophy", icon: "ti-brain", color: "#534AB7", bg: "#EEEDFE" },
    { id: "nature", label: "Nature", icon: "ti-leaf", color: "#3B6D11", bg: "#EAF3DE" },
  ],
};

const DEMO_CARDS = {
  uk: [
    {
      id: "demo1", category: "science", type: "fact",
      title: "Квантова заплутаність",
      content: "Коли два квантові частинки стають заплутаними, вимірювання однієї миттєво впливає на стан іншої — незалежно від відстані між ними. Цей ефект, підтверджений експериментами Аспе (1982) та нобелівськими лауреатами 2022 року, лежить в основі квантових комп'ютерів та квантової криптографії.",
      author: "Джон Белл / Ален Аспе", year: "1964 / 1982",
      sources: [
        { label: "Bell, J.S. (1964). Physics, 1, 195–200", url: "https://cds.cern.ch/record/111654/files/vol1p195-200_001.pdf" },
        { label: "Aspect et al. (1982). Phys. Rev. Lett.", url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.49.91" },
      ],
      saved: false, liked: false,
    },
    {
      id: "demo2", category: "art", type: "fact",
      title: "Золотий перетин у мистецтві",
      content: "Леонардо да Вінчі застосував золотий перетин (φ ≈ 1.618) у пропорціях обличчя та рук Мони Лізи. Це математичне співвідношення зустрічається в спіралях молюсків, фіботначному розташуванні насіння соняшника та архітектурі Парфенону.",
      author: "Леонардо да Вінчі", year: "1503–1519",
      sources: [
        { label: "Livio, M. (2002). The Golden Ratio. Broadway Books.", url: "https://www.worldcat.org/title/golden-ratio/oclc/49699034" },
      ],
      saved: false, liked: false,
    },
    {
      id: "demo3", category: "nature", type: "fact",
      title: "Мікоризні мережі лісів",
      content: "Дерева у лісі обмінюються вуглецем, водою та поживними речовинами через підземні грибкові мережі — «лісовий інтернет». Дослідження Сюзанни Сімар (UBC, 1997) показало, що материнські дерева передають вуглець молодим саджанцям цілеспрямовано, підтримуючи зростання спорідненої рослинності.",
      author: "Suzanne Simard", year: "1997",
      sources: [
        { label: "Simard et al. (1997). Nature, 388, 579–582", url: "https://www.nature.com/articles/41557" },
      ],
      saved: false, liked: false,
    },
  ],
  en: [
    {
      id: "demo1", category: "science", type: "fact",
      title: "Quantum Entanglement",
      content: "When two quantum particles become entangled, measuring one instantly affects the state of the other — regardless of the distance between them. This effect, confirmed by Aspect's 1982 experiments and the 2022 Nobel laureates in Physics, underpins quantum computers and quantum cryptography.",
      author: "John Bell / Alain Aspect", year: "1964 / 1982",
      sources: [
        { label: "Bell, J.S. (1964). Physics, 1, 195–200", url: "https://cds.cern.ch/record/111654/files/vol1p195-200_001.pdf" },
        { label: "Aspect et al. (1982). Phys. Rev. Lett.", url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.49.91" },
      ],
      saved: false, liked: false,
    },
    {
      id: "demo2", category: "art", type: "fact",
      title: "The Golden Ratio in Art",
      content: "Leonardo da Vinci applied the golden ratio (φ ≈ 1.618) in the proportions of the Mona Lisa's face and hands. This mathematical ratio appears in mollusc spirals, the Fibonacci arrangement of sunflower seeds, and the architecture of the Parthenon.",
      author: "Leonardo da Vinci", year: "1503–1519",
      sources: [
        { label: "Livio, M. (2002). The Golden Ratio. Broadway Books.", url: "https://www.worldcat.org/title/golden-ratio/oclc/49699034" },
      ],
      saved: false, liked: false,
    },
    {
      id: "demo3", category: "nature", type: "fact",
      title: "Forest Mycorrhizal Networks",
      content: "Trees in a forest exchange carbon, water, and nutrients through underground fungal networks — the 'wood wide web'. Suzanne Simard's 1997 study (UBC) showed that mother trees deliberately transfer carbon to young seedlings, supporting the growth of related vegetation.",
      author: "Suzanne Simard", year: "1997",
      sources: [
        { label: "Simard et al. (1997). Nature, 388, 579–582", url: "https://www.nature.com/articles/41557" },
      ],
      saved: false, liked: false,
    },
  ],
};

function load(key, fb) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fb; } catch { return fb; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

async function callClaude(system, user) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  const data = await res.json();
  return data.content?.map(b => b.type === "text" ? b.text : "").join("") || "";
}

export default function App() {
  const [lang, setLang] = useState(() => load("ms_lang", "uk"));
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(() => load("ms_user", null));
  const [users, setUsers] = useState(() => load("ms_users", []));
  const [cards, setCards] = useState(() => load("ms_cards_v2", null));
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ email: "", password: "", name: "", confirmPassword: "" });
  const [authError, setAuthError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [profileTab, setProfileTab] = useState("info");
  const [editName, setEditName] = useState("");

  const t = LANGS[lang];
  const cats = CATEGORIES[lang];

  // Init cards per language
  useEffect(() => {
    const stored = load(`ms_cards_${lang}`, null);
    setCards(stored || DEMO_CARDS[lang]);
  }, [lang]);

  useEffect(() => { if (cards) save(`ms_cards_${lang}`, cards); }, [cards, lang]);
  useEffect(() => { save("ms_users", users); }, [users]);
  useEffect(() => { save("ms_user", user); }, [user]);
  useEffect(() => { save("ms_lang", lang); }, [lang]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const toggleSave = (id) => {
    if (!user) { showToast(t.toastSignIn, "error"); return; }
    const card = cards.find(c => c.id === id);
    setCards(prev => prev.map(c => c.id === id ? { ...c, saved: !c.saved } : c));
    showToast(card?.saved ? t.toastUnsaved : t.toastSaved);
  };

  const toggleLike = (id) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, liked: !c.liked } : c));
  };

  const generateCard = async (categoryId) => {
    const catList = CATEGORIES[lang];
    const cat = catList.find(c => c.id === categoryId) || catList[Math.floor(Math.random() * catList.length)];
    setLoading(true);
    try {
      const isUk = lang === "uk";
      const system = isUk
        ? `Ти куратор перевірених наукових знань. Знайди в інтернеті реальний, перевірений факт або відкриття з категорії, яку вказує користувач. Використай веб-пошук для пошуку надійних джерел (Wikipedia, наукові журнали, університети). Відповідай ТІЛЬКИ валідним JSON без markdown та лапок у кінці. Формат: {"title":"...","content":"...","author":"...","year":"...","type":"fact","sources":[{"label":"Коротка назва джерела","url":"https://..."}]}`
        : `You are a curator of verified scientific knowledge. Search the web for a real, verified fact or discovery in the given category. Use web search to find reliable sources (Wikipedia, scientific journals, universities). Respond ONLY with valid JSON, no markdown, no backticks. Format: {"title":"...","content":"...","author":"...","year":"...","type":"fact","sources":[{"label":"Short source name","url":"https://..."}]}`;

      const prompt = isUk
        ? `Знайди цікавий та перевірений науковий факт або відкриття з категорії "${cat.label}". Контент — 2–3 речення, інтелектуально стимулюючі. Посилайся на реальних вчених, митців або мислителів. Включи 1–2 реальних джерела з дійсними URL (Wikipedia, DOI, університетські сайти тощо). Пиши українською мовою.`
        : `Find an interesting, verified scientific fact or discovery from the category "${cat.label}". Content should be 2-3 intellectually stimulating sentences. Reference real scientists, artists, or thinkers. Include 1-2 real sources with valid URLs (Wikipedia, DOI, university sites, etc.).`;

      const raw = await callClaude(system, prompt);
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON");
      const parsed = JSON.parse(jsonMatch[0]);
      const newCard = {
        id: `card_${Date.now()}`,
        category: cat.id,
        title: parsed.title || "—",
        content: parsed.content || "—",
        author: parsed.author || "—",
        year: parsed.year || "",
        type: parsed.type || "fact",
        sources: Array.isArray(parsed.sources) ? parsed.sources.filter(s => s.label && s.url) : [],
        saved: false, liked: false, fresh: true,
      };
      setCards(prev => [newCard, ...(prev || [])]);
      showToast(t.toastGenerated);
    } catch {
      showToast(t.toastError, "error");
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    setAuthError("");
    const found = users.find(u => u.email === authForm.email && u.password === authForm.password);
    if (!found) { setAuthError(t.errLogin); return; }
    setUser(found); setPage("home"); showToast(t.toastWelcomeBack(found.name));
  };

  const register = () => {
    setAuthError("");
    if (!authForm.name.trim()) { setAuthError(t.errName); return; }
    if (!authForm.email.includes("@")) { setAuthError(t.errEmail); return; }
    if (authForm.password.length < 6) { setAuthError(t.errPassword); return; }
    if (authForm.password !== authForm.confirmPassword) { setAuthError(t.errMatch); return; }
    if (users.find(u => u.email === authForm.email)) { setAuthError(t.errExists); return; }
    const nu = { id: Date.now(), name: authForm.name.trim(), email: authForm.email, password: authForm.password, joined: new Date().toLocaleDateString(lang === "uk" ? "uk-UA" : "en-GB") };
    setUsers(prev => [...prev, nu]); setUser(nu); setPage("home"); showToast(t.toastWelcome(nu.name));
  };

  const logout = () => { setUser(null); setPage("home"); showToast(t.toastSignedOut); };

  const openAuth = (mode) => { setAuthMode(mode); setPage("auth"); setAuthError(""); setAuthForm({ email: "", password: "", name: "", confirmPassword: "" }); };

  const allCards = cards || [];
  const filtered = activeCategory === "all" ? allCards
    : activeCategory === "saved" ? allCards.filter(c => c.saved)
    : allCards.filter(c => c.category === activeCategory);

  const savedCount = allCards.filter(c => c.saved).length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-0)", fontFamily: "var(--font-sans)" }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />

      {toast && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          background: toast.type === "error" ? "var(--bg-danger)" : "var(--bg-success)",
          color: toast.type === "error" ? "var(--text-danger)" : "var(--text-success)",
          border: `0.5px solid ${toast.type === "error" ? "var(--border-danger)" : "var(--border-success)"}`,
          padding: "10px 20px", borderRadius: "var(--radius)", fontSize: 14,
          zIndex: 9999, fontWeight: 500, pointerEvents: "none",
        }}>{toast.msg}</div>
      )}

      {/* Header */}
      <header style={{
        background: "var(--surface-2)", borderBottom: "0.5px solid var(--border)",
        padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #185FA5, #534AB7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="ti ti-sparkles" style={{ color: "#fff", fontSize: 16 }} aria-hidden="true" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text-primary)", letterSpacing: "-0.3px" }}>{t.appName}</span>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Lang switcher */}
          <button onClick={() => setLang(l => l === "uk" ? "en" : "uk")} style={{
            background: "var(--surface-1)", border: "0.5px solid var(--border)", cursor: "pointer",
            padding: "5px 10px", borderRadius: "var(--radius)", fontSize: 13, fontWeight: 600,
            color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 5,
          }}>
            <i className="ti ti-language" style={{ fontSize: 14 }} aria-hidden="true" />
            {lang === "uk" ? "EN" : "УК"}
          </button>

          {user ? (
            <>
              <button onClick={() => setPage("saved")} style={{
                background: "none", border: "none", cursor: "pointer",
                color: page === "saved" ? "var(--text-accent)" : "var(--text-secondary)",
                fontSize: 14, fontWeight: 500, padding: "6px 10px", borderRadius: "var(--radius)",
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <i className="ti ti-bookmark" style={{ fontSize: 16 }} aria-hidden="true" />
                {savedCount > 0 && <span style={{ background: "var(--bg-accent)", color: "var(--text-accent)", borderRadius: 10, padding: "1px 6px", fontSize: 11 }}>{savedCount}</span>}
              </button>
              <button onClick={() => setPage("profile")} style={{
                width: 34, height: 34, borderRadius: "50%",
                background: page === "profile" ? "var(--bg-pro)" : "var(--bg-accent)",
                color: page === "profile" ? "var(--text-pro)" : "var(--text-accent)",
                border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
              }}>{user.name.charAt(0).toUpperCase()}</button>
            </>
          ) : (
            <>
              <button onClick={() => openAuth("login")} style={{ background: "none", border: "0.5px solid var(--border-strong)", cursor: "pointer", color: "var(--text-primary)", fontSize: 13, fontWeight: 500, padding: "7px 12px", borderRadius: "var(--radius)" }}>{t.signIn}</button>
              <button onClick={() => openAuth("register")} style={{ background: "var(--fill-accent)", border: "none", cursor: "pointer", color: "#fff", fontSize: 13, fontWeight: 500, padding: "7px 12px", borderRadius: "var(--radius)" }}>{t.signUp}</button>
            </>
          )}
        </div>
      </header>

      {/* HOME */}
      {page === "home" && (
        <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 10 }}>{t.tagline}</p>
            <h1 style={{ fontSize: 34, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 10px", letterSpacing: "-0.8px", lineHeight: 1.2 }}>{t.heroTitle}</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, margin: "0 0 24px", lineHeight: 1.6, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>{t.heroSub}</p>
            <button onClick={() => generateCard(activeCategory === "all" || activeCategory === "saved" ? null : activeCategory)}
              disabled={loading} style={{
                background: loading ? "var(--border)" : "linear-gradient(135deg, #185FA5, #534AB7)",
                color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
                padding: "12px 28px", borderRadius: 24, fontSize: 15, fontWeight: 700,
                display: "inline-flex", alignItems: "center", gap: 8, opacity: loading ? 0.7 : 1, transition: "opacity 0.2s",
              }}>
              <i className={`ti ${loading ? "ti-loader-2" : "ti-sparkles"}`} style={{ fontSize: 18, animation: loading ? "spin 0.9s linear infinite" : "none" }} aria-hidden="true" />
              {loading ? t.generating : t.generate}
            </button>
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28, justifyContent: "center" }}>
            {[{ id: "all", label: t.allCats, icon: "ti-layout-grid" }, ...cats].map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                padding: "7px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer",
                border: `0.5px solid ${activeCategory === cat.id ? "var(--border-accent)" : "var(--border)"}`,
                background: activeCategory === cat.id ? "var(--bg-accent)" : "var(--surface-2)",
                color: activeCategory === cat.id ? "var(--text-accent)" : "var(--text-secondary)",
                display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
              }}>
                <i className={`ti ${cat.icon || "ti-layout-grid"}`} style={{ fontSize: 14 }} aria-hidden="true" />
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
                <i className="ti ti-mood-empty" style={{ fontSize: 40, display: "block", marginBottom: 12 }} aria-hidden="true" />
                <p style={{ margin: 0 }}>{t.noCards}</p>
              </div>
            ) : filtered.map(card => (
              <CardItem key={card.id} card={card} onSave={toggleSave} onLike={toggleLike}
                catMeta={cats.find(c => c.id === card.category)} t={t} />
            ))}
          </div>
        </main>
      )}

      {/* SAVED */}
      {page === "saved" && (
        <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px" }}>
          <div style={{ marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.5px" }}>{t.saved}</h1>
              <p style={{ color: "var(--text-muted)", margin: 0, fontSize: 14 }}>{savedCount}</p>
            </div>
            <button onClick={() => setPage("home")} style={{ background: "none", border: "0.5px solid var(--border)", cursor: "pointer", padding: "7px 14px", borderRadius: "var(--radius)", fontSize: 13, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6 }}>
              <i className="ti ti-arrow-left" style={{ fontSize: 14 }} aria-hidden="true" />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {allCards.filter(c => c.saved).length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
                <i className="ti ti-bookmark-off" style={{ fontSize: 40, display: "block", marginBottom: 12 }} aria-hidden="true" />
                <p style={{ margin: 0 }}>{t.noSaved}</p>
              </div>
            ) : allCards.filter(c => c.saved).map(card => (
              <CardItem key={card.id} card={card} onSave={toggleSave} onLike={toggleLike}
                catMeta={cats.find(c => c.id === card.category)} t={t} />
            ))}
          </div>
        </main>
      )}

      {/* AUTH */}
      {page === "auth" && (
        <main style={{ maxWidth: 420, margin: "60px auto", padding: "0 20px" }}>
          <div style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 16, padding: 32 }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #185FA5, #534AB7)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <i className="ti ti-sparkles" style={{ color: "#fff", fontSize: 22 }} aria-hidden="true" />
              </div>
              <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700 }}>
                {authMode === "forgot" ? t.forgotTitle : authMode === "login" ? t.loginTitle : t.registerTitle}
              </h2>
              {authMode !== "forgot" && <p style={{ color: "var(--text-muted)", margin: 0, fontSize: 14 }}>{authMode === "login" ? t.loginSub : t.registerSub}</p>}
            </div>

            {authMode === "forgot" ? (
              resetSent ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <i className="ti ti-mail-check" style={{ fontSize: 40, color: "var(--text-success)", display: "block", marginBottom: 12 }} aria-hidden="true" />
                  <p style={{ color: "var(--text-secondary)", margin: "0 0 20px" }}>{t.resetSent}</p>
                  <button onClick={() => { setAuthMode("login"); setResetSent(false); }} style={{ background: "var(--fill-accent)", color: "#fff", border: "none", cursor: "pointer", padding: "10px 24px", borderRadius: "var(--radius)", fontWeight: 500, width: "100%" }}>{t.backToLogin}</button>
                </div>
              ) : (
                <div>
                  <Field label={t.email} type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="name@email.com" />
                  <button onClick={() => setResetSent(true)} style={btnPrimary}>{t.sendReset}</button>
                  <button onClick={() => setAuthMode("login")} style={btnGhost}>← {t.backToLogin}</button>
                </div>
              )
            ) : (
              <div>
                {authError && <div style={{ background: "var(--bg-danger)", border: "0.5px solid var(--border-danger)", color: "var(--text-danger)", padding: "10px 14px", borderRadius: "var(--radius)", fontSize: 13, marginBottom: 16 }}>{authError}</div>}
                {authMode === "register" && <Field label={t.name} type="text" value={authForm.name} onChange={e => setAuthForm(p => ({ ...p, name: e.target.value }))} placeholder={lang === "uk" ? "Ваше ім'я" : "Your name"} />}
                <Field label={t.email} type="email" value={authForm.email} onChange={e => setAuthForm(p => ({ ...p, email: e.target.value }))} placeholder="name@email.com" />
                <Field label={t.password} type="password" value={authForm.password} onChange={e => setAuthForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••"
                  onKeyDown={e => e.key === "Enter" && (authMode === "login" ? login() : null)} />
                {authMode === "login" && (
                  <button onClick={() => { setAuthMode("forgot"); setResetSent(false); setResetEmail(""); }} style={{ ...btnGhost, textAlign: "left", marginBottom: 16, color: "var(--text-accent)" }}>{t.forgotPass}</button>
                )}
                {authMode === "register" && (
                  <Field label={t.confirmPassword} type="password" value={authForm.confirmPassword} onChange={e => setAuthForm(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="••••••••"
                    onKeyDown={e => e.key === "Enter" && register()} />
                )}
                <div style={{ marginTop: authMode === "login" ? 0 : 8 }}>
                  <button onClick={authMode === "login" ? login : register} style={btnPrimary}>
                    {authMode === "login" ? t.signIn : t.signUp}
                  </button>
                </div>
                <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 13, marginTop: 18, marginBottom: 0 }}>
                  {authMode === "login" ? t.noAccount : t.haveAccount}{" "}
                  <button onClick={() => { setAuthMode(authMode === "login" ? "register" : "login"); setAuthError(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-accent)", fontWeight: 600, fontSize: 13, padding: 0 }}>
                    {authMode === "login" ? t.signUp : t.signIn}
                  </button>
                </p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* PROFILE */}
      {page === "profile" && user && (
        <main style={{ maxWidth: 600, margin: "0 auto", padding: "32px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--bg-pro)", color: "var(--text-pro)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24 }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700 }}>{user.name}</h1>
              <p style={{ color: "var(--text-muted)", margin: 0, fontSize: 13 }}>{t.memberSince} {user.joined}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 0, borderBottom: "0.5px solid var(--border)", marginBottom: 24 }}>
            {Object.entries(t.profileTabs).map(([key, label]) => (
              <button key={key} onClick={() => setProfileTab(key)} style={{
                background: "none", border: "none", cursor: "pointer", padding: "10px 18px", fontSize: 14, fontWeight: 500,
                color: profileTab === key ? "var(--text-accent)" : "var(--text-secondary)",
                borderBottom: `2px solid ${profileTab === key ? "var(--border-accent)" : "transparent"}`,
              }}>{label}</button>
            ))}
          </div>

          {profileTab === "info" && (
            <div style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 12, padding: 24 }}>
              {[
                { label: t.name, value: user.name, icon: "ti-user" },
                { label: t.email, value: user.email, icon: "ti-mail" },
                { label: t.memberSince, value: user.joined, icon: "ti-calendar" },
              ].map((row, i, arr) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, marginBottom: i < arr.length - 1 ? 16 : 0, borderBottom: i < arr.length - 1 ? "0.5px solid var(--border)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <i className={`ti ${row.icon}`} style={{ fontSize: 16, color: "var(--text-muted)" }} aria-hidden="true" />
                    <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{row.label}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>{row.value}</span>
                </div>
              ))}
            </div>
          )}

          {profileTab === "stats" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: t.statsLabels[0], value: allCards.length, icon: "ti-cards", bg: "var(--bg-accent)", tc: "var(--text-accent)" },
                { label: t.statsLabels[1], value: savedCount, icon: "ti-bookmark", bg: "var(--bg-pro)", tc: "var(--text-pro)" },
                { label: t.statsLabels[2], value: allCards.filter(c => c.liked).length, icon: "ti-heart", bg: "var(--bg-danger)", tc: "var(--text-danger)" },
                { label: t.statsLabels[3], value: new Set(allCards.map(c => c.category)).size, icon: "ti-category", bg: "var(--bg-success)", tc: "var(--text-success)" },
              ].map(s => (
                <div key={s.label} style={{ background: s.bg, border: "0.5px solid var(--border)", borderRadius: 12, padding: 20 }}>
                  <i className={`ti ${s.icon}`} style={{ fontSize: 22, color: s.tc, display: "block", marginBottom: 8 }} aria-hidden="true" />
                  <div style={{ fontSize: 28, fontWeight: 800, color: s.tc, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: s.tc, marginTop: 4, opacity: 0.8 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {profileTab === "settings" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 12, padding: 20 }}>
                <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600 }}>{t.updateName}</h3>
                <input value={editName || user.name} onChange={e => setEditName(e.target.value)}
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: "var(--radius)", border: "0.5px solid var(--border)", fontSize: 14, background: "var(--surface-1)", color: "var(--text-primary)", marginBottom: 12 }} />
                <button onClick={() => { if (editName.trim()) { const u2 = { ...user, name: editName.trim() }; setUser(u2); setUsers(prev => prev.map(u => u.id === user.id ? u2 : u)); showToast(t.toastNameUpdated); } }} style={btnPrimary}>{t.saveName}</button>
              </div>
              <button onClick={logout} style={{ background: "var(--bg-danger)", border: "0.5px solid var(--border-danger)", color: "var(--text-danger)", cursor: "pointer", padding: "12px 20px", borderRadius: 12, fontWeight: 500, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <i className="ti ti-logout" style={{ fontSize: 16 }} aria-hidden="true" />
                {t.signOut}
              </button>
            </div>
          )}
        </main>
      )}

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .card-anim { animation: fadeIn 0.3s ease; }
        button:focus-visible { outline: 2px solid var(--border-accent); outline-offset: 2px; }
        input:focus { outline: none; border-color: var(--border-accent) !important; box-shadow: 0 0 0 3px var(--bg-accent); }
      `}</style>
    </div>
  );
}

const fieldStyle = { width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: "var(--radius)", border: "0.5px solid var(--border)", fontSize: 14, background: "var(--surface-1)", color: "var(--text-primary)", marginBottom: 14 };
const btnPrimary = { background: "var(--fill-accent)", color: "#fff", border: "none", cursor: "pointer", padding: "11px 24px", borderRadius: "var(--radius)", fontWeight: 600, width: "100%", fontSize: 15 };
const btnGhost = { background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 13, padding: "4px 0", display: "block", width: "100%" };

function Field({ label, type, value, onChange, placeholder, onKeyDown }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} onKeyDown={onKeyDown} style={fieldStyle} />
    </div>
  );
}

function CardItem({ card, onSave, onLike, catMeta, t }) {
  const [expanded, setExpanded] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const hasSources = Array.isArray(card.sources) && card.sources.length > 0;

  return (
    <div className="card-anim" style={{
      background: "var(--surface-2)",
      border: `0.5px solid ${card.fresh ? "var(--border-accent)" : "var(--border)"}`,
      borderRadius: 16, padding: "20px 22px", transition: "border-color 0.4s",
    }}>
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {catMeta && (
            <span style={{ background: catMeta.bg, color: catMeta.color, fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 10, display: "flex", alignItems: "center", gap: 4 }}>
              <i className={`ti ${catMeta.icon}`} style={{ fontSize: 12 }} aria-hidden="true" />
              {catMeta.label}
            </span>
          )}
          <span style={{ background: "var(--bg-success)", color: "var(--text-success)", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 10, display: "flex", alignItems: "center", gap: 4 }}>
            <i className="ti ti-check" style={{ fontSize: 11 }} aria-hidden="true" />
            {t.verifiedFact}
          </span>
          {card.fresh && (
            <span style={{ background: "var(--bg-accent)", color: "var(--text-accent)", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 10 }}>{t.newBadge}</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => onLike(card.id)} aria-label={card.liked ? "Unlike" : "Like"} style={{
            background: card.liked ? "var(--bg-danger)" : "none",
            border: `0.5px solid ${card.liked ? "var(--border-danger)" : "var(--border)"}`,
            color: card.liked ? "var(--text-danger)" : "var(--text-muted)",
            width: 32, height: 32, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <i className="ti ti-heart" style={{ fontSize: 15 }} aria-hidden="true" />
          </button>
          <button onClick={() => onSave(card.id)} aria-label={card.saved ? t.unsaveCard : t.saveCard} style={{
            background: card.saved ? "var(--bg-accent)" : "none",
            border: `0.5px solid ${card.saved ? "var(--border-accent)" : "var(--border)"}`,
            color: card.saved ? "var(--text-accent)" : "var(--text-muted)",
            width: 32, height: 32, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <i className="ti ti-bookmark" style={{ fontSize: 15 }} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Content */}
      <h2 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.3px", lineHeight: 1.3 }}>{card.title}</h2>
      <p style={{
        margin: "0 0 14px", color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.75,
        overflow: expanded ? "visible" : "hidden",
        display: expanded ? "block" : "-webkit-box",
        WebkitLineClamp: expanded ? "unset" : 3,
        WebkitBoxOrient: "vertical",
      }}>{card.content}</p>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>
          — {card.author}{card.year ? `, ${card.year}` : ""}
        </span>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {hasSources && (
            <button onClick={() => setShowSources(s => !s)} style={{
              background: showSources ? "var(--bg-accent)" : "none", border: `0.5px solid ${showSources ? "var(--border-accent)" : "var(--border)"}`,
              color: showSources ? "var(--text-accent)" : "var(--text-muted)", cursor: "pointer",
              fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 10, display: "flex", alignItems: "center", gap: 5,
            }}>
              <i className="ti ti-link" style={{ fontSize: 12 }} aria-hidden="true" />
              {t.sources}
            </button>
          )}
          {card.content.length > 220 && (
            <button onClick={() => setExpanded(e => !e)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-accent)", fontSize: 13, fontWeight: 600, padding: 0 }}>
              {expanded ? t.showLess : t.readMore}
            </button>
          )}
        </div>
      </div>

      {/* Sources */}
      {showSources && hasSources && (
        <div style={{ marginTop: 14, borderTop: "0.5px solid var(--border)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          {card.sources.map((src, i) => (
            <a key={i} href={src.url} target="_blank" rel="noopener noreferrer" style={{
              fontSize: 13, color: "var(--text-accent)", display: "flex", alignItems: "center", gap: 6,
              textDecoration: "none", padding: "4px 0",
            }}>
              <i className="ti ti-external-link" style={{ fontSize: 13, flexShrink: 0 }} aria-hidden="true" />
              {src.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
