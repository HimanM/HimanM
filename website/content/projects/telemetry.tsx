import { ArticleEvidence } from '@/components/ArticleEvidence';
import { ArticleDiagram } from '@/components/ArticleDiagram';

const s = 'https://github.com/HimanM/Github-Actions-Telemetry/blob/a6191007974ef5736a702a151cc42979b361681d';
export const toc = [ ['observation', 'Observing without editing workflows'], ['polling', 'Waiting for the run set'], ['reports', 'From API responses to reports'], ['permissions', 'Permissions and retention'], ['limits', 'Integration boundaries'], ['sources', 'Source files'] ];

export default function TelemetryArticle() {
  return <>
    <p>A repository can spread its delivery work across several GitHub Actions workflows. Looking at one green check tells only part of that story. This reusable action gathers workflow, job, and step information for a commit and turns it into a structured report.</p>
    <p>The observer is an original Python-based composite action. It works through GitHub’s API instead of requiring telemetry steps inside every target workflow. The result is a separate observation layer, with useful limits around polling, commit correlation, and token permissions.</p>
    <h2 id="observation">Observing without editing workflows</h2>
    <p>The <a href={`${s}/action.yml`}>action definition</a> installs Python 3.11 and <code>requests</code>, reads the repository and commit SHA from the caller’s GitHub context, and accepts a token and optional reporting settings. The implementation queries Actions endpoints to enumerate workflows and retrieve runs, jobs, and steps.</p>
    <p>Commit identity is the main correlation key. This is helpful when several workflows respond to one push, but it is different from tracing one specific event or run. Re-runs and different events attached to the same SHA can belong to the same observed group.</p>
    <ArticleDiagram name="telemetry" />
    <h2 id="polling">Waiting for the run set</h2>
    <p>The <a href={`${s}/scripts/observer.py`}>observer implementation</a> delays before polling so it does not immediately conclude that no work exists. Defaults include a 60-second initial delay, 15-second polling interval, a 30-second run-count stability period, and a maximum wait of one hour.</p>
    <p>Discovery first waits for the run count to stabilize; a separate loop then waits for the discovered runs to finish. Completed jobs remain available through the API, so short jobs do not simply disappear between polls. A downstream run that starts after the observer finishes can still be absent, and pending work can exhaust the timeout. The report also selects one run per workflow, rather than preserving every re-run for a SHA.</p>
    <h2 id="reports">From API responses to reports</h2>
    <p>The observer writes JSON containing status, timing, and commit context. An optional HTTP integration sends that payload to another API using bearer authentication. Posting failures are caught, so an unavailable reporting endpoint does not necessarily fail the action.</p>
    <p>The <a href={`${s}/scripts/generate_svg.py`}>SVG renderer</a> converts the payload into a stacked workflow and step-status view. It is a status overview, rather than a time-proportional Gantt chart. Sample JSON and a committed SVG make the output inspectable without operating a separate dashboard service.</p>
    <ArticleEvidence src="/projects/evidence/telemetry-status-report.webp" width={880} height={610} alt="Committed workflow execution report with success, failure, skipped, in-progress, and not-run states" caption="The committed sample distinguishes workflow outcomes, including an intentional failure and a workflow that did not run. It is a saved report, not live status." source={`${s}/workflow_status.svg`} />
    <h2 id="permissions">Permissions and retention</h2>
    <p>Read-only collection needs Actions and repository read access. The repository’s own workflow uses broader permissions because it can commit a refreshed SVG and remove earlier cancelled or skipped observer runs.</p>
    <p>That cleanup setting has a real retention effect: it calls the workflow-run deletion API. It should be an explicit choice for a consuming repository, not an invisible prerequisite to gathering telemetry. The API key and endpoint settings also define where the collected metadata can leave GitHub.</p>
    <h2 id="limits">Integration boundaries</h2>
    <p>The example workflows exercise several trigger types, including an intentionally failing job and downstream <code>workflow_run</code> activity. They are useful test scenarios, but source inspection exposes two integration gaps. The README consumes <code>json_path</code> and <code>svg_path</code> as action outputs, while the composite action does not declare the output mapping that would expose them to callers.</p>
    <p>For <code>workflow_run</code>, the observer workflow passes <code>github.sha</code> rather than explicitly selecting the triggering run’s <code>head_sha</code>. That can select a different commit from the upstream run. Correcting those contracts, and escaping workflow names before inserting them into SVG XML, would strengthen the action before broader reuse. No adoption or performance figures are claimed here.</p>
    <h2 id="sources">Source files</h2>
    <ul className="source-files"><li><a href={`${s}/action.yml`}>action.yml</a><span>Inputs, credentials, runtime, and composite-action contract.</span></li><li><a href={`${s}/scripts/observer.py`}>observer.py</a><span>Polling, correlation, JSON collection, and optional delivery.</span></li><li><a href={`${s}/scripts/generate_svg.py`}>generate_svg.py</a><span>Report rendering and SVG structure.</span></li><li><a href={`${s}/.github/workflows/observer.yml`}>Observer workflow</a><span>Trigger wiring, permissions, artifact handling, and cleanup.</span></li></ul>
  </>;
}
