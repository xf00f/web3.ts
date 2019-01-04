import { bufferToHex, sha3 } from '../utils';

export class Address {
  static ZERO = new Address(Buffer.alloc(20));

  constructor(private buffer: Buffer) {
    if (buffer.length != 20) {
      throw new Error('Invalid address buffer.');
    }
  }

  static fromString(address: string) {
    if (!Address.isAddress(address)) {
      throw new Error(`Invalid address string: ${address}`);
    }
    return new Address(Buffer.from(address.replace(/^0x/i, ''), 'hex'));
  }

  static isAddress(address: string) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      // Does not have the basic requirements of an address.
      return false;
    } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
      // It's ALL lowercase or ALL upppercase.
      return true;
    } else {
      return Address.checkAddressChecksum(address);
    }
  }

  static checkAddressChecksum(address: string) {
    address = address.replace(/^0x/i, '');
    const addressHash = sha3(address.toLowerCase()).replace(/^0x/i, '');

    for (let i = 0; i < 40; i++) {
      // The nth letter should be uppercase if the nth digit of casemap is 1.
      if (
        (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
        (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])
      ) {
        return false;
      }
    }
    return true;
  }

  static toChecksumAddress(address: string) {
    if (!Address.isAddress(address)) {
      throw new Error('Invalid address string.');
    }

    address = address.toLowerCase().replace(/^0x/i, '');
    const addressHash = sha3(address).replace(/^0x/i, '');
    let checksumAddress = '0x';

    for (let i = 0; i < address.length; i++) {
      // If ith character is 9 to f then make it uppercase.
      if (parseInt(addressHash[i], 16) > 7) {
        checksumAddress += address[i].toUpperCase();
      } else {
        checksumAddress += address[i];
      }
    }
    return checksumAddress;
  }

  toString() {
    return Address.toChecksumAddress(bufferToHex(this.buffer));
  }

  toBuffer() {
    return this.buffer;
  }
}