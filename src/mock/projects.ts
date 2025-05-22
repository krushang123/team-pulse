import { Project } from "@/store/project/types"

export const projects: Project[] = [
  {
    id: "p1",
    name: "AI Chatbot Prototype for Support Tickets",
    description:
      "Prototype and test GPT-powered AI assistant for support queries and helpdesk workflows across multiple user flows.",
    createdAt: "2025-05-20T12:30:00Z",
    tasks: [
      {
        id: "t1",
        title: "Train GPT model on support transcripts",
        description:
          "Feed past resolved tickets into the model for contextual fine-tuning.",
        status: "in-progress",
        priority: "high",
        assignee: {
          id: "u1",
          name: "Alice Harper",
          avatarUrl: "/avatars/alice.png",
        },
        createdAt: "2025-05-10T09:00:00Z",
        updatedAt: "2025-05-20T11:00:00Z",
      },
      {
        id: "t2",
        title: "Design fallback for unsupported queries",
        description: "Use human agent escalation when GPT fails to understand.",
        status: "todo",
        priority: "medium",
        createdAt: "2025-05-14T14:00:00Z",
        updatedAt: "2025-05-14T14:00:00Z",
      },
    ],
  },
  {
    id: "p2",
    name: "Website Footer Polish",
    description: "Tweak links, legal text, and responsiveness.",
    createdAt: "2025-05-18T08:00:00Z",
    updatedAt: "2025-05-18T18:00:00Z",
    tasks: [],
  },
  {
    id: "p3",
    name: "Product Launch Campaign Strategy",
    description:
      "Plan social media, email, and influencer campaigns ahead of major launch. Define goals, schedule, and KPIs.",
    createdAt: "2025-05-19T10:15:00Z",
    updatedAt: "2025-05-19T10:15:00Z",
    tasks: [
      {
        id: "t3",
        title: "Design teaser assets",
        description: "Create preview banners, short video, and static posts.",
        status: "done",
        priority: "medium",
        assignee: { id: "u2", name: "Bob Lee" },
        createdAt: "2025-05-12T10:00:00Z",
        updatedAt: "2025-05-14T10:00:00Z",
      },
    ],
  },
  {
    id: "p4",
    name: "Next.js Migration",
    description:
      "Migrate legacy app to Next.js with full SSR, layout routes, and edge functions.",
    createdAt: "2025-05-21T08:30:00Z",
    updatedAt: "2025-05-21T08:30:00Z",
    tasks: Array.from({ length: 6 }).map((_, i) => ({
      id: `t${i + 4}`,
      title: `Page ${i + 1} rewrite`,
      description: `Convert old component page ${i + 1} to Next.js with updated route handler.`,
      status: i < 2 ? "done" : i < 4 ? "in-progress" : "todo",
      priority: i % 3 === 0 ? "high" : "medium",
      assignee: { id: `u${(i % 5) + 1}`, name: `User ${(i % 5) + 1}` },
      createdAt: `2025-05-${10 + i}T08:00:00Z`,
      updatedAt: `2025-05-${15 + i}T08:00:00Z`,
    })),
  },
  {
    id: "p5",
    name: "Q2 Financial Reports",
    description:
      "Compile expense, income, and forecasting reports for stakeholders.",
    createdAt: "2025-05-16T13:00:00Z",
    updatedAt: "2025-05-16T14:00:00Z",
    tasks: [],
  },
  {
    id: "p6",
    name: "Slack Bot MVP",
    description:
      "Build a Slack-integrated tool for quick task assignment, daily standup logging, and on-call alerts.",
    createdAt: "2025-05-20T09:45:00Z",
    updatedAt: "2025-05-20T09:45:00Z",
    tasks: [
      {
        id: "t10",
        title: "Connect OAuth flow",
        description: "Enable workspace connection and permissions request.",
        status: "done",
        priority: "high",
        assignee: { id: "u4", name: "Ethan Zhou" },
        createdAt: "2025-05-11T11:00:00Z",
        updatedAt: "2025-05-17T11:00:00Z",
      },
      {
        id: "t11",
        title: "Test slash command `/assign`",
        description: "Simulate in test channels and log assignments.",
        status: "todo",
        priority: "medium",
        createdAt: "2025-05-15T09:00:00Z",
        updatedAt: "2025-05-15T09:00:00Z",
      },
    ],
  },
  {
    id: "p7",
    name: "Design System Refactor",
    description:
      "Remove unused tokens, rework grid system, migrate to Tailwind 4 when stable.",
    createdAt: "2025-05-13T17:00:00Z",
    updatedAt: "2025-06-13T17:00:00Z",
    tasks: [],
  },
  {
    id: "p8",
    name: "Customer Interview Series",
    description:
      "Interview power users to shape roadmap and uncover pain points. Schedule, record, and summarize findings.",
    createdAt: "2025-05-20T12:00:00Z",
    updatedAt: "2025-05-20T12:00:00Z",
    tasks: [
      {
        id: "t12",
        title: "Set up Calendly availability",
        description: "Create open booking slots over the next 2 weeks.",
        status: "in-progress",
        priority: "low",
        createdAt: "2025-05-13T09:00:00Z",
        updatedAt: "2025-05-18T09:00:00Z",
      },
    ],
  },
  {
    id: "p9",
    name: "Internal Onboarding Wiki",
    description: "Create one-stop Notion resource for devs, ops, and PMs.",
    createdAt: "2025-05-21T15:00:00Z",
    updatedAt: "2025-05-21T15:00:00Z",
    tasks: [],
  },
  {
    id: "p10",
    name: "CI/CD Audit",
    description:
      "Analyze and document CI pipeline health and flaky tests. Archive old jobs.",
    createdAt: "2025-05-17T10:00:00Z",
    updatedAt: "2025-05-17T10:00:00Z",
    tasks: [
      {
        id: "t13",
        title: "List outdated workflows",
        description: "Remove or archive unused GitHub Actions.",
        status: "done",
        priority: "medium",
        assignee: { id: "u6", name: "Liam Chen" },
        createdAt: "2025-05-12T10:00:00Z",
        updatedAt: "2025-05-15T10:00:00Z",
      },
    ],
  },
]
