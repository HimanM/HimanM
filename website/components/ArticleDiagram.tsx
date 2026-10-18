type Node = [id: string, x: number, y: number, title: string, detail: string, width?: number];
type Edge = [path: string, label?: string, x?: number, y?: number, dashed?: boolean];
type Group = [x: number, y: number, width: number, height: number, label: string];
type Diagram = { height: number; title: string; caption: string; nodes: Node[]; edges: Edge[]; groups?: Group[] };

const diagrams: Record<string, Diagram> = {
  'aws-platform': {
    height: 365, title: 'Static delivery and the private AWS API path',
    caption: 'The frontend uses a public API entry point; the ALB and Fargate tasks stay inside the VPC.',
    groups: [[184, 156, 540, 119, 'PRIVATE SUBNETS']],
    nodes: [['browser',20,30,'Browser','Static app + API calls',130],['edge',235,30,'CloudFront','Origin Access Control'],['s3',490,30,'S3','Private static assets'],['api',20,190,'API Gateway','Public HTTP API',135],['link',200,190,'VPC Link','Private integration',125],['alb',365,190,'Internal ALB','Health: /health',135],['ecs',550,190,'Fargate tasks','No public IP',155],['db',550,300,'DynamoDB','Gateway endpoint',155]],
    edges: [['M150 58H235'],['M385 58H490'],['M85 86V190','API calls',95,137],['M155 218H200'],['M325 218H365'],['M500 218H550'],['M627 246V300']],
  },
  eks: {
    height: 355, title: 'Image publication and two independent GitOps environments',
    caption: 'Argo CD source URLs still reference an older repository name in this snapshot. Dashed connections indicate the reconciliation configuration that needs verification.',
    groups: [[20,226,315,110,'CLUSTER A / STAGING'],[405,226,315,110,'CLUSTER B / PRODUCTION']],
    nodes: [['ci',20,24,'GitHub Actions','Branch-specific image tags'],['registry',285,24,'GHCR','Frontend + backend'],['git',550,24,'Git manifests','Environment image refs'],['argo',285,132,'Argo CD','Auto-sync / prune / heal'],['stage',95,267,'EKS workloads','Istio · apps · HPA'],['prod',485,267,'EKS workloads','Istio · apps · HPA']],
    edges: [['M170 52H285'],['M95 80V112H625V80','commit image refs',440,105],['M625 80V160H435'],['M285 160H170V267',undefined,0,0,true],['M435 160H560V267',undefined,0,0,true]],
  },
  devsecops: {
    height: 350, title: 'Security gates and the AWS runtime boundary',
    caption: 'Plan/apply is separate from the runtime request path. Production reviewer requirements must be configured in GitHub Environment settings.',
    groups: [[184,204,540,121,'PRIVATE SUBNETS / TWO AZs']],
    nodes: [['push',15,20,'GitHub event','Source + image checks',150],['policy',205,20,'Security checks','Trivy · Checkov · OPA',150],['plan',395,20,'Terraform plan','Saved deployment plan',145],['review',580,20,'Production gate','Environment reviewers',145],['apply',580,119,'Terraform apply','OIDC role',145],['public',15,244,'Public ALB','Internet entry',145],['front',205,244,'Frontend ECS','Next.js proxy',145],['internal',395,244,'Internal ALB','Private API entry',145],['back',580,244,'Backend ECS','Private Fargate tasks',145]],
    edges: [['M165 48H205'],['M355 48H395'],['M540 48H580'],['M652 76V119'],['M652 175V204',undefined,0,0,true],['M160 272H205'],['M350 272H395'],['M540 272H580']],
  },
  brokenops: {
    height: 345, title: 'A browser session backed by a disposable Linux guest',
    caption: 'The backend integrates directly with a local Linux virtualization host. SSH carries terminal and verification sessions to the guest.',
    groups: [[203,142,520,171,'LOCAL LINUX HOST / KVM + LIBVIRT']],
    nodes: [['browser',20,28,'Learner browser','Terminal + lab UI',150],['web',280,28,'React / Nginx','API + WebSocket proxy'],['api',555,28,'FastAPI','Lab orchestration',155],['verify',20,200,'Lab verifier','verify.sh via SSH',150],['virt',235,200,'libvirt / KVM','qcow2 + cloud-init',170],['vm',530,200,'Disposable VM','Faulty Linux service',175]],
    edges: [['M170 56H280'],['M430 56H555'],['M632 84V118H320V200','create guest',415,110],['M405 228H530'],['M170 228H190V290H618V256','SSH verification',315,282],['M632 84V200','SSH / terminal',640,143,true]],
  },
  jenkins: {
    height: 335, title: 'Chained Jenkins jobs and the VPS application path',
    caption: 'CI publishes images and triggers CD; CD pulls the images and updates Compose on the VPS. Monitoring services are commented out in the checked runtime configuration.',
    groups: [[185,178,540,132,'VPS / HOST NGINX + DOCKER COMPOSE']],
    nodes: [['git',15,24,'GitHub webhook','Configured in Jenkins',150],['ci',205,24,'Jenkins CI','Lint · pytest · build',145],['registry',395,24,'Docker Hub','Mutable latest images',145],['cd',580,24,'Jenkins CD','SSH + Compose update',145],['user',15,230,'Browser','Application request',145],['nginx',205,230,'Host Nginx','Reverse proxy',145],['front',395,230,'Frontend','Host port 57002',145],['api',580,230,'Flask API','Container port 5000',145]],
    edges: [['M165 52H205'],['M350 52H395'],['M277 24V8H652V24'],['M580 67H540',undefined,0,0,true],['M652 80V178','deploy',660,137],['M160 258H205'],['M350 258H395'],['M540 258H580']],
  },
  telemetry: {
    height: 315, title: 'GitHub API observation and report generation',
    caption: 'Runs are correlated by commit SHA. The SVG is a workflow/step status report rather than a time-proportional chart.',
    nodes: [['input',20,35,'Repository + SHA','Caller GitHub context',170],['observe',285,35,'Python observer','Delay · poll · stabilize',170],['api',555,35,'Actions REST API','Runs · jobs · steps',170],['json',285,225,'JSON report','Structured run data',170],['svg',555,225,'SVG report','Workflow / step overview',170],['external',20,225,'Optional API','Bearer-auth POST',170]],
    edges: [['M190 63H285'],['M455 49H555','poll',495,38],['M555 77H455','results',487,97],['M370 91V225'],['M455 253H555'],['M285 253H190']],
  },
  iac: {
    height: 338, title: 'Terraform infrastructure and Ansible host configuration',
    caption: 'All three EC2 instances use the public subnet in the checked Terraform. The separately defined private subnet is not used by these hosts.',
    groups: [[20,180,705,135,'ONE AZ / PUBLIC SUBNET']],
    nodes: [['ci',20,30,'GitHub Actions','Images + infra workflows',170],['tf',285,30,'Terraform','VPC · EC2 · remote state',170],['ans',555,30,'Ansible','Inventory from outputs',170],['front',50,230,'Frontend EC2','App + host exporters',170],['back',285,230,'Backend EC2','API + host exporters',170],['mon',520,230,'Monitoring EC2','Prometheus / Grafana / Loki',190]],
    edges: [['M190 58H285'],['M455 58H555','outputs',490,45],['M640 86V151H135V230'],['M640 151H370V230'],['M640 151V230']],
  },
  knative: {
    height: 340, title: 'Knative activation with persistent gateway state',
    caption: 'A local Kourier port-forward provides ingress. The PVC survives pod termination; existing configuration is only seeded when absent.',
    groups: [[182,20,544,300,'LOCAL MINIKUBE / KIND CLUSTER']],
    nodes: [['browser',15,95,'Browser','localhost route',140],['ingress',205,95,'Kourier','Local port-forward',145],['knative',390,95,'Knative Serving','Activation + autoscaling',145],['pod',575,95,'OpenClaw pod','0–1 replica',135],['config',205,242,'ConfigMap / Secret','Seed config + credentials',170],['pvc',540,242,'10 GiB PVC','Workspace + config',170]],
    edges: [['M155 123H205'],['M350 123H390'],['M535 123H575'],['M625 151V242','persist',635,207],['M375 270H450V181H642V151','seed on first boot',445,200,true]],
  },
  'ecs-guide': {
    height: 335, title: 'Static documentation or an ECS application release',
    caption: 'The AWS path updates an existing service. Cluster, network, task definition, and service creation are manual prerequisites in the guide.',
    nodes: [['push',20,130,'Main push','Wrapper workflow',150],['switch',245,130,'DEPLOY_AWS','Publication setting',150],['pages',545,25,'GitHub Pages','Static export',170],['build',245,258,'Docker build','Standalone Next.js',150],['ecr',440,258,'Amazon ECR','Commit-tagged image',130],['ecs',605,258,'Existing ECS service','Task definition update',130]],
    edges: [['M170 158H245'],['M395 158H450V53H545','false',460,108],['M320 186V258','true',330,222],['M395 286H440'],['M570 286H605']],
  },
  'two-tier': {
    height: 350, title: 'A public frontend with a private backend and NAT egress',
    caption: 'Both subnets are in one availability zone. The backend accepts port 8000 from the frontend security group.',
    groups: [[185,92,260,230,'PUBLIC SUBNET / us-west-2a'],[480,92,245,134,'PRIVATE SUBNET / SAME AZ']],
    nodes: [['browser',15,30,'Browser','Public frontend URL',145],['front',220,137,'Frontend EC2','Next.js :3000',180],['back',515,137,'Backend EC2','FastAPI :8000',180],['nat',220,260,'NAT Gateway','Outbound private traffic',180],['igw',15,260,'Internet Gateway','VPC internet path',150]],
    edges: [['M160 58H310V137','public request',200,47],['M400 165H515','private API',422,149],['M605 193V288H400','outbound only',490,278],['M220 288H165']],
  },
};

