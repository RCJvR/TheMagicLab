# Microsoft sign-in for the accommodations register

Teachers on the register's people list can open
`https://themagiclab.co.za/accommodations.html` and choose **Sign in with
Microsoft**. The database side is already live
(`supabase-accommodations-microsoft.sql`). What is left is connecting
Supabase to the school's Microsoft account. The **Sign in with Microsoft**
button stays hidden until step 3 is done.

You need someone who can register apps in the school's Microsoft Entra ID
(Azure AD). At many schools that is IT, so you can forward them this page.

## 1. Register the app in Microsoft Entra ID

1. Go to <https://entra.microsoft.com> and choose **Applications → App registrations → New registration**.
2. **Name:** `The Magic Lab`
3. **Supported account types:** *Accounts in this organizational directory only (single tenant)*.
   This lets only school accounts sign in.
4. **Redirect URI:** platform **Web**, address
   `https://hrnodxqvyxzhfexkzeji.supabase.co/auth/v1/callback`
5. Choose **Register**. On the overview page, copy the **Application (client) ID** and the **Directory (tenant) ID**.
6. Go to **Certificates & secrets → New client secret**. Choose an expiry and copy the secret's **Value** (not the Secret ID).
   Note the expiry date: sign-in stops working when the secret expires, until a new one is entered in step 3.
7. Go to **Token configuration → Add optional claim → ID**, and tick **email** and **xms_edov**.
   If Microsoft asks to turn on the Microsoft Graph email permission, accept.
   `xms_edov` tells Supabase that the email address really belongs to the school.

## 2. Allow the page as a return address in Supabase

Supabase dashboard → **Authentication → URL Configuration → Redirect URLs** → add:

```
https://themagiclab.co.za/accommodations.html
```

## 3. Switch on Microsoft in Supabase

Supabase dashboard → **Authentication → Sign In / Providers → Azure**:

- **Enable** it.
- **Application (client) ID:** from step 1.5
- **Secret Value:** from step 1.6
- **Azure Tenant URL:** `https://login.microsoftonline.com/<Directory (tenant) ID from step 1.5>`
- **Save**.

## 4. Give people access

Sign in to The Magic Lab as admin and open the register. Under **Who can open this page → People who sign in with Microsoft**,
add each teacher's school email with **Edit** or **View and print**.
Removing someone there stops their access straight away.

## What a teacher sees

1. They open the page and choose **Sign in with Microsoft**, then sign in with their school account.
2. If their address is on the list, the register opens. The sign-in is remembered on that device.
3. If it is not on the list, the page says so and offers **Sign out**.

Their first Microsoft sign-in also creates an ordinary Magic Lab account (as a learner) for that email.
That account gives nothing extra. Access to the register comes only from the list.
