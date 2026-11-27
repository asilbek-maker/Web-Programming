// Writes Week13-1/index.html from page.template.html and src/exercises.js.
// The code in each card is read straight from the .jsx file, so the page
// always shows the same code that runs in the iframe next to it.
// Run with: npm run page   (npm run build also runs it)
import { readFileSync, writeFileSync } from 'node:fs'
import { sections } from '../src/exercises.js'

const root = new URL('../', import.meta.url)
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function card(ex) {
  const code = escape(readFileSync(new URL(`src/${ex.file}`, root), 'utf8').trimEnd())
  const name = ex.file.split('/').pop()
  return `
            <article class="ex" id="${ex.id.toLowerCase()}" aria-labelledby="${ex.id.toLowerCase()}-title">
                <header class="ex-head">
                    <span class="ex-num">${ex.id}</span>
                    <h3 id="${ex.id.toLowerCase()}-title">${ex.title}</h3>
                    <code class="ex-file">${name}</code>
                </header>
                <p><strong>Goal:</strong> ${ex.goal}</p>
                <div class="ex-grid">
                    <figure class="terminal ex-code">
                        <figcaption class="terminal-bar"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>Code · ${ex.file}</figcaption>
                        <pre><code>${code}</code></pre>
                    </figure>
                    <figure class="ex-out">
                        <figcaption><span class="live-dot" aria-hidden="true"></span>Output · running</figcaption>
                        <iframe src="practice/index.html?demo=${ex.slug}" data-demo="${ex.slug}" title="${ex.id} running output" loading="lazy"></iframe>
                    </figure>
                </div>
                <p><strong>Result:</strong> ${ex.result}</p>
            </article>`
}

const template = readFileSync(new URL('scripts/page.template.html', root), 'utf8')
const blocks = sections.map((s) => `
            <h2 class="section-title" id="${s.id}">${s.title}</h2>
            <p class="section-intro">${s.intro}</p>
${s.items.map(card).join('\n')}`).join('\n')

const html = template.replace('{{SECTIONS}}', blocks)
writeFileSync(new URL('../index.html', root), html)
console.log(`Wrote Week13-1/index.html (${sections.flatMap((s) => s.items).length} exercises)`)
