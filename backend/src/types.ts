export enum RestaurantStatus {
    PENDING = "pending",
    VERIFIED = "verified",
    APPROVED = "approved"
}

export type RestaurantType = {
    name:string
    status: RestaurantStatus
    id?: string
    location?:string
}

export enum FoodCategories {
    DRINKS = 'drinks',
    SNACKS = "SNACKS",
    GRILL = "grill",
    DESSERTS = "desserts",
    VEGAN ="vegan",
    SIDES ="sides",
    MAIN_COURSES ="main courses",
    SOUPS ="soups",
    SALAD = "salad",
    OTHER = "other",
    APPETIZERS ="appetizers"
}

