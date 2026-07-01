# Deployment Guide

This guide will walk you through deploying your portfolio to Vercel. No prior Vercel experience is required!

## 1. Push to GitHub
First, ensure your local code is pushed to a GitHub repository.

```bash
# Initialize git if you haven't already
git init
git add .
git commit -m "Initial commit"

# Link to your GitHub repository (replace with your URL)
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

## 2. Connect Repo to Vercel
1. Go to [vercel.com](https://vercel.com/) and sign up or log in.
2. Click **Add New...** and select **Project**.
3. Under "Import Git Repository", find your newly created repository and click **Import**.
4. Leave the Framework Preset as "Next.js". Vercel will automatically detect the settings.

## 3. Environment Variables
Before clicking "Deploy", expand the **Environment Variables** section. You need to add the following variables:

- `NEXT_PUBLIC_SITE_URL` = `https://your-custom-domain.com` (or the Vercel-provided URL if you don't have one yet)

*Note: For the contact form, you will eventually want to integrate an email service like Resend or SendGrid. Once you do, add those API keys here as well.*

Click **Deploy** and wait for the build to finish.

## 4. Custom Domain Setup (Optional)
If you bought a custom domain:
1. Go to your project dashboard in Vercel.
2. Click on the **Settings** tab.
3. Click on **Domains** in the sidebar.
4. Enter your custom domain and click **Add**.
5. Follow the instructions to update your DNS records with your domain registrar.

## 5. How to Trigger a Redeploy
Whenever you add a new project, write a new blog post, or tweak the design, all you have to do is push to GitHub:

```bash
git add .
git commit -m "Added a new case study"
git push
```

Vercel will automatically detect the push, rebuild your site, and deploy the new version.

*Note: `npm ci` is used in our GitHub Actions CI pipeline to ensure clean, deterministic installs. Vercel automatically runs a similar clean installation step during its build phase.*
