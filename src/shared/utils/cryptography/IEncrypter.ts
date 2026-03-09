export interface IEncrypter {
    encrypt: (data: { payload: object,signature:string, options?:any})=> Promise<string> 
}