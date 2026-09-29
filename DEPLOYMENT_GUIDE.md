# GitHub Pages Deployment Guide

This guide will walk you through deploying your PromptFoundry webapp to GitHub Pages.

## Prerequisites
- A GitHub account
- Repository admin access to saisrikiran25-ctrl/prompt-foundry

## Step-by-Step Deployment Instructions

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to https://github.com/saisrikiran25-ctrl/prompt-foundry
2. Click on **Settings** (top navigation bar)
3. In the left sidebar, scroll down and click on **Pages**
4. Under "Build and deployment":
   - **Source**: Select **"GitHub Actions"** from the dropdown
   - (If you see "Deploy from a branch" selected, change it to "GitHub Actions")
5. The page will auto-save

### Step 2: Configure GitHub Actions Permissions

1. Still in **Settings**, click on **Actions** → **General** in the left sidebar
2. Scroll down to "Workflow permissions"
3. Select **"Read and write permissions"**
4. Check the box for **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

### Step 3: Merge the Pull Request

1. Merge the pull request that contains the deployment configuration
2. This will trigger the first deployment automatically

### Step 4: Monitor the Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Click on it to see the progress
4. The deployment typically takes 1-2 minutes

### Step 5: Access Your Deployed App

Once the workflow completes successfully:
- Your app will be live at: **https://saisrikiran25-ctrl.github.io/prompt-foundry/**

## Future Deployments

After the initial setup:
- Any push to the `main` branch will automatically trigger a new deployment
- You can also manually trigger a deployment:
  1. Go to **Actions** tab
  2. Click on "Deploy to GitHub Pages" workflow
  3. Click "Run workflow" button
  4. Select the branch (usually `main`)
  5. Click "Run workflow"

## Troubleshooting

### Deployment Failed
- Check the Actions tab for error messages
- Ensure the build completes successfully locally with `npm run build`
- Verify that all dependencies are listed in package.json

### 404 Error on Deployed Site
- Wait a few minutes after deployment completes
- Clear your browser cache
- Verify the GitHub Pages source is set to "GitHub Actions"

### Changes Not Appearing
- Check that your changes are merged to the main branch
- Check the Actions tab to ensure deployment completed
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

## Testing Locally Before Deployment

To preview the production build locally:

```bash
npm install
npm run build
npm run preview
```

Visit http://localhost:4173 to see the production build.

## What Was Configured

The following changes were made to enable GitHub Pages deployment:

1. **vite.config.ts**: Added `base: '/prompt-foundry/'` to configure the correct base path for GitHub Pages
2. **.github/workflows/deploy.yml**: Created GitHub Actions workflow for automated deployment
3. **README.md**: Added deployment documentation

## Support

If you encounter any issues:
1. Check the Actions tab for detailed error logs
2. Ensure GitHub Pages is enabled and set to "GitHub Actions"
3. Verify workflow permissions are set to "Read and write"
