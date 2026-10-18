export type Project = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  description: string;
  repository: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    "slug": "aws-secure-full-stack-platform",
    "title": "Full-Stack AWS Platform",
    "label": "Cloud infrastructure",
    "summary": "A Terraform-managed AWS platform for a static web app and private API.",
    "description": "An AWS full-stack architecture using Terraform, CloudFront, API Gateway, ECS Fargate, DynamoDB, and GitHub Actions OIDC.",
    "repository": "https://github.com/HimanM/aws-terraform-secure-fullstack-platform",
    "tags": [
      "AWS",
      "Terraform",
      "ECS Fargate",
      "GitHub Actions OIDC"
    ]
  },
  {
    "slug": "eks-gitops-platform",
    "title": "EKS GitOps Platform",
    "label": "Kubernetes and GitOps",
    "summary": "Separate staging and production EKS clusters managed with Terraform and Argo CD.",
    "description": "A Kubernetes GitOps platform using Terraform, EKS, GitHub Actions, Argo CD, Istio, Prometheus, and Kiali.",
    "repository": "https://github.com/HimanM/eks-gitops-terraform-argocd-platform",
    "tags": [
      "AWS EKS",
      "Terraform",
      "Argo CD",
      "Istio"
    ]
  },
  {
    "slug": "devsecops-aws-pipeline",
    "title": "DevSecOps AWS Pipeline",
    "label": "Security automation",
    "summary": "A GitHub Actions delivery pipeline with source, container, infrastructure, and policy checks.",
    "description": "A DevSecOps CI/CD workflow with Gitleaks, Trivy, Checkov, OPA policy checks, Terraform, AWS OIDC, and approval gates.",
    "repository": "https://github.com/HimanM/devsecops-aws-pipeline-githubactions",
    "tags": [
      "GitHub Actions",
      "Trivy",
      "Checkov",
      "OPA"
    ]
  },
  {
    "slug": "brokenops",
    "title": "BrokenOps",
    "label": "DevOps learning platform",
    "summary": "A hands-on troubleshooting lab that launches intentionally broken Linux VMs.",
    "description": "BrokenOps is a DevOps and sysadmin training platform using React, FastAPI, Docker Compose, cloud-init, and Linux KVM/libvirt.",
    "repository": "https://github.com/HimanM/BrokenOps",
    "tags": [
      "FastAPI",
      "Docker Compose",
      "KVM / libvirt",
      "CI verification"
    ]
  },
  {
    "slug": "jenkins-chained-cicd",
    "title": "Chained Jenkins CI/CD",
    "label": "Delivery automation",
    "summary": "A chained Jenkins workflow that builds container images and deploys a web app to a VPS.",
    "description": "A chained Jenkins pipeline for a Next.js and Flask app, with Docker Hub images, SSH deployment, and Ansible host setup.",
    "repository": "https://github.com/HimanM/jenkins-chained-cicd-infra-automation",
    "tags": [
      "Jenkins",
      "Docker Compose",
      "Ansible",
      "Prometheus"
    ]
  },
  {
    "slug": "github-actions-telemetry",
    "title": "GitHub Actions Telemetry",
    "label": "Developer tooling",
    "summary": "A reusable action that collects workflow, job, and step results into JSON and an SVG status report.",
    "description": "A GitHub Actions telemetry tool that gathers workflow, job, and step status and duration data and renders an SVG status report.",
    "repository": "https://github.com/HimanM/Github-Actions-Telemetry",
    "tags": [
      "GitHub Actions",
      "Python",
      "REST API",
      "SVG"
    ]
  },
  {
    "slug": "iac-config-management-demo",
    "title": "Terraform & Ansible Automation",
    "label": "Infrastructure automation",
    "summary": "A documented AWS setup that divides infrastructure provisioning and host configuration.",
    "description": "An AWS infrastructure automation demo using Terraform, Ansible, GitHub Actions, GHCR, Prometheus, Grafana, and Loki.",
    "repository": "https://github.com/HimanM/iac-config-mgmt-enterprise-demo",
    "tags": [
      "Terraform",
      "Ansible",
      "GitHub Actions",
      "Observability"
    ]
  },
  {
    "slug": "knative-openclaw-kubernetes",
    "title": "OpenClaw on Knative",
    "label": "Serverless Kubernetes",
    "summary": "A local Kubernetes experiment that scales an agent runtime to zero between requests.",
    "description": "A local Kubernetes deployment experiment using Knative Serving, Kourier, and persistent storage to scale an OpenClaw runtime to zero when idle.",
    "repository": "https://github.com/HimanM/OpneClaw-k8s-with-Knative",
    "tags": [
      "Kubernetes",
      "Knative",
      "Kourier",
      "Scale to zero"
    ]
  },
  {
    "slug": "dockerized-app-aws-guide",
    "title": "From Docker to ECS Fargate",
    "label": "AWS deployment workflow",
    "summary": "An ECS Fargate deployment guide with a container build and service update workflow.",
    "description": "An AWS container deployment example using Docker, GitHub Actions, Amazon ECR, and Amazon ECS Fargate.",
    "repository": "https://github.com/HimanM/dockerized-app-aws-deployment-guide",
    "tags": [
      "Docker",
      "GitHub Actions",
      "Amazon ECR",
      "ECS Fargate"
    ]
  },
  {
    "slug": "aws-secure-two-tier-architecture",
    "title": "AWS Two-Tier Networking",
    "label": "Cloud networking",
    "summary": "A Terraform deployment that separates a public frontend from a private API host.",
    "description": "A two-tier AWS network demo using Terraform, public and private subnets, EC2, security groups, and a NAT Gateway.",
    "repository": "https://github.com/HimanM/aws-secure-two-tier-architecture",
    "tags": [
      "AWS VPC",
      "Terraform",
      "EC2",
      "Network security"
    ]
  }
];
