import { ArticleEvidence } from '@/components/ArticleEvidence';
import { ArticleDiagram } from '@/components/ArticleDiagram';

const s = 'https://github.com/HimanM/BrokenOps/blob/5842bd9ce400da6859b2ff993dce96a5424b2f48';
export const toc = [ ['guest', 'From a lab definition to a VM'], ['access', 'Terminal and service access'], ['exercise', 'A concrete Nginx exercise'], ['verification', 'Checking the labs in CI'], ['host', 'The host is part of the system'], ['sources', 'Source files'] ];

export default function BrokenOpsArticle() {
  return <>
    <p>BrokenOps makes infrastructure troubleshooting the product. A learner launches an intentionally faulty Linux machine, diagnoses it in a browser terminal, repairs the service, and asks the platform to verify the result.</p>
    <p>That requires more than a frontend around shell commands. The implementation connects guest provisioning, virtual disks, network access, SSH sessions, verification scripts, and lab cleanup. Its supported environment is a native Linux host with KVM/libvirt, rather than a publicly hosted lab service.</p>
    <h2 id="guest">From a lab definition to a VM</h2>
    <p>The FastAPI backend reads a lab’s YAML definition and creates a qcow2 overlay backed by an Ubuntu 24.04 image. Cloud-init receives the lab setup and an injected SSH public key. The backend builds a <code>cidata</code> ISO with <code>xorriso</code>, then asks libvirt to define and start the guest.</p>
    <p>The <a href={`${s}/backend/engine.py`}>virtualization engine</a> connects to <code>qemu:///system</code>, supplies the requested CPU, memory, disk, and virtual network, and uses a NAT libvirt network. It can fall back to QEMU emulation if KVM is absent, but that is not evidence of equivalent performance or a supported nested-virtualization setup.</p>
    <ArticleDiagram name="brokenops" />
    <h2 id="access">Terminal and service access</h2>
    <p>The React frontend is served by Nginx. API and WebSocket requests reach FastAPI, which establishes AsyncSSH connections to the guest. This lets the browser terminal interact with the machine without requiring the learner to configure a local SSH client.</p>
    <p>The platform also proxies exposed service ports, restricted to the ports listed in the lab definition. Readiness is a separate operation: the status endpoint waits for an IP address and for cloud-init to finish before writing a ready marker. A background task checks those markers and stops labs after roughly an hour from that marker.</p>
    <h2 id="exercise">A concrete Nginx exercise</h2>
    <p>The <a href={`${s}/labs/nginx-broken/verify.sh`}>Nginx verifier</a> illustrates the model. Provisioning installs Nginx but changes its listener to the invalid port 80808. A learner needs to inspect the service and its configuration, repair the listener, and return Nginx to a running state on port 80.</p>
    <p>Verification runs the lab’s shell script over SSH. A zero exit status maps to a successful result. Checking both service activity and the listening port makes this more meaningful than simply asking whether a configuration file changed.</p>
    <ArticleEvidence src="/projects/evidence/brokenops-dashboard.png" width={1440} height={900} alt="BrokenOps lab dashboard showing troubleshooting exercises" caption="The repository’s dashboard capture shows the learner-facing lab interface. The VM runtime is provided by the local Linux host." source={`${s}/docs/lab-dashboard-top.png`} />
    <ArticleEvidence src="/projects/evidence/brokenops-verification.webp" width={1919} height={952} alt="BrokenOps Nginx lab with a passed verification and running service in the terminal" caption="The Nginx exercise shows a passed verification alongside service output. The verifier checks the repaired service and port 80." source={`${s}/docs/lab-nginx-service-down-success.png`} />
    <h2 id="verification">Checking the labs in CI</h2>
    <p>The lab-change workflow installs KVM/libvirt on an Ubuntu runner, prepares keys and the base image, starts Compose, and invokes <a href={`${s}/scripts/test_labs.py`}>the lab test runner</a>. That script launches changed labs, applies their <code>solution.sh</code>, runs verification, and checks exposed ports.</p>
    <p>This tests the exercise lifecycle rather than just the syntax of the YAML. The repository has a recorded successful lab-verification run from June 2026, but that run predates the reviewed snapshot. It is historical execution evidence, not a claim that every current path has been revalidated.</p>
    <h2 id="host">The host is part of the system</h2>
    <p>The backend container has privileged access, host networking, <code>/dev/kvm</code>, and the libvirt socket. Host setup also relaxes several firewall and virtualization security settings. Those are substantial local-lab assumptions; this is not an isolated web container suitable for dropping onto a shared production host.</p>
    <p>Source review also exposes a restricted-terminal branch that references an unassigned variable. That path needs correction before restricted-mode support can be treated as dependable. Shell functions that discourage guest shutdown are convenience protection, not a security boundary. The strongest part of the project is the reproducible exercise lifecycle, with clear room to strengthen host isolation and access handling.</p>
    <h2 id="sources">Source files</h2>
    <ul className="source-files"><li><a href={`${s}/backend/engine.py`}>VM engine</a><span>Disks, libvirt domains, and virtual networking.</span></li><li><a href={`${s}/backend/main.py`}>Backend API</a><span>Readiness, terminal access, verification, and cleanup.</span></li><li><a href={`${s}/docker-compose.yml`}>Runtime configuration</a><span>Host integration and container privileges.</span></li><li><a href={`${s}/scripts/test_labs.py`}>Lab verification runner</a><span>Automated launch, solve, verify, and port checks.</span></li></ul>
  </>;
}
