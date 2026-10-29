#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/4000a8d89bbdfe32801558e46fe881d6b92b527398f79380d65f7e264a2e9b69/contract';
import startContract from '../../snapshots/4000a8d89bbdfe32801558e46fe881d6b92b527398f79380d65f7e264a2e9b69/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a62d15a094e80be7b342d75e0538935972b9699c76dabb5339940dd50d17a889/contract';
import endContract from '../../snapshots/a62d15a094e80be7b342d75e0538935972b9699c76dabb5339940dd50d17a889/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'User', column: 'age' }),
      this.dropColumn({ schema: 'public', table: 'User', column: 'coverImage' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
