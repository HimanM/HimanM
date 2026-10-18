import AwsPlatform, { toc as awsToc } from './aws-platform';
import Eks, { toc as eksToc } from './eks';
import Devsecops, { toc as securityToc } from './devsecops';
import BrokenOps, { toc as brokenToc } from './brokenops';
import Jenkins, { toc as jenkinsToc } from './jenkins';
import Telemetry, { toc as telemetryToc } from './telemetry';
import Iac, { toc as iacToc } from './iac';
import Knative, { toc as knativeToc } from './knative';
import EcsGuide, { toc as ecsToc } from './ecs-guide';
import TwoTier, { toc as twoTierToc } from './two-tier';
import type { ComponentType } from 'react';

export const projectArticles: Record<string, { Content: ComponentType; toc: string[][]; reviewedAt: string; sourceRevision: string }> = {
  'aws-secure-full-stack-platform': { Content: AwsPlatform, toc: awsToc, reviewedAt: '2026-10-18', sourceRevision: 'fbc40006bcc9acf792afc743ba0f8f28f1cd4239' },
  'eks-gitops-platform': { Content: Eks, toc: eksToc, reviewedAt: '2026-10-18', sourceRevision: '95338e53eceede6c273bf0f88da0c89953f4a6a5' },
  'devsecops-aws-pipeline': { Content: Devsecops, toc: securityToc, reviewedAt: '2026-10-18', sourceRevision: 'bf71c435e5305933b5c5649d719a99a0f4489377' },
  brokenops: { Content: BrokenOps, toc: brokenToc, reviewedAt: '2026-10-18', sourceRevision: '5842bd9ce400da6859b2ff993dce96a5424b2f48' },
  'jenkins-chained-cicd': { Content: Jenkins, toc: jenkinsToc, reviewedAt: '2026-10-18', sourceRevision: '3c14646738f0ba1265d99b2c2bf9fdaa80677f88' },
  'github-actions-telemetry': { Content: Telemetry, toc: telemetryToc, reviewedAt: '2026-10-18', sourceRevision: 'a6191007974ef5736a702a151cc42979b361681d' },
  'iac-config-management-demo': { Content: Iac, toc: iacToc, reviewedAt: '2026-10-18', sourceRevision: '68b8c5157e9b428a91e30a34ac75b94ceb9ddc36' },
  'knative-openclaw-kubernetes': { Content: Knative, toc: knativeToc, reviewedAt: '2026-10-18', sourceRevision: 'f91532c328d6ad33b93d6e5cafae62ac913e5ff9' },
  'dockerized-app-aws-guide': { Content: EcsGuide, toc: ecsToc, reviewedAt: '2026-10-18', sourceRevision: 'cbaeab3393f2c44ba86c5cd593309517f1845178' },
  'aws-secure-two-tier-architecture': { Content: TwoTier, toc: twoTierToc, reviewedAt: '2026-10-18', sourceRevision: 'a0c3912af9ab4de06c5842e8fda024fd2f3fab74' },
};
