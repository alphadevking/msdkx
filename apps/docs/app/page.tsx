import styles from "./page.module.css";

const features = [
  {
    icon: "⚡",
    title: "6 battle-tested templates",
    description:
      "Next.js App Router, Pages Router, and Vite — each with or without TailwindCSS.",
  },
  {
    icon: "◆",
    title: "TypeScript first",
    description:
      "Every template ships with strict TypeScript configured and ready to go.",
  },
  {
    icon: "📦",
    title: "Your package manager",
    description:
      "Works seamlessly with pnpm, npm, or yarn — whatever your workflow.",
  },
  {
    icon: "🌿",
    title: "Git initialized",
    description:
      "Your project starts clean with a git repo and an initial commit.",
  },
];

const templates = [
  {
    name: "Next.js App Router",
    tag: "TailwindCSS",
    icon: "▲",
    id: "next-app-router-tailwind",
  },
  {
    name: "Next.js App Router",
    tag: "Vanilla CSS",
    icon: "▲",
    id: "next-app-router-css",
  },
  {
    name: "Next.js Pages Router",
    tag: "TailwindCSS",
    icon: "▲",
    id: "next-pages-router-tailwind",
  },
  {
    name: "Next.js Pages Router",
    tag: "Vanilla CSS",
    icon: "▲",
    id: "next-pages-router-css",
  },
  {
    name: "Vite + React",
    tag: "TailwindCSS",
    icon: "⚡",
    id: "vite-tailwind",
  },
  {
    name: "Vite + React",
    tag: "Vanilla CSS",
    icon: "⚡",
    id: "vite-css",
  },
];

export default function Home() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>msdkx</span>
          <nav className={styles.nav}>
            <a
              href="https://github.com/alphadevking/msdkx"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@msdkx/cli"
              target="_blank"
              rel="noopener noreferrer"
            >
              npm
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>v0.1.1 — now on npm</div>
            <h1 className={styles.headline}>
              Scaffold full-stack apps
              <br />
              in seconds
            </h1>
            <p className={styles.subheadline}>
              A TypeScript-first CLI for Next.js and Vite — TailwindCSS, ESLint,
              and git ready out of the box.
            </p>
            <div className={styles.ctas}>
              <a href="#quickstart" className={styles.ctaPrimary}>
                Get started
              </a>
              <a
                href="https://github.com/alphadevking/msdkx"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                GitHub ↗
              </a>
            </div>
          </div>

          <div className={styles.terminal}>
            <div className={styles.terminalBar}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              <span className={`${styles.dot} ${styles.dotYellow}`} />
              <span className={`${styles.dot} ${styles.dotGreen}`} />
              <span className={styles.terminalTitle}>bash</span>
            </div>
            <div className={styles.terminalBody}>
              <p>
                <span className={styles.prompt}>$</span>{" "}
                <span className={styles.cmd}>npx @msdkx/cli create my-app</span>
              </p>
              <p className={styles.dim}>
                msdkx — creating &quot;my-app&quot;
              </p>
              <br />
              <p>
                <span className={styles.cyan}>?</span> Choose a framework:{" "}
                <span className={styles.green}>Next.js (App Router)</span>
              </p>
              <p>
                <span className={styles.cyan}>?</span> Add TailwindCSS?{" "}
                <span className={styles.green}>Yes</span>
              </p>
              <p>
                <span className={styles.cyan}>?</span> Package manager:{" "}
                <span className={styles.green}>pnpm</span>
              </p>
              <br />
              <p>
                <span className={styles.green}>✓</span> Project scaffolded!
              </p>
              <p>
                <span className={styles.green}>✓</span> Dependencies installed!
              </p>
              <p>
                <span className={styles.green}>✓</span> Git repository
                initialized!
              </p>
              <br />
              <p>
                <span className={styles.green}>✓ Done!</span>
              </p>
              <p className={styles.dim}>Get started:</p>
              <p>
                {"  "}
                <span className={styles.cyan}>cd my-app</span>
              </p>
              <p>
                {"  "}
                <span className={styles.cyan}>pnpm dev</span>
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={styles.features} id="features">
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>
              Everything you need, nothing you don&apos;t
            </h2>
            <div className={styles.featureGrid}>
              {features.map((f) => (
                <div key={f.title} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className={styles.quickstart} id="quickstart">
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Quick start</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>Create a new project</h3>
                  <div className={styles.codeBlock}>
                    <code>npx @msdkx/cli create my-app</code>
                  </div>
                  <p className={styles.stepNote}>
                    Or:{" "}
                    <code>pnpm dlx @msdkx/cli create my-app</code>
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>Navigate to your project</h3>
                  <div className={styles.codeBlock}>
                    <code>cd my-app</code>
                  </div>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Start the dev server</h3>
                  <div className={styles.codeBlock}>
                    <code>pnpm dev</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates */}
        <section className={styles.templatesSection} id="templates">
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Available templates</h2>
            <p className={styles.sectionSubtitle}>
              Choose your stack — the CLI guides you through the rest.
            </p>
            <div className={styles.templateGrid}>
              {templates.map((t) => (
                <div key={t.id} className={styles.templateCard}>
                  <div className={styles.templateIcon}>{t.icon}</div>
                  <div>
                    <p className={styles.templateName}>{t.name}</p>
                    <span className={styles.templateTag}>{t.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerLogo}>msdkx</span>
          <div className={styles.footerLinks}>
            <a
              href="https://github.com/alphadevking/msdkx"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@msdkx/cli"
              target="_blank"
              rel="noopener noreferrer"
            >
              npm
            </a>
            <a
              href="https://github.com/alphadevking/msdkx/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT
            </a>
          </div>
          <p className={styles.footerCopy}>© 2025 msdkx · Built with Next.js</p>
        </div>
      </footer>
    </div>
  );
}
