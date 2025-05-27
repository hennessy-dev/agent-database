// src/business/business.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Address } from '../address/address.entity'; // Asumiendo que tienes una entidad Address

@Entity('businesses') // Puedes especificar el nombre de la tabla si es diferente al nombre de la clase en plural
export class Business {
  @PrimaryGeneratedColumn()
  businessId: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index('IDX_BUSINESS_NAME', { unique: true }) // Índice para el nombre
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index('IDX_BUSINESS_EMAIL', { unique: true }) // Índice para el email
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255 }) // Se recomienda un hash para las contraseñas
  password: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @Index('IDX_BUSINESS_IDENTIFICATION', { unique: true }) // Índice para la identificación
  identification: string;

  @Column({ type: 'int', nullable: true })
  idType?: number; // Puede ser un FK a una tabla de tipos de identificación si existe

  @Column() // Columna para la clave foránea
  addressFk: number;

  @ManyToOne(() => Address) // Relación Many-to-One con la entidad Address
  @JoinColumn({ name: 'addressFk', referencedColumnName: 'addressId' }) // Especifica la columna de unión
  address: Address; // Propiedad para acceder a la entidad Address relacionada
}
