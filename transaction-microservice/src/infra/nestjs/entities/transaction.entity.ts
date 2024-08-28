import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: "sender_user_id" })
  senderUserId: string;

  @Column({ name: "receiver_user_id" })
  receiverUserId: string;

  @Column()
  amount: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;
}
