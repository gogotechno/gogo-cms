export interface Wallet {

}

export interface Currency {
    code: string,
    displaySymbol?: string,
    symbolPosition?: "start" | "end",
    roundToNearest?: number,
    precision?: number
}