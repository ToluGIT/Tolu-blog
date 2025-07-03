---
title: "Triggering Workflows in Another Repository with GitHub Actions"
description: "GitHub Actions provides a powerful automation framework that allows you to orchestrate and automate various tasks within your repositories."
pubDate: "2023-10-03 12:00:00"
category: "ci-cd-pipelines"
banner: "@images/banners/trigger.png"
tags: ["CI/CD Pipelines", "Github Actions", "Kubernetes", "Helm", "Argo Cd"]
# selected: true
---

GitHub Actions provides a powerful automation framework that allows you to orchestrate and automate various tasks within your repositories. One of its features is the ability to trigger workflows in one repository from another repository. This can be useful for managing cross-repository actions, such as updating dependencies or deploying services.

In this guide, we will walk you through the steps to create a workflow in a source repository that triggers a workflow in a target repository.

## Prerequisites

Before you begin, ensure you have the following:

* Access to the source repository (the repository where you want to trigger the workflow).
* Access to the target repository (the repository where the triggered workflow will run).
* Basic knowledge of GitHub Actions.

### Step 1: Configure the Source Repository

#### 1.1. Set Up the Trigger Workflow

In the source repository (the repository that will trigger the workflow in the target repository), create a new GitHub Actions workflow file or use an existing one. This file should define the workflow responsible for triggering the target workflow.

Example workflow file (`target_workflow.yml`):

```yaml
name: Trigger Target Workflow

on:
  workflow_dispatch:
    inputs:
      target_service:
        description: 'Input a service name (e.g., demo-app)'
        required: true
      target_version:
        description: 'Input a version (e.g., v1.0.0)'
        required: true

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Workflow in Another Repository
        run: |
          # Set the required variables
          repo_owner="REPOSITORY OWNER"
          repo_name="REPOSITORY NAME"
          event_type="trigger-workflow"
          service="${{ github.event.inputs.target_service }}"
          version="${{ github.event.inputs.target_version }}"
          
          curl -L \
            -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${{ secrets.PAT }}" \
            -H "X-GitHub-Api-Version: 2022-11-28" \
            https://api.github.com/repos/$repo_owner/$repo_name/dispatches \
            -d "{\"event_type\": \"$event_type\", \"client_payload\": {\"service\": \"$service\", \"version\": \"$version\"}}"
```

In this example, we've defined a workflow named "Trigger Target Workflow" that allows you to manually trigger the target workflow in another repository. This workflow is responsible for triggering another workflow in a different repository (target repository) based on user input. It allows you to specify a service name and a version (e.g., demo-app and v1.0.0) and then triggers the target workflow in the specified repository.

#### 1.2. Configure the Trigger Logic

Inside your source workflow, define the logic and inputs required to trigger the target workflow. The key part is setting the target_repository input to specify the target repository where the workflow should be triggered.
![Doppler with GitHub Actions](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*peAjC5a5K76Lcsd0f6JH0Q.png)

#### Trigger Logic and Inputs:

* **on**: This workflow is triggered manually using the `workflow_dispatch` event, which allows users to specify inputs.
* **Inputs**: Users are prompted to provide two inputs:
  - `target_service`: The service name (e.g., demo-app) that identifies the target repository where the workflow should be triggered.
  - `target_version`: The version (e.g., v1.0.0) that will be passed to the target workflow.
* **Job: trigger**
  * **runs-on**: The job runs on an Ubuntu-based runner.
  * **Steps**:
    1. **Trigger Workflow in Another Repository**: This step performs the actual triggering of the target workflow in the specified repository.
    * It sets the required variables:
      - `repo_owner`: The owner or organization name of the target repository.
      - `repo_name`: The name of the target repository.
      - `event_type`: The event type that the target workflow listens for (e.g., trigger-workflow).
      - `service`: The service name provided as an input.
      - `version`: The version provided as an input.
    * It uses the curl command to send a POST request to the GitHub API to trigger the workflow.
    * The request includes necessary headers such as authorization, content type, and API version.
    * It passes the event type and a client payload with the service name, version, and other optional flags.

