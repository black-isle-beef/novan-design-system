---
name: release-design-system
description: "Use when the user wants to cut/ship a release of the design system (e.g. \"release v2.0.0\", \"ship a new version\", \"publish to npm\"), or asks what's needed to release, land a breaking change release, or push a feature branch to main for release. Runs the local quality gate, opens/merges the PR into main, and lets the automated semantic-release pipeline compute the version, publish to npm, and cut the GitHub release."
---

# Release The Design System

Act as the release engineer for `@black-isle-beef/novan-design-system`. **This repo does not use manual version bumps or `npm publish`.** Release is fully automated by `semantic-release` (`.releaserc.json`), triggered by the `release` job in `.github/workflows/ci-cd.yml` on every push to `main`. Your job is to get well-formed conventional commits safely onto `main` and let CI do the rest — never hand-edit `projects/design-system/package.json` version, never run `npm publish` or `npx semantic-release` locally against the real registry, never manually create a git tag.

## How the version number is decided

`commit-analyzer` (`conventionalcommits` preset) scans commit messages on `main` since the last tag and picks the bump:

| Commit pattern | Bump |
|---|---|
| `fix(...): ...` | patch |
| `feat(...): ...` | minor |
| any commit with `BREAKING CHANGE:` footer, or `type(scope)!:` | **major** |
| `chore`, `docs`, `style`, `refactor`, `test`, etc. with no `!`/footer | no release |

There is no way to force an arbitrary version number — if the user asks for a specific version (e.g. "release v2.0.0"), that number must actually match what the commit history implies. Check the current published version first:

```powershell
git fetch --tags
git tag --sort=-v:refname | Select-Object -First 1
```

Then diff commits since that tag against what's targeted for `main`:

```powershell
git log <last-tag>..HEAD --oneline
```

If the user wants a **major** bump but no commit carries a breaking-change marker, stop and clarify with them what the actual breaking change is — do not fabricate one just to hit a version number. See "Marking a breaking change" below.

## Step 1: Confirm scope and target branch

Identify the feature branch(es) whose commits should ship. Confirm with the user:
- Which branch to release from (defaults to current branch if it's not `main`)
- Whether any change is genuinely breaking (renamed/removed public exports, changed peer dependency ranges, restructured `styles/*` entry points, changed component selectors/inputs/outputs in an incompatible way)

Do not assume "the user asked for v2.0.0" means "add a BREAKING CHANGE footer" — confirm what's actually breaking first.

## Step 2: Marking a breaking change (only if applicable)

If a major bump is warranted and no existing commit reflects it, amend the relevant commit or add a new one with a footer:

```
feat(styles)!: restructure global layout tokens

BREAKING CHANGE: `styles/*` export paths changed; consumers importing
`@black-isle-beef/novan-design-system/styles/legacy` must update to the new path.
```

The `!` alone (e.g. `feat(dropdown)!: ...`) is sufficient for commit-analyzer even without a `BREAKING CHANGE:` footer, but prefer including the footer too — it becomes the release notes' "BREAKING CHANGES" section and `@semantic-release/git` writes it into `CHANGELOG.md` verbatim, so make it explain the migration, not just name the change.

If squash-merging the PR, the **squash commit message** is what `commit-analyzer` sees — make sure the `!`/footer survives into the squash commit, not just one of the original commits.

## Step 3: Run the local quality gate

Mirror CI job 1 (`build-and-test`) locally before pushing anything, using `npm.cmd`/`npx.cmd` on Windows PowerShell:

```powershell
npm.cmd run build:tokens
npm.cmd run lint:scss
npm.cmd run lint:ts
npm.cmd run test:lib
npm.cmd run build:lib
npm.cmd run build-storybook
npm.cmd run test:a11y
```

Fix any failures before proceeding — CI will block the release job if `build-and-test` or `visual-regression` fails, since `release` depends on both (`needs: [build-and-test, visual-regression]`).

## Step 4: Push the branch and open the PR into `main`

```powershell
git push -u origin <branch-name>
gh pr create --base main --title "<summary>" --body "<summary + test plan>"
```

State the PR body's test plan in terms of the gate above. Do not merge without the user's explicit go-ahead — merging into `main` immediately triggers the real release pipeline (npm publish + GitHub release), which is irreversible in the sense that a published npm version cannot be reused even if unpublished.

## Step 5: Merge

Ask the user to confirm the merge (squash vs. merge commit), then merge via `gh pr merge` only after they've confirmed — this is the action that fires the release, so treat it like any other irreversible push-to-shared-state action.

```powershell
gh pr merge <pr-number> --squash   # or --merge, matching repo convention
```

If squashing, pass an explicit `--body`/edit the squash message to preserve the `!`/`BREAKING CHANGE:` marker from Step 2.

## Step 6: Watch CI

```powershell
gh run watch --exit-status
```

or check the Actions tab. The pipeline is: `build-and-test` → `visual-regression` (Chromatic; skipped gracefully if `CHROMATIC_PROJECT_TOKEN` isn't set) → `release` (only runs on push to `main`). The `release` job runs `npx semantic-release`, which will, in order:

1. Analyze commits since the last tag → compute next version
2. Generate release notes and prepend them to `CHANGELOG.md`
3. Publish `dist/design-system` to npm as `@black-isle-beef/novan-design-system@<version>`
4. Commit `chore(release): <version> [skip ci]` back to `main` with the updated changelog
5. Create the `v<version>` git tag and a GitHub Release

If commit-analyzer finds nothing releasable (e.g. only `chore`/`docs` commits), the `release` job completes without publishing — this is expected, not a failure.

## Step 7: Verify the release landed

```powershell
git fetch --tags
git tag --sort=-v:refname | Select-Object -First 1
npm.cmd view @black-isle-beef/novan-design-system version
gh release view v<version>
```

Confirm:
- The new tag exists and matches the expected bump
- `npm view` reports the same version as published
- The GitHub Release notes correctly list breaking changes (if any) under their own heading
- `CHANGELOG.md` on `main` (after pulling) has a new entry

## Completion Criteria

Local gate passes, PR is merged into `main` with the user's explicit confirmation, CI's `release` job completes successfully, the new version is live on npm, and the corresponding git tag + GitHub Release exist and match the version the commit history actually implied (not an arbitrarily requested number).

## Guardrails

- Never run `npx semantic-release` locally with real `NPM_TOKEN`/`GITHUB_TOKEN` credentials — it must run inside the CI job only.
- Never hand-edit the version field in `projects/design-system/package.json` or `package.json` — `@semantic-release/npm` owns that.
- Never `git push --force` to `main` or delete/retag an existing release tag to "fix" a version.
- Never merge the PR without the user's explicit go-ahead, since merging is what fires the irreversible publish.
