#!/usr/bin/env python3
"""Replace inline New Relic RUM with minimal loader + external script."""
import os
from pathlib import Path

START = '<script type="text/javascript">(window.NREUM || (NREUM = {})).init = {ajax: {deny_list: ["bam.nr-data.net"]}};\n    (window.NREUM || (NREUM = {})).loader_config = {licenseKey: "7857b3b7a6", applicationID: "531059"};'
END = '})();</script>'

REPLACEMENT = '''<script type="text/javascript">(window.NREUM||(NREUM={})).init={ajax:{deny_list:["bam.nr-data.net"]}};(window.NREUM||(NREUM={})).loader_config={licenseKey:"7857b3b7a6",applicationID:"531059"};</script>
    <script src="https://js-agent.newrelic.com/nr-loader-rum-1.296.0.min.js"></script>'''

def find_html(root):
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in ('node_modules', 'scripts', '.git', 'assets')]
        for name in filenames:
            if name == 'index.html':
                yield os.path.join(dirpath, name)

def main():
    root = Path(__file__).resolve().parents[1]
    count = 0
    for filepath in find_html(root):
        path = Path(filepath)
        text = path.read_text(encoding='utf-8')
        i = text.find(START)
        if i == -1:
            print('Skip (no marker):', path.relative_to(root))
            continue
        j = text.find(END, i)
        if j == -1:
            print('Skip (no end):', path.relative_to(root))
            continue
        new_text = text[:i] + REPLACEMENT + text[j + len(END):]
        path.write_text(new_text, encoding='utf-8')
        print('Updated:', path.relative_to(root))
        count += 1
    print('Done. Updated', count, 'files.')

if __name__ == '__main__':
    main()
