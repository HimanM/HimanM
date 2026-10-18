import { ArticleEvidence } from '@/components/ArticleEvidence';
import { ArticleDiagram } from '@/components/ArticleDiagram';

const s = 'https://github.com/HimanM/jenkins-chained-cicd-infra-automation/blob/3c14646738f0ba1265d99b2c2bf9fdaa80677f88';
export const toc = [ ['delivery', 'Two jobs, two responsibilities'], ['runtime', 'The request path'], ['bootstrap', 'Preparing the host'], ['monitoring', 'Monitoring and validation'], ['tradeoffs', 'Release tradeoffs'], ['sources', 'Source files'] ];

export default function JenkinsArticle() {
  return <>
    <p>A container build and a deployment are different operations. This project makes that distinction visible through chained Jenkins jobs: one validates and publishes a Next.js frontend and Flask API, while another updates the running application on a VPS.</p>
    <p>The useful engineering story is the handoff between those jobs. The repository contains the Jenkinsfiles, Compose topology, host configuration, and application tests, so the delivery path can be followed beyond a pipeline screenshot.</p>
    <h2 id="delivery">Two jobs, two responsibilities</h2>
    <p>The <a href={`${s}/Jenkinsfile`}>CI Jenkinsfile</a> checks out the source, installs frontend dependencies, runs lint, installs Python dependencies, and executes the backend pytest suite. Only after those stages does it build and push the two Docker images. A successful run triggers the downstream <code>DevOps-CD</code> job.</p>
    <p>The <a href={`${s}/Jenkinsfile.deploy`}>deployment job</a> runs in an Ubuntu container. It installs its SSH tooling, connects to the VPS, copies the Compose and Prometheus configuration, writes the image settings, and runs <code>docker compose pull</code> followed by <code>docker compose up -d</code>. Jenkins job creation and webhook setup are manual steps documented in the README; they are prerequisites to this chain.</p>
    <ArticleDiagram name="jenkins" />
    <h2 id="runtime">The request path</h2>
    <p>On the VPS, host Nginx forwards requests to port <code>57002</code>, which Compose publishes from the frontend container’s port 3000. The frontend reaches Flask on port 5000 through the container network. Flask provides a small <code>/api/data</code> endpoint and a Prometheus-format <code>/metrics</code> endpoint.</p>
    <p>The <a href={`${s}/docker-compose.yml`}>Compose file</a> separates frontend and backend networks. The backend joins both, and its backend network is marked internal. The backend port is exposed to containers rather than published as a host port. That is a concrete boundary to inspect when understanding which services can be reached externally.</p>
    <ArticleEvidence src="/projects/evidence/jenkins-cd.webp" width={1920} height={951} alt="Jenkins DevOps-CD run triggered by an upstream pipeline and deploying to the VPS" caption="The CD run identifies an upstream pipeline trigger and a Deploy to VPS stage. It shows the downstream half of the chained workflow." source={`${s}/docs/images/jenkins_cd_pipeline.png`} />
    <h2 id="bootstrap">Preparing the host</h2>
    <p>A separate <code>DevOps-InitDomain</code> job uses Ansible to prepare the domain-facing reverse proxy. The <a href={`${s}/ansible/playbook.yaml`}>playbook</a> configures Nginx and invokes Certbot. Keeping initialization separate means the normal application release does not need to reinstall that host setup every time an image changes.</p>
    <p>There is an operational consequence: provisioning, certificate setup, and application delivery have separate failure modes. The playbook ignores Certbot errors, so a completed initialization job alone does not establish that TLS was issued successfully. Certificate status needs its own verification.</p>
    <ArticleEvidence src="/projects/evidence/jenkins-host-setup.webp" width={1920} height={951} alt="Jenkins initialization job running the Ansible host setup playbook" caption="The separate initialization job runs the Ansible playbook for host preparation. It is distinct from the normal application release." source={`${s}/docs/images/jenkins_infra_pipeline.png`} />
    <h2 id="monitoring">Monitoring and validation</h2>
    <p>The backend tests cover its data and metrics routes, and the repository includes a Prometheus scrape configuration targeting <code>backend:5000</code>. However, the Prometheus and Grafana services are commented out in the checked Compose file. The deploy job copies monitoring configuration, but that does not start a monitoring stack. This snapshot therefore demonstrates instrumentation and prepared configuration, rather than an active end-to-end monitoring deployment.</p>
    <ArticleEvidence src="/projects/evidence/jenkins-stage-view.png" width={1920} height={951} alt="Jenkins pipeline stage view with recorded CI results" caption="A recorded Jenkins stage view documents captured pipeline runs rather than current service health." source={`${s}/docs/images/jenkins_pipeline_stage_view.png`} />
    <h2 id="tradeoffs">Release tradeoffs</h2>
    <p>The release mechanism favors an understandable single-host workflow. Images use the mutable <code>latest</code> tag, and the deploy job uses password-based SSH with host-key checking disabled. Those choices simplify a lab, but make artifact identity and host authentication weaker than a hardened release process.</p>
    <p>The Jenkinsfiles also do not implement a health-gated rollout or automatic rollback. The next useful improvements would be immutable image references, verified SSH host keys, an application smoke check after Compose starts, and a known previous version to restore. Those are proposed improvements, not features claimed by this project.</p>
    <h2 id="sources">Source files</h2>
    <ul className="source-files"><li><a href={`${s}/Jenkinsfile`}>Jenkinsfile</a><span>Application checks, image publication, and downstream job trigger.</span></li><li><a href={`${s}/Jenkinsfile.deploy`}>Jenkinsfile.deploy</a><span>SSH deployment and Compose update sequence.</span></li><li><a href={`${s}/docker-compose.yml`}>docker-compose.yml</a><span>Container networking and currently disabled monitoring services.</span></li><li><a href={`${s}/backend/test_app.py`}>Backend tests</a><span>What the CI suite actually checks.</span></li></ul>
  </>;
}
