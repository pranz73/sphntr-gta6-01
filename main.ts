import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const projectDirectory = dirname(fileURLToPath(import.meta.url));
const destination = process.env.MAKEFUN_OUTPUT_DIR || '/output';

mkdirSync(destination, { recursive: true });
cpSync(join(projectDirectory, 'game'), join(destination, 'game'), { recursive: true });
const screenshotsDirectory = join(destination, 'screenshots');
mkdirSync(screenshotsDirectory, { recursive: true });
const suppliedScreenshots = join(projectDirectory, 'screenshots');
if (existsSync(suppliedScreenshots)) cpSync(suppliedScreenshots, screenshotsDirectory, { recursive: true });

const dossier = buildDossier(destination, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});
writeFileSync(join(destination, 'dossier.json'), dossier);
