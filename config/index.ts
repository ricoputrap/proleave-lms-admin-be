import startDbConnection from "./db"

export const startConfiguration = async () => {
 await startDbConnection(); 
}