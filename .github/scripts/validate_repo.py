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


def check_inline_javascript() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    scripts = re.findall(r"<script\b[^>]*>(.*?)</script>", html, re.IGNORECASE | re.DOTALL)
    inline_scripts = [script for script in scripts if script.strip()]

    if not inline_scripts:
        print("OK: no inline JavaScript blocks found")
        return

    with tempfile.TemporaryDirectory() as directory:
        for index, script in enumerate(inline_scripts, start=1):
            script_path = Path(directory) / f"inline-{index}.js"
            script_path.write_text(script, encoding="utf-8")
            result = subprocess.run(
                ["node", "--check", str(script_path)],
                capture_output=True,
                text=True,
            )
            if result.returncode != 0:
                print(result.stderr, file=sys.stderr)
                fail(f"JavaScript syntax check failed for inline block {index}")

    print(f"OK: {len(inline_scripts)} inline JavaScript block(s) passed syntax checks")


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
    check_inline_javascript()
    check_sensitive_files()
    check_readme_links()
    print("All BOM repository checks passed.")


if __name__ == "__main__":
    main()
