---
title: "Advanced Secrets Management for CI/CD Pipelines with Doppler and GitHub Actions"
description: "Doppler is a secrets management platform that helps teams securely store and manage their environment variables and other sensitive data."
pubDate: "2024-04-16 21:00:00"
category: "ci-cd-pipelines"
banner: "@images/banners/dopplergitthubactionsbanner2.png"
tags: ["CI/CD Pipelines", "Github Actions", "Secrets", "Doppler", "Doppler Secret Manager"]
selected: true
---

In the dynamic field of software development, integrating effective tools is crucial for maintaining a secure and efficient workflow. Doppler is a secrets management platform that helps teams securely store and manage their environment variables and other sensitive data. GitHub Actions is a CI/CD solution that automates workflows to run tasks, such as testing and deploying code, directly from GitHub. Together, they provide a robust solution for automating deployments and managing secrets securely across multiple repositories. This integration not only simplifies the management of secrets but also enhances the security and consistency of your deployment processes.

## Why Use Doppler with GitHub Actions?


Doppler provides a seamless way to integrate secrets management into CI/CD processes, significantly enhancing the security and efficiency of these pipelines. By centralizing secret storage and tightly controlling their distribution, Doppler prevents the accidental exposure of sensitive data across development stages, from testing to production. This integration ensures that sensitive data, such as API keys and credentials, are managed securely and are only accessible to authorized systems and personnel.

## Getting Started with Doppler and GitHub Actions

### Prerequisites

Before you begin integrating Doppler with GitHub Actions, ensure you have the following:

- A GitHub Account: You should have owner access to one or more repositories. [Create a GitHub account](https://github.com/join) if you don't have one.
- A Doppler Account: Necessary for managing and syncing secrets across your projects. Sign up for Doppler.
- Familiarity with GitHub Actions: Basic understanding of how to configure and manage workflows. For a quick overview, refer to the [GitHub Actions documentation](https://docs.github.com/en/actions).

### 1. Integrating Your Repositories with Doppler

#### Step 1: Doppler Setup

For each repository you wish to integrate, follow these steps:

- Log into your Doppler dashboard.
![Doppler with GitHub Actions](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CSmwQihNDTsIKKZXorar0g.png)

- Create a Project: This will be your central space for managing secrets. Set up a new project for each application or service you deploy using GitHub Actions. Organize your secrets within this project by environment (development, staging, production) to streamline access and enhance security.
- Select "Integrations" and choose GitHub as your integration service.
![Doppler with GitHub Actions](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yp0NlussfPAtZ8NWsYf-zw.png)
![Doppler with GitHub Actions](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yrhqFp4tTnvmxM-fbeYc3A.png)

- Follow the prompts to authorize Doppler to access your GitHub repositories.
![Doppler with GitHub Actions](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9MRUmg22k-rgb5Gk2IBxLA.png)

- Choose a repository to integrate and configure the secrets you want to sync.

### 2. Configuring GitHub Actions Workflows

For each repository, create or ensure a `.github/workflows` directory exists at the root with a YAML file defining your CI/CD workflow. This file should specify the actions to be taken (e.g., build, test, deploy) and configure triggers for `repository_dispatch` or `workflow_dispatch` events, depending on your operational needs.

**Repository Dispatch**: Triggers workflows on custom repository events.

File: `repository_dispatch.yaml`

```yaml
name: Dispatch Event for Doppler
on:
  repository_dispatch:
    types: [deploy_event]
jobs:
  process_dispatch:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Run Custom Script
        run: |
          echo "I worked!"
```

**Workflow Dispatch**: Allows you to run workflows manually or via API calls.

File: `workflow_dispatch.yaml`

```yaml
name: Handle Dispatch Event for Doppler
on:
  workflow_dispatch:
jobs:
  process_dispatch:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Run Custom Script
        run: |
          echo "I worked!"
```

- `repository_dispatch` is ideal for automated scenarios where external events (like a tool or service hook) trigger the workflow.
- `workflow_dispatch` provides flexibility to trigger workflows manually or programmatically, offering control when deployments are more sensitive or require timing.

### 3. Setting Up Webhooks in Doppler

Doppler webhooks will trigger your GitHub Actions workflows upon changes to your secrets.

#### Creating a Webhook for Each Repository

In Doppler, navigate to the "Webhooks" section within your project's settings.
![Doppler with GitHub Actions](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4hLB6tf1v9UDWuv3DgXuUg.png)

#### Configuration Steps:

1. **URL**: Set this to the GitHub Actions trigger endpoint.

   - For `repository_dispatch`, use:
     ```
     https://api.github.com/repos/OWNER/REPO_NAME/dispatches
     ```
   - For `workflow_dispatch`, adjust the URL to target the specific workflow within the repository. Please note that the WORKFLOW_ID is the name of the workflow; e.g. main.yaml
     ```
     https://api.github.com/repos/OWNER/REPO/actions/workflows/WORKFLOW_ID/dispatches
     ```

2. **Authentication**: Ensure each webhook is authenticated with a GitHub Personal Access Token (PAT) that has `repo workflow` permissions.
   - Choose "Bearer Token" for authentication.
   - Input the PAT you generated.

3. **JSON Payload**:
   - The payload varies based on the event type (`repository_dispatch` or `workflow_dispatch`) and the data your workflow expects.
   - For repository_dispatch:
     ```json
     {
       "event_type": "deploy_event",
       "client_payload": {
         "unit": false,
         "integration": true
       }
     }
     ```
   - For workflow_dispatch:
     ```json
     {
       "ref": "develop"
     }
     ```
   - Adjust the "ref", and "event_type" as needed for your specific workflows. The "ref" is to reference the branch name the workflow is on

#### Common Issues:
- Webhook Failures: Ensure the PAT has appropriate permissions.
- Workflow Errors: Verify YAML syntax and ensure all required secrets are correctly referenced in Doppler.

### 4. Testing Your Integration

After configuring webhooks in Doppler, test the integration by updating a secret in Doppler and verifying that it triggers the appropriate workflow in GitHub Actions. Check the "Actions" tab in your GitHub repository for execution details.

![Doppler with GitHub Actions](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*b2Bct3CMuBUY81NYUHhN2g.png)

Actions triggered with both workflow & repository triggers.
![Doppler with GitHub Actions](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*dg_C8ZUydiZPtT44prrjGg.png)

## Conclusion

Integrating Doppler with GitHub Actions across multiple repositories enhances your CI/CD pipelines by automating deployments and securing secrets. By following the steps outlined above, you can ensure consistent, secure, and efficient workflows across all your development projects.

Remember to maintain security best practices by managing access permissions carefully and regularly reviewing your integration setup for any potential improvements.

## Resources

1. [Create a workflow dispatch event](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch)
2. [Create a repository dispatch event](https://docs.github.com/en/webhooks/webhook-events-and-payloads#repository_dispatch)
3. [Creating Doppler Webhooks](https://docs.doppler.com/docs/webhooks)
4. [Doppler GitHub Actions Documentation](https://docs.doppler.com/docs/github-actions)