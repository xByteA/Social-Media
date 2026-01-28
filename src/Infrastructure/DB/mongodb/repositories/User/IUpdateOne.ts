export interface IupdateOne {
    updateOne(filter: Record<string, any>, update: Record<string, any>): Promise<void>
}