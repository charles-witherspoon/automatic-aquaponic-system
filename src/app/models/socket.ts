export enum SOCKET_TYPE {
    WATER_PUMP = "WATER PUMP",
    LIGHT = "LIGHT",
    AERATOR = "AERATOR",
    HEATER = "HEATER",
    NONE = "NONE",
}

export enum SOCKET_STATUS {
    ON = "ON",
    OFF = "OFF",
}

export enum SCHEDULE_TYPE {
    INTERVAL = "INTERVAL",
    CUSTOM = "CUSTOM",
    NONE = "NONE"
}

export interface Socket {
    id?: number,
    type: string,
    schedule: any,
    status: SOCKET_STATUS,
    scheduleType: SCHEDULE_TYPE
}

export const MOCK_SOCKETS: Socket[] = [
    {
        id: 1,
        type: SOCKET_TYPE.HEATER,
        schedule: {},
        status: SOCKET_STATUS.ON,
        scheduleType: SCHEDULE_TYPE.NONE
    },
    {
        id: 2,
        type: SOCKET_TYPE.WATER_PUMP,
        schedule: {},
        status: SOCKET_STATUS.OFF,
        scheduleType: SCHEDULE_TYPE.NONE
    },
    {
        id: 3,
        type: SOCKET_TYPE.LIGHT,
        schedule: {},
        status: SOCKET_STATUS.OFF,
        scheduleType: SCHEDULE_TYPE.NONE
    },
    {
        id: 4,
        type: SOCKET_TYPE.NONE,
        schedule: {},
        status: SOCKET_STATUS.OFF,
        scheduleType: SCHEDULE_TYPE.NONE
    },
    {
        id: 5,
        type: SOCKET_TYPE.NONE,
        schedule: {},
        status: SOCKET_STATUS.OFF,
        scheduleType: SCHEDULE_TYPE.NONE
    },
    {
        id: 6,
        type: SOCKET_TYPE.NONE,
        schedule: {},
        status: SOCKET_STATUS.OFF,
        scheduleType: SCHEDULE_TYPE.NONE
    },
    {
        id: 7,
        type: SOCKET_TYPE.NONE,
        schedule: {},
        status: SOCKET_STATUS.OFF,
        scheduleType: SCHEDULE_TYPE.NONE
    },
    {
        id: 8,
        type: SOCKET_TYPE.NONE,
        schedule: {},
        status: SOCKET_STATUS.OFF,
        scheduleType: SCHEDULE_TYPE.NONE
    },
]
