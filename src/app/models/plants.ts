export interface GrowthData {
    date: Date,
    growth: number
}

export interface Plant {
    name: string,
    growthData: GrowthData[]
}

export const MOCK_PLANTS: Plant[] = [
    {
        name: "Plant A",
        growthData: [],
    },
    {
        name: "Plant B",
        growthData: [],
    },
    {
        name: "Plant C",
        growthData: [],
    },
    {
        name: "Plant D",
        growthData: [],
    },
    {
        name: "Plant E",
        growthData: [],
    },
]