"""Remove all .json files from the project directory.

These files (CWTools diagnostics, AI run artifacts, editor settings, etc.)
are not needed for the mod to function.

Usage:
    uv run python remove_json.py          # normal run
    uv run python remove_json.py --dry-run  # preview only, don't delete
    uv run python remove_json.py --force     # skip confirmation prompt
"""

import argparse
import os
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description="Remove all .json files from the project.")
    parser.add_argument(
        "--dry-run", action="store_true",
        help="List files that would be deleted without actually deleting them."
    )
    parser.add_argument(
        "--force", "-f", action="store_true",
        help="Delete without asking for confirmation."
    )
    args = parser.parse_args()

    project_root = Path(__file__).resolve().parent

    EXCLUDED = {".cwtools-ai", ".idea", ".venv", ".vscode"}

    json_files = sorted(
        f for f in project_root.rglob("*.json")
        if not set(f.relative_to(project_root).parts[:1]) & EXCLUDED
    )

    if not json_files:
        print("No .json files found.")
        return

    print(f"Found {len(json_files)} .json file(s):\n")
    for f in json_files:
        size = f.stat().st_size
        print(f"  {f.relative_to(project_root)}  ({size:,} bytes)")

    if args.dry_run:
        print("\n[Dry run — no files deleted.]")
        return

    if not args.force:
        response = input("\nDelete these files? [y/N] ").strip().lower()
        if response not in ("y", "yes"):
            print("Aborted.")
            return

    deleted = 0
    failed = 0
    total_bytes = 0

    for f in json_files:
        try:
            size = f.stat().st_size
            f.unlink()
            total_bytes += size
            deleted += 1
        except OSError as e:
            print(f"  FAILED: {f.relative_to(project_root)} — {e}")
            failed += 1

    # Clean up empty directories left behind
    for dirpath, _dirnames, _filenames in os.walk(project_root, topdown=False):
        p = Path(dirpath)
        if p == project_root:
            continue
        try:
            p.rmdir()  # only removes if empty
        except OSError:
            pass  # directory not empty, skip

    print(f"\nDeleted {deleted} file(s) ({total_bytes:,} bytes freed), {failed} failure(s).")


if __name__ == "__main__":
    main()
