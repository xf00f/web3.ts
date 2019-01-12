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

import { abi } from '.';
import { Address } from '../../address';

describe('encodeParameter', () => {
  const tests = [
    {
      params: ['uint256', '2345675643'],
      result: '0x000000000000000000000000000000000000000000000000000000008bd02b7b',
    },
    {
      params: ['bytes32', '0xdf3234'],
      result: '0xdf32340000000000000000000000000000000000000000000000000000000000',
    },
    {
      params: ['bytes32[]', ['0xdf3234', '0xfdfd']],
      result:
        '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002df32340000000000000000000000000000000000000000000000000000000000fdfd000000000000000000000000000000000000000000000000000000000000',
    },
  ];

  tests.forEach(test => {
    it('should convert correctly', () => {
      expect(abi.encodeParameter.apply(abi, test.params as any)).toEqual(test.result);
    });
  });
});

describe('encodeParameter', () => {
  const test = t => {
    it('should correctly encode parameter', () => {
      expect(abi.encodeParameter(t.type, t.value).replace('0x', '')).toBe(t.expected);
    });
  };

  test({
    type: 'address',
    value: Address.fromString('0x407d73d8a49eeb85d32cf465507dd71d507100c1'),
    expected: '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1',
  });
  test({
    type: 'address[2]',
    value: ['0x407d73d8a49eeb85d32cf465507dd71d507100c1', '0x407d73d8a49eeb85d32cf465507dd71d507100c3'],
    expected:
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1' +
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3',
  });
  test({
    type: 'address[]',
    value: ['0x407d73d8a49eeb85d32cf465507dd71d507100c1', '0x407d73d8a49eeb85d32cf465507dd71d507100c3'],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1' +
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3',
  });
  test({
    type: 'address[][2]',
    value: [
      ['0x407d73d8a49eeb85d32cf465507dd71d507100c1', '0x407d73d8a49eeb85d32cf465507dd71d507100c2'],
      ['0x407d73d8a49eeb85d32cf465507dd71d507100c3', '0x407d73d8a49eeb85d32cf465507dd71d507100c4'],
    ],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '00000000000000000000000000000000000000000000000000000000000000a0' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1' +
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c2' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3' +
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c4',
  });
  test({
    type: 'address[2][]',
    value: [
      ['0x407d73d8a49eeb85d32cf465507dd71d507100c1', '0x407d73d8a49eeb85d32cf465507dd71d507100c2'],
      ['0x407d73d8a49eeb85d32cf465507dd71d507100c3', '0x407d73d8a49eeb85d32cf465507dd71d507100c4'],
    ],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1' +
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c2' +
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3' +
      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c4',
  });
  // test({ type: 'address[][]', value: [['0x407d73d8a49eeb85d32cf465507dd71d507100c5'],
  // ['0x407d73d8a49eeb85d32cf465507dd71d507100c3']],
  // expected: '0000000000000000000000000000000000000000000000000000000000000020' +
  // '0000000000000000000000000000000000000000000000000000000000000002' +
  // '0000000000000000000000000000000000000000000000000000000000000080' +
  // '00000000000000000000000000000000000000000000000000000000000000c0' +
  // '0000000000000000000000000000000000000000000000000000000000000001' +
  // '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c5' +
  // '0000000000000000000000000000000000000000000000000000000000000001' +
  // '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3' });
  // test({ type: 'address[][]', value: [['0x407d73d8a49eeb85d32cf465507dd71d507100cf', '0x407d73d8a49eeb85d32cf465507dd71d507100c2'],
  // ['0x407d73d8a49eeb85d32cf465507dd71d507100c3', '0x407d73d8a49eeb85d32cf465507dd71d507100c4']],
  // expected: '0000000000000000000000000000000000000000000000000000000000000020' +
  // '0000000000000000000000000000000000000000000000000000000000000002' +
  // '0000000000000000000000000000000000000000000000000000000000000080' +
  // '00000000000000000000000000000000000000000000000000000000000000e0' +
  // '0000000000000000000000000000000000000000000000000000000000000002' +
  // '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100cf' +
  // '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c2' +
  // '0000000000000000000000000000000000000000000000000000000000000002' +
  // '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3' +
  // '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c4' });
  test({ type: 'bool', value: true, expected: '0000000000000000000000000000000000000000000000000000000000000001' });
  test({ type: 'bool', value: false, expected: '0000000000000000000000000000000000000000000000000000000000000000' });
  test({
    type: 'bool[1][2]',
    value: [[false], [false]],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000000',
  });
  test({
    type: 'bool[2]',
    value: [true, false],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000000',
  });
  test({
    type: 'bool[]',
    value: [true, true, false],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000000',
  });

  test({ type: 'int', value: 1, expected: '0000000000000000000000000000000000000000000000000000000000000001' });
  test({ type: 'int', value: 16, expected: '0000000000000000000000000000000000000000000000000000000000000010' });
  test({ type: 'int', value: -1, expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' });
  // test({ type: 'int', value: 0.1,             expected: '0000000000000000000000000000000000000000000000000000000000000000'});
  // test({ type: 'int', value: 3.9,             expected: '0000000000000000000000000000000000000000000000000000000000000003'});
  test({ type: 'int256', value: 1, expected: '0000000000000000000000000000000000000000000000000000000000000001' });
  test({ type: 'int256', value: 16, expected: '0000000000000000000000000000000000000000000000000000000000000010' });
  test({ type: 'int256', value: -1, expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' });

  test({ type: 'uint', value: 1, expected: '0000000000000000000000000000000000000000000000000000000000000001' });
  test({ type: 'uint', value: 16, expected: '0000000000000000000000000000000000000000000000000000000000000010' });
  // test({ type: 'uint', value: 0.1,             expected: '0000000000000000000000000000000000000000000000000000000000000000'});
  // test({ type: 'uint', value: 3.9,             expected: '0000000000000000000000000000000000000000000000000000000000000003'});
  test({ type: 'uint256', value: 1, expected: '0000000000000000000000000000000000000000000000000000000000000001' });
  test({ type: 'uint256', value: 16, expected: '0000000000000000000000000000000000000000000000000000000000000010' });
  test({
    type: 'uint256',
    value: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  });
  test({
    type: 'bytes32',
    value: '0x6761766f66796f726b',
    expected: '6761766f66796f726b0000000000000000000000000000000000000000000000',
  });
  test({
    type: 'bytes32',
    value: '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
    expected: '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
  });
  test({
    type: 'bytes32',
    value: '0x02838654a83c213dae3698391eabbd54a5b6e1fb3452bc7fa4ea0dd5c8ce7e29',
    expected: '02838654a83c213dae3698391eabbd54a5b6e1fb3452bc7fa4ea0dd5c8ce7e29',
  });
  test({
    type: 'bytes',
    value: '0x6761766f66796f726b',
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '6761766f66796f726b0000000000000000000000000000000000000000000000',
  });
  test({
    type: 'bytes',
    value: '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
  });
  test({
    type: 'bytes',
    value:
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' +
      'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1',
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '000000000000000000000000000000000000000000000000000000000000009f' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' +
      'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff100',
  });
  test({
    type: 'string',
    value: 'gavofyork',
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000009' +
      '6761766f66796f726b0000000000000000000000000000000000000000000000',
  });

  test({
    type: 'string',
    value: 'Heeäööä👅D34ɝɣ24Єͽ-.,äü+#/',
    expected:
      '00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000026486565c3a4c3b6c3b6c3a4f09f9185443334c99dc9a33234d084cdbd2d2e2cc3a4c3bc2b232f0000000000000000000000000000000000000000000000000000',
  });

  test({
    type: 'bytes',
    value: '0xc3a40000c3a4',
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000006' +
      'c3a40000c3a40000000000000000000000000000000000000000000000000000',
  });
  test({
    type: 'bytes32',
    value: '0xc3a40000c3a4',
    expected: 'c3a40000c3a40000000000000000000000000000000000000000000000000000',
  });
  test({
    type: 'string',
    value: 'Ã¤Ã¤',
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000008' +
      'c383c2a4c383c2a4000000000000000000000000000000000000000000000000',
  });
  test({
    type: 'string',
    value: 'ü',
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      'c3bc000000000000000000000000000000000000000000000000000000000000',
  });
  test({
    type: 'string',
    value: 'Ã',
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      'c383000000000000000000000000000000000000000000000000000000000000',
  });
  test({
    type: 'int[]',
    value: [],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000000',
  });
  test({
    type: 'int[]',
    value: [3],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000003',
  });
  test({
    type: 'int256[]',
    value: [3],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000003',
  });
  test({
    type: 'int[]',
    value: [1, 2, 3],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000003' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000003',
  });
  test({
    type: 'bytes1[4]',
    value: ['0xcf', '0x68', '0x4d', '0xfb'],
    expected:
      'cf00000000000000000000000000000000000000000000000000000000000000' +
      '6800000000000000000000000000000000000000000000000000000000000000' +
      '4d00000000000000000000000000000000000000000000000000000000000000' +
      'fb00000000000000000000000000000000000000000000000000000000000000',
  });

  test({
    type: 'bytes',
    value:
      '0x131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
      '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
      '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
  });
  test({
    type: 'bytes',
    value:
      '0x131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
      '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
      '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
      '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
      '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
  });
  test({
    type: 'string',
    value: 'welcome to ethereum. welcome to ethereum. welcome to ethereum.',
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '000000000000000000000000000000000000000000000000000000000000003e' +
      '77656c636f6d6520746f20657468657265756d2e2077656c636f6d6520746f20' +
      '657468657265756d2e2077656c636f6d6520746f20657468657265756d2e0000',
  });
  test({
    type: 'tuple(string,string)',
    value: ['welcome to ethereum.', 'welcome to ethereum.'],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000014' +
      '77656c636f6d6520746f20657468657265756d2e000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000014' +
      '77656c636f6d6520746f20657468657265756d2e000000000000000000000000',
  });
  test({
    type: 'tuple(bytes,bytes)',
    value: ['0x77656c636f6d6520746f20657468657265756d2e', '0x77656c636f6d6520746f20657468657265756d2e'],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000014' +
      '77656c636f6d6520746f20657468657265756d2e000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000014' +
      '77656c636f6d6520746f20657468657265756d2e000000000000000000000000',
  });
  test({
    type: 'tuple(bytes,bool,uint256)',
    value: ['0x77656c636f6d6520746f20657468657265756d2e', true, 124515],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '000000000000000000000000000000000000000000000000000000000001e663' +
      '0000000000000000000000000000000000000000000000000000000000000014' +
      '77656c636f6d6520746f20657468657265756d2e000000000000000000000000',
  });
  test({
    type: 'tuple(string,tuple(bool,int256),address)',
    value: ['hello', [true, -151], '0x0175010374017501037401750103740175010374'],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff69' +
      '0000000000000000000000000175010374017501037401750103740175010374' +
      '0000000000000000000000000000000000000000000000000000000000000005' +
      '68656c6c6f000000000000000000000000000000000000000000000000000000',
  });
  test({
    type: 'tuple(tuple(bool,bool),tuple(address,address),tuple(string,string))',
    value: [
      [true, false],
      ['0x81017589ab81017589ab81017589ab81017589ab', '0x81017589ab81017589ab81017589ab81017589ab'],
      ['string One', 'string Two'],
    ],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '00000000000000000000000081017589ab81017589ab81017589ab81017589ab' +
      '00000000000000000000000081017589ab81017589ab81017589ab81017589ab' +
      '00000000000000000000000000000000000000000000000000000000000000a0' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '000000000000000000000000000000000000000000000000000000000000000a' +
      '737472696e67204f6e6500000000000000000000000000000000000000000000' +
      '000000000000000000000000000000000000000000000000000000000000000a' +
      '737472696e672054776f00000000000000000000000000000000000000000000',
  });
  test({
    type: 'tuple(tuple(tuple(bool,bool),tuple(bytes,bytes),tuple(address,bool)),address)',
    value: [
      [
        [false, false],
        ['0xab1394581edfa2ef9ca71', '0x15abe391df19aef19a4561'],
        ['0xec2270c849236333c86834728e783cd2f789088e', true],
      ],
      '0x81017589ab81017589ab81017589ab81017589ab',
    ],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '00000000000000000000000081017589ab81017589ab81017589ab81017589ab' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '00000000000000000000000000000000000000000000000000000000000000a0' +
      '000000000000000000000000ec2270c849236333c86834728e783cd2f789088e' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000040' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      '000000000000000000000000000000000000000000000000000000000000000b' +
      '0ab1394581edfa2ef9ca71000000000000000000000000000000000000000000' +
      '000000000000000000000000000000000000000000000000000000000000000b' +
      '15abe391df19aef19a4561000000000000000000000000000000000000000000',
  });
  test({
    type: 'tuple(bool,string,bool,tuple(address,address))',
    value: [
      true,
      'testing',
      false,
      ['0x1981710abe1981710abe1981710abe1981710abe', '0x1981710abe1981710abe1981710abe1981710abe'],
    ],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '00000000000000000000000000000000000000000000000000000000000000a0' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000001981710abe1981710abe1981710abe1981710abe' +
      '0000000000000000000000001981710abe1981710abe1981710abe1981710abe' +
      '0000000000000000000000000000000000000000000000000000000000000007' +
      '74657374696e6700000000000000000000000000000000000000000000000000',
  });
  test({
    type: 'tuple(address,address,tuple(string,tuple(int256,int256),string))',
    value: [
      '0x1981710abe1981710abe1981710abe1981710abe',
      '0x1981710abe1981710abe1981710abe1981710abe',
      ['structs are great', [-1951, 194018], 'so many possibilities'],
    ],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000001981710abe1981710abe1981710abe1981710abe' +
      '0000000000000000000000001981710abe1981710abe1981710abe1981710abe' +
      '0000000000000000000000000000000000000000000000000000000000000060' +
      '0000000000000000000000000000000000000000000000000000000000000080' +
      'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff861' +
      '000000000000000000000000000000000000000000000000000000000002f5e2' +
      '00000000000000000000000000000000000000000000000000000000000000c0' +
      '0000000000000000000000000000000000000000000000000000000000000011' +
      '7374727563747320617265206772656174000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000015' +
      '736f206d616e7920706f73736962696c69746965730000000000000000000000',
  });
  test({
    type: 'tuple(bool,tuple(bytes32,int256,tuple(bytes24,bytes8)),tuple(bool,bool,bool),string)',
    value: [
      true,
      [
        '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
        -18291849,
        ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18', '0xabdef18710a18a18'],
      ],
      [false, true, false],
      'testing testing',
    ],
    expected:
      '0000000000000000000000000000000000000000000000000000000000000020' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      'abdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18' +
      'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffee8e377' +
      'abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000' +
      'abdef18710a18a18000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000000' +
      '0000000000000000000000000000000000000000000000000000000000000120' +
      '000000000000000000000000000000000000000000000000000000000000000f' +
      '74657374696e672074657374696e670000000000000000000000000000000000',
  });
});
