/**
 * The seven capability panels, as data.
 *
 * These lived inside the old hero as ~180 lines of inline JSX embedded in a
 * module-scope array — each entry carried its own markup, so the layout could
 * not be changed without editing seven copies of it. Here the entries describe
 * *what to show*; `ShowcaseSequence` decides how.
 */

/** A small inline visual rendered beneath a panel's caption. */
export type Readout =
  | { kind: "meter"; label: string; value: string; fill: number }
  | { kind: "series"; label: string; value: string; points: number[] }
  | { kind: "rows"; rows: { label: string; value: string }[] };

export interface ShowcasePanel {
  /** Two-digit index, shown in mono. */
  index: string;
  /** Mono uppercase category label. */
  label: string;
  /** The headline number or claim. This is the panel's reason to exist. */
  metric: string;
  /** One line of context under the metric. */
  caption: string;
  readout: Readout;
}

export const showcasePanels: ShowcasePanel[] = [
  {
    index: "01",
    label: "Model Operations",
    metric: "42ms",
    caption: "Median inference latency on domain fine-tuned models in production.",
    readout: {
      kind: "meter",
      label: "Throughput sustained",
      value: "99.98%",
      fill: 0.92,
    },
  },
  {
    index: "02",
    label: "Workflow Automation",
    metric: "1,420 jobs / day",
    caption: "Routed, executed, and reconciled without a manual queue behind them.",
    readout: {
      kind: "rows",
      rows: [
        { label: "Invoice extraction", value: "Auto-routed" },
        { label: "Patient record sync", value: "Completed" },
        { label: "Exception handling", value: "Escalated" },
      ],
    },
  },
  {
    index: "03",
    label: "Business Analytics",
    metric: "$1.2M",
    caption: "Annual operating overhead removed across finance and fulfilment.",
    readout: {
      kind: "series",
      label: "Efficiency lift",
      value: "+70%",
      points: [40, 52, 48, 66, 71, 84, 95],
    },
  },
  {
    index: "04",
    label: "Autonomous Agents",
    metric: "Multi-agent execution",
    caption: "Agents that complete work end to end, with a decision trail behind every action.",
    readout: {
      kind: "rows",
      rows: [
        { label: "Records verified", value: "48" },
        { label: "Confidence", value: "99.8%" },
        { label: "Action", value: "Submitted" },
      ],
    },
  },
  {
    index: "05",
    label: "Pipeline Intelligence",
    metric: "94 / 100",
    caption: "Enterprise lead scoring wired directly into the CRM your team already uses.",
    readout: {
      kind: "meter",
      label: "Qualification accuracy",
      value: "94%",
      fill: 0.94,
    },
  },
  {
    index: "06",
    label: "Digital Infrastructure",
    metric: "3.4x conversion",
    caption: "Edge-rendered interfaces built for the buyer, not for the design award.",
    readout: {
      kind: "meter",
      label: "Lighthouse performance",
      value: "100 / 100",
      fill: 1,
    },
  },
  {
    index: "07",
    label: "Governance",
    metric: "SOC 2 · HIPAA",
    caption: "Access governance, audit trails, and data isolation as build requirements.",
    readout: {
      kind: "rows",
      rows: [
        { label: "Active systems", value: "12 / 12" },
        { label: "Data residency", value: "Isolated" },
        { label: "Audit coverage", value: "Complete" },
      ],
    },
  },
];
