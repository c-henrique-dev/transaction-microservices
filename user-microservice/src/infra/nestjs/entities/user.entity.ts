import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  agency: string;

  @Column({ nullable: false })
  account: string;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn({ name: "address_id" })
  address: Address;
}
