// import { getYjsValue, syncedStore } from "@syncedstore/core";
import { WebsocketProvider } from "y-partykit/provider";
import { fireproof } from "@fireproof/core"


const db = fireproof('fireproof-partykit-main')
async function getrows()
{
  const {rows}=await db.query('startedAt', { range: ['a', 'z'] })
  return rows
}

export type Todo = {
  title: string;
  completed: boolean;
};


// new WebsocketProvider(
//   "wss://yjs.threepointone.partykit.dev/party",
//   "fireproof-partykit-3",
//   getrows() as any
// ); // sync via partykit

