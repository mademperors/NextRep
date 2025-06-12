import { Column, Entity, PrimaryColumn, TableInheritance } from 'typeorm';
import { Role } from '../../common/constants/enums/roles.enum';

@Entity('account')
@TableInheritance({ column: { type: 'enum', name: 'accountType', enum: Role } })
export class Account {
  @PrimaryColumn('varchar', { length: 50 })
  username: string;

  @Column('varchar', { length: 100, nullable: false })
  password: string;

  @Column('enum', { enum: Role, nullable: false })
  accountType: Role;
}
