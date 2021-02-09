import { Handler } from "./types";
import { MongoClient } from 'mongodb'

let client: MongoClient;
export const useMongo: Handler = async (request,_, options) => {
  if(client === undefined) client = new MongoClient(options.connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  if (!client.isConnected()) await client.connect();;

  request.database = client.db(options.database)
}