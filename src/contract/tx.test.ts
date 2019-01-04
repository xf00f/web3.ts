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

import { Tx } from './tx';
import { sha3 } from '../utils';
import { AbiDefinition } from '.';
import { Eth } from '../eth';
import { MockEthereumProvider } from '../providers/mock-ethereum-provider';
import { Address } from '../address';

describe('eth', () => {
  describe('contract', () => {
    describe('tx', () => {
      const contractAddress = Address.fromString('0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe');
      const contractAddressLowercase = contractAddress.toString().toLowerCase();
      const contractAddressUnprefixedLowercase = contractAddressLowercase.slice(2);
      const from = Address.fromString('0x5555567890123456789012345678901234567891');
      const fromAddressLowercase = from.toString().toLowerCase();
      let mockEthereumProvider: MockEthereumProvider;

      beforeEach(() => {
        mockEthereumProvider = new MockEthereumProvider();
      });

      it('should emit correct transaction hash and receipt on send', function(done) {
        const signature = sha3('mySend(address,uint256)').slice(0, 10);

        const methodAbi: AbiDefinition = {
          signature,
          name: 'send',
          type: 'function',
          inputs: [
            {
              name: 'to',
              type: 'address',
            },
            {
              name: 'value',
              type: 'uint256',
            },
          ],
          outputs: [],
        };

        mockEthereumProvider.send.mockImplementationOnce(async (method, params) => {
          expect(method).toBe('eth_sendTransaction');
          expect(params).toEqual([
            {
              data:
                signature +
                '000000000000000000000000' +
                contractAddressUnprefixedLowercase +
                '000000000000000000000000000000000000000000000000000000000000000a',
              from: fromAddressLowercase,
              to: contractAddressLowercase,
              gasPrice: '0x5af3107a4000',
            },
          ]);
          return '0x1234000000000000000000000000000000000000000000000000000000056789';
        });

        mockEthereumProvider.send.mockImplementationOnce(async (method, params) => {
          expect(method).toBe('eth_getTransactionReceipt');
          expect(params).toEqual(['0x1234000000000000000000000000000000000000000000000000000000056789']);
          return {
            contractAddress: contractAddressLowercase,
            cumulativeGasUsed: '0xa',
            transactionIndex: '0x3',
            blockNumber: '0xa',
            blockHash: '0xbf1234',
            gasUsed: '0x0',
          };
        });

        const args = [contractAddress, 10];
        const tx = new Tx(new Eth(mockEthereumProvider), methodAbi, contractAddress, args);

        tx.send({ from: from, gasPrice: '100000000000000' })
          .on('transactionHash', result => {
            expect(result).toBe('0x1234000000000000000000000000000000000000000000000000000000056789');
          })
          .on('receipt', function(result) {
            expect(result).toEqual({
              contractAddress,
              cumulativeGasUsed: 10,
              transactionIndex: 3,
              blockNumber: 10,
              blockHash: '0xbf1234',
              gasUsed: 0,
            });
            done();
          })
          .on('error', done);
      });

      it('should return correct result on call', async () => {
        const signature = sha3('balance(address)').slice(0, 10);

        const methodAbi: AbiDefinition = {
          signature: signature,
          name: 'balance',
          type: 'function',
          inputs: [
            {
              name: 'who',
              type: 'address',
            },
          ],
          constant: true,
          outputs: [
            {
              name: 'value',
              type: 'uint256',
            },
          ],
        };

        mockEthereumProvider.send.mockImplementationOnce(async (method, params) => {
          expect(method).toBe('eth_call');
          expect(params).toEqual([
            {
              data: signature + '000000000000000000000000' + contractAddressUnprefixedLowercase,
              from: from.toString().toLowerCase(),
              to: contractAddressLowercase,
            },
            'latest',
          ]);
          return '0x000000000000000000000000000000000000000000000000000000000000000a';
        });

        const args = [contractAddress];
        const tx = new Tx(new Eth(mockEthereumProvider), methodAbi, contractAddress, args);

        const result = await tx.call({ from });
        expect(result).toBe('10');
      });
    });
  });
});
