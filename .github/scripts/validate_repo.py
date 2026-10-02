#!/usr/bin/env python3
"""Lightweight repository checks for the BOM static web app."""

from __future__ import annotations

import re
import subprocess
import sys
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]

REQUIRED_FILES = [
    "index.html",
    "README.md",
    "LICENSE",
    "CONTRIBUTING.md",
    "CODE_OF_CONDUCT.md",
    "SECURITY.md",
    ".github/ISSUE_TEMPLATE/config.yml",
    ".github/ISSUE_TEMPLATE/bug_report.md",
    ".github/ISSUE_TEMPLATE/feature_request.md",
    "robots.txt",
    "sitemap.xml",
    "assets/logo.jpeg",
    "assets/css/styles.css",
    "assets/js/app.js",
    "assets/vendor/xlsx.full.min.js",
    "assets/vendor/html-docx.js",
    "THIRD-PARTY-NOTICES.md",
]


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def check_required_files() -> None:
    for relative in REQUIRED_FILES:
        path = ROOT / relative
        if not path.is_file() or path.stat().st_size == 0:
            fail(f"required file is missing or empty: {relative}")
    print(f"OK: {len(REQUIRED_FILES)} required files are present")


def check_html() -> None:
    html_path = ROOT / "index.html"
    html = html_path.read_text(encoding="utf-8")

    if not re.search(r"<!doctype\s+html>", html, re.IGNORECASE):
        fail("index.html does not contain a valid HTML5 doctype")
    if not re.search(r"<title\b[^>]*>.*?</title>", html, re.IGNORECASE | re.DOTALL):
        fail("index.html does not contain a title element")

    if html.count("<script") != html.count("</script>"):
        fail("index.html has unbalanced script tags")
    if html.count("<style") != html.count("</style>"):
        fail("index.html has unbalanced style tags")

    print("OK: HTML structure smoke checks passed")


def check_seo_metadata() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    required_snippets = [
        '<meta name="description"',
        '<meta name="robots"',
        '<link rel="canonical" href="https://dungnguyenbtsl.github.io/BOM/">',
        '<meta property="og:title"',
        '<meta property="og:url" content="https://dungnguyenbtsl.github.io/BOM/">',
        '<meta name="twitter:card"',
    ]
    missing = [snippet for snippet in required_snippets if snippet not in html]
    if missing:
        fail("required SEO metadata is missing: " + ", ".join(missing))

    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    sitemap_url = "Sitemap: https://dungnguyenbtsl.github.io/BOM/sitemap.xml"
    if sitemap_url not in robots:
        fail("robots.txt does not reference the public sitemap")

    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    if "https://dungnguyenbtsl.github.io/BOM/" not in sitemap:
        fail("sitemap.xml does not contain the canonical site URL")
    print("OK: SEO metadata, robots.txt, and sitemap.xml checks passed")


def check_i18n() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    app_js = (ROOT / "assets/js/app.js").read_text(encoding="utf-8")
    source = html + "\n" + app_js
    required = [
        'id="languageSelect"',
        "'zh-TW'",
        "vi:",
        "en:",
        "localStorage.getItem('bomLanguage')",
        "function changeLanguage()",
        "function detectBrowserLanguage()",
        "navigator.languages",
        "navigator.language",
        "bomExportHistory",
        "recordExport(",
        "downloadStoredExport(",
        "persistExportHistory(",
        "renderExportHistory()",
        "clearExportHistory()",
        "data-i18n=",
    ]
    missing = [snippet for snippet in required if snippet not in source]
    if missing:
        fail("multilingual UI configuration is incomplete: " + ", ".join(missing))
    print("OK: multilingual UI configuration checks passed")


def check_external_javascript() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    app_path = ROOT / "assets/js/app.js"
    if '<script src="assets/js/app.js" defer></script>' not in html:
        fail("index.html does not load the split application JavaScript")
    result = subprocess.run(["node", "--check", str(app_path)], capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stderr, file=sys.stderr)
        fail("JavaScript syntax check failed for assets/js/app.js")
    print("OK: split JavaScript passed syntax checks")
def check_external_css() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css_path = ROOT / "assets/css/styles.css"
    if '<link rel="stylesheet" href="assets/css/styles.css">' not in html:
        fail("index.html does not load the split stylesheet")
    if css_path.stat().st_size == 0:
        fail("split stylesheet is empty")
    print("OK: split stylesheet is present")


def check_vendor_assets() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    required_scripts = [
        '<script src="assets/vendor/xlsx.full.min.js" defer></script>',
        '<script src="assets/vendor/html-docx.js" defer></script>',
    ]
    missing = [snippet for snippet in required_scripts if snippet not in html]
    if missing:
        fail("local vendor scripts are not loaded: " + ", ".join(missing))
    if "cdnjs.cloudflare.com" in html or "cdn.jsdelivr.net" in html:
        fail("index.html still contains a CDN dependency")
    for relative in ("assets/vendor/xlsx.full.min.js", "assets/vendor/html-docx.js"):
        result = subprocess.run(
            [
                "node",
                "-e",
                "const fs=require('fs'); new Function(fs.readFileSync(process.argv[1], 'utf8'));",
                str(ROOT / relative),
            ],
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            print(result.stderr, file=sys.stderr)
            fail(f"browser-script syntax check failed for {relative}")
    print("OK: vendor JavaScript assets are self-hosted")


def check_sensitive_files() -> None:
    forbidden_suffixes = {".env", ".pem", ".key", ".p12", ".pfx", ".xlsx", ".xls"}
    forbidden_names = {"id_rsa", "credentials.json", "service-account.json"}
    found: list[str] = []

    for path in ROOT.rglob("*"):
        if ".git" in path.parts:
            continue
        if path.is_file() and (path.name in forbidden_names or path.suffix.lower() in forbidden_suffixes):
            found.append(str(path.relative_to(ROOT)))

    if found:
        fail("sensitive or production data files found: " + ", ".join(sorted(found)))
    print("OK: no forbidden credential or production-data files found")


def check_readme_links() -> None:
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    # Examples inside fenced code blocks are documentation snippets, not live links.
    readme = re.sub(r"```.*?```", "", readme, flags=re.DOTALL)
    links = re.findall(r"\[[^\]]+\]\(([^)]+)\)", readme)
    external_prefixes = ("http://", "https://", "mailto:", "#")

    missing: list[str] = []
    for target in links:
        target = target.split("#", 1)[0]
        if not target or target.startswith(external_prefixes):
            continue
        candidate = (ROOT / target).resolve()
        try:
            candidate.relative_to(ROOT.resolve())
        except ValueError:
            continue
        if not candidate.exists():
            missing.append(target)

    if missing:
        fail("README contains missing local links: " + ", ".join(sorted(set(missing))))
    print("OK: README local links resolve")


def main() -> None:
    check_required_files()
    check_html()
    check_seo_metadata()
    check_i18n()
    check_external_javascript()
    check_external_css()
    check_vendor_assets()
    check_sensitive_files()
    check_readme_links()
    print("All BOM repository checks passed.")


if __name__ == "__main__":
    main()
