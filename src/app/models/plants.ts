export interface GrowthData {
    date: Date,
    growth: number
}

export interface Plant {
    id?: number,
    name: string,
    growthData: GrowthData[]
}

export const MOCK_PLANTS: Plant[] = [
    {
        id: 1,
        name: "Plant A",
        growthData: [],
    },
    {
        id: 2,
        name: "Plant B",
        growthData: [],
    },
    {
        id: 3,
        name: "Plant C",
        growthData: [],
    },
    {
        id: 4,
        name: "Plant D",
        growthData: [],
    },
    {
        id: 5,
        name: "Plant E",
        growthData: [],
    },
]