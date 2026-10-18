import { ArticleEvidence } from '@/components/ArticleEvidence';
import { ArticleDiagram } from '@/components/ArticleDiagram';

const s = 'https://github.com/HimanM/iac-config-mgmt-enterprise-demo/blob/68b8c5157e9b428a91e30a34ac75b94ceb9ddc36';
export const toc = [ ['responsibilities', 'Provisioning versus configuration'], ['network', 'The infrastructure that is defined'], ['delivery', 'Following an image into deployment'], ['observability', 'Metrics and logs'], ['boundaries', 'What the demo establishes'], ['sources', 'Source files'] ];

export default function IacArticle() {
  return <>
    <p>Terraform and Ansible solve different parts of an infrastructure problem. This AWS demo connects them: Terraform creates the network and machines, while Ansible installs containers and monitoring services on those machines.</p>
    <p>The application infrastructure has been destroyed, as the README explicitly records. The case study is about the checked-in automation and captured deployment evidence. It does not rely on the old service URLs continuing to work.</p>
    <h2 id="responsibilities">Provisioning versus configuration</h2>
    <p>The Terraform layer describes AWS resources and exposes the addresses Ansible needs. Remote state uses S3 with DynamoDB locking, separating infrastructure state from a developer’s local checkout. The configuration-management layer then uses SSH to install Docker, pull application images, and start services.</p>
    <p>This boundary is useful because an application release need not recreate its EC2 hosts. Conversely, changing a subnet or host definition belongs in Terraform rather than being hidden inside a deployment script. The <a href={`${s}/ansible/main.yml`}>Ansible entry point</a> makes the host roles visible.</p>
    <ArticleDiagram name="iac" />
    <h2 id="network">The infrastructure that is defined</h2>
    <p>The <a href={`${s}/terraform/vpc.tf`}>VPC definition</a> uses a <code>10.0.0.0/16</code> network, with public and private subnet resources in one availability zone. A critical distinction is where the instances actually go: the frontend, backend, and monitoring EC2 resources all use the public subnet. The private subnet is defined but unused by those hosts.</p>
    <p>That makes this a three-host public-subnet demo, not a private backend architecture. The diagram reflects that assignment. The application hosts receive stable public addresses, and the security-group configuration exposes several application and monitoring ports publicly.</p>
    <h2 id="delivery">Following an image into deployment</h2>
    <p>Changes under <code>app/**</code> trigger the <a href={`${s}/.github/workflows/build-and-push.yaml`}>image workflow</a>. It publishes frontend and backend images to GHCR using both a commit-derived tag and <code>latest</code>. A successful image build can trigger the deployment workflow.</p>
    <p>The <a href={`${s}/.github/workflows/deploy.yaml`}>deployment job</a> reads Terraform outputs, writes the SSH key, creates the inventory, and passes the image tag to Ansible. Infrastructure changes have a separate workflow that initializes and plans Terraform, then applies automatically on qualifying main-branch pushes. These are distinct automation paths, not one indivisible pipeline.</p>
    <ArticleEvidence src="/projects/evidence/iac-ansible-release.webp" width={1920} height={919} alt="Successful Ansible deployment workflow with Terraform output collection and playbook execution" caption="The deployment run records the handoff from Terraform outputs to the SSH key, Ansible inventory, and playbook." source={`${s}/docs/github_workflow_deploy_images_via_ansible_and_configure_services_and_monitoring_success.png`} />
    <h2 id="observability">Metrics and logs</h2>
    <p>The monitoring role runs Prometheus, Grafana, and Loki. Node Exporter and cAdvisor provide host and container metrics, while Promtail handles log collection. This creates a concrete comparison between machine health, container behavior, and application logs.</p>
    <p>Repository screenshots show workflow execution, state storage, EC2 resources, and monitoring dashboards. They support a historical walkthrough. They do not establish current uptime, alert effectiveness, or a measured reliability improvement.</p>
    <ArticleEvidence src="/projects/evidence/iac-container-metrics.webp" width={1920} height={919} alt="Grafana host and container dashboard with CPU, network, and memory plots" caption="Grafana shows container CPU, network, and memory series. Several panels report No data, so the capture also exposes incomplete metric coverage." source={`${s}/docs/grafana_docker_containers_dashboard.png`} />
    <ArticleEvidence src="/projects/evidence/iac-log-explorer.webp" width={1920} height={919} alt="Grafana Loki log explorer displaying SSH authentication and connection logs" caption="The Loki dashboard displays host authentication and connection logs. Log collection alone does not establish alerting or incident response." source={`${s}/docs/grafana_loki_logs_dashboard.png`} />
    <h2 id="boundaries">What the demo establishes</h2>
    <p>The project demonstrates the handoff from infrastructure outputs to host configuration and application delivery. Its limits matter just as much: it uses one availability zone, broad public security-group rules, long-lived AWS key secrets, and automatic Terraform apply on main. Those choices do not establish a hardened enterprise deployment.</p>
    <p>There is also a manual-trigger edge case. The deployment workflow derives its image tag from a completed upstream run; a direct manual dispatch does not provide that same value. The Ansible default does not automatically replace a defined empty string. Explicit input validation would make that release path more dependable. Narrower access rules and OIDC would be worthwhile changes before reusing this design outside a lab.</p>
    <h2 id="sources">Source files</h2>
    <ul className="source-files"><li><a href={`${s}/terraform/vpc.tf`}>Network definition</a><span>The public and unused private subnet resources.</span></li><li><a href={`${s}/terraform/security.tf`}>Security groups</a><span>Actual inbound exposure of application and monitoring ports.</span></li><li><a href={`${s}/.github/workflows/deploy.yaml`}>Deployment workflow</a><span>Terraform outputs, inventory, and image-tag handoff.</span></li><li><a href={`${s}/ansible/roles/monitoring/templates/docker-compose.yml`}>Monitoring Compose template</a><span>Metrics and logs services installed on the monitoring host.</span></li></ul>
  </>;
}
