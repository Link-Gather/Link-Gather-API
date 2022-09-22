export interface FindManyOptions {
    /**
     * Page (paginated) where from entities should be taken.
     * Starts from 1.
     */
    page?: number;
    /**
     * Limit (paginated) - max number of entities should be taken.
     */
    limit?: number;
}

export interface FindOrder {
    order: {
        [prop: string]: 'DESC' | 'ASC';
    };
}