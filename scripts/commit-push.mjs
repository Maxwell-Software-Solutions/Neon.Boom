#!/usr/bin/env node
import { execSync } from 'node:child_process';

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

try {
  // Stage all changes
  run('git add -A');

  // Create commit message with timestamp
  const msg = process.argv.slice(2).join(' ') || `chore: automated commit ${new Date().toISOString()}`;
  // Commit (skip if nothing to commit)
  try {
    run(`git commit -m "${msg.replace(/"/g, '\\"')}"`);
  } catch (e) {
    console.log('Nothing to commit, continuing to push...');
  }

  // Determine current branch in a cross-shell safe way
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

  // Pull rebase to avoid conflicts then push
  try {
    run(`git pull --rebase origin ${branch}`);
  } catch {
    console.log('Rebase pull had conflicts or failed, attempting direct push...');
  }
  run(`git push origin ${branch}`);

  console.log('✔ Pushed to origin');
} catch (err) {
  console.error('Commit/push failed:', err.message);
  process.exit(1);
}
