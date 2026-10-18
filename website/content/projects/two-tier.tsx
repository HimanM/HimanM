import { ArticleEvidence } from '@/components/ArticleEvidence';
import { ArticleDiagram } from '@/components/ArticleDiagram';

const s = 'https://github.com/HimanM/aws-secure-two-tier-architecture/blob/a0c3912af9ab4de06c5842e8fda024fd2f3fab74';
export const toc = [ ['boundary', 'A small, inspectable network boundary'], ['request', 'Following the private API call'], ['bootstrap', 'Bootstrapping the two machines'], ['egress', 'Why the private subnet needs egress'], ['validation', 'Evidence and the limits of the design'], ['sources', 'Source files'] ];

export default function TwoTierArticle() {
  return <>
    <p>This AWS lab is deliberately small enough to trace end to end. A public EC2 instance serves a Next.js frontend, while a second EC2 instance runs FastAPI in a private subnet. Terraform defines their network and the security-group relationship between them.</p>
    <p>The central lesson is that a browser does not need direct access to the backend machine. The frontend server can act as the bridge to a private API, while AWS routes and security groups define how that traffic is allowed to move.</p>
    <h2 id="boundary">A small, inspectable network boundary</h2>
    <p>The <a href={`${s}/terraform/main.tf`}>Terraform configuration</a> defines a <code>10.0.0.0/16</code> VPC in <code>us-west-2</code>. Public subnet <code>10.0.1.0/24</code> and private subnet <code>10.0.2.0/24</code> both sit in <code>us-west-2a</code>.</p>
    <p>The frontend uses a <code>t2.small</code> instance with public access. The backend uses a <code>t2.micro</code> and a fixed private address. Its security group accepts port 8000 from the frontend security group, rather than from all internet addresses. That source-group rule is the key application-tier boundary.</p>
    <ArticleDiagram name="two-tier" />
    <h2 id="request">Following the private API call</h2>
    <p>A visitor reaches the frontend’s public address on port 3000. The Next.js <a href={`${s}/app/frontend/app/api/hello/route.ts`}>API route</a> then calls the private backend address. FastAPI exposes <code>/api/hello</code> on port 8000 and returns the response through that server-side proxy.</p>
    <p>This is different from putting the backend’s private IP directly into browser JavaScript and expecting a visitor’s laptop to route to it. The frontend host has network access inside the VPC; the browser does not. That distinction makes this a useful networking exercise even though the application endpoint itself is simple.</p>
    <h2 id="bootstrap">Bootstrapping the two machines</h2>
    <p>EC2 user-data scripts clone the repository and install the applications. The backend bootstrap creates a systemd service running Uvicorn on <code>0.0.0.0:8000</code>. The frontend bootstrap installs and starts the Next.js application with the backend address available to it.</p>
    <p>This captures machine setup alongside resource creation, but also couples provisioning to external package downloads and the repository’s contents at bootstrap time. There is no separate immutable-image release mechanism here. Reproducibility would improve with explicit version references and a defined application-update path.</p>
    <ArticleEvidence src="/projects/evidence/two-tier-terraform-output.webp" width={740} height={341} alt="Terraform apply output listing the public frontend and private backend addresses" caption="Terraform reports 14 resources added and prints a public frontend address and private backend address. Apply output does not independently test the API." source={`${s}/docs/sucess.png`} />
    <h2 id="egress">Why the private subnet needs egress</h2>
    <p>The public subnet routes through an Internet Gateway. The private subnet uses a NAT Gateway in the public subnet for outbound traffic. That lets the backend install dependencies or initiate external connections without assigning it a public IP.</p>
    <p>NAT is an outbound path, not an inbound exposure mechanism. Application ingress still follows the frontend-to-backend security-group rule. The distinction between route tables and allowed inbound traffic is one of the most useful parts of this lab.</p>
    <ArticleEvidence src="/projects/evidence/two-tier-routing.webp" width={1920} height={951} alt="AWS VPC resource map showing two subnets, route tables, an Internet Gateway, and a NAT Gateway" caption="The VPC resource map shows the two subnet routes and their Internet Gateway and NAT Gateway connections in one availability zone." source={`${s}/docs/aws%20vpc.png`} />
    <h2 id="validation">Evidence and the limits of the design</h2>
    <p>The repository includes Terraform plan/apply outputs, AWS-console screenshots, and the frontend’s connectivity-test interface. The interface screenshot alone does not establish a successful API response. The separate GitHub Pages workflow builds a static documentation/demo version and removes the API route before export. Its public domain should therefore not be mistaken for proof that the EC2 pair is currently running.</p>
    <p>The design has one availability zone and one machine per tier. It does not implement high availability, even though the README uses broader availability language. The frontend security group also permits SSH from any IP and publishes the application directly on port 3000.</p>
    <p>For a stronger deployment, the next changes would be restricted administrative access, a defined TLS/load-balancer entry point, independent release artifacts, and a deliberate redundancy plan. Those are extensions to this educational segmentation lab, not properties already established by it.</p>
    <h2 id="sources">Source files</h2>
    <ul className="source-files"><li><a href={`${s}/terraform/main.tf`}>Terraform resources</a><span>Instances, subnets, routes, NAT, and security groups.</span></li><li><a href={`${s}/terraform/user_data_backend.sh`}>Backend bootstrap</a><span>Application installation and systemd startup.</span></li><li><a href={`${s}/app/frontend/app/api/hello/route.ts`}>Frontend API proxy</a><span>How the public tier reaches the private API.</span></li><li><a href={`${s}/.github/workflows/deploy.yml`}>Documentation deployment</a><span>Why the Pages site is separate from the AWS runtime.</span></li></ul>
  </>;
}
