import { EvmContext } from '../evm-context';
import { Add } from './add';
import { AddMod } from './addmod';
import { Address } from './address';
import { And } from './and';
import { Byte } from './byte';
import { Call } from './call';
import { CallDataCopy } from './calldatacopy';
import { CallDataLoad } from './calldataload';
import { CallDataSize } from './calldatasize';
import { Caller } from './caller';
import { CallValue } from './callvalue';
import { CopyCode } from './copycode';
import { Div } from './div';
import { DupOps } from './dup';
import { Eq } from './eq';
import { Exp } from './exp';
import { ExtCodeSize } from './extcodesize';
import { Gas } from './gas';
import { Gt } from './gt';
import { Invalid } from './invalid';
import { IsZero } from './iszero';
import { Jump } from './jump';
import { JumpDest } from './jumpdest';
import { Jumpi } from './jumpi';
import { LogOps } from './log';
import { Lt } from './lt';
import { Mload } from './mload';
import { Mod } from './mod';
import { Mstore } from './mstore';
import { Mul } from './mul';
import { Not } from './not';
import { Or } from './or';
import { Pop } from './pop';
import { PushOps } from './push';
import { Return } from './return';
import { ReturnDataCopy } from './returndatacopy';
import { ReturnDataSize } from './returndatasize';
import { Revert } from './revert';
import { Sgt } from './sgt';
import { Sha3 } from './sha3';
import { Sload } from './sload';
import { Slt } from './slt';
import { Sstore } from './sstore';
import { Stop } from './stop';
import { Sub } from './sub';
import { SwapOps } from './swap';
import { Timestamp } from './timestamp';
import { Xor } from './xor';

export interface OpCode {
  readonly code: number;
  readonly mnemonic: string;
  readonly description: string;
  readonly gas: number;
  readonly bytes: number;

  handle(context: EvmContext): void | Promise<void>;
  toString(params: Buffer): string;
}

const opCodes: OpCode[] = [
  ...DupOps,
  ...LogOps,
  ...PushOps,
  ...SwapOps,
  Add,
  AddMod,
  Address,
  And,
  Byte,
  Call,
  Caller,
  CallDataCopy,
  CallDataLoad,
  CallDataSize,
  CallValue,
  CopyCode,
  Div,
  Eq,
  Exp,
  ExtCodeSize,
  Gas,
  Gt,
  Invalid,
  IsZero,
  Jump,
  JumpDest,
  Jumpi,
  Lt,
  Mul,
  Mod,
  Or,
  Pop,
  Sgt,
  Slt,
  Timestamp,
  Mload,
  Mstore,
  Not,
  Return,
  ReturnDataCopy,
  ReturnDataSize,
  Revert,
  Sha3,
  Stop,
  Sload,
  Sstore,
  Sub,
  Xor,
];

export const OpCodes: { [code: number]: OpCode } = opCodes.reduce((a, c) => ({ ...a, [c.code]: c }), {});
