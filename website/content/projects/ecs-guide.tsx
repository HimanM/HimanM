import { ArticleEvidence } from '@/components/ArticleEvidence';
import { ArticleDiagram } from '@/components/ArticleDiagram';

const s = 'https://github.com/HimanM/dockerized-app-aws-deployment-guide/blob/cbaeab3393f2c44ba86c5cd593309517f1845178';
export const toc = [ ['two-paths', 'Two publication paths'], ['image', 'Building the container'], ['aws', 'What the AWS job deploys'], ['network', 'The walkthrough architecture'], ['validation', 'Validation and next steps'], ['sources', 'Source files'] ];

export default function EcsGuideArticle() {
  return <>
    <p>This repository is both a deployment walkthrough and a deployable application. Its Next.js interface explains how to put a container on ECS Fargate, while its workflows can publish the guide as a static site or update an existing AWS service.</p>
    <p>Keeping those two roles separate is essential. A public documentation page demonstrates that the guide was published. It does not prove that the example ECS workload is currently running, and the AWS workflow does not provision all of the infrastructure described in the guide.</p>
    <h2 id="two-paths">Two publication paths</h2>
    <p>On a main-branch push, <a href={`${s}/.github/workflows/check-deploy.yml`}>the wrapper workflow</a> checks the <code>DEPLOY_AWS</code> setting. With AWS deployment disabled, it builds a static export, adds the custom domain, and publishes the guide to GitHub Pages. With AWS enabled, it dispatches a separate AWS deployment workflow.</p>
    <p>The Next.js configuration selects between static-export and standalone modes. That allows the same guide interface to serve two different output targets, but the resulting artifacts and runtime capabilities are different.</p>
    <ArticleDiagram name="ecs-guide" />
    <h2 id="image">Building the container</h2>
    <p>The <a href={`${s}/aws-deploy-guide/Dockerfile`}>Dockerfile</a> uses a multi-stage Node 20 Alpine build. It installs dependencies with <code>npm ci</code>, builds the application, and copies the standalone output and static assets into the runtime stage.</p>
    <p>The final stage runs as the <code>nextjs</code> user with UID 1001 and listens on port 3000. Separating the dependency/build environment from the runtime image keeps build tooling out of the running application image. It also makes the boundary between static Pages publishing and a Node server explicit.</p>
    <h2 id="aws">What the AWS job deploys</h2>
    <p>The <a href={`${s}/.github/workflows/deploy.yml`}>AWS workflow</a> authenticates with configured access-key secrets, builds a commit-SHA-tagged image, and pushes it to ECR. It retrieves an existing ECS task definition, replaces the configured container image, and deploys that revision to the configured service while waiting for service stability.</p>
    <p>The VPC, cluster, task definition, service, and security groups are preconditions. They are created through the guide’s console steps, not through Terraform or another infrastructure-as-code layer in this repository. This is automated application replacement on prepared infrastructure.</p>
    <ArticleEvidence src="/projects/evidence/ecs-release-workflow.webp" width={1913} height={580} alt="Successful GitHub Actions run with Build and Push followed by Deploy to ECS" caption="The recorded AWS workflow completes image publication and ECS deployment as separate jobs." source={`${s}/docs/github_workflow.png`} />
    <h2 id="network">The walkthrough architecture</h2>
    <p>The instructional path uses a public subnet, a task with a public IP, and an inbound rule for port 3000. It explains an execution role for image pulls and logging, and shows where to inspect the task address and CloudWatch logs.</p>
    <p>There is no checked-in load-balancer or autoscaling configuration. An ECS service maintaining its desired task count is not the same feature as scaling capacity with demand. The article therefore describes the single-service walkthrough rather than implying a load-balanced, automatically scaled application.</p>
    <ArticleEvidence src="/projects/evidence/ecs-service-created.webp" width={1920} height={911} alt="AWS ECS cluster console showing one active service and one running task" caption="The ECS console capture shows an active service with one desired and one running task at that moment." source={`${s}/docs/service_creation_success.png`} />
    <h2 id="validation">Validation and next steps</h2>
    <p>The repository contains AWS-console screenshots and historical successful workflow runs for both publication paths. The deployment job’s stability wait is a useful release check: it asks ECS whether the replacement settled. It does not independently test an application journey from a browser.</p>
    <p>The next progression would be to capture the manual infrastructure as code, replace long-lived keys with OIDC, define how traffic enters through a load balancer, and add an application-level smoke check. Those are proposed extensions. The existing project’s concrete contribution is making the transition from Docker image to ECR to an ECS service understandable and inspectable.</p>
    <h2 id="sources">Source files</h2>
    <ul className="source-files"><li><a href={`${s}/.github/workflows/check-deploy.yml`}>Publication switch</a><span>Static Pages publishing or AWS workflow dispatch.</span></li><li><a href={`${s}/.github/workflows/deploy.yml`}>AWS release workflow</a><span>Image tagging, ECR publication, and ECS service replacement.</span></li><li><a href={`${s}/aws-deploy-guide/Dockerfile`}>Container build</a><span>Multi-stage standalone build and non-root runtime.</span></li><li><a href={`${s}/aws-deploy-guide/next.config.ts`}>Next.js output configuration</a><span>The distinction between export and server output.</span></li></ul>
  </>;
}
