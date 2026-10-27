# **App Name**: QikQR

## Core Features:

- User Authentication: Secure user authentication via Firebase Auth with email/password.
- Dynamic QR Code Generation: Generate unique QR codes linked to user-specified URLs.
- Firestore Database Integration: Store user data, QR code details, and scan records in Firestore.
- Scan Tracking and Analytics: Monitor QR code scans, recording details like IP address, device, and timestamp; reasoning tool to help decide when scan data is not useful to track.
- Usage Limits and Plan Management: Implement a free plan with a limited number of QR codes, and display an upgrade message when the limit is reached.
- Public Redirect Route: Handle redirection to original URLs via a short code-based route, logging scan information upon redirection.
- SaaS Dashboard: Provide a user dashboard to manage QR codes, view statistics, and access account settings.
- Payment Integration RazorPay: Payment Integration RazorPay

## Style Guidelines:

- Primary color: Deep purple (#6750A4) to evoke a sense of sophistication and modernity.
- Background color: Very light lavender (#F2EFF7), close to white, for a clean backdrop.
- Accent color: Electric violet (#BF5AF2) to highlight interactive elements and call-to-action buttons.
- Body and headline font: 'Inter' sans-serif, to provide a clean and neutral interface for all text.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use a set of consistent, modern icons throughout the platform, representing various functions such as QR code generation, analytics, and user settings.
- Implement a modern SaaS layout with a sidebar navigation and card-based dashboard for easy content organization and access.