**Note**: You should generate your own Personal Access Token (PAT) with the required permissions to enable you to trigger workflows in other repositories. You can refer to this [guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) for instructions on how to create a PAT.

#### 1.3. Commit and Push

Commit the changes to your source repository and push them to the main branch. This ensures that the source workflow is set up and ready to trigger the target workflow.

### Step 2: Configure the Target Repository

#### 2.1. Set Up the Target Workflow

1. In the target repository (the one where you want to run the triggered workflow), create a new GitHub Actions workflow file or use an existing one. This file should define the workflow you want to run when triggered.

Example workflow file (`target_workflow.yml`):

```yaml
name: My Target Workflow

on:
  repository_dispatch:
    types: [trigger-workflow]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event.client_payload.sha }}
      
      # Add your workflow steps here
```

In this example, the "My Target Workflow" workflow is designed to respond to a `repository_dispatch` event with the `trigger-workflow` type. When this event occurs, it initiates the workflow.

#### 2.2. Configure the Workflow Logic

Inside your target workflow, define the logic and actions you want to perform when the workflow is triggered. This could include tasks like updating dependencies, deploying applications, or running tests.
![Doppler with GitHub Actions](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*sJsCnHRAUDvaxxnTXEd31w.png)

1. **Checkout code**:
   * This step uses the `actions/checkout@v4` action to check out the source code of the repository.
   * Important customization is applied here by specifying the `ref` parameter with the value `${{ github.event.client_payload.sha }}`. This means that the workflow will check out the specific commit or branch referenced in the `sha` field of the `client_payload` object of the triggering event. This allows the workflow to operate on the exact code state associated with the triggering event.

2. **Extract Service Name & Version**:
   * This step is responsible for extracting and displaying the service name and version values from the `client_payload` object of the triggering event. These values were passed when the workflow was manually triggered and are stored in the payload for use in downstream steps.
   * The extraction process involves the following actions:
     - Parsing the `service` field from the `client_payload` object and assigning it to the `service_name` variable.
     - Displaying the extracted service name using `echo`.
     - Parsing the `version` field from the `client_payload` object and assigning it to the `version` variable.
     - Displaying the extracted version using `echo`.

### 2.3. Commit and Push

Commit the changes to your target repository and push them to the main branch. This ensures that the target workflow is set up and ready to be triggered.

## Step 3: Trigger the Workflow

Now that both the source and target workflows are set up, you can trigger the target workflow in the target repository from the source repository.

### 3.1. Manual Trigger

1. In the source repository, go to the "Actions" tab.
2. Find and select the "Trigger Target Workflow" workflow.
3. Click the "Run workflow" button.
4. Provide the target_repository input with the name of the target repository (e.g., owner/repo).
5. Click the "Run workflow" button to trigger the target workflow in the specified repository.
![Doppler with GitHub Actions](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_UV1NahIu7RWdxNQB2-foA.png)
![Doppler with GitHub Actions](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2m5urHSQ8gJBxPv0209mmw.png)

Once this has successfully completed, it then triggers the other workflow and passes the inputs from the previous workflow to the current one.
![Doppler with GitHub Actions](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-yr05xPPYONy1kuL0zaPbg.png)

#### 3.2. Automated Trigger (Optional)

You can also automate the trigger process by scheduling the source workflow or integrating it with other events such as code pushes or pull requests. This allows you to set up automatic workflows that trigger the target workflow based on specific conditions or schedules.

### Conclusion

You've successfully configured a GitHub Actions workflow in one repository to trigger another workflow in a different repository. This powerful feature allows you to streamline automation and collaboration across multiple repositories, making it easier to manage complex workflows and tasks.

With this knowledge, you can automate various processes and actions, improving your development and deployment workflows.

## REFERENCES

* [Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
* [GitHub App webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#repository_dispatch)
* [GitHub Actions documentation](https://docs.github.com/en/actions)