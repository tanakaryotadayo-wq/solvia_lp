# Import Log v0.1

## This commit

- Add Version / Asset / Deployment registries.
- Add descriptors for 14 operational lineages.
- Import source text for 10 recovered packages without rewriting their contents.
- Fully materialize six low-binary versions in phase 1 after shared asset links are added.
- Keep large/identity-sensitive binaries in Space until their Git blobs are imported and verified.
- Do not delete, rename, merge or rewrite legacy branches.

## Git asset policy

- `assets/shared/solvia-yawn-animation.mp4` reuses the existing Git blob already present in the repository.
- Small binary assets are imported once and referenced from version folders.
- `solvia-yawn-alpha.webm` remains Space-only in v0.1 because it is a large derivative; MP4 fallback remains available.
