#!/usr/bin/env python3
"""Verify and extract a registered Solvia package without silent overwrite."""
from __future__ import annotations

import argparse
import hashlib
import shutil
import sys
import zipfile
from pathlib import Path, PurePosixPath

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "registry" / "SOURCE_PACKAGE_MANIFEST.yaml"


def parse_manifest(path: Path) -> dict[str, dict[str, str]]:
    packages: dict[str, dict[str, str]] = {}
    current: str | None = None
    in_packages = False
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.rstrip()
        if line == "packages:":
            in_packages = True
            continue
        if not in_packages or not line.strip() or line.lstrip().startswith("#"):
            continue
        indent = len(line) - len(line.lstrip())
        stripped = line.strip()
        if indent == 2 and stripped.endswith(":"):
            current = stripped[:-1]
            packages[current] = {}
        elif indent == 4 and current and ":" in stripped:
            key, value = stripped.split(":", 1)
            packages[current][key.strip()] = value.strip().strip("'\"")
    return packages


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for block in iter(lambda: fh.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def safe_members(zf: zipfile.ZipFile):
    for info in zf.infolist():
        name = PurePosixPath(info.filename)
        if name.is_absolute() or ".." in name.parts:
            raise ValueError(f"unsafe archive member: {info.filename}")
        yield info


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("version", nargs="?", help="version id from SOURCE_PACKAGE_MANIFEST.yaml")
    parser.add_argument("package", nargs="?", type=Path, help="downloaded ZIP package")
    parser.add_argument("--list", action="store_true")
    parser.add_argument("--output", type=Path, default=ROOT / "worktrees")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    packages = parse_manifest(MANIFEST)
    if args.list:
        for key in sorted(packages):
            item = packages[key]
            print(f"{key}\t{item.get('filename','')}\t{item.get('sha256','')}")
        return 0
    if not args.version or not args.package:
        parser.error("version and package are required unless --list is used")
    if args.version not in packages:
        raise SystemExit(f"unknown version: {args.version}")
    item = packages[args.version]
    package = args.package.resolve()
    if not package.is_file():
        raise SystemExit(f"package not found: {package}")
    actual = sha256(package)
    expected = item["sha256"]
    if actual != expected:
        raise SystemExit(f"sha256 mismatch: expected {expected}, got {actual}")

    target = (args.output / args.version).resolve()
    if target.exists():
        if not args.force:
            raise SystemExit(f"target exists: {target}; use --force to replace")
        shutil.rmtree(target)
    target.mkdir(parents=True)
    with zipfile.ZipFile(package) as zf:
        list(safe_members(zf))
        zf.extractall(target)
    receipt = target / ".materialized-from"
    receipt.write_text(
        f"version={args.version}\npackage={package.name}\nsha256={actual}\n",
        encoding="utf-8",
    )
    print(target)
    return 0


if __name__ == "__main__":
    sys.exit(main())
