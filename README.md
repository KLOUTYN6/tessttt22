# KLOZ STUDIO — Website starter

A responsive dark-purple studio website designed for GitHub Pages. It includes a custom KLOZ visual identity, browser-tab favicon, game concept cards, a media archive, a devlog/idea log, studio information, and contact section.

## 1. Put the website on GitHub Pages

1. Create a new **public** GitHub repository. Recommended name: `kloz-studio.github.io` if your GitHub account/organization is `kloz-studio`; otherwise use any repository name.
2. Extract this ZIP on your computer.
3. Upload the **contents** of this folder to the repository's root (so `index.html` is at the top level, not inside an extra nested folder).
4. In the repository, open **Settings → Pages** and choose **Deploy from a branch**, then select `main` and `/(root)`, and save.
5. Open the published URL shown on the Pages settings screen. It can take a few minutes to appear.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages

## 2. Add screenshots/videos and have them appear automatically

The website is static, so it does not accept uploads directly from visitors. Instead, upload media into this repository and the site will automatically list it.

1. Open the repository on GitHub and open the `media` folder.
2. Choose **Add file → Upload files**.
3. Drag screenshots or short clips into the upload area, then commit the changes to `main`.
4. The `Update media archive` GitHub Actions workflow creates/updates `media-index.json`.
5. GitHub Pages republishes the site; your new media appears in the Media Archive automatically.

Supported formats:
- Images: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`
- Videos: `.mp4`, `.webm`, `.ogg`, `.mov`

Tips:
- Give files useful names, e.g. `first-map-night.png` or `prototype-walkthrough.mp4`; the filename becomes the display title.
- Keep video files small and compressed. GitHub's browser upload limit is generally 25 MB per file; GitHub warns against files above 50 MB and blocks regular Git files above 100 MB. For larger videos, upload to a video host and later add the hosted video URL to the media index.
- Only upload media you own or have permission to publish.
- This is a public repository; anything you upload can be seen by anyone.

### Important: enable Actions write permission

The media-index workflow needs permission to commit `media-index.json`.

Go to **Settings → Actions → General → Workflow permissions**, select **Read and write permissions**, and save. If you do not want to allow the workflow to commit, you can instead run `python scripts/generate_media_index.py` locally and commit the updated `media-index.json` yourself.

## 3. Before publishing, change these placeholders

Open `index.html` and search for:
- `REPLACE_WITH_STUDIO_EMAIL` — replace with a contact email you control.
- Project names and descriptions are starter concepts. Rename/remove them to match your real projects.
- The current devlog entries are launch placeholders; update them as work actually happens.
- The founder line currently says KLOUTYN, as requested.

## 4. How to edit the site

- Main text and sections: `index.html`
- Design, purple theme, layout and mobile styles: `assets/css/style.css`
- Navigation and media archive: `assets/js/site.js`
- Logo and browser-tab icon: `assets/images/`
- Uploadable screenshots/videos: `media/`
- Media list: generated `media-index.json`
- Media index automation: `.github/workflows/media-index.yml`

## 5. Reference direction

The design uses broad inspiration from cinematic game-publisher landing pages: large editorial headlines, dramatic dark panels, feature-led sections, media archive, project spotlights, and a compact navigation. It does not copy Rockstar or Ubisoft artwork, logos, or proprietary page assets.
