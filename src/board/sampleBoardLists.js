const sampleBoardLists = [
  {
    id: "1a",
    title: "Current",
    cards: ["Task 1", "Task 2", "Task 3"],
  },
  {
    id: "1b",
    title: "Pending",
    cards: [
      "This is a test card",
      "Work on ABC",
      "Test data",
      "This is another card",
      "This is a longer list",
      "One more card",
      "Adding 1",
    ],
  },
  {
    id: "2c",
    title: "Next Week",
    cards: ["Do dishes", "Pay bills", "Workout", "Call Sam"],
  },
];

const sampleLanes = {
  canAddLanes: true,
  lanes: [
    {
      id: "lane1",
      title: "Planned Tasks",
      label: "2/2",
      cards: [
        {
          id: "Card1",
          title: "Write Blog",
          description: "Can AI make memes",
          label: "30 mins",
          draggable: false,
        },
        {
          id: "Card2",
          title: "Pay Rent",
          description: "Transfer via NEFT",
          label: "5 mins",
          metadata: { sha: "be312a1" },
        },
      ],
    },
    {
      id: "lane2",
      title: "Completed",
      label: "0/0",
      cards: [],
    },
  ],
};

export { sampleBoardLists, sampleLanes };
