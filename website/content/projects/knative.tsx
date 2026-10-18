import { ArticleEvidence } from '@/components/ArticleEvidence';
import { ArticleDiagram } from '@/components/ArticleDiagram';

const s = 'https://github.com/HimanM/OpneClaw-k8s-with-Knative/blob/f91532c328d6ad33b93d6e5cafae62ac913e5ff9';
export const toc = [ ['setup', 'Preparing the local cluster'], ['request', 'A request wakes the gateway'], ['storage', 'State across scale-to-zero'], ['configuration', 'Configuration versus persistence'], ['limits', 'Operational boundaries'], ['sources', 'Source files'] ];

export default function KnativeArticle() {
  return <>
    <p>Scale-to-zero is straightforward for a stateless endpoint. An interactive gateway adds a more interesting question: what happens to its workspace and configuration when the pod disappears? This project explores that question by running OpenClaw as a Knative Service on a local Kubernetes cluster.</p>
    <p>The build combines Knative Serving, Kourier ingress, Kubernetes configuration and secrets, and a persistent volume. It is a local development experiment with recorded startup and scale-down behavior, rather than a public agent-hosting platform.</p>
    <h2 id="setup">Preparing the local cluster</h2>
    <p>The Linux/macOS and PowerShell scripts target Minikube or kind. They install Knative Serving and Kourier at <code>knative-v1.22.0</code>, wait for the control-plane deployments, select Kourier as ingress, and enable the Knative feature flags needed for persistent volumes.</p>
    <p>They then configure a local domain, create the <code>agents</code> namespace, store the Gemini API key and gateway password in a Kubernetes Secret, and apply the service manifest. A Kourier port-forward supplies local access. The scripts wait for Knative readiness, but the background port-forward itself receives only a short sleep rather than an explicit connection check.</p>
    <ArticleDiagram name="knative" />
    <h2 id="request">A request wakes the gateway</h2>
    <p>Traffic to <code>openclaw.agents.localhost</code> enters through the local Kourier forward and Knative routing. The <a href={`${s}/k8s/openclaw-knative.yaml`}>service manifest</a> sets minimum scale to zero, maximum scale to one, and container concurrency to one. It also sets a five-minute scale-to-zero retention period.</p>
    <p>These values make the workload deliberately single-instance. This is an experiment in idle-resource reduction and activation, not horizontal throughput scaling. The README gives a cold-start estimate, but the repository does not provide a benchmark method or measured CI report, so there is no measured latency claim in this case study.</p>
    <ArticleEvidence src="/projects/evidence/knative-terminating.webp" width={1022} height={356} alt="kubectl watch output showing an OpenClaw pod entering Terminating and Completed states" caption="The recorded watch shows a pod leaving Running and entering termination. This captures lifecycle state rather than measured idle-resource savings." source={`${s}/docs/images/06-terminating-pod.png`} />
    <ArticleEvidence src="/projects/evidence/knative-creating.webp" width={1919} height={989} alt="kubectl watch output showing a replacement OpenClaw pod Pending and ContainerCreating" caption="A later capture shows a replacement pod moving through Pending and ContainerCreating." source={`${s}/docs/images/07-scale-to-one-creating-pod.png`} />
    <h2 id="storage">State across scale-to-zero</h2>
    <p>A 10 GiB <code>ReadWriteOnce</code> claim is mounted at <code>/home/node/.openclaw</code>. The pod can terminate while its workspace survives. That storage choice is part of the reason to examine the one-replica limit: shared persistent state and concurrent replicas would require a different design.</p>
    <p>Persisting state also changes recovery behavior. Starting a fresh container does not necessarily mean starting from a clean workspace. Troubleshooting must distinguish an image problem, a configuration problem, and data already present on the volume.</p>
    <ArticleEvidence src="/projects/evidence/knative-running.webp" width={1918} height={951} alt="kubectl watch output with an OpenClaw pod Running beside the gateway login screen" caption="The replacement pod reaches Running. The browser still shows a gateway-token error, so pod readiness does not prove an authenticated application session." source={`${s}/docs/images/07-scale-to-one-pod-running.png`} />
    <h2 id="configuration">Configuration versus persistence</h2>
    <p>The README says startup refreshes <code>openclaw.json</code> from the ConfigMap on every boot. The checked manifest behaves differently: it copies the seed configuration only when the file does not already exist on the PVC.</p>
    <p>That means runtime edits can survive restarts, and a changed ConfigMap may not replace an existing file. This is an important implementation detail, because an operator could otherwise expect a restart to undo a bad configuration. The article follows the conditional copy in the manifest rather than repeating the stronger README claim.</p>
    <h2 id="limits">Operational boundaries</h2>
    <p>The container configuration drops capabilities, disables service-account token mounting, and uses a runtime-default seccomp profile. At the same time, device-pairing protection is explicitly disabled for local development, and the application image uses the floating <code>latest</code> tag.</p>
    <p>The scripts also modify cluster-wide Knative configuration, including the domain map. A disposable local cluster is the appropriate context for that behavior. Before adapting it for shared infrastructure, the next steps would include scoped configuration, restored device protection, an immutable image reference, and a documented policy for refreshing persisted configuration. Those improvements remain future work.</p>
    <h2 id="sources">Source files</h2>
    <ul className="source-files"><li><a href={`${s}/k8s/openclaw-knative.yaml`}>Knative manifest</a><span>Autoscaling, PVC, secrets, configuration copy, and security settings.</span></li><li><a href={`${s}/deploy-openclaw-knative.sh`}>Shell deployment script</a><span>Knative installation and local routing setup.</span></li><li><a href={`${s}/deploy-openclaw-knative.ps1`}>PowerShell deployment script</a><span>The corresponding Windows setup path.</span></li><li><a href={`${s}/README.md`}>README</a><span>Local walkthrough, screenshots, and documented assumptions.</span></li></ul>
  </>;
}
