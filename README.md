# Polis

> :warning: We are migrating to [New Implementation](https://github.com/MaanasArora/convergent/) and archiving this repo!

Polis is an AI-powered sentiment gathering platform. More organic than surveys and less effort than focus groups.

<!-- Changes to badge text in URLs below, require changes to "name" value in .github/workflows/*.yml -->
[![Docker Image Builds](https://github.com/CivicTechTO/polis/workflows/Docker%20image%20builds/badge.svg)][docker-image-builds]
[![E2E Tests](https://github.com/CivicTechTO/polis/workflows/E2E%20Tests/badge.svg)][e2e-tests]

   [docker-image-builds]: https://hub.docker.com/u/newjerseystyle
   [e2e-tests]: https://github.com/CivicTechTO/polis/actions?query=workflow%3A%22E2E+Tests%22


## What is Polis?

Polis is a platform for gathering, analyzing, and understanding sentiment at scale.  It uses AI to help facilitate large-scale, open-ended discussions.

*   **For a detailed methods paper**, see [Polis: Scaling Deliberation by Mapping High Dimensional Opinion Spaces][methods-paper].

       [methods-paper]: https://www.e-revistes.uji.es/index.php/recerca/article/view/5516/6558

## Quick Links 🪁 🎈

*   **Main Deployment:** [https://pol.is](https://pol.is) (Free for nonprofits and governments)
*   **CivicTech Deployment (This Fork):** [https://civictech-polis.azurewebsites.net/](https://civictech-polis.azurewebsites.net/)
*   **Knowledge Base (Wiki):**  [https://compdemocracy.org/Welcome](https://compdemocracy.org/Welcome)  (Comprehensive user guide)
*   **Discussions (Q&A):** [https://github.com/compdemocracy/polis/discussions](https://github.com/compdemocracy/polis/discussions)
*   **Technical Issues:** [https://github.com/compdemocracy/polis/issues](https://github.com/compdemocracy/polis/issues)
*   **High-Impact Support:**  <mailto:hello@compdemocracy.org> (For significant deployments requiring more support)
* **Community Support:** [https://github.com/CivicTechTO/polis/issues](https://github.com/CivicTechTO/polis/issues)
* **Talk to a person / Polis 101** : [https://civictech.ca](https://civictech.ca) (Join CivicTech Hacknight - Ask for a Polis 101)
*   **CivicTech Slack:**  [https://civictech.ca](https://civictech.ca) (Join the `#polis` channel)


## Getting Started (For Developers & Deployers)

This section is for those who want to run their own instance of the CivicTech fork of Polis or contribute to development.

Polis comes with Docker infrastructure for running a complete system, whether for a [production deployment](#docs/deployment.md#-production-deployment) or a [development environment](#-development-mode).

### Quick Start (Development)

Open terminal and enter:
```sh
cp example.env .env
make start
```

That should run docker compose with the development overlay (see below) and default configuration values.

Visit <http://localhost:80/createuser> 🚀

### Detailed Instructions

*   **Running Polis:**  See [Running Polis](#running-polis) below for more details.
*   **Configuration:** See [`docs/configuration.md`](docs/configuration.md) for deployment configuration.
*   **Deployment:** See [`docs/deployment.md`](docs/deployment.md) for deployment bash commands.
*   **Contributing:** See [CONTRIBUTING.md](https://github.com/compdemocracy/polis/blob/edge/CONTRIBUTING.md) for how to contribute upstream polis main repository.
*   **Contributing:** See [our wiki](https://github.com/CivicTechTO/polis/wiki#if-you) for how to contribute to this fork.

## Running Polis

Polis uses Docker and Docker Compose for easy setup.

### Prerequisites

*   Docker and Docker Compose installed.  [Instructions for avoiding `sudo` with Docker](https://docs.docker.com/engine/install/linux-postinstall/).

### Basic Commands

*   **Start (Development):** `make start`  (Equivalent to `docker compose --profile postgres up`)
*   **Start (Rebuild):** `make start-rebuild` (Rebuilds Docker images)
*   **Start (Production - see docs/deployment.md for complete instructions):** `make PROD start` (Requires `prod.env`)
*   **Stop:** `make stop` (Equivalent to `docker compose --profile postgres down`)
*   **Help:** `make help` (Lists available commands)
*   **View Configuration:** `docker compose --profile postgres convert`
*   **Full Rebuild (Use with caution - wipes database):** `make start-FULL-REBUILD`

### Using a local or remote (non-docker) database
See [Using a local or remote (non-docker) database](#using-a-local-or-remote-non-docker-database) below

### 💻 Development Mode

For development, use the following command to enable live code reloading, debugging, and other conveniences:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml --profile postgres up --build
```

**This enables:**
- Live code reloading and static type checking of the server code
- A nREPL connection port open for connecting to the running math process
- Ports open for connecting directly to the database container

**About docker compose overlay file:**  
* `docker-compose.dev.yml` in above command is an _overlay_ file, which layers the developer conveniences describe above into the base system, as described in the `docker-compose.yml` file.  
* You can create your own `docker-compose.x.yml` file as an overlay and add or modify any values you need to differ from the defaults found in the `docker-compose.yml` file and pass it as the second argument to the `docker compose -f` command above.  
* You can specify these `-f docker-compose.yml -f docker-compose.dev.yml` arguments for any `docker` command which you need to take advantage of these features (not just `docker compose --profile postgres up`).

## Using a local or remote (non-docker) database

Omit the `--profile postgres` flag to use a local or remote database. You will need to set the `DATABASE_URL` environment variable in your `.env` file to point to your database.

When using `make` commands, setting POSTGRES_DOCKER to `true` or `false` will determine whether to automatically include `--profile postgres` when it calls out to `docker compose`.


## Testing

*   **End-to-End (E2E) Tests:** See [`e2e/README.md`](e2e/README.md) for instructions on running automated browser tests.


## Troubleshooting

*   **Docker Issues:** Try restarting Docker, killing all containers, or using `make start-FULL-REBUILD` (WARNING: This wipes the database).
*   **NPM Issues:** See [this issue](https://github.com/compdemocracy/polis/issues/1391) for potential solutions.
*   **Apple Silicon (M1/M2) Issues:** You may need to use a [Rosetta terminal](https://support.apple.com/en-us/HT211861) for some dependencies.


## License

[AGPLv3 with additional permission under section 7](/LICENSE)
