import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  addressId: number;

  @Column({ type: 'varchar', length: 255 })
  street: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  state: string;

  @Column({ type: 'varchar', length: 10 })
  zipCode: string;
}
