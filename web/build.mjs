// Builds the static download page into ./dist from the project's README and config.
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const webDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(webDir, '..');
const distDir = join(webDir, 'dist');

const LAVALINK_VERSION = '4.2.2';

// GitHub-style heading ids, so README links like "#-configuration" keep working.
const slug = (text) => text.toLowerCase().trim().replace(/[^\w\- ]/g, '').replace(/ /g, '-');

marked.use({
  renderer: {
    heading({ tokens, depth, text }) {
      return `<h${depth} id="${slug(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
    },
  },
});

const git = (...args) => execFileSync('git', args, { cwd: rootDir, encoding: 'utf8' }).trim();
const size = (file) => `${(statSync(file).size / 1024).toFixed(1)} KB`;

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir);

// The zip mirrors the last commit; web/ is excluded via .gitattributes (export-ignore).
const zipPath = join(distDir, 'lavalink-v4.zip');
git('archive', '--worktree-attributes', '--format=zip', '--prefix=lavalink-v4/', '-o', zipPath, 'HEAD');
copyFileSync(join(rootDir, 'application.yml'), join(distDir, 'application.yml'));
copyFileSync(join(rootDir, 'README.md'), join(distDir, 'README.md'));

const readme = marked.parse(readFileSync(join(rootDir, 'README.md'), 'utf8'));
const values = {
  README: readme,
  LAVALINK_VERSION,
  ZIP_SIZE: size(zipPath),
  YML_SIZE: size(join(distDir, 'application.yml')),
  COMMIT: git('rev-parse', '--short', 'HEAD'),
};
const html = readFileSync(join(webDir, 'template.html'), 'utf8')
  .replace(/\{\{(\w+)\}\}/g, (_, key) => values[key]);
writeFileSync(join(distDir, 'index.html'), html);

console.log(`Built ${distDir}`);
