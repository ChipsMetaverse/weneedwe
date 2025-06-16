# WeNeedWe Deployment Handoff Documentation

## Deployment Information

- **Live URL**: https://weneedwe.vercel.app
- **GitHub Repository**: https://github.com/ChipsMetaverse/weneedwe
- **Vercel Project**: Linked to client's Vercel account

## Important: Environment Variables Configuration

The following environment variables MUST be configured in your Vercel project settings for the application to work properly:

### Required Environment Variables

1. **Supabase Configuration** (Frontend - must be prefixed with VITE_)
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

2. **Supabase Configuration** (Backend/Edge Functions)
   - `SUPABASE_URL`: Same as VITE_SUPABASE_URL
   - `SUPABASE_ANON_KEY`: Same as VITE_SUPABASE_ANON_KEY
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (keep this secret!)

3. **Email Service Configuration** (For contact and volunteer forms)
   - `RESEND_API_KEY`: Your Resend.com API key for sending emails
   - `TO_EMAIL`: Email address to receive form submissions
   - `FROM_EMAIL`: Email address to send notifications from
   - `ADMIN_EMAIL`: Admin email for important notifications

### How to Add Environment Variables in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the "weneedwe" project
3. Navigate to "Settings" → "Environment Variables"
4. Add each variable listed above with its corresponding value
5. Make sure to select all environments (Production, Preview, Development)
6. Click "Save" for each variable

### Important Security Notes

- **Never commit API keys or secrets to the repository**
- The `.env` file is excluded from version control via `.gitignore`
- Keep your `SUPABASE_SERVICE_ROLE_KEY` absolutely secret
- Regularly rotate your API keys for security

### Updating the Deployment

To deploy new changes:

1. Push changes to the `main` branch on GitHub
2. Vercel will automatically deploy the changes
3. Check the Vercel dashboard for deployment status

### Support Features Requiring Configuration

- **Contact Form**: Requires email configuration (RESEND_API_KEY, TO_EMAIL, etc.)
- **Volunteer Form**: Requires same email configuration
- **Database Operations**: Requires Supabase configuration
- **Admin Functions**: Requires SUPABASE_SERVICE_ROLE_KEY

### Troubleshooting

If features are not working after deployment:

1. Check that all environment variables are properly set in Vercel
2. Verify that the values match your Supabase project settings
3. Check the Vercel Functions logs for any errors
4. Ensure your Supabase project has the correct tables and RLS policies

### Project Structure

- `/src` - React application source code
- `/dist` - Built files (auto-generated)
- `/supabase` - Supabase configuration and migrations
- `vercel.json` - Vercel deployment configuration

### Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Contact

For any issues with the handoff or deployment, please ensure all environment variables are correctly configured in your Vercel dashboard.