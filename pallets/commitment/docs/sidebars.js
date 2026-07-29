module.exports = {
  docs: [
    "intro", 
    "start", 

    {
      type: "category",
      label: "Concepts",
      items: [
        "concepts/commitment", 
        "concepts/vs-locks", 
        "concepts/models",
        "concepts/variants", 
        "concepts/lazy-balance", 
        "concepts/lifecycle", 
      ],
    },

    {
      type: "category",
      label: "Architecture",
      items: [
        "architecture/overview",
        "architecture/commitment", 
        "architecture/indexes", 
        "architecture/pools", 
        "architecture/balance", 
        "architecture/variants",
        "architecture/digest", 
      ],
    },

    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/installation",
        "getting-started/config",
        "getting-started/integrate",
        "getting-started/index",
        "getting-started/pool",
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
        "advanced/instances",
        "advanced/weights",
        "advanced/tests", 
        "advanced/balance", 
        "advanced/upcoming", 
      ],
    },
  ],
};