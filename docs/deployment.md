# Polis Deployment Guide

## 🚀 Production deployment

While the commands above will get a functional Polis system up and running, additional steps must be taken to properly configure, secure and scale the system.
In particular

- [⚙️ Configure the system](configuration.md), esp:
  - the domain name you'll be serving from
  - enable and add API keys for 3rd party services (e.g. automatic comment translation, spam filtering, etc)
- [🔏 Set up SSL/HTTPS](ssl.md), to keep the site secure
- [📈 Scale](scaling.md) for large or many concurrent conversations

### Updating the system

If you want to update the system, you may need to handle the following:

- [⬆️ Run database migrations](migrations.md), if there are new such
- Update docker images by running with `--build` if there have been changes to the Dockerfiles
  - consider using `--no-cache` if you'd like to rebuild from scratch, but note that this will take much longer

### Backup the system
**Manual Backup Script (Example - for Docker Postgres):**
```bash
#!/bin/bash
docker exec -t <postgres_container_name> pg_dump -U <username> -d <database_name> > polis_backup_$(date +%Y-%m-%d).sql
# (Optional) Upload the backup to Azure Blob Storage or another storage service.
```

**Restore (Example - for Docker Postgres):**
```bash
docker exec -i <postgres_container_name> psql -U <username> -d <database_name> < polis_backup_YYYY-MM-DD.sql
```
**Important**: Replace placeholders like `<postgres_container_name>`, `<username>`, and `<database_name>` with your actual values.  Test your backup and restore procedures regularly!

---

## Support

We encourage you to take advantage of the public channels above for support setting up a deployment.
However, if you are deploying in a high impact context and need help, please [reach out to compdemocracy](mailto:hello@compdemocracy.org)

---

# CivicTech Fork deployment

This document provides instructions for deploying the CivicTech fork of Polis to a production environment.  This guide specifically details the deployment process used for [https://civictech-polis.azurewebsites.net/](https://civictech-polis.azurewebsites.net/), which utilizes Azure App Service.

## 1. Server Setup (Azure App Service)

The CivicTech deployment of Polis uses Azure App Service for hosting. Here's [a step-by-step guide to setting up the environment](https://medium.com/@jyotikhetan2/creating-an-azure-app-service-using-azure-cli-a-step-by-step-guide-e1e477ff7c19).

1.  **Create an Azure Account:** If you don't already have one, create an Azure account at [https://azure.microsoft.com/](https://azure.microsoft.com/).

2.  **Create an App Service Plan:**
    *   In the Azure portal, search for and select "App Service plans".
    *   Click "Create".
    *   Select your subscription, resource group (or create a new one), name, operating system (Linux), region, and pricing tier.  The pricing tier should be chosen based on expected load (see [Scaling Considerations](#4-scaling-considerations)).  For initial setup, a "Standard" tier is often sufficient.
    *   Click "Review + create", then "Create".

3.  **Configure Docker:**
    *   In the Azure App Service, `docker-compose.yml` must be smaller than 4000 bytes or Container App service should be used.
    *   I embedded the `prod.env` variables into my `docker-compose.yml` using `environment` section to ensure deployemnt.

4.  **Create a Web App:**
    *   In the Azure portal, open a cloud shell. You can also use portal (GUI) to do the same.
    ```bash
    wget <url to download docker-compose.yml>
    az webapp create --resource-group <your-resource-group> --plan <plan-created-above> --name civictech-polis --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml
    ```

## 2. `prod.env` and Production Mode Shortcuts

The `prod.env` file contains environment variables required for production deployments.

1.  **Create `prod.env`:**  Copy the `example.env` file: `cp example.env prod.env`.

2.  **Edit `prod.env`:**  Modify the values in `prod.env` to match your production environment.  Crucially:
    *   `NODE_ENV=production`
    *   `DOMAIN=your-custom-domain.com` (or `your-app-name.azurewebsites.net`)
    *   `SESSION_SECRET` (Generate a strong, random secret)
    *   `DATABASE_URL` (If not using the built-in Postgres container, set this to your external database connection string.)
    *   `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` (If using Google authentication)
    *   `TWITTER_CONSUMER_KEY` and `TWITTER_CONSUMER_SECRET` (If using Twitter authentication)
    *   Any other relevant API keys (translation, spam filtering, etc.)

---

## Scaling Considerations (Azure)

*   **App Service Plan:** The App Service Plan you choose determines the resources available to your application.  You can scale up (more powerful instances) or scale out (more instances) as needed.
*   **Database:** If you're using the built-in Postgres container for development, consider using a managed Azure Database for PostgreSQL instance for production. This provides better performance, scalability, and manageability.

## Backup and Restore Procedures

*   **Azure App Service Backups:** Azure App Service provides built-in backup functionality. You can configure automatic backups in the "Backups" section of your web app settings.
*   **Database Backups:** If you're using Azure Database for PostgreSQL, backups are managed automatically.  You can configure the retention period and perform point-in-time restores. If using the built-in docker Postgres, you'll need to implement a manual backup strategy (e.g., using `pg_dump` inside the container and storing the backups in Azure Blob Storage).
