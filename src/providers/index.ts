/*
  This file is part of web3x.

  web3x is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  web3x is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public License
  along with web3x.  If not, see <http://www.gnu.org/licenses/>.
*/

import { isString } from 'util';
import { HttpProvider } from './http';
import { WebsocketProvider } from './ws';
import { IpcProvider } from './ipc';

export { WebsocketProvider } from './ws';
export { HttpProvider } from './http';
export { IpcProvider } from './ipc';

export type Callback = (err?: Error, result?: JsonRPCResponse) => void;

export interface JsonRPCRequest {
  jsonrpc: string;
  method: string;
  params: any[];
  id: number;
}

export interface JsonRPCResponse {
  jsonrpc: string;
  id: number;
  result?: any;
  error?: string;
}

export type NotificationCallback = (result: any, deprecatedResult?: any) => void;

export interface Provider {
  send(payload: JsonRPCRequest, callback: Callback): any;
  disconnect();
  on?(type: string, callback: NotificationCallback);
  removeListener?(type: string, callback: NotificationCallback);
  removeAllListeners?(type: string);
  reset?();
}

function createProviderFromString(provider: Provider | string, net?: any): Provider {
  if (!isString(provider)) {
    return provider;
  }

  if (/^http(s)?:\/\//i.test(provider)) {
    return new HttpProvider(provider);
  } else if (/^ws(s)?:\/\//i.test(provider)) {
    return new WebsocketProvider(provider);
  } else if (provider && typeof net.connect === 'function') {
    return new IpcProvider(provider, net);
  } else {
    throw new Error(`Can't autodetect provider for ${provider}`);
  }
}