export function ArticleDiagram({ name }: { name: string }) {
  const diagram = diagrams[name];
  const marker = `diagram-arrow-${name}`;
  return <figure>
    <div className="project-diagram">
      <div className="project-diagram-scroll" tabIndex={0} role="region" aria-label={`${diagram.title}. Scroll horizontally to inspect the diagram.`}>
        <svg viewBox={`0 0 745 ${diagram.height}`} role="img" aria-labelledby={`${name}-title ${name}-description`}>
          <title id={`${name}-title`}>{diagram.title}</title>
          <desc id={`${name}-description`}>{diagram.caption} Components: {diagram.nodes.map(n => `${n[3]}, ${n[4]}`).join('; ')}.</desc>
          <defs><marker id={marker} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 7 3.5 0 7" fill="var(--muted)" /></marker></defs>
          {diagram.groups?.map(([x,y,width,height,label]) => <g key={label}><rect x={x} y={y} width={width} height={height} rx="5" fill="var(--fg)" fillOpacity=".025" stroke="var(--border-hover)" strokeDasharray="4 4" /><text x={x+12} y={y+20} fill="var(--muted)" fontSize="9" letterSpacing="1">{label}</text></g>)}
          {diagram.edges.map(([d,label,x,y,dashed],i) => <g key={i}><path d={d} fill="none" stroke="var(--muted)" strokeOpacity=".75" strokeWidth="1.2" strokeDasharray={dashed ? '4 4' : undefined} markerEnd={`url(#${marker})`} />{label && <text x={x} y={y} fill="var(--muted)" fontSize="10">{label}</text>}</g>)}
          {diagram.nodes.map(([id,x,y,title,detail,width=150]) => <g key={id}><rect x={x} y={y} width={width} height="56" rx="4" fill="var(--bg)" stroke="var(--border-hover)" /><rect x={x} y={y+12} width="2" height="32" fill="var(--accent)" /><text x={x+width/2} y={y+23} textAnchor="middle" fill="var(--fg)" fontSize="12" fontWeight="600">{title}</text><text x={x+width/2} y={y+41} textAnchor="middle" fill="var(--muted)" fontSize="10">{detail}</text></g>)}
        </svg>
      </div>
      <div className="project-diagram-note"><span>Architecture reconstructed from the linked implementation.</span><span className="md:hidden">Swipe to inspect →</span></div>
    </div>
    <figcaption>{diagram.caption}</figcaption>
  </figure>;
}
