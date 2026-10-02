module.exports = {
  docs: [
    "intro", // root overview of the Authors pallet
    "start", // first practical introduction

    {
      type: "category",
      label: "Concept",
      items: [
        "concept/author",
        "concept/role-system",
        "concept/collateral",
        "concept/probation",
        "concept/funding",
        "concept/elections",
        "concept/runtime",
      ],
    },

    {
      type: "category",
      label: "Architecture",
      items: [
        "architecture/overview",
        "architecture/role-manager",
        "architecture/commitments",
        "architecture/elections",
        "architecture/storage",
        "architecture/lifecycle",
      ],
    },

    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/installation",
        "getting-started/config",
        "getting-started/genesis",
        "getting-started/enroll",
        "getting-started/funding",
        "getting-started/elections",
        "getting-started/runtime-usage",
      ],
    },

    {
      type: "category",
      label: "Core",
      items: [
        "core/operations",
        "core/extrinsics",
        "core/inspectors",
        "core/events",
        "core/errors",
        "core/rpc-ui",
      ],
    },

    {
      type: "category",
      label: "Advanced",
      items: [
        "advanced/election-models",
        "advanced/weights",
        "advanced/benchmarking",
        "advanced/testing",
        "advanced/mock-runtime",
        "advanced/upcoming",
      ],
    },
  ],
};