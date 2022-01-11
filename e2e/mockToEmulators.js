import axios from 'axios';

const voidUser = {
  country: {
    stringValue: 'us',
  },
  gender: {
    stringValue: '',
  },
  flags: {
    mapValue: {
      fields: {
        show_basics_tutorial: {
          booleanValue: true,
        },
        has_coach_messages: {
          booleanValue: true,
        },
        show_welcome_message_on_chat: {
          booleanValue: true,
        },
      },
    },
  },
  language: {
    stringValue: 'en',
  },
  external_id: {
    stringValue: '',
  },
  source: {
    stringValue: '',
  },
  treatment_module: {
    integerValue: '1',
  },
  display_name: {
    stringValue: 'test',
  },
  kit_id: {
    stringValue: '',
  },
  treatment_level: {
    integerValue: '1',
  },
  tz_offset: {
    integerValue: '-10800',
  },
  name: {
    stringValue: 'test',
  },
  progress: {
    arrayValue: {},
  },
  crisp_session_id: {
    stringValue: '',
  },
  isPremium: {
    booleanValue: false,
  },
  statistics: {
    mapValue: {
      fields: {
        last_coach_message_received_at: {
          timestampValue: '2021-11-03T19:08:27.196Z',
        },
        last_lifesaver_at: {
          timestampValue: '2021-11-03T19:08:27.196Z',
        },
        activity_days_in_a_row: {
          integerValue: '0',
        },
        last_coach_message_sent_at: {
          timestampValue: '2021-11-03T19:08:27.196Z',
        },
        last_completed_activity: {
          stringValue: '',
        },
        last_completed_activity_at: {
          timestampValue: '2021-11-03T19:08:27.196Z',
        },
        last_module_change_at: {
          timestampValue: '2021-11-03T19:08:27.196Z',
        },
        program_started_at: {
          timestampValue: '2021-11-03T19:08:27.196Z',
        },
      },
    },
  },
  created_at: {
    timestampValue: '2021-11-03T19:08:27.199Z',
  },
  app_version: {
    stringValue: '0.2.6',
  },
  tz: {
    stringValue: 'America/Argentina/Buenos_Aires',
  },
  platform: {
    stringValue: 'android(29)',
  },
  pn_tokens: {
    arrayValue: {
      values: [
        {
          stringValue:
            'fJbpwG-lSo-V_QrrDRkkvh:APA91bHEedxjRy1ReFS1gg1ur6E1ibET9ZfgbAO3zHhvW__eyHFMCIwxxmo8OOYwqMNl7F-rztesqwAfs8pWn8zdhRMawui5ZeCEIkPsLrdgG1gm5KHrKwrZzw_ksUd6bCEO8TnVuRJj',
        },
      ],
    },
  },
};

export const clearAuth = async () => {
  await axios.delete('http://localhost:9099/emulator/v1/projects/mindco-relief-dev/accounts', {
    headers: {
      Authorization: 'Bearer owner',
    },
  });
};

export const clearFirestore = async () => {
  await axios.delete('http://localhost:8080/emulator/v1/projects/mindco-relief-dev/databases/(default)/documents', {
    headers: {
      Authorization: 'Bearer owner',
    },
  });
};

export const clearData = async () => {
  await clearAuth();
  await clearFirestore();
};

export const addAuthUser = async (email, password) => {
  const response = await axios.post(
    'http://0.0.0.0:9099/identitytoolkit.googleapis.com/v1/projects/mindco-relief-dev/accounts',
    {
      displayName: '',
      photoUrl: '',
      customAttributes: '',
      email,
      password,
      phoneNumber: '',
    },
    {
      headers: {
        Authorization: 'Bearer owner',
      },
    },
  );
  return response.data.localId;
};

export const addDocumentToUsers = async documentId => {
  await axios.post(
    `http://localhost:8080/v1/projects/mindco-relief-dev/databases/(default)/documents/users?documentId=${documentId}`,
    { fields: voidUser },
    {
      headers: {
        Authorization: 'Bearer owner',
      },
    },
  );
  return;
};

export const makeStandarUser = async documentId => {
  await axios.patch(
    `http://localhost:8080/v1/projects/mindco-relief-dev/databases/(default)/documents/users/${documentId}?updateMask.fieldPaths=flags`,
    {
      fields: {
        flags: {
          mapValue: {
            fields: {
              show_basics_tutorial: {
                booleanValue: false,
              },
              has_coach_messages: {
                booleanValue: false,
              },
              show_welcome_message_on_chat: {
                booleanValue: false,
              },
            },
          },
        },
      },
    },
    {
      headers: {
        Authorization: 'Bearer owner',
      },
    },
  );
  return;
};

export const activateKit = async (documentId, kitId) => {
  await axios.patch(
    `http://localhost:8080/v1/projects/mindco-relief-dev/databases/(default)/documents/users/${documentId}?updateMask.fieldPaths=isPremium&updateMask.fieldPaths=kit_id`,
    {
      fields: {
        kit_id: {
          stringValue: kitId,
        },
        isPremium: {
          booleanValue: true,
        },
      },
    },
    {
      headers: {
        Authorization: 'Bearer owner',
      },
    },
  );

  await axios.patch(
    `http://localhost:8080/v1/projects/mindco-relief-dev/databases/(default)/documents/kits/${kitId}?updateMask.fieldPaths=group&updateMask.fieldPaths=used_by`,
    {
      fields: {
        used_by: {
          stringValue: documentId,
        },
        group: {
          stringValue: 'test',
        },
      },
    },
    {
      headers: {
        Authorization: 'Bearer owner',
      },
    },
  );

  return;
};

export const createStandarUser = async (username, password, kitId) => {
  const uId = await addAuthUser(username, password);
  console.log('UID:  ', uId);
  await addDocumentToUsers(uId);
  await makeStandarUser(uId);
  if (kitId) {
    await activateKit(uId, kitId);
  }
  return uId;
};

export const patchUser = async (documentId, fields, maskFields) => {
  const updateMask = maskFields
    ? maskFields.reduce(
        (prev, curr, idx) => `${prev}updateMask.fieldPaths=${curr}${idx < maskFields.length - 1 ? '&' : ''}`,
        '?',
      )
    : '';
  console.log(updateMask);
  const r = await axios.patch(
    `http://localhost:8080/v1/projects/mindco-relief-dev/databases/(default)/documents/users/${documentId}${updateMask}`,
    {
      fields,
    },
    {
      headers: {
        Authorization: 'Bearer owner',
      },
    },
  );
  console.log(r.status);
  return;
};

export const makeKit = async (kitId, documentId) => {
  if (documentId) {
    await axios.patch(
      `http://localhost:8080/v1/projects/mindco-relief-dev/databases/(default)/documents/kits/${kitId}?updateMask.fieldPaths=group&updateMask.fieldPaths=used_by`,
      {
        fields: {
          used_by: {
            stringValue: documentId,
          },
          group: {
            stringValue: 'test',
          },
        },
      },
      {
        headers: {
          Authorization: 'Bearer owner',
        },
      },
    );
  } else {
    await axios.patch(
      `http://localhost:8080/v1/projects/mindco-relief-dev/databases/(default)/documents/kits/${kitId}?updateMask.fieldPaths=group&updateMask.fieldPaths=used_by`,
      {
        fields: {
          group: {
            stringValue: 'test',
          },
        },
      },
      {
        headers: {
          Authorization: 'Bearer owner',
        },
      },
    );
  }

  return;
};
