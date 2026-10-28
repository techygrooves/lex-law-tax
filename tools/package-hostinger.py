#!/usr/bin/env python3
"""Package the committed static-site layout for direct public_html extraction."""
from pathlib import Path
import hashlib
import stat
import zipfile

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT.parent / 'lexlawandtax-hostinger.zip'
ROOT_FILES = ('index.html', '404.html', 'robots.txt', 'sitemap.xml', 'site.webmanifest', 'humans.txt')
files = {ROOT / name for name in ROOT_FILES}
files.update(p for p in ROOT.rglob('*.html') if '.git' not in p.parts)
for directory in ('assets', 'src/data'):
    files.update(p for p in (ROOT / directory).rglob('*') if p.is_file())

for path in files:
    if not path.is_file() or not path.resolve().is_relative_to(ROOT):
        raise RuntimeError(f'Invalid upload file: {path}')

with zipfile.ZipFile(OUTPUT, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    for path in sorted(files):
        info = zipfile.ZipInfo.from_file(path, path.relative_to(ROOT).as_posix())
        info.create_system = 3
        info.external_attr = (stat.S_IFREG | 0o644) << 16
        info.compress_type = zipfile.ZIP_DEFLATED
        archive.writestr(info, path.read_bytes(), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)

with zipfile.ZipFile(OUTPUT) as archive:
    assert archive.testzip() is None
    names = archive.namelist()
    assert 'index.html' in names and 'src/data/images.js' in names
    assert all(not name.startswith(('/', '../', '.git/', 'tools/')) for name in names)
    assert all((info.external_attr >> 16) & 0o777 == 0o644 for info in archive.infolist())

checksum = hashlib.sha256(OUTPUT.read_bytes()).hexdigest()
OUTPUT.with_suffix('.zip.sha256').write_text(f'{checksum}  {OUTPUT.name}\n')
print(f'{OUTPUT}: {len(files)} files, {OUTPUT.stat().st_size:,} bytes')
print(f'SHA-256: {checksum}')
