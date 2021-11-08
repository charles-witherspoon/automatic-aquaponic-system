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
    UNUSED = "UNUSED",
}

export interface Socket {
    id?: number,
    type: SOCKET_TYPE,
    schedule: any,
    status: SOCKET_STATUS
}

export const MOCK_SOCKETS: Socket[] = [
    {
        id: 1,
        type: SOCKET_TYPE.HEATER,
        schedule: {},
        status: SOCKET_STATUS.ON,
    },
    {
        id: 2,
        type: SOCKET_TYPE.WATER_PUMP,
        schedule: {},
        status: SOCKET_STATUS.OFF,
    },
    {
        id: 3,
        type: SOCKET_TYPE.LIGHT,
        schedule: {},
        status: SOCKET_STATUS.OFF,
    },
    {
        id: 4,
        type: SOCKET_TYPE.NONE,
        schedule: {},
        status: SOCKET_STATUS.UNUSED,
    },
    {
        id: 5,
        type: SOCKET_TYPE.NONE,
        schedule: {},
        status: SOCKET_STATUS.UNUSED,
    },
    {
        id: 6,
        type: SOCKET_TYPE.NONE,
        schedule: {},
        status: SOCKET_STATUS.UNUSED,
    },
    {
        id: 7,
        type: SOCKET_TYPE.NONE,
        schedule: {},
        status: SOCKET_STATUS.UNUSED,
    },
    {
        id: 8,
        type: SOCKET_TYPE.NONE,
        schedule: {},
        status: SOCKET_STATUS.UNUSED,
    },
]
