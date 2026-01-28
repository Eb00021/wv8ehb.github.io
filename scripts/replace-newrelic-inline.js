#!/usr/bin/env node
/**
 * Replace inline New Relic RUM with minimal loader + external script.
 * Run from repo root: node scripts/replace-newrelic-inline.js
 */
const fs = require('fs');
const path = require('path');

const START_MARKER = '<script type="text/javascript">(window.NREUM || (NREUM = {})).init = {ajax: {deny_list: ["bam.nr-data.net"]}};\n    (window.NREUM || (NREUM = {})).loader_config = {licenseKey: "7857b3b7a6", applicationID: "531059"};';
const END_MARKER = '})();</script>';

const REPLACEMENT = `<script type="text/javascript">(window.NREUM||(NREUM={})).init={ajax:{deny_list:["bam.nr-data.net"]}};(window.NREUM||(NREUM={})).loader_config={licenseKey:"7857b3b7a6",applicationID:"531059"};</script>
    <script src="https://js-agent.newrelic.com/nr-loader-rum-1.296.0.min.js"></script>`;

function findHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== 'scripts' && e.name !== '.git') {
      findHtmlFiles(full, files);
    } else if (e.isFile() && e.name === 'index.html') {
      files.push(full);
    }
  }
  return files;
}

const root = path.resolve(__dirname, '..');
const htmlFiles = findHtmlFiles(root);

let total = 0;
for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  const i = html.indexOf(START_MARKER);
  if (i === -1) {
    console.warn('Skip (no marker):', file);
    continue;
  }
  const j = html.indexOf(END_MARKER, i);
  if (j === -1) {
    console.warn('Skip (no end):', file);
    continue;
  }
  const endLen = END_MARKER.length;
  const before = html.slice(0, i);
  const after = html.slice(j + endLen);
  html = before + REPLACEMENT + after;
  fs.writeFileSync(file, html);
  console.log('Updated:', path.relative(root, file));
  total++;
}
console.log('Done. Updated', total, 'files.');
