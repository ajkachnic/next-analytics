import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export interface ServerOptions {
  connection: string,
  database: string
}

export type Handler = (req: NextApiRequest & {
  database: Db
}, res: NextApiResponse, opts: ServerOptions) => void | Promise<void>

export interface UserData {
  platform: string,
  userAgent: string,
  lang?: string,
  referrer?: string,
  href?: string,
}
export interface UserQuery {
  from: string,
  to?: string,
  path?: string
}