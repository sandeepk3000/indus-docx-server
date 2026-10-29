#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/50957b567c19fcec0017fb38317d0e26a9b9e7bd973fbe870fd9babcacc5b11b/contract';
import startContract from '../../snapshots/50957b567c19fcec0017fb38317d0e26a9b9e7bd973fbe870fd9babcacc5b11b/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/f91a869a5ec1f2031cc0555ebbfc9f7886a512db4caf4e03332b227d4589517a/contract';
import endContract from '../../snapshots/f91a869a5ec1f2031cc0555ebbfc9f7886a512db4caf4e03332b227d4589517a/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.alterColumnType({
        schema: 'public',
        table: 'courses',
        column: 'slug',
        type: 'text',
        operationClass: 'widening',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
