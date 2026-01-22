<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy it to GitHub Pages.

View your app in AI Studio: https://ai.studio/apps/drive/1KuABnUFyQMDYeyKKS9vkbsCB7f4cDIyn

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This repository is configured for automatic deployment to GitHub Pages. Follow these steps:

### One-Time Setup (Repository Settings)

1. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment":
     - **Source**: Select "GitHub Actions"
   - Click **Save**

2. **Configure GitHub Actions Permissions** (if needed):
   - Go to **Settings** → **Actions** → **General**
   - Under "Workflow permissions":
     - Select "Read and write permissions"
     - Enable "Allow GitHub Actions to create and approve pull requests"
   - Click **Save**

### Automatic Deployment

Once the setup is complete:

1. **Push to main branch**: Any push to the `main` branch will automatically trigger a deployment
2. **Manual deployment**: Go to **Actions** tab → Select "Deploy to GitHub Pages" workflow → Click "Run workflow"

### Access Your Deployed App

After the deployment workflow completes (usually takes 1-2 minutes):
- Your app will be available at: `https://[your-username].github.io/PromptFoundry/`
- Replace `[your-username]` with your GitHub username

### Build Locally

To test the production build locally before deploying:

```bash
npm run build
npm run preview
```

The preview will be available at `http://localhost:4173`
