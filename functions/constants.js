exports.constants = {
  MAX_BOARD_TITLE_LENGTH: 200,
  MAX_TASK_TITLE_LENGTH: 200,
  MAX_TASK_DESCRIPTION_LENGTH: 1000,
  MAX_TASK_ACTIVITY_LENGTH: 120,
  ROLES: {
    admin: "admin",
  },
  TASK_PRIORITIES: {
    high: "high",
    medium: "medium",
    low: "low",
  },

  CALENDAR: {
    MAX_EVENT_TITLE_LENGTH: 200,
    MAX_EVENT_DESCRIPTION_LENGTH: 800,
    EVENT: {
      FIELDS: {
        eventTitle: {
          field: "eventTitle",
          type: "string",
        },
        eventDescription: {
          field: "eventDescription",
          type: "string",
        },
        eventStartTime: {
          field: "eventStartTime",
          type: "string",
        },
        eventEndTime: {
          field: "eventEndTime",
          type: "string",
        },
        eventDate: {
          field: "eventDate",
          type: "string",
        },
      },
    },
  },
};
