# Vercel Deployment Guide

## Manual Deployment Steps for Cipher Quest Loot

### Prerequisites
- GitHub account with access to the repository
- Vercel account
- Node.js 18+ installed locally (for testing)

### Step 1: Connect Repository to Vercel

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" or "Import Project"
   - Select "Import Git Repository"
   - Choose `OceanicLab/cipher-quest-loot` from the list
   - Click "Import"

### Step 2: Configure Project Settings

1. **Project Name**
   - Set project name: `cipher-quest-loot`
   - Framework Preset: `Vite`
   - Root Directory: `./` (default)

2. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 3: Environment Variables Configuration

Add the following environment variables in Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

**How to add environment variables:**
1. Go to Project Settings → Environment Variables
2. Add each variable with the values above
3. Set environment to "Production", "Preview", and "Development"
4. Click "Save"

### Step 4: Deploy Configuration

1. **Deployment Settings**
   - Node.js Version: 18.x
   - Build Command: `npm run build`
   - Output Directory: `dist`

2. **Domain Configuration**
   - Custom domain (optional): Set up your own domain
   - Default Vercel domain will be provided automatically

### Step 5: Deploy the Application

1. **Automatic Deployment**
   - Vercel will automatically deploy when you push to the main branch
   - Go to the "Deployments" tab to monitor the build process

2. **Manual Deployment**
   - Click "Deploy" button in the Vercel dashboard
   - Wait for the build to complete (usually 2-3 minutes)

### Step 6: Post-Deployment Configuration

1. **Verify Deployment**
   - Check the deployment URL provided by Vercel
   - Test wallet connection functionality
   - Verify all environment variables are loaded

2. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS settings as instructed by Vercel

### Step 7: Monitoring and Updates

1. **Automatic Updates**
   - Every push to main branch triggers automatic deployment
   - Preview deployments are created for pull requests

2. **Manual Updates**
   - Go to Deployments tab
   - Click "Redeploy" for any deployment
   - Use "Promote to Production" for preview deployments

### Troubleshooting

**Common Issues:**

1. **Build Failures**
   - Check Node.js version (should be 18.x)
   - Verify all dependencies are in package.json
   - Check build logs in Vercel dashboard

2. **Environment Variables Not Loading**
   - Ensure variables are set for all environments
   - Check variable names match exactly (case-sensitive)
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure HTTPS is enabled for production

4. **Smart Contract Integration**
   - Deploy contracts to Sepolia testnet first
   - Update contract addresses in the code
   - Verify contract ABI is correctly imported

### Production Checklist

- [ ] Environment variables configured
- [ ] Custom domain set up (if needed)
- [ ] SSL certificate active
- [ ] Wallet connection working
- [ ] Smart contracts deployed
- [ ] All features tested
- [ ] Performance optimized
- [ ] Analytics configured (optional)

### Support

For deployment issues:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Contact Vercel support for platform-specific issues

### Security Notes

- Never commit API keys or private keys to the repository
- Use environment variables for all sensitive configuration
- Regularly rotate API keys and tokens
- Monitor deployment logs for any security issues
