export interface IDecrypter {
    decrypt: (data: { token: string, signature:string})=> Promise<string>
}