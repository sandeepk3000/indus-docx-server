#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0bb4e30a8e678c687ad1145ef388f39a8fbbc0825b2abf7c1472b5091ca830d5/contract';
import endContract from '../../snapshots/0bb4e30a8e678c687ad1145ef388f39a8fbbc0825b2abf7c1472b5091ca830d5/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/45122d6bb9fe825864eff5f3864100b371bc676d2745c153ea4798cf898cc061/contract';
import startContract from '../../snapshots/45122d6bb9fe825864eff5f3864100b371bc676d2745c153ea4798cf898cc061/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.alterColumnType({
        schema: 'public',
        table: 'users',
        column: 'auth_provider',
        type: 'text',
        operationClass: 'widening',
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'users',
        column: 'auth_subject',
        type: 'text',
        operationClass: 'widening',
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'users',
        column: 'email',
        type: 'text',
        operationClass: 'widening',
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'users',
        column: 'name',
        type: 'text',
        operationClass: 'widening',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